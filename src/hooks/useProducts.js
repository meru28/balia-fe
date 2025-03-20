import {apiService} from "@/services/api.service";
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

export const useProductAddMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => apiService.addProduct(data.metadata, data.files),
    onSuccess: () => {
      // Invalidate dan refetch query products ketika penambahan berhasil
      queryClient.invalidateQueries({ queryKey: ['products'] });

      // Jika Anda memiliki beberapa jenis query produk yang perlu diinvalidasi
      // queryClient.invalidateQueries({ queryKey: ['featuredProducts'] });
      // queryClient.invalidateQueries({ queryKey: ['newArrivals'] });
    }
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