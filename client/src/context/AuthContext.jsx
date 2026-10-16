import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';
import i18n from '../i18n';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('cropcare_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await authApi.getMe();
        if (res && res.data && res.data.user) {
          setUser(res.data.user);
          if (res.data.user.preferredLanguage) {
            i18n.changeLanguage(res.data.user.preferredLanguage);
          }
        }
      } catch (err) {
        console.warn('Auth token expired or invalid:', err.message);
        localStorage.removeItem('cropcare_token');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await authApi.login({ email, password });
    if (res.success && res.data) {
      localStorage.setItem('cropcare_token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      if (res.data.user.preferredLanguage) {
        i18n.changeLanguage(res.data.user.preferredLanguage);
      }
      return res.data.user;
    }
    throw new Error(res.message || 'Login failed');
  };

  const register = async (name, email, password, preferredLanguage = 'en') => {
    const res = await authApi.register({ name, email, password, preferredLanguage });
    if (res.success && res.data) {
      localStorage.setItem('cropcare_token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      if (preferredLanguage) {
        i18n.changeLanguage(preferredLanguage);
      }
      return res.data.user;
    }
    throw new Error(res.message || 'Registration failed');
  };

  const logout = () => {
    localStorage.removeItem('cropcare_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
