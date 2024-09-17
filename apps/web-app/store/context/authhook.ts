import { useContext } from 'react';
import AuthContext, { AuthContextType } from './auth';

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
