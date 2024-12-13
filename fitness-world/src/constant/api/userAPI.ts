import { IUserUpdateInfo } from 'src/redux/api/authApi';
import { apiClient } from './backendURL';

export const getUserInfoAPI = (token: any) =>
    apiClient.get('user/getuser', {
        headers: {
            authorization: token,
        },
    });

export const updateUserInfoAPI = (token: any, userUpdateInfo: IUserUpdateInfo) =>
    apiClient.patch('user/updateuser', userUpdateInfo, {
        headers: {
            authorization: token,
        },
        params: {
            id: userUpdateInfo.id,
        },
    });

export const getAllUsersAPI = (token: any) =>
    apiClient.get('user/getAllUsers', {
        headers: {
            Authorization: token,
        },
    });
