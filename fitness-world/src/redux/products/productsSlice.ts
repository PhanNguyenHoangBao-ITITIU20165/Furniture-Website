import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { backendURL } from 'src/constant/api/backendURL';
import { IRootState } from '../store';
import {
    addNewProductAPI,
    getAllProductsAPI,
    getProductImageAPI,
    updateProductAPI,
    updateProductImageAPI,
} from 'src/constant/api/productsAPI';
import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

export interface IProduct {
    id: string;
    name: string;
    price: number;
    category: string;
    image_dir: any;
    description: string;
    discount?: number;
    status: string;
    quantity: number;
    createdAt: string;
    updatedAt: string;
}

// backend update new UpdatedAt
export interface IUpdateProduct {
    id: string;
    name: string;
    price: number;
    category: string;
    description: string;
    discount?: number;
    status: string;
    quantity: number;
    updatedAt?: string;
}

export interface IAddNewProduct {
    name: string;
    category: string;
    price: number;
    quantity: number;
    description: string;
}

export interface IProductImage {
    image_dir: any;
    id: string;
}

export interface IProductInStock {
    items: IProduct[];
    error: Object | null;
    status: string;
}

export const fetchProducts = createAsyncThunk<IProduct[], void>(
    'products/getAllProducts',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await getAllProductsAPI();

            const products: IProduct[] = [];
            for (const product of data) {
                const formattedTime = (dateObject: Date) => {
                    const hours = dateObject.getHours().toString().padStart(2, '0');
                    const minutes = dateObject.getMinutes().toString().padStart(2, '0');
                    const day = dateObject.getDate().toString().padStart(2, '0');
                    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Month starts from 0
                    const year = dateObject.getFullYear();

                    return `${hours}:${minutes} - ${day}/${month}/${year}`;
                };

                const createdAt = formattedTime(new Date(product.createdAt));
                const updatedAt = formattedTime(new Date(product.updatedAt));

                // const productImage: any = (await getProductImageAPI(product.id)) ;
                // const productImageUrl = URL.createObjectURL(productImage.data);
                // else productImageUrl = null;
                // console.log(productImage);
                // let productImageUrl = null;
                // if (productImage !== null) productImageUrl = URL.createObjectURL(productImage.data);

                let productImageUrl;
                // getProductImage and handle case image null
                // if (product.image_dir === undefined) {
                try {
                    const productImage: any = await getProductImageAPI(product.id);

                    if (productImage.status === 200) {
                        productImageUrl = URL.createObjectURL(productImage.data);
                    } else {
                        throw new Error('Failed to fetch image');
                    }
                } catch (error) {
                    console.error('Error fetching product image:', error);
                    productImageUrl = null;
                }
                // } else productImageUrl = product.imageUrl;

                products.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: product.quantity,
                    category: product.category,
                    image_dir: productImageUrl,
                    description: product.description,
                    discount: undefined,
                    status: product.status,
                    createdAt: createdAt,
                    updatedAt: updatedAt,
                });
            }

            return products;
        } catch (error: any) {
            if (error.response && error.response.message) return rejectWithValue(error.response.message);
            else return rejectWithValue(error.message);
        }
    },
);

export const updateProductImage = createAsyncThunk(
    'products/updateProductImage',
    async ({ image_dir, id }: IProductImage, { rejectWithValue }) => {
        try {
            const token = Cookies.get('accessToken');
            const response = await updateProductImageAPI(token, image_dir, id);

            // const productImage: any = await getProductImageAPI(id);
            // const productImageUrl = URL.createObjectURL(productImage.data);
            // const imageData: IProductImage = { image_dir: productImageUrl, id: id };
            // console.log(imageData);
            // return imageData;
            return ;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    },
);

export const updateProduct = createAsyncThunk(
    'products/productUpdate',
    async (product: IUpdateProduct, { rejectWithValue }) => {
        try {
            const adminToken = Cookies.get('accessToken');
            const { data } = await updateProductAPI(product, adminToken);

            return {
                id: data.id,
                name: data.name,
                price: data.price,
                quantity: data.quantity,
                category: data.category,
                description: data.description,
                discount: undefined,
                status: data.status,
            };
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

export const addNewProduct = createAsyncThunk(
    'products/addNewProduct',
    async (productData: IAddNewProduct, { rejectWithValue }) => {
        try {
            const adminToken = Cookies.get('accessToken');
            const { data } = await addNewProductAPI(productData, adminToken);

            return data;
        } catch (err: any) {
            return rejectWithValue(err);
        }
    },
);

const initialState: IProductInStock = {
    items: [],
    error: null,
    status: 'idle',
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, { payload }) => {
                state.status = 'succeed';
                state.items = payload;
            })
            .addCase(fetchProducts.rejected, (state, { payload }) => {
                state.status = 'failed';
                state.error = payload ?? null;
            })
            .addCase(updateProductImage.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateProductImage.fulfilled, (state, { payload }) => {
                state.status = 'succeed';
                // const temp = [...state.items];
                // temp.forEach((item) => {
                //     if (item.id === payload.id) item.image_dir = payload.image_dir;
                // });
                // state.items = temp;
            })
            .addCase(updateProductImage.rejected, (state, { payload }) => {
                state.status = 'failed';
                state.error = payload ?? null;
            })
            .addCase(updateProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateProduct.fulfilled, (state, { payload }) => {
                state.status = 'succeed';

                // -- first way --
                const index = state.items.findIndex((item) => item.id === payload.id);
                if (index !== -1) {
                    state.items[index] = {
                        ...state.items[index],
                        ...payload,
                    };
                }

                // -- Second way --
                // const temp = [...state.items];
                // temp.forEach((item) => {
                //     if (item.id === payload.id) {
                //         item = {
                //             ...item,
                //             name: payload.name,
                //             price: payload.price,
                //             description: payload.description,
                //             status: payload.status,
                //             quantity: payload.quantity,
                //             category: payload.category,
                //         };
                //     }
                // });
                // state.items = temp;
            })
            .addCase(updateProduct.rejected, (state, { payload }) => {
                state.status = 'failed';
                state.error = payload ?? null;
            });
    },
});
