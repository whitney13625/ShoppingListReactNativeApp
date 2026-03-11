export type Category = {
  id: string;
  name: string;
};

export type CategoriesResponse = {
  count: number;
  data: Category[];
};