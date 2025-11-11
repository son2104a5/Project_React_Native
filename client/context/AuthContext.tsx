import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/interfaces/user.interface';
import { getUserProfile, loginAPI } from '@/apis/auth.api';
import axiosInstance from '@/utils/axiosInstance';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await getUserProfile();
      setUser(res.data);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await loginAPI({ email, password });
    await AsyncStorage.multiSet([
      ["ACCESS_TOKEN", res.accessToken],
      ["REFRESH_TOKEN", res.refreshToken],
    ]);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${res.accessToken}`;
    const userData = await getUserProfile();
    setUser(userData);
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(['ACCESS_TOKEN', 'REFRESH_TOKEN']);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);