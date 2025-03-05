import { useMutation } from '@tanstack/react-query';
import { toast } from "sonner"
import {apiService} from "@/services/api.service";

const useRegisterMutation = () => {
  const mutation = useMutation({
    mutationFn: (data) => apiService.registerUser(data),
    onSuccess: (data) => {
      toast("Registration successful! Please check your email to verify your account.");
    },
    onError: (error) => {
      toast(error?.response?.data?.message || "Registration failed!");
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  }
};

export default useRegisterMutation;