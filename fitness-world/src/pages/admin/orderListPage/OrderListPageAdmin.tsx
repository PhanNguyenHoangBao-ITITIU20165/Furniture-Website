import { TableColumnsType, Table, Badge, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { Props } from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { sortedDate } from 'src/components/sortDate/sortDate';
import { IOrder, IProductOrder, getAllOrdersOfAllUsers } from 'src/redux/order/orderSlice';
import { IAppDispatch, IRootState } from 'src/redux/store';

// Define the interface for admin order data, excluding the "products" property from IOrder.
interface IOrdersDataAttributesAdmin extends Omit<IOrder, 'products'> {
    key: number; // Add a key property for table indexing.
}

// Component to display the admin order list page.
export const OrderListPageAdmin = () => {
    const [loading, setLoading] = useState(false); // State for managing loading status.
    const orderList = useSelector((state: IRootState) => state.order.orderList) || []; // Fetch the list of orders from Redux state.
    const dispatch = useDispatch<IAppDispatch>(); // Initialize Redux dispatch for triggering actions.

    // Fetch all orders when the component mounts.
    useEffect(() => {
        dispatch(getAllOrdersOfAllUsers()); // Dispatch action to fetch all orders.
    }, []);

    // Expanded row rendering function for displaying product details in each order.
    const expandedRowRender = (row: IOrdersDataAttributesAdmin) => {
        // Define columns for the expanded table displaying product details.
        const columns: TableColumnsType<IProductOrder> = [
            {
                title: 'Image', // Column header for product images.
                dataIndex: 'img', // Key for product image data.
                key: 'image',
                width: '30%',
                render: (text, record) =>
                    record.image_dir ? (
                        <img src={record.image_dir} alt={record.product} style={{ width: '50px', height: '50px' }} />
                    ) : (
                        <Spin /> // Show spinner if no image is available.
                    ),
            },
            { title: 'Product', dataIndex: 'product', key: 'product', width: '25%' },
            {
                title: 'Category', // Column header for product category.
                dataIndex: 'category',
                key: 'category',
                width: '20%',
                filters: [ // Predefined filters for categories.
                    { text: 'Strength Training Equipment', value: 'Strength Training Equipment' },
                    { text: 'Treadmills', value: 'Treadmills' },
                    { text: 'Weights', value: 'Weights' },
                    { text: 'Accessories', value: 'Accessories' },
                    { text: 'Rowing Machine', value: 'Rowing Machine' },
                ],
                onFilter: (value, record) => record.category.indexOf(value as string) === 0, // Filtering logic.
            },
            {
                title: 'Quantity',
                dataIndex: 'quantity',
                key: 'quantity',
                width: '10%',
                sorter: (a, b) => a.quantity - b.quantity, // Enable sorting by quantity.
            },
            {
                title: 'Unit Price',
                dataIndex: 'unitPrice',
                key: 'unitPrice',
                render: (text) => `$${text}`, // Format price as currency.
                width: '15%',
                sorter: (a, b) => a.unitPrice - b.unitPrice, // Enable sorting by price.
            },
        ];

        // Get the product list for the expanded row.
        const data: IProductOrder[] = orderList[row.key].products;

        // Render the expanded table with product details.
        return <Table bordered columns={columns} dataSource={data} pagination={false} />;
    };

    // Define columns for the main order table.
    const columns: TableColumnsType<IOrdersDataAttributesAdmin> = [
        {
            title: 'Order Id', // Column header for order ID.
            dataIndex: 'id',
            key: 'id',
            width: '20%',
        },
        {
            title: 'User Id', // Column header for user ID.
            dataIndex: 'userId',
            key: 'userId',
            width: '20%',
        },
        {
            title: 'Date', // Column header for order creation date.
            dataIndex: 'createdAt',
            key: 'date',
            width: '20%',
            sorter: (a, b) => sortedDate(a.createdAt, b.createdAt), // Enable sorting by date.
        },
        {
            title: 'Status', // Column header for order status.
            dataIndex: 'status',
            key: 'status',
            width: '15%',
            render: (record) => {
                let statusText = ''; // Default status text.
                let statusColor: 'success' | 'warning' | 'default' | 'processing' | 'error' | undefined = undefined;

                // Determine status text and color based on the order status.
                switch (record) {
                    case 'Success':
                        statusText = 'Success';
                        statusColor = 'success';
                        break;
                    case 'pending':
                        statusText = 'Pending';
                        statusColor = 'warning';
                        break;
                }
                return <Badge status={statusColor} text={statusText} />; // Display status with a badge.
            },
            filters: [
                { text: 'Pending', value: 'pending' }, // Filter for pending orders.
                { text: 'Success', value: 'success' }, // Filter for successful orders.
            ],
            onFilter: (value, record) => record.status.indexOf(value as string) === 0, // Filtering logic for status.
        },
        {
            title: 'Total price', // Column header for total price.
            dataIndex: 'total',
            key: 'total',
            width: '15%',
            render: (text) => `$${text}`, // Format total as currency.
            sorter: (a, b) => a.total - b.total, // Enable sorting by total price.
        },
        {
            title: 'Payment', // Column header for payment method.
            dataIndex: 'payment',
            key: 'payment',
            width: '10%',
            filters: [
                { text: 'cash', value: 'cash' }, // Filter for cash payment.
                { text: 'banking', value: 'banking' }, // Filter for banking payment.
            ],
            onFilter: (value, record) => record.payment.indexOf(value as string) === 0, // Filtering logic for payment.
        },
    ];

    // Map the order list to table data.
    const data: IOrdersDataAttributesAdmin[] = [];
    orderList.map((order, index) => {
        data.push({
            key: index, // Unique key for each row.
            id: order.id, // Order ID.
            userId: order.userId, // User ID.
            status: order.status, // Order status.
            total: order.total, // Total price.
            payment: order.payment, // Payment method.
            createdAt: order.createdAt, // Creation date.
        });
    });

    // Render the main table with expandable rows for product details.
    return <Table bordered columns={columns} loading={loading} expandable={{ expandedRowRender }} dataSource={data} />;
};

