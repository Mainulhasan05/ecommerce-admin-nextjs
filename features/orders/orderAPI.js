import axiosInstance from '../../utils/axiosInstance';

export const getOrders = async () => {
    try {
        const response = await axiosInstance.get('/seller/orders');
        return response.data;
    } catch (error) {
        throw error;
    }
    }

export const getOrder = async (id) => {
    try {
        const response = await axiosInstance.get(`/seller/order/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
    }
    