/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState, useEffect, useCallback } from 'react';

export interface AuthContextType {
  token: string;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
  role: string;
}

const AuthContext = createContext<AuthContextType>({
  token: '',
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  role: '',
});

interface JWTPayload {
  exp: number;
  role: string;
  [key: string]: unknown;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  const decodeJWT = useCallback((token: string): JWTPayload | null => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }, []);

  const checkTokenValidity = useCallback(
    (token: string): boolean => {
      const payload = decodeJWT(token);
      if (!payload) return false;
      const expirationTime = payload.exp * 1000;
      return Date.now() < expirationTime;
    },
    [decodeJWT]
  );

  const updateAuthState = useCallback(
    (token: string) => {
      if (checkTokenValidity(token)) {
        const payload = decodeJWT(token);
        if (payload) {
          setToken(token);
          setIsLoggedIn(true);
          setRole(payload.role);
          localStorage.setItem('token', token);
        }
      } else {
        logout();
      }
    },
    [checkTokenValidity, decodeJWT]
  );

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      updateAuthState(storedToken);
    }
  }, [updateAuthState]);

  const login = (newToken: string) => {
    updateAuthState(newToken);
  };

  const logout = () => {
    setToken('');
    setIsLoggedIn(false);
    setRole('');
    localStorage.removeItem('token');
  };

  const contextValue: AuthContextType = {
    token,
    isLoggedIn,
    login,
    logout,
    role,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
