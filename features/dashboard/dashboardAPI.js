import axiosInstance from '../../utils/axiosInstance';

export const getDashboard = async () => {
    try {
        const response = await axiosInstance.get('/seller/dashboard');
        return response.data;
    } catch (error) {
        throw error;
    }
    }

