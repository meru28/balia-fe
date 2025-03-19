import { useMutation } from '@tanstack/react-query';
import apiClient from '@/utils/axiosInstance'

const useVerifyUserMutation = () => {
  return useMutation(  {
    mutationFn: async (data) => apiClient.get(`/auth/verify?code=${data.code}&password=${data.password}`),
  });
}

export default useVerifyUserMutation
