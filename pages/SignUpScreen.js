import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from './firebase'; // Import auth and db from your firebase.js file
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore functions

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user details in Firestore
      await setDoc(doc(db, 'userProfile', user.uid), {
        username: fullName,
        email: user.email,
        uid: user.uid
      });

      Alert.alert('Sign Up Success', 'Account created successfully!');
      navigation.navigate('HomeScreen'); // Redirect to HomeScreen after successful sign-up
    } catch (error) {
      Alert.alert('Sign Up Error', error.message); // Display error message
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.heading}>Create Your Account</Text>
      <View style={styles.inputContainer}>
        <Icon name="person" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="email" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signInContainer} onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.signInText}>
          Already have an account? <Text style={styles.signInLink}>Sign In</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    backArrow: {
      marginTop: 40,
      alignSelf: 'flex-start',
      marginBottom: 20,
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 40,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      marginBottom: 30,
    },
    icon: {
      marginRight: 10,
    },
    input: {
      flex: 1,
      height: 40,
      fontSize: 16,
    },
    signUpButton: {
      backgroundColor: '#4CAF50', // Green color
      paddingVertical: 15,
      borderRadius: 25,
      alignItems: 'center',
      marginBottom: 20,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
    signInContainer: {
      alignItems: 'center',
    },
    signInText: {
      color: '#666',
      fontSize: 14,
    },
    signInLink: {
      color: '#2196F3', // Blue color
      fontWeight: 'bold',
    },
  });



export default SignUpScreen;
