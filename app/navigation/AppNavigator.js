import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isLoggedIn } = useAuth();

  // Auth Navigator: Shows Login and Register screens when not logged in
  const AuthNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen} 
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
          headerLeft: null, // Prevent going back to login
        }}
      />
    </Stack.Navigator>
  );

  return isLoggedIn ? <MainNavigator /> : <AuthNavigator />;
};

export default AppNavigator; 