import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra token khi component mount
    const token = localStorage.getItem('access_token');
    const userData = JSON.parse(localStorage.getItem('user_data'));
    
    if (token && userData) {
      setUser(userData);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // 1. Lấy access/refresh token từ JWT endpoint
      const tokenRes = await axios.post('http://localhost:8000/api/token/', {
        email,
        password
      });
      const { access, refresh } = tokenRes.data;

      // 2. Gọi API lấy thông tin user
      const userRes = await axios.get('http://localhost:8000/api/profile/', {
        headers: { Authorization: `Bearer ${access}` }
      });

      const userData = userRes.data;

      // 3. Lưu vào localStorage
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('user_data', JSON.stringify(userData));

      setUser(userData);

      return { success: true};
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.response?.data?.detail || error.response?.data?.error || 'Login failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
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