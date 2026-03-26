import { createContext, useContext, useState, useEffect } from 'react';
import { tokenStorage } from '../api/client';

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = await tokenStorage.get();
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };
    checkToken();
  }, []);

  const login = async (token: string) => {
    await tokenStorage.save(token);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await tokenStorage.remove();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}