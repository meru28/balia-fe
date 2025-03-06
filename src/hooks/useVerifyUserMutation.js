import { useMutation } from '@tanstack/react-query';
import apiClient from '@/utils/axiosInstance'
import {API_ROUTES} from "@/constants/api-routes";
import {apiService} from "@/services/api.service";

const useVerifyUserMutation = () => {
  return useMutation(  {
    mutationFn: async (data) => apiClient.get(`/auth/verify?code=${data.code}&password=${data.password}`),
  });
}

export default useVerifyUserMutation
