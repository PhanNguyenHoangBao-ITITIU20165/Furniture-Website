import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { GetProp, TableProps } from 'antd';
import qs from 'qs';
import { IUserData } from 'src/redux/api/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IAppDispatch, IRootState } from 'src/redux/store';
import { IUserFullData, getAllUsers } from 'src/redux/user/userSlice';

type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

export const UsersPageAdmin = () => {
    const allUsersData = useSelector((state: IRootState) => state.user.userList) ?? {};
    const dispatch = useDispatch<IAppDispatch>();

    const columns: ColumnsType<IUserFullData> = [
        {
            title: 'User ID',
            dataIndex: 'id',
            key: 'id',
            width: 150,
            fixed: 'left',
        },
        {
            title: 'Avatar',
            dataIndex: 'profileImg_dir',
            key: 'profileImg_dir',
            width: 150,
            fixed: 'left',
        },

        {
            title: 'Name',
            dataIndex: 'fullname',
            key: 'fullname',
            width: 150,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 150,
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone',
            key: 'phone',
            width: 150,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            width: 200,
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
            width: 150,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            width: 100,
        },
        {
            title: 'Created Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 150,
            fixed: 'right',
        },
        {
            title: 'Updated Date',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            width: 150,
            fixed: 'right',
        },
    ];

    const data: IUserFullData[] = allUsersData;

    useEffect(() => {
        dispatch(getAllUsers());
    }, []);

    return (
        <Table
            columns={columns}
            dataSource={data}
            bordered
            // loading={loading}
            scroll={{ x: 2000, y: 600 }}
        />
    );
};

// userId name email phone address country createdAt
