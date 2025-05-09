import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isLoggedIn, initializing } = useAuth();

  // Show loading screen during token validation
  if (initializing) {
    return null; // Or a splash screen/loading component
  }

  // Auth Navigator: Shows Login and Register screens when not logged in
  const AuthNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ title: 'Sign In' }}
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen} 
        options={{ title: 'Create Account' }}
      />
    </Stack.Navigator>
  );

  // App Navigator: Shows the main app screens when logged in
  const MainNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          title: 'Home',
          headerLeft: () => null, 
        }}
      />
    </Stack.Navigator>
  );

  return isLoggedIn ? <MainNavigator /> : <AuthNavigator />;
};

export default AppNavigator; 