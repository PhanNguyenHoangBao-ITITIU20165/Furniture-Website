import { apiClient } from './backendURL';

export const placeOrderAPI = (items: any, token: any) =>
    apiClient.post('order/placeOrder', items, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
        },
    });

export const getUserOrderDetailsAPI = (id: string, token: any) =>
    apiClient.get('order/getOrderDetails', {
        headers: {
            authorization: token,
        },
        params: {
            id: id,
        },
    });

export const getUserOrdersAPI = (token: any) =>
    apiClient.get('order/getOrderList', {
        headers: {
            authorization: `${token}`,
        },
    });

export const getAllOrdersOfAllUsersAPI = (token: any) =>
    apiClient.get('order/getAllOrders', {
        headers: {
            authorization: `${token}`,
        },
    });
