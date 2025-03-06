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
        message: error.response?.data?.message || "Registrasi gagal",
        status: error.response?.status || 500
      };
    }
  },
};