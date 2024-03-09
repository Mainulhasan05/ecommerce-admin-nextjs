import axiosInstance from '../../utils/axiosInstance';

export const getCategories = async () => {
    try {
        const response = await axiosInstance.get('/seller/category');
        return response.data;
    } catch (error) {
        throw error;
    }
    }

export const createCategory = async (data) => {
    try {
        const response = await axiosInstance.post('/seller/category', data);
        return response.data;
    } catch (error) {
        throw error;
    }
    }

export const updateCategory = async (data) => {
    try {
        const response = await axiosInstance.put('/seller/category', data);
        return response.data;
    } catch (error) {
        throw error;
    }
    }

export const deleteCategory = async (id) => {
    try {
        console.log("atodur aslam bal")
        const response = await axiosInstance.delete('/seller/category/'+id);
        return response.data;
    } catch (error) {
        throw error;
    }
    }

export const getCategory = async (id) => {
    try {
        const response = await axiosInstance.get(`/seller/category/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
    }
