import axiosInstance from '../../utils/axiosInstance';

export const getOrders = async () => {
    try {
        const response = await axiosInstance.get('/seller/orders');
        return response.data;
    } catch (error) {
        throw error;
    }
    }
    