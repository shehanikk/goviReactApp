import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import AuthScreen from './pages/AuthScreen';
import HomeScreen from './pages/Home';
import ProfileScreen from './pages/Profile';


const firebaseConfig = {
  apiKey: "AIzaSyBmYz-4K0F5qcYcaJTEoYhcMbK7NAbhgyc",
  authDomain: "reactgoviapp.firebaseapp.com",
  projectId: "reactgoviapp",
  storageBucket: "reactgoviapp.appspot.com",
  messagingSenderId: "294893103403",
  appId: "1:294893103403:web:dd17cf8452a18315e93d6e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Tab = createBottomTabNavigator();

const AuthenticatedScreen = ({ user, handleLogout }) => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />,
      }}
    />
    <Tab.Screen
      name="Profile"
      options={{
        tabBarIcon: ({ color, size }) => <Icon name="user" color={color} size={size} />,
      }}
    >
      {() => <ProfileScreen handleLogout={handleLogout} />}
    </Tab.Screen>
  </Tab.Navigator>
);

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleAuthentication = async () => {
    try {
      if (user) {
        console.log('User logged out successfully!');
        await signOut(auth);
      } else {
        if (isLogin) {
          await signInWithEmailAndPassword(auth, email, password);
          console.log('User signed in successfully!');
        } else {
          await createUserWithEmailAndPassword(auth, email, password);
          console.log('User created successfully!');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <NavigationContainer>
      {user ? (
        <AuthenticatedScreen user={user} handleLogout={handleLogout} />
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <AuthScreen
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            handleAuthentication={handleAuthentication}
          />
        </ScrollView>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
});

export default App;
