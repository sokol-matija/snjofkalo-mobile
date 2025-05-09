import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient } from '../api/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [initializing, setInitializing] = useState(true);

  // Check for existing token on app start
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          try {
            // Validate token with backend
            const userData = await apiClient.get('/auth/validate');
            setUser(userData);
            setIsLoggedIn(true);
          } catch (error) {
            // Token invalid or expired, clean up
            await AsyncStorage.removeItem('authToken');
            console.log('Token validation failed:', error);
          }
        }
      } catch (error) {
        console.error('Token check error:', error);
      } finally {
        setInitializing(false);
      }
    };

    checkToken();
  }, []);

  // Store token securely
  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Error storing token:', error);
      throw error;
    }
  };

  // Clear token on logout
  const clearToken = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
    } catch (error) {
      console.error('Error clearing token:', error);
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    
    try {
      // Make API call to login endpoint
      const response = await apiClient.post('/auth/login', credentials);
      
      if (response.token) {
        // Store the token
        await storeToken(response.token);
        setUser(response.user);
        setIsLoggedIn(true);
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Make API call to register endpoint
      const response = await apiClient.post('/auth/register', userData);
      
      if (response.token) {
        // Store the token
        await storeToken(response.token);
        setUser(response.user);
        setIsLoggedIn(true);
      } else {
        throw new Error('Registration successful, but no token received');
      }
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    
    try {
      // Optionally notify the backend about logout
      await apiClient.post('/auth/logout', {});
    } catch (error) {
      console.error('Logout API error:', error);
      // Continue with local logout even if API call fails
    }
    
    // Clear token and reset state
    await clearToken();
    setUser(null);
    setIsLoggedIn(false);
    setLoading(false);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isLoggedIn, 
        user, 
        login, 
        register, 
        logout, 
        loading, 
        error, 
        initializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 