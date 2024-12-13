import React, { useEffect, useRef, useState } from 'react';
import {
    Button,
    Form,
    Input,
    InputNumber,
    InputRef,
    Modal,
    Select,
    Space,
    Spin,
    Table,
    TableColumnsType,
    Typography,
    Upload,
    message,
    type GetProp,
    type TableProps,
} from 'antd';
import { IAppDispatch, IRootState } from 'src/redux/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
    IAddNewProduct,
    IProduct,
    IUpdateProduct,
    addNewProduct,
    fetchProducts,
    updateProduct,
    updateProductImage,
} from 'src/redux/products/productsSlice';
import { sortedDate } from 'src/components/sortDate/sortDate';
import { UploadOutlined, EditOutlined } from '@ant-design/icons';
import { ProductsTable } from 'src/components/adminComponents/dataTable/productsTable/ProductsTable';

interface IProductsTableType extends IProduct {
    key: number;
}

export const ProductPageAdmin = () => {
    const dispatch = useDispatch<IAppDispatch>();
    const productsList = useSelector((state: IRootState) => state.products.items) || [];
    const [isOpen, setIsOpen] = useState(false);
    const [form] = Form.useForm();

    const handleOpenAddProduct = () => {
        setIsOpen(true);
    };

    const handleCloseAddProduct = () => {
        form.resetFields();
        setIsOpen(false);
    };

    const handleAddProduct = async () => {
        try {
            // Logic to update product information (replace with actual implementation)
            const values: any = await form.validateFields(); // Validate and get form values
            const data: IAddNewProduct = {
                name: values.name,
                category: values.category,
                price: values.price,
                quantity: values.quantity,
                description: values.description,
            };
            dispatch(addNewProduct(data));
            message.success('Add product successfully');
            setIsOpen(false);
        } catch (error) {
            console.error('Validation error:', error);
        }
    };

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);
    return (
        <div>
            <Button style={{ marginBottom: '20px', float: 'right' }} onClick={handleOpenAddProduct}>
                Add New Product
            </Button>
            <Modal
                title={
                    <Typography.Title level={4} style={{ display: 'flex', justifyContent: 'center' }}>
                        Add New Product
                    </Typography.Title>
                }
                open={isOpen}
                onCancel={handleCloseAddProduct}
                footer={[
                    <Button key="back" onClick={handleCloseAddProduct}>
                        Cancel
                    </Button>,
                    <Button key="save" type="primary" onClick={handleAddProduct}>
                        Add Product
                    </Button>,
                ]}
            >
                <Form form={form} onFinish={handleAddProduct} layout="vertical">
                    <Form.Item label="Product name" rules={[{ required: true }]} name="name">
                        <Input size="large" />
                    </Form.Item>

                    <Form.Item label="Category" rules={[{ required: true }]} name="category">
                        <Select size="large">
                            <Select.Option value="Dining Room">Dining Room</Select.Option>
                            <Select.Option value="Kitchen">Kitchen</Select.Option>
                            <Select.Option value="Bedroom">Bedroom</Select.Option>
                            <Select.Option value="Office">Office</Select.Option>
                            <Select.Option value="Living Room">Living Room</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Price" rules={[{ required: true }]} name="price">
                        <InputNumber min={1} size="large" type="number" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item label="Quantity" rules={[{ required: true }]} name="quantity">
                        <InputNumber min={1} style={{ width: '100%' }} size="large" type="number" />
                    </Form.Item>

                    <Form.Item label="Description" rules={[{ required: true }]} name="description">
                        <Input size="large" />
                    </Form.Item>
                </Form>
            </Modal>
            <ProductsTable productsList={productsList} />
        </div>
    );
};
