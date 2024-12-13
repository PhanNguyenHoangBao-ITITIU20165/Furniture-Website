import { IUserData } from 'src/redux/api/authSlice';
import { apiClient, backendURL } from './backendURL';

export const signInAPI = (userData: IUserData) => apiClient.post('auth/signin', userData);

export const signUpAPI = (userData: IUserData) => apiClient.post('auth/signup', userData);
