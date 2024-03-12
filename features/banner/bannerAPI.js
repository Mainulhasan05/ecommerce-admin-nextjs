import axiosInstance from '../../utils/axiosInstance';

export const getBanners = async () => {
    try {
        const response = await axiosInstance.get('/seller/banner');
        return response.data;
    } catch (error) {
        throw error;
    }
    }

export const createBanner = async (data) => {
    try {
        const response = await axiosInstance.post('/seller/banner', data);
        return response.data;
    } catch (error) {
        throw error;
    }
    }

export const updateBanner = async (data) => {
    try {
        
        const response = await axiosInstance.put('/seller/banner/'+data?.get('id'), data);
        return response.data;
    } catch (error) {
        throw error;
    }
    }

export const deleteBanner = async (id) => {
    try {
        const response = await axiosInstance.delete('/seller/banner/'+id);
        return response.data;
    } catch (error) {
        throw error;
    }
    }
    