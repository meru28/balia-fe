import { useMutation } from '@tanstack/react-query';
import { apiService} from "@/services/api.service";
import apiClient from '@/utils/axiosInstance'
import {API_ROUTES} from "@/constants/api-routes";

export function useResendEmailMutation() {
  return useMutation({
    mutationFn: (email) => apiClient.post(API_ROUTES.AUTH.RESEND_EMAIL, { email }),
  })
}