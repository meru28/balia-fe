import {apiService} from "@/services/api.service";
import { useMutation } from '@tanstack/react-query';

const useProductAddMutation = () => {
  return useMutation({
    mutationFn: async (data) => apiService.addProduct(data.metadata, data.files)
  });
}

export default useProductAddMutation