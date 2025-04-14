import {apiService} from "@/services/api.service";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

export const useNewsPromo = (queryKey) => {
  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      try {
        const response = await apiService.getNewsPromo()
        return response || { data: []}
      } catch (error) {
        console.error("Error fetching news promo:", error);
        return { data: [] };
      }
    }
  })
}

export const useUpdateNewsPromo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => apiService.putUpdateNewsPromo(data.metadata, data.validImages),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['newsPromo'] });
    }
  })
}