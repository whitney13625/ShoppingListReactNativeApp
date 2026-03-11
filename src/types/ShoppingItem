import { Category } from './Category';

export type ShoppingItem = {
  id: string;
  name: string;
  quantity: number;
  categoryId?: string;
  categoryName?: string; 
  category: Category;
  purchased: boolean;
};

// API response wrappers
export type ShoppingItemsResponse = {
  count: number;
  total: number;
  page: number;
  totalPages: number;
  data: ShoppingItem[];
};