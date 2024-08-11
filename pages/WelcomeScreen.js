import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logoGovi.png')} // Replace with your logo path
        style={styles.logo}
      />
      <Text style={styles.heading}>Welcome to Anda Goviya</Text>
      <Text style={styles.subText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc semper massa ac purus placerat, ullamcorper ultricies odio viverra. Quisque a lorem auctor, varius velit non, mollis mi. Sed at metus lobortis, porta justo quis, commodo mi.</Text>
      <View style={styles.buttonContainer}>
      <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={() => navigation.navigate('LoginScreen')} // Navigate to LoginScreen
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.signInButton]}
        onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 50,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 70,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#4CAF50', // Green color
  },
  signInButton: {
    backgroundColor: '#2196F3', // Blue color
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
