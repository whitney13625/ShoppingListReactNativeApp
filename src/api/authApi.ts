import { apiClient, tokenStorage } from './client';

type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
  };
};

export const authApi = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', {
      email,
      password,
    });
    await tokenStorage.save(response.data.token);
    return response.data;
  },

  logout: async () => {
    await tokenStorage.remove();
  },
};