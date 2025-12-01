import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { AuthState, User, LoginCredentials, RegisterData } from '../types/auth';

// Mock API - In production, this would connect to actual backend endpoints
const mockApi = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock admin user
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      return {
        id: 1,
        username: 'admin',
        email: 'admin@sdlccore.com',
        roles: [{ id: 1, name: 'admin', description: 'Full system administrator access' }],
        isActive: true,
        memberSince: 'August 15, 2025',
        lastLogin: new Date().toLocaleString()
      };
    }
    
    // Mock regular user
    if (credentials.username === 'user' && credentials.password === 'user123') {
      return {
        id: 2,
        username: 'user',
        email: 'user@sdlccore.com',
        roles: [{ id: 2, name: 'user', description: 'Standard user access' }],
        isActive: true,
        memberSince: 'August 15, 2025',
        lastLogin: new Date().toLocaleString()
      };
    }
    
    throw new Error('Invalid credentials');
  },
  
  register: async (data: RegisterData): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (data.password !== data.confirmPassword) {
      throw new Error('Passwords do not match');
    }
    
    return {
      id: Date.now(),
      username: data.username,
      email: data.email,
      roles: [{ id: 2, name: 'user', description: 'Standard user access' }],
      isActive: true,
      memberSince: new Date().toLocaleDateString(),
      lastLogin: new Date().toLocaleString()
    };
  },
  
  logout: async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
  },
  
  getCurrentUser: async (): Promise<User | null> => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }
};

// Auth action types
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'CLEAR_ERROR' };

// Auth reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true, error: null };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload
      };
    case 'AUTH_LOGOUT':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: null
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

// Context
interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      dispatch({ type: 'AUTH_START' });
      try {
        const user = await mockApi.getCurrentUser();
        if (user) {
          dispatch({ type: 'AUTH_SUCCESS', payload: user });
        } else {
          dispatch({ type: 'AUTH_LOGOUT' });
        }
      } catch (error) {
        dispatch({ type: 'AUTH_LOGOUT' });
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const user = await mockApi.login(credentials);
      localStorage.setItem('currentUser', JSON.stringify(user));
      dispatch({ type: 'AUTH_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: (error as Error).message });
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const user = await mockApi.register(data);
      localStorage.setItem('currentUser', JSON.stringify(user));
      dispatch({ type: 'AUTH_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: (error as Error).message });
      throw error;
    }
  };

  const logout = async () => {
    dispatch({ type: 'AUTH_START' });
    try {
      await mockApi.logout();
      localStorage.removeItem('currentUser');
      dispatch({ type: 'AUTH_LOGOUT' });
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: (error as Error).message });
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const hasRole = (role: string): boolean => {
    return state.user?.roles?.some(r => r.name === role) || false;
  };

  const hasAnyRole = (roles: string[]): boolean => {
    return roles.some(role => hasRole(role));
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    clearError,
    hasRole,
    hasAnyRole
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};