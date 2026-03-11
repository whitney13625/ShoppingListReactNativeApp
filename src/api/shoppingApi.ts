import { apiClient } from './client';
import { ShoppingItem, ShoppingItemsResponse } from '../types/ShoppingItem';

export const shoppingApi = {
    getAll: async (): Promise<ShoppingItemsResponse> => {
        const response = await apiClient.get<ShoppingItemsResponse>('/shopping');
        return response.data;
    },

    get: async (id: string): Promise<ShoppingItem> => {
        const response = await apiClient.get<ShoppingItem>(`/shopping/${id}`);
        return response.data;
    },
    
    add: async (item: Omit<ShoppingItem, 'id'>): Promise<ShoppingItem> => {
        const response = await apiClient.post<ShoppingItem>('/shopping', item);
        return response.data;
    },

    update: async (id: string, item: Partial<Omit<ShoppingItem, 'id'>>): Promise<ShoppingItem> => {
        const response = await apiClient.put<ShoppingItem>(`/shopping/${id}`, item);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/shopping/items/${id}`);
    },
};