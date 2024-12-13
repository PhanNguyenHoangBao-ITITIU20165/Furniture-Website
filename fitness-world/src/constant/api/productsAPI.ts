import { IAddNewProduct, IUpdateProduct } from 'src/redux/products/productsSlice';
import { apiClient } from './backendURL';

export const getAllProductsAPI = () => apiClient.get('product/getProducts');

export const getProductImageAPI = (id: string) =>
    apiClient.get('product/getProductPicture', {
        params: {
            id: id,
        },
        responseType: 'blob',
    });

export const updateProductImageAPI = (token: any, img: File, id: string) => {
    const formData = new FormData();
    formData.append('file', img);

    apiClient.put('product/updateProductImage', formData, {
        headers: {
            authorization: token,
            'Content-Type': 'multipart/form-data',
        },
        params: {
            id: id,
        },
    });
};

export const updateProductAPI = (data: IUpdateProduct, token: any) =>
    apiClient.post('product/updateProduct', data, {
        headers: {
            Authorization: token,
        },
        params: {
            id: data.id,
        },
    });

export const addNewProductAPI = (data: IAddNewProduct, token: any) =>
    apiClient.post('product/addProduct', data, {
        headers: {
            Authorization: token,
        },
    });
