import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import axios from 'axios'
import {apiService} from "@/services/api.service";

export const useCategories = (queryKey, params = {}) => {
    return useQuery({
      queryKey: [queryKey, params],
      queryFn: async () => {
        try {
          const response = await apiService.getCategory(params)
          return response || { data: []}
        } catch (error) {
          console.error("Error fetching categories:", error);
          return { data: [] };
        }
      },
      retry: 1,
      staleTime: 5 * 60 * 1000,
    });
}

export const useCategoryMutations = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newCategory) => apiService.createCategory(newCategory),
    onSuccess: () => {
      // Invalidate dan refetch
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    }
  })

  const updateCategory = useMutation({
    mutationFn: async ({ id, ...updatedCategory }) => {
      const { data } = await axios.put(`/api/categories/${id}`, updatedCategory)
      return data
    },
    onSuccess: (_, variables) => {
      // Invalidate specific queries
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      queryClient.invalidateQueries({ queryKey: ['category', variables.id] })
    }
  })

  const deleteCategory = useMutation({
    mutationFn: async (categoryId) => {
      const { data } = await axios.delete(`/api/categories/${categoryId}`)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    }
  })

  return {
    createCategory,
    updateCategory,
    deleteCategory
  }
}
