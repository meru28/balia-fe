// services/api.service.js
import apiClient from '@/utils/axiosInstance';
import {API_ROUTES} from '@/constants/api-routes';

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
    formData.append('metadata', JSON.stringify(metadata))

    if (files && Array.isArray(files)) {
      files.forEach((file) => {
        formData.append(`files`, file);
      });
    }

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

  editProduct: async (metadata, files) => {
    const formData = new FormData();
    formData.append('metadata', JSON.stringify(metadata))

    if (files && Array.isArray(files)) {
      files.forEach((file) => {
        formData.append(`files`, file);
      });
    }

    try {
      const response = await apiClient.put(API_ROUTES.PRODUCT.ADD_PRODUCT, formData, {
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

  getProduct: async (params = {}) => {
    try {
      return await apiClient.get(`${API_ROUTES.PRODUCT.GET_PRODUCT}`, {
        params: params,
      });
    } catch (error) {
      console.error('Get product error:', error);
      throw {
        message: error.response?.data?.message || "Failed to fetch products",
        status: error.response?.status || 500,
      };
    }
  },


  getCategory: async (params = {}) => {
    try {
      return await apiClient.get(`${API_ROUTES.PRODUCT.GET_CATEGORY}`, {
        params: params
      })
    } catch (error) {
      console.error('Get category error:', error);
      throw {
        message: error.response?.data?.message || "Failed to fetch category",
        status: error.response?.status || 500
      };
    }
  },

  createCategory: async ({name, status, parent}) => {
    try {
      const response = await apiClient.post(API_ROUTES.PRODUCT.CREATE_CATEGORY, {
        name,
        status,
        parent
      });
      return response.data;
    } catch (error) {
      console.error('Create category error:', error);
      throw {
        message: error.response?.data?.message || "Failed to create category",
        status: error.response?.status || 500
      };
    }
  },
  
};