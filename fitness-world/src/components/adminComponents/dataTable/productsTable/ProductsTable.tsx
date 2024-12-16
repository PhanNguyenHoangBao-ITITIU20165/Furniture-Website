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
    // Opens the modal for updating a product's image.
    const handleOpenUpdateImageModal = (key: React.Key, id: string) => {
        setCurrentId(id); // Set the current product ID to be updated.
        setIsModalUpdateImageVisible(true); // Make the "Update Image" modal visible.
    };

    // Closes the modal for updating a product's image and resets related state variables.
    const handleCloseUpdateImageModal = () => {
        setIsModalUpdateImageVisible(false); // Hide the modal.
        setCurrentId(null); // Clear the current product ID.
        setUpLoadImage(null); // Reset the uploaded image state.
        setImageUrl(undefined); // Clear the image preview URL.
    };

    // Validates the uploaded image file and sets it for further processing.
    const handleUpload = (image: File) => {
        const isJpgOrPng = image.type === 'image/jpeg' || image.type === 'image/png'; // Check if the file type is JPG or PNG.
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!'); // Show an error message for invalid file types.
            return false;
        }
        setUpLoadImage(image); // Set the uploaded image for processing.
        return true; // Indicate successful validation.
    };

    // Handles custom upload logic and generates a preview URL for the uploaded image.
    const handleCustomUpload = (file: File | Blob | string) => {
        if (file instanceof File) { // Ensure the input is a file.
            const reader = new FileReader(); // Create a FileReader for reading the file.
            reader.onload = () => {
                setImageUrl(reader.result as string); // Set the preview URL for the uploaded image.
            };
            reader.readAsDataURL(file); // Read the file as a data URL.
        }
    };

    // Saves the updated product image by dispatching a Redux action and closes the modal.
    const handleSaveButtonClick = () => {
        if (uploadImage !== undefined && currentId !== null) {
            dispatch(updateProductImage({ image_dir: uploadImage, id: currentId })); // Dispatch the image update action.
        }
        message.success('Product Image updated successfully'); // Show a success message.
        setImageUrl(undefined); // Clear the image preview URL.
        handleCloseUpdateImageModal(); // Close the modal and reset states.
    };

    // Opens the modal for updating a product's information and pre-fills the form with current data.
    const handleOpenUpdateInfoModal = (data: IProductsTableType) => {
        setCurrentId(data.id); // Set the current product ID to be updated.
        form.setFieldsValue(data); // Populate the form with the selected product's data.
        setCurrentProductData(data); // Set the current product data.
        setIsModalUpdateInfoVisible(true); // Show the "Update Information" modal.
    };

    // Closes the modal for updating product information and resets related state variables.
    const handleCloseUpdateInfoModal = () => {
        form.resetFields(); // Reset the form fields to default values.
        setCurrentProductData(null); // Clear the current product data.
        setIsModalUpdateInfoVisible(false); // Hide the modal.
    };

    // Saves the updated product information by dispatching a Redux action after form validation.
    const handleSave = async () => {
        try {
            if (currentId !== null) {
                const values: any = await form.validateFields(); // Validate form fields and retrieve values.
                const data: IUpdateProduct = {
                    id: currentId,
                    name: values.name,
                    price: values.price,
                    category: values.category,
                    description: values.description,
                    discount: undefined, // Discount is left undefined (optional).
                    status: values.status,
                    quantity: Number(values.quantity), // Convert quantity to a number.
                    updatedAt: undefined, // UpdatedAt is left undefined (optional).
                };
                dispatch(updateProduct(data)); // Dispatch the product update action.
            }
            message.success('Product information updated successfully'); // Show a success message.
            setIsModalUpdateInfoVisible(false); // Close the modal.
            setCurrentProductData(null); // Clear the current product data.
        } catch (error) {
            console.error('Validation error:', error); // Log validation errors, if any.
        }
    };

    // Handles search within a specific column of the table.
    const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps['confirm'], dataIndex: DataIndex) => {
        confirm(); // Confirm the search action.
        setSearchText(selectedKeys[0]); // Set the search text to the first selected key.
        setSearchedColumn(dataIndex); // Set the column being searched.
    };

    // Resets the search filter for the table and clears the search state.
    const handleReset = (clearFilters: () => void, confirm: FilterDropdownProps['confirm']) => {
        clearFilters(); // Clear the applied filters.
        setSearchText(''); // Reset the search text.
        setSearchedColumn(''); // Reset the searched column.
        confirm(); // Confirm the reset action.
    };


    // Function to define column properties for searchable columns
    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<IProductsTableType> => ({
        // Define the filter dropdown for searching
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput} // Reference for auto-selecting the input field
                    placeholder={`Search ${dataIndex}`} // Placeholder for search input
                    value={selectedKeys[0]} // Current search value
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])} // Update search value
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)} // Trigger search on pressing Enter
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)} // Trigger search on button click
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => {
                            clearFilters && handleReset(clearFilters, confirm); // Reset filters
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
                            confirm({ closeDropdown: false }); // Apply filter but keep dropdown open
                            setSearchText((selectedKeys as string[])[0]); // Set search text
                            setSearchedColumn(dataIndex); // Set the searched column
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close(); // Close the dropdown
                        }}
                    >
                        Close
                    </Button>
                </Space>
            </div>
        ),
        // Icon to indicate filtered state
        filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        // Filtering logic for the column
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        // Focus the input when dropdown is opened
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        // Highlight the searched text in the column
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]} // Words to highlight
                    autoEscape
                    textToHighlight={text ? text.toString() : ''} // Text to render
                />
            ) : (
                text
            ),
    });

    // Column definitions for the table
    const columns: TableColumnsType<IProductsTableType> = [
        {
            title: 'Product Image', // Column header
            dataIndex: 'image_dir', // Data key
            key: 'image_dir',
            render: (text, record) =>
                record.image_dir ? (
                    <img
                        src={record.image_dir} // Display product image
                        key={record.image_dir}
                        alt={record.name}
                        style={{ width: '50px', height: '50px' }} // Image styling
                    />
                ) : (
                    <Spin /> // Show spinner if no image is available
                ),
            fixed: 'left', // Fix the column to the left
            width: 150,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            width: 150,
            ...getColumnSearchProps('name'), // Enable search functionality for this column
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
            filters: [ // Dropdown filters for categories
                { text: 'Strength Training Equipment', value: 'Strength Training Equipment' },
                { text: 'Treadmills', value: 'Treadmills' },
                { text: 'Weights', value: 'Weights' },
                { text: 'Accessories', value: 'Accessories' },
                { text: 'Rowing Machine', value: 'Rowing Machine' },
            ],
            // Filter logic for categories
            onFilter: (value, record) => record.category.indexOf(value as string) === 0,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: 150,
            render: (text) => `$${text}`, // Format the price with a dollar sign
            sorter: (a, b) => Number(a.price) - Number(b.price), // Enable sorting by price
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 100,
            sorter: (a, b) => a.quantity - b.quantity, // Enable sorting by quantity
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            filters: [ // Dropdown filters for status
                { text: 'New', value: 'New' },
                { text: 'Discount', value: 'Discount' },
            ],
            // Filter logic for status
            onFilter: (value, record) => record.category.indexOf(value as string) === 0,
        },
        {
            title: 'Create At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: (a, b) => sortedDate(a.createdAt, b.createdAt), // Sorting by creation date
            width: 150,
        },
        {
            title: 'Update At',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            sorter: (a, b) => sortedDate(a.updatedAt, b.updatedAt), // Sorting by update date
            width: 150,
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 150,
            // Render action buttons for each row
            render: (_, record) => (
                <Space>
                    <a onClick={() => handleOpenUpdateImageModal(record.key, record.id)}>Update Image</a>
                    <a onClick={() => handleOpenUpdateInfoModal(record)}>Update Information</a>
                </Space>
            ),
        },
    ];

    // Map product data into table format
    const data: IProductsTableType[] = [];
    productsList.map((product, index) => {
        data.push({
            key: index, // Unique key for each row
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            image_dir: product.image_dir,
            description: product.description,
            discount: undefined, // Placeholder for discount
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
