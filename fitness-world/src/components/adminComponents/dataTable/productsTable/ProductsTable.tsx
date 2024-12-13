import React, { useEffect, useRef, useState } from 'react';
import {
    Button,
    Form,
    Input,
    InputRef,
    Modal,
    Select,
    Space,
    Spin,
    Table,
    TableColumnType,
    TableColumnsType,
    Upload,
    message,
    type GetProp,
    type TableProps,
} from 'antd';
import { IAppDispatch, IRootState } from 'src/redux/store';
import { useDispatch } from 'react-redux';
import {
    IProduct,
    IUpdateProduct,
    fetchProducts,
    updateProduct,
    updateProductImage,
} from 'src/redux/products/productsSlice';
import { sortedDate } from 'src/components/sortDate/sortDate';
import { UploadOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';

interface IProductsTableType extends IProduct {
    key: number;
}

interface IProductsTablePropsType {
    productsList: IProduct[];
}

type DataIndex = keyof IProductsTableType;

export const ProductsTable = ({ productsList }: IProductsTablePropsType) => {
    const dispatch = useDispatch<IAppDispatch>();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [isModalUpdateImageVisible, setIsModalUpdateImageVisible] = useState(false);
    const [isModalUpdateInfoVisible, setIsModalUpdateInfoVisible] = useState(false);
    const [currentId, setCurrentId] = useState<string | null>('');
    const [currentProductData, setCurrentProductData] = useState<IProductsTableType | null>();
    const [uploadImage, setUpLoadImage] = useState<any>();
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

    // search
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    // Update Product Image
    const handleOpenUpdateImageModal = (key: React.Key, id: string) => {
        setCurrentId(id);
        setIsModalUpdateImageVisible(true);
    };

    const handleCloseUpdateImageModal = () => {
        setIsModalUpdateImageVisible(false);
        setCurrentId(null);
        setUpLoadImage(null);
        setImageUrl(undefined);
    };

    const handleUpload = (image: File) => {
        // Perform any necessary validations here
        const isJpgOrPng = image.type === 'image/jpeg' || image.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
            return false;
        }
        // Allow upload
        setUpLoadImage(image);

        return true;
    };

    const handleCustomUpload = (file: File | Blob | string) => {
        // Simulate upload (replace with actual upload logic)
        if (file instanceof File) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // const handleSaveButtonClick = () => {
    //     if (uploadImage !== undefined && currentId !== null) {
    //         dispatch(updateProductImage({ image_dir: uploadImage, id: currentId }));
    //     }
    //     setImageUrl(undefined);
    //     handleCloseUpdateImageModal();
    // };

    const handleSaveButtonClick = () => {
        if (uploadImage !== undefined && currentId !== null) {
            dispatch(updateProductImage({ image_dir: uploadImage, id: currentId }));
        }

        message.success('Product Image updated successfully');
        setImageUrl(undefined);
        handleCloseUpdateImageModal();
    };

    // Update Product Information
    const handleOpenUpdateInfoModal = (data: IProductsTableType) => {
        setCurrentId(data.id);
        form.setFieldsValue(data);
        setCurrentProductData(data);
        setIsModalUpdateInfoVisible(true);
    };

    const handleCloseUpdateInfoModal = () => {
        form.resetFields();
        setCurrentProductData(null);
        setIsModalUpdateInfoVisible(false);
    };

    const handleSave = async () => {
        try {
            if (currentId !== null) {
                // Logic to update product information (replace with actual implementation)
                const values: any = await form.validateFields(); // Validate and get form values
                const data: IUpdateProduct = {
                    id: currentId,
                    name: values.name,
                    price: values.price,
                    category: values.category,
                    description: values.description,
                    discount: undefined,
                    status: values.status,
                    quantity: Number(values.quantity),
                    updatedAt: undefined,
                };
                dispatch(updateProduct(data));
            }
            message.success('Product information updated successfully');
            setIsModalUpdateInfoVisible(false);
            setCurrentProductData(null);
        } catch (error) {
            console.error('Validation error:', error);
        }
    };

    // search Functions
    const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps['confirm'], dataIndex: DataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void, confirm: FilterDropdownProps['confirm']) => {
        clearFilters();
        setSearchText('');
        setSearchedColumn('');
        confirm();
    };

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<IProductsTableType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => {
                            clearFilters && handleReset(clearFilters, confirm);
                        }}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns: TableColumnsType<IProductsTableType> = [
        {
            title: 'Product Image',
            dataIndex: 'image_dir',
            key: 'image_dir',
            render: (text, record) =>
                record.image_dir ? (
                    <img
                        src={record.image_dir}
                        key={record.image_dir}
                        alt={record.name}
                        style={{ width: '50px', height: '50px' }}
                    />
                ) : (
                    // <a>{record.image_dir}</a>
                    <Spin />
                ),
            fixed: 'left',
            width: 150,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            width: 150,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Product Id',
            dataIndex: 'id',
            key: 'id',
            width: 200,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            width: 150,
            filters: [
                {
                    text: 'Strength Training Equipment',
                    value: 'Strength Training Equipment',
                },
                {
                    text: 'Treadmills',
                    value: 'Treadmills',
                },
                {
                    text: 'Weights',
                    value: 'Weights',
                },
                {
                    text: 'Accessories',
                    value: 'Accessories',
                },
                {
                    text: 'Rowing Machine',
                    value: 'Rowing Machine',
                },
            ],
            onFilter: (value, record) => record.category.indexOf(value as string) === 0,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: 150,
            render: (text) => `$${text}`,
            sorter: (a, b) => Number(a.price) - Number(b.price),
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 100,
            sorter: (a, b) => a.quantity - b.quantity,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            filters: [
                {
                    text: 'New',
                    value: 'New',
                },
                {
                    text: 'Discount',
                    value: 'Discount',
                },
            ],
            onFilter: (value, record) => record.category.indexOf(value as string) === 0,
        },
        {
            title: 'Create At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: (a, b) => sortedDate(a.createdAt, b.createdAt),
            width: 150,
        },
        {
            title: 'Update At',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            sorter: (a, b) => sortedDate(a.updatedAt, b.updatedAt),
            width: 150,
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 150,
            render: (_, record) => (
                <Space>
                    <a onClick={() => handleOpenUpdateImageModal(record.key, record.id)}>Update Image</a>
                    <a onClick={() => handleOpenUpdateInfoModal(record)}>Update Information</a>
                </Space>
            ),
        },
    ];

    const data: IProductsTableType[] = [];

    productsList.map((product, index) => {
        data.push({
            key: index,
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            image_dir: product.image_dir,
            description: product.description,
            discount: undefined,
            status: product.status,
            quantity: product.quantity,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        });
    });

    return (
        <>
            {/* <Button onClick={handleOpenAddProduct}>Add Product</Button> */}
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                bordered
                expandable={{
                    expandedRowRender: (record) => <p style={{ margin: '0 0 0 48px' }}>{record.description}</p>,
                }}
                scroll={{ y: 550, x: 1800 }}
            />
            <Modal
                title="Upload Image"
                visible={isModalUpdateImageVisible}
                onCancel={handleCloseUpdateImageModal}
                footer={[
                    <Button key="back" onClick={handleCloseUpdateImageModal}>
                        Cancel
                    </Button>,
                    <Button key="save" type="primary" onClick={handleSaveButtonClick}>
                        Save
                    </Button>,
                ]}
            >
                {imageUrl !== undefined ? (
                    <img alt="Uploaded" style={{ width: '100%' }} src={imageUrl} />
                ) : (
                    <Upload
                        beforeUpload={handleUpload}
                        customRequest={({ file }) => handleCustomUpload(file)}
                        showUploadList={false}
                    >
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                )}
            </Modal>

            <Modal
                title="Update Product Information"
                visible={isModalUpdateInfoVisible}
                onCancel={handleCloseUpdateInfoModal}
                footer={[
                    <Button key="back" onClick={handleCloseUpdateInfoModal}>
                        Cancel
                    </Button>,
                    <Button key="save" type="primary" onClick={handleSave}>
                        Save
                    </Button>,
                ]}
            >
                {currentProductData && (
                    <Form
                        form={form}
                        layout="vertical"
                        // onFinish={(values) => handleSave({ ...currentProductData, ...values })}
                        onFinish={handleSave}
                    >
                        <Form.Item label="Name" name="name">
                            <Input suffix={<EditOutlined />} />
                        </Form.Item>
                        <Form.Item label="Price" name="price">
                            <Input type="number" suffix={<EditOutlined />} />
                        </Form.Item>
                        <Form.Item label="Category" name="category">
                            <Select>
                                <Select.Option value="Strength Training Equipment">Strength Training Equipment</Select.Option>
                                <Select.Option value="Treadmills">Treadmills</Select.Option>
                                <Select.Option value="Weights">Weights</Select.Option>
                                <Select.Option value="Accessories">Accessories</Select.Option>
                                <Select.Option value="Rowing Machine">Rowing Machine</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Quantity" name="quantity">
                            <Input type="number" suffix={<EditOutlined />} />
                        </Form.Item>
                        <Form.Item label="Description" name="description">
                            <Input suffix={<EditOutlined />} />
                        </Form.Item>
                        <Form.Item label="Status" name="status">
                            <Select>
                                <Select.Option value="new">New</Select.Option>
                                <Select.Option value="discount">Discount</Select.Option>
                            </Select>
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </>
    );
};
