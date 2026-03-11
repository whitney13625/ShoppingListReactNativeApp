
import { apiClient } from './client';
import { Category, CategoriesResponse,  } from '../types/Category';

export const categoriesApi = {
    getAll: async (): Promise<CategoriesResponse> => {
        const response = await apiClient.get<CategoriesResponse>('/categories');
        return response.data;
    },
    get: async (id: string): Promise<Category> => {
        const response = await apiClient.get<Category>(`/categories/${id}`);
        return response.data;
    },
    add: async (category: Omit<Category, 'id'>): Promise<Category> => {
        const response = await apiClient.post<Category>('/categories', category);
        return response.data;
    },
    update: async (id: string, category: Partial<Omit<Category, 'id'>>): Promise<Category> => {
        const response = await apiClient.put<Category>(`/categories/${id}`, category);
        return response.data;
    },
    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/categories/${id}`);
    },
}