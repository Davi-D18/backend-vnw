import React, { createContext, useContext, useState, useEffect } from 'react';
import { shelterService, Shelter } from '../services/shelterService';

interface AuthContextType {
  shelter: Shelter | null;
  token: string | null;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
  updateShelter: (data: Partial<Shelter>) => void;
  refreshShelter: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [shelter, setShelter] = useState<Shelter | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  const refreshShelter = async () => {
    if (!token) return;
    try {
      const data = await shelterService.getMe();
      setShelter(data);
    } catch (err) {
      console.error('Erro ao atualizar dados do abrigo:', err);
      // Se der erro 401 ou similar, o interceptor da API ou o useEffect do token cuidará do logout se necessário
    }
  };

  useEffect(() => {
    if (token) {
      shelterService.getMe()
        .then(data => setShelter(data))
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (credentials: any) => {
    const response = await shelterService.login(credentials);
    localStorage.setItem('token', response.token);
    setToken(response.token);
    setShelter(response.shelter);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setShelter(null);
  };

  const updateShelter = (data: Partial<Shelter>) => {
    setShelter(prev => prev ? { ...prev, ...data } : null);
  };

  return (
    <AuthContext.Provider value={{ shelter, token, login, logout, updateShelter, refreshShelter, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
