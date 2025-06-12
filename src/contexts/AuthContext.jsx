import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra token khi component mount
    const token = localStorage.getItem('access_token');
    if (token) {
      fetchUserData(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      // 1. Lấy thông tin user từ token
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      
      // 2. Fetch user profile
      const response = await axios.get('http://localhost:8000/api/profile/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data && response.data.length > 0) {
        const profile = response.data[0];
        const userData = {
          id: tokenData.user_id,
          email: tokenData.email,
          first_name: profile.user?.first_name || '',
          last_name: profile.user?.last_name || '',
          phone_number: profile.phone_number || '',
          address: profile.address || '',
          avatar_url: profile.avatar || null,
          role: 'User' // Mặc định role là User
        };
        setUser(userData);
        localStorage.setItem('user_data', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // 1. Lấy access/refresh token từ JWT endpoint
      const tokenRes = await axios.post('http://localhost:8000/api/token/', {
        email,
        password
      });
      const { access, refresh } = tokenRes.data;

      // 2. Lưu tokens
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      // 3. Fetch user data
      await fetchUserData(access);

      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Login failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
    setUser(null);
  };

  const refreshToken = async () => {
    try {
      const refresh = localStorage.getItem('refresh_token');
      if (!refresh) throw new Error('No refresh token');

      const response = await axios.post('http://localhost:8000/api/token/refresh/', {
        refresh
      });

      const { access } = response.data;
      localStorage.setItem('access_token', access);
      
      return access;
    } catch (error) {
      logout();
      throw error;
    }
  };

  const hasRole = (requiredRoles) => {
    if (!user || !user.role) return false;
    return requiredRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout, 
      hasRole,
      refreshToken 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 