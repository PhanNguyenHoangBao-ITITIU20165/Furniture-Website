import { Badge, Spin, Table, TableColumnsType } from 'antd';
import React from 'react';
import { IOrder, IProductOrder } from 'src/redux/order/orderSlice';

type Props = {};

// Define the interface for the attributes used in the order table
interface IOrderTableAttribute {
    key: number; // Unique key for the table row
    id: string; // Order ID
    status: string; // Order status (e.g., Success, Pending)
    totalPrice: string; // Total price as a string
    payment: string; // Payment method (e.g., cash, banking)
    createdAt: string; // Creation date
}

// Component to display a table of order data
export const OrderDataTable = ({ orderData }: { orderData: IOrder[] }) => {
    // Define the structure and behavior of the expanded row, which displays product details for an order
    const expandedRowRender = (row: IOrderTableAttribute) => {
        // Columns for the expanded row (product details)
        const columns: TableColumnsType<IProductOrder> = [
            {
                title: 'Image', // Column header for product image
                dataIndex: 'img', // Data key for product image
                key: 'image',
                render: (text, record) =>
                    record.image_dir ? (
                        <img src={record.image_dir} alt={record.product} style={{ width: '50px', height: '50px' }} />
                    ) : (
                        <Spin /> // Display a spinner if no image is available
                    ),
                width: 200,
            },
            { title: 'Product', dataIndex: 'product', key: 'product', width: 200 },
            {
                title: 'Category', // Column header for product category
                dataIndex: 'category',
                key: 'category',
                width: 150,
                filters: [ // Filters for category
                    { text: 'Strength Training Equipment', value: 'Strength Training Equipment' },
                    { text: 'Treadmills', value: 'Treadmills' },
                    { text: 'Weights', value: 'Weights' },
                    { text: 'Accessories', value: 'Accessories' },
                    { text: 'Rowing Machine', value: 'Rowing Machine' },
                ],
                onFilter: (value, record) => record.category.indexOf(value as string) === 0, // Filter logic
            },
            {
                title: 'Quantity',
                width: 150,
                dataIndex: 'quantity',
                key: 'quantity',
                sorter: (a, b) => a.quantity - b.quantity, // Enable sorting by quantity
            },
            {
                title: 'Unit Price', // Column header for unit price
                dataIndex: 'unitPrice',
                key: 'unitPrice',
                width: 150,
                render: (text) => `$${text}`, // Format price as currency
                sorter: (a, b) => a.unitPrice - b.unitPrice, // Enable sorting by unit price
            },
        ];

        // Get the product data for the expanded row
        const data: IProductOrder[] = orderData[row.key].products;

        // Render the expanded table with product details
        return <Table columns={columns} dataSource={data} pagination={false} />;
    };

    // Define the columns for the main order table
    const columns: TableColumnsType<IOrderTableAttribute> = [
        { title: 'Id', dataIndex: 'id', key: 'id', width: 200 }, // Order ID column

        {
            title: 'Status', // Order status column
            dataIndex: 'status',
            width: 100,
            key: 'status',
            render: (record) => {
                let statusText = ''; // Display text for status
                let statusColor: 'success' | 'warning' | 'default' | 'processing' | 'error' | undefined = undefined;

                // Map order status to corresponding text and badge color
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
                return <Badge status={statusColor} text={statusText} />; // Render status with a badge
            },
            filters: [
                { text: 'Pending', value: 'pending' }, // Filter for pending orders
                { text: 'Success', value: 'success' }, // Filter for successful orders
            ],
            onFilter: (value, record) => record.status.indexOf(value as string) === 0, // Filtering logic for status
        },
        {
            title: 'Total price', // Column header for total price
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            width: 150,
            render: (text) => `$${text}`, // Format price as currency
            sorter: (a, b) => Number(a.totalPrice.replace('$', '')) - Number(b.totalPrice.replace('$', '')), // Enable sorting by price
        },
        {
            title: 'Payment', // Payment method column
            dataIndex: 'payment',
            key: 'payment',
            width: 150,
            filters: [
                { text: 'cash', value: 'cash' }, // Filter for cash payment
                { text: 'banking', value: 'banking' }, // Filter for banking payment
            ],
            onFilter: (value, record) => record.payment.indexOf(value as string) === 0, // Filtering logic for payment
        },
        {
            title: 'Date', // Order date column
            dataIndex: 'createdAt',
            width: 200,
            key: 'date',
            sorter: (a, b) => {
                // Helper function to convert string date to a timestamp
                const convertToDate = (y: string) => {
                    const [time, date] = y.split(' - '); // Split date and time
                    const [hour, minute] = time.split(':').map(Number); // Parse time
                    const [day, month, year] = date.split('/').map(Number); // Parse date
                    return new Date(year, month - 1, day, hour, minute).getTime();
                };

                return convertToDate(a.createdAt) - convertToDate(b.createdAt); // Sort by timestamp
            },
        },
    ];

    // Transform the order data into the format expected by the table
    const data: IOrderTableAttribute[] = [];
    orderData.map((order, index) => {
        data.push({
            key: index, // Unique key for each row
            id: order.id, // Order ID
            status: order.status, // Order status
            totalPrice: String(order.total), // Total price as a string
            payment: order.payment, // Payment method
            createdAt: order.createdAt, // Creation date
        });
    });

    // Render the main table with expandable rows for product details
    return <Table bordered columns={columns} expandable={{ expandedRowRender }} dataSource={data} />;
};

