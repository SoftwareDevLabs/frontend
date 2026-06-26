export interface User {
  id: number;
  username: string;
  email: string;
  roles: Role[];
  isActive: boolean;
  memberSince: string;
  lastLogin: string;
}

export interface Role {
  id: number;
  name: string;
  description: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export type UserRole = 'admin' | 'user' | 'moderator' | 'analyst' | 'developer';