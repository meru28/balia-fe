import { useMutation } from '@tanstack/react-query';
import api from '@/utils/axiosInstance'; // Axios config Anda
import { useToast } from "@/hooks/use-toast"; // Toast hook

const useRegisterMutation = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data) => api.post('auth/signup', data), // POST request
    onSuccess: (data) => {
      // Handle success, misalnya tampilkan pesan
      toast("Registration successful! Please check your email to verify your account.");
    },
    onError: (error) => {
      // Handle error, misalnya tampilkan error
      toast(error?.response?.data?.message || "Registration failed!");
    },
  });
};

export default useRegisterMutation;