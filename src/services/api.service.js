// services/api.service.js
import apiClient from '@/utils/axiosInstance';
import { API_ROUTES } from '@/constants/api-routes';

export const apiService = {
  resendEmail: async (email) => {
    try {
      const response = await apiClient.post(
        API_ROUTES.AUTH.RESEND_EMAIL,
        null,
        {
          params: { email }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Resend email error:', error);
      throw error;
    }
  },

  verifyUser: async ({code, password}) => {
    try {
      const response = await apiClient.get(
        API_ROUTES.AUTH.VERIFY_USER,
        null,
        {
          params: { code, password}
        });
      return response.data;
    } catch (error) {
      console.error('Verify email error:', error);
      throw error;
    }
  },

  registerUser: async ({ username, email, firstName, roles, mobileNumber }) => {
    try {
      const response = await apiClient.post(API_ROUTES.AUTH.REGISTER, {
        username,
        email,
        firstName,
        roles,
        mobileNumber
      });
      return response.data;
    } catch (error) {
      console.error('Register error:', error);
      throw {
        message: error.response?.data?.message || "Registration Failed",
        status: error.response?.status || 500
      };
    }
  },
  
  addProduct: async (metadata, files) => {
    const formData = new FormData();
    const requiredMetadata = {
      name: metadata.name || '',
      sku: metadata.sku || '',
      price: metadata.price || 0,
      currency: metadata.currency || 'AED',
      stock: metadata.stock || 0,
      status: 1,
      color: metadata.color || '',
      size: metadata.size || '',
      shortDescription: metadata.shortDescription || '',
      mCategories: metadata.mCategories || { id: 1 },
      sustainabilityFeature: metadata.sustainabilityFeature || '',
      material: metadata.material || '',
      preOrder: 1
    };
    formData.append('metadata', JSON.stringify(requiredMetadata))

    if (files && Array.isArray(files)) {
      files.forEach((file, index) => {
        formData.append(`files`, file);
      });
    }

    console.log('FormData:', Array.from(formData.entries()));
    try {
      const response = await apiClient.post(API_ROUTES.PRODUCT.ADD_PRODUCT, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "Accept": "application/json, text/plain, */*"
        }
      });
      return response.data;
    } catch (error) {
      throw {
        message: error.response?.data?.message || "Failed to add product",
        status: error.response?.status || 500
      }
    }
  },


  getCategory: async ({size, sort, id}) => {
    try {
      const response = await apiClient.get(`${API_ROUTES.PRODUCT.GET_CATEGORY}`, null, {
        params: { size, sort, id }
      });
      return response.data;
    } catch (error) {
      console.error('Get category error:', error);
      throw {
        message: error.response?.data?.message || "Failed to fetch category",
        status: error.response?.status || 500
      };
    }
  },
};