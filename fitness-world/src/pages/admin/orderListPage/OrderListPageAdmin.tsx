import { TableColumnsType, Table, Badge, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { Props } from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { sortedDate } from 'src/components/sortDate/sortDate';
import { IOrder, IProductOrder, getAllOrdersOfAllUsers } from 'src/redux/order/orderSlice';
import { IAppDispatch, IRootState } from 'src/redux/store';

interface IOrdersDataAttributesAdmin extends Omit<IOrder, 'products'> {
    key: number;
}

export const OrderListPageAdmin = () => {
    const [loading, setLoading] = useState(false);
    const orderList = useSelector((state: IRootState) => state.order.orderList) || [];
    const dispatch = useDispatch<IAppDispatch>();

    useEffect(() => {
        dispatch(getAllOrdersOfAllUsers());
    }, []);
    const expandedRowRender = (row: IOrdersDataAttributesAdmin) => {
        const columns: TableColumnsType<IProductOrder> = [
            {
                title: 'Image',
                dataIndex: 'img',
                key: 'image',
                width: '30%',
                render: (text, record) =>
                    record.image_dir ? (
                        <img src={record.image_dir} alt={record.product} style={{ width: '50px', height: '50px' }} />
                    ) : (
                        <Spin />
                    ),
            },
            { title: 'Product', dataIndex: 'product', key: 'product', width: '25%' },
            {
                title: 'Category',
                dataIndex: 'category',
                key: 'category',
                width: '20%',
                filters: [
                    {
                        text: 'Dining Room',
                        value: 'Dining Room',
                    },
                    {
                        text: 'Kitchen',
                        value: 'Kitchen',
                    },
                    {
                        text: 'Bedroom',
                        value: 'Bedroom',
                    },
                    {
                        text: 'Office',
                        value: 'Office',
                    },
                    {
                        text: 'Living Room',
                        value: 'Living Room',
                    },
                ],
                onFilter: (value, record) => record.category.indexOf(value as string) === 0,
            },
            {
                title: 'Quantity',
                dataIndex: 'quantity',
                key: 'quantity',
                width: '10%',
                sorter: (a, b) => a.quantity - b.quantity,
            },
            {
                title: 'Unit Price',
                dataIndex: 'unitPrice',
                key: 'unitPrice',
                render: (text) => `$${text}`,
                width: '15%',
                sorter: (a, b) => a.unitPrice - b.unitPrice,
            },
        ];

        const data: IProductOrder[] = orderList[row.key].products;

        return <Table bordered columns={columns} dataSource={data} pagination={false} />;
    };

    const columns: TableColumnsType<IOrdersDataAttributesAdmin> = [
        {
            title: 'Order Id',
            dataIndex: 'id',
            key: 'id',
            width: '20%',
        },
        {
            title: 'User Id',
            dataIndex: 'userId',
            key: 'userId',
            width: '20%',
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'date',
            width: '20%',
            sorter: (a, b) => sortedDate(a.createdAt, b.createdAt),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: '15%',
            render: (record) => {
                let statusText = '';
                let statusColor: 'success' | 'warning' | 'default' | 'processing' | 'error' | undefined = undefined;

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
                return <Badge status={statusColor} text={statusText} />;
            },
            filters: [
                { text: 'Pending', value: 'pending' },
                { text: 'Success', value: 'success' },
            ],
            onFilter: (value, record) => record.status.indexOf(value as string) === 0,
        },
        {
            title: 'Total price',
            dataIndex: 'total',
            key: 'total',
            width: '15%',
            render: (text) => `$${text}`,
            sorter: (a, b) => a.total - b.total,
        },
        {
            title: 'Payment',
            dataIndex: 'payment',
            key: 'payment',
            width: '10%',
            filters: [
                { text: 'cash', value: 'cash' },
                { text: 'banking', value: 'banking' },
            ],
            onFilter: (value, record) => record.payment.indexOf(value as string) === 0,
        },
    ];

    const data: IOrdersDataAttributesAdmin[] = [];

    orderList.map((order, index) => {
        data.push({
            key: index,
            id: order.id,
            userId: order.userId,
            status: order.status,
            total: order.total,
            payment: order.payment,
            createdAt: order.createdAt,
        });
    });

    return <Table bordered columns={columns} loading={loading} expandable={{ expandedRowRender }} dataSource={data} />;
};
