import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin' | 'parent' | 'headmaster' | 'accountant' | 'hr';
  avatar?: string;
  school?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const checkAuth = async () => {
      try {
        // In a real app, this would check for a valid token
        const savedUser = localStorage.getItem('sms_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        } else {
          // Auto-login with demo admin user for testing
          const demoUser = {
            id: '1',
            name: 'Admin User',
            email: 'admin@demo.com',
            role: 'admin' as const,
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
            school: 'AI Academy'
          };
          setUser(demoUser);
          localStorage.setItem('sms_user', JSON.stringify(demoUser));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on email
      let mockUser: User;
      if (email.includes('admin')) {
        mockUser = {
          id: '1',
          name: 'Priscilla Lily',
          email: email,
          role: 'admin',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
          school: 'AI Academy'
        };
      } else if (email.includes('student')) {
        mockUser = {
          id: '2',
          name: 'Jessia Rose',
          email: email,
          role: 'student',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
          school: 'SDIK'
        };
      } else {
        mockUser = {
          id: '3',
          name: 'John Teacher',
          email: email,
          role: 'teacher',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          school: 'SDIK'
        };
      }
      
      setUser(mockUser);
      localStorage.setItem('sms_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sms_user');
  };

  const value = {
    user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};