import axiosInstance from '../../utils/axiosInstance';
import Cookies from 'js-cookie';

export const getUser = async () => {
    try {
        const response = await axiosInstance.get('/seller/profile');
        return response.data;
    } catch (error) {
        throw error;
    }
    };