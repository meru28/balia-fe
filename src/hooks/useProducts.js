import {apiService} from "@/services/api.service";
import {useMutation, useQuery} from '@tanstack/react-query';

export const useProductAddMutation = () => {
  return useMutation({
    mutationFn: async (data) => apiService.addProduct(data.metadata, data.files)
  });
}


export const useProductGetQuery = (queryKey, params = {}) => {
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: async () => {
      try {
        const response = await apiService.getProduct(params);
        return response || {data: []};
      } catch (error) {
        console.error('Error fetching products:', error);
        return { data: [] };
      }
    },
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
}