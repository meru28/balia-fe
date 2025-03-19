import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import axios from 'axios'
import {API_ROUTES} from "@/constants/api-routes";
import {getSession} from "next-auth/react";
import apiClient from '@/utils/axiosInstance'

const fetchCategories = async () => {
  try {
    const response = await apiClient.get(`${API_ROUTES.PRODUCT.GET_CATEGORY}`)
    if (response) {
      return response
    }
    if (!response || !response.ok) {
      throw new Error('Tidak ada data kategori')
    }
  } catch (error) {
    throw new Error('Gagal mengambil kategori')
  }
}

export const useCategories = (key, options = {}) => {
    return useQuery({
      queryKey: [key],
      queryFn: async () => {
        return await fetchCategories()
      },
      ...options,
    });
}

export const useCategoryById = (categoryId) => {
  return useQuery({
    queryKey: ['category', categoryId],
    queryFn: async () => {
      if (!categoryId) throw new Error('ID Kategori dibutuhkan')
      const { data } = await axios.get(`/api/categories/${categoryId}`)
      return data
    },
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  })
}

export const useCategoryBySlug = (slug) => {
  return useQuery({
    queryKey: ['category-slug', slug],
    queryFn: async () => {
      if (!slug) throw new Error('Slug Kategori dibutuhkan')
      const { data } = await axios.get(`/api/categories/slug/${slug}`)
      return data
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  })
}

export const useCategoryMutations = () => {
  const queryClient = useQueryClient()

  const createCategory = useMutation({
    mutationFn: async (newCategory) => {
      const { data } = await axios.post('/api/categories', newCategory)
      return data
    },
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
