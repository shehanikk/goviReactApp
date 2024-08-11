import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './pages/BottomTabNavigator';
import SplashScreen from './pages/splashScreen';
import WelcomeScreen from './pages/WelcomeScreen';
import LoginScreen from './pages/loginScreen';
import SignUpScreen from './pages/SignUpScreen';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import HomeScreen from './pages/HomeScreen';
import AddProductPage from './pages/AddProductScreen';
import ProfileScreen from './pages/Profile';

const Stack = createStackNavigator();

export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Display the splash screen for 3 seconds
    const timer = setTimeout(() => {
      setIsShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Listen for authentication state changes
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Update user state when authentication state changes
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  if (isShowSplash) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // If user is authenticated, show the BottomTabNavigator
          <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
        ) : (
          // If user is not authenticated, show the welcome and login screens
          <>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="AddProductPage" component={AddProductPage} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
