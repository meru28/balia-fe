import { useMutation } from '@tanstack/react-query';
import { apiService} from "@/services/api.service";

export function useResendEmailMutation() {
  return useMutation({
    mutationFn: (email) => apiService.resendEmail(email)
  })
}