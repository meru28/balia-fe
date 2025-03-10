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
    // console.log('Files untuk upload:', files ? files.map(f => ({
    //   name: f.name,
    //   type: f.type,
    //   size: `${Math.round(f.size / 1024)} KB`
    // })) : 'Tidak ada file');

    const formData = new FormData();
    const requiredMetadata = {
      name: metadata.name || '',
      sku: metadata.sku || '',
      price: metadata.price || 0,
      currency: metadata.currency || 'AED',
      stock: metadata.stock || 0,
      status: metadata.status || 1,
      color: metadata.color || '',
      size: metadata.size || '',
      shortDescription: metadata.shortDescription || '',
      mCategories: metadata.mCategories || { id: 1 },
      sustainabilityFeature: metadata.sustainabilityFeature || '',
      material: metadata.material || ''
    };
    formData.append('metadata', JSON.stringify(requiredMetadata))

    const fileArray = [];

    if (files && files.length > 0) {
      files.forEach(file => {
        fileArray.push(file);
      });
    }

    // Append semua file ke formData sekaligus
    fileArray.forEach(file => {
      formData.append('files', file);
    });


    // Debugging function to check the contents of formData
    const checkFormDataContents = (formData) => {
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }
    };

    // Call the function to log formData contents
    checkFormDataContents(formData);

    try {
      const response = await apiClient.post(API_ROUTES.PRODUCT.ADD_PRODUCT, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      return response.data;
    } catch (error) {
      // console.log('Add Product Error', error);
      throw {
        message: error.response?.data?.message || "Failed to add product",
        status: error.response?.status || 500
      }
    }
  }
};