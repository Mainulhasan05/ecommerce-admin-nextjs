import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';
import { useRouter } from 'next/router';

export const getProducts = async () => {
    try {
        const response = await axiosInstance.get('/seller/products');
        return response.data;
    } catch (error) {
        throw error;
    }
    }

export const createProduct = async (data) => {
    try {
        const response = await axiosInstance.post('/seller/product', data);
        return response.data;
    } catch (error) {
        // throw error;
        if(error?.response?.status===400){
            toast.error(error?.response?.data?.message)
            useRouter.push('/account-settings')
        }
        
        return error;
    }
    }

export const updateProduct = async (data) => {
    try {
        const response = await axiosInstance.put('/seller/product/'+data?.get('id'), data);
        return response.data;
    } catch (error) {
        throw error;
    }
    }

export const deleteProduct = async (id) => {
    try {
        const response = await axiosInstance.delete('/seller/product/'+id);
        return response.data;
    } catch (error) {
        throw error;
    }
    }


export const getProduct = async (id) => {
    try {
        const response = await axiosInstance.get(`/seller/product/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
    }

export const getProductCategories = async () => {
    try {
        const response = await axiosInstance.get('/seller/product/category');
        return response.data;
    } catch (error) {
        throw error;
    }
    }

    