import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, SignupData } from '../types/auth';
import toast from 'react-hot-toast';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  signup: (data: SignupData) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for testing
const demoUsers: User[] = [
  {
    id: 'admin-1',
    email: 'admin@lms.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date()
  },
  {
    id: 'instructor-1',
    email: 'instructor@lms.com',
    name: 'John Instructor',
    role: 'instructor',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date()
  },
  {
    id: 'student-1',
    email: 'student@lms.com',
    name: 'Jane Student',
    role: 'student',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date()
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('lms_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false
        });
      } catch (error) {
        localStorage.removeItem('lms_user');
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      // Demo authentication - in production, this would be an API call
      const user = demoUsers.find(u => u.email === credentials.email);
      
      if (user && credentials.password === 'password') {
        const updatedUser = { ...user, lastLogin: new Date() };
        setAuthState({
          user: updatedUser,
          isAuthenticated: true,
          isLoading: false
        });
        localStorage.setItem('lms_user', JSON.stringify(updatedUser));
        toast.success(`Welcome back, ${user.name}!`);
        return true;
      } else {
        toast.error('Invalid email or password');
        return false;
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      return false;
    }
  };

  const signup = async (data: SignupData): Promise<boolean> => {
    try {
      // Demo signup - in production, this would be an API call
      const existingUser = demoUsers.find(u => u.email === data.email);
      
      if (existingUser) {
        toast.error('User with this email already exists');
        return false;
      }

      const newUser: User = {
        id: `${data.role}-${Date.now()}`,
        email: data.email,
        name: data.name,
        role: data.role,
        createdAt: new Date(),
        lastLogin: new Date()
      };

      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false
      });
      localStorage.setItem('lms_user', JSON.stringify(newUser));
      toast.success(`Welcome to the platform, ${newUser.name}!`);
      return true;
    } catch (error) {
      toast.error('Signup failed. Please try again.');
      return false;
    }
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
    localStorage.removeItem('lms_user');
    toast.success('Logged out successfully');
  };

  const updateUser = (updates: Partial<User>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...updates };
      setAuthState(prev => ({ ...prev, user: updatedUser }));
      localStorage.setItem('lms_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      signup,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};