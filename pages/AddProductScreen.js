import React, { useState } from 'react';
import { TextInput, Button, View, StyleSheet, Image, Alert, Text, TouchableOpacity } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase'; // Import your Firebase configuration
import uuid from 'react-native-uuid';
import * as ImagePicker from 'expo-image-picker';
import { uploadImage } from './utils/firebaseUtils';

const AddProductPage = ({ navigation }) => {
  const initialProductData = {
    id: uuid.v4(),
    location: '',
    landType: '',
    landSize: '',
    description: '',
    image: '',
  };

  const [productData, setProductData] = useState(initialProductData);
  const [uploading, setUploading] = useState(false);

  const handleInputChange = (name, value) => {
    setProductData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      handleImageUpload(result.uri);
    }
  };

 
  const handleImageUpload = async (uri) => {
    setUploading(true);
    try {
      const downloadURL = await uploadImage(uri, productData.id);
      console.log('Image URL:', downloadURL); // Debug URL
      setProductData(prevData => ({
        ...prevData,
        image: downloadURL,
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image.');
    } finally {
      setUploading(false);
    }
  };
  
  const saveProduct = async (productData) => {
    try {
      const productRef = doc(db, 'products', productData.id);
      await setDoc(productRef, productData);
      console.log('Product saved successfully:', productData); // Debug product data
      Alert.alert('Success', 'Product saved successfully!');
      setProductData(initialProductData); // Reset form fields
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Error saving product:', error);
      Alert.alert('Error', 'Failed to save product.');
    }
  };
  

  const handleSubmit = () => {
    if (!productData.location || !productData.landType || !productData.landSize || !productData.description || !productData.image) {
      Alert.alert('Validation Error', 'Please fill in all required fields and add an image.');
      return;
    }
    saveProduct(productData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Your Land</Text>
      <TextInput
        placeholder="Location"
        value={productData.location}
        onChangeText={(text) => handleInputChange('location', text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Land Type"
        value={productData.landType}
        onChangeText={(text) => handleInputChange('landType', text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Land Size"
        value={productData.landSize}
        onChangeText={(text) => handleInputChange('landSize', text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={productData.description}
        onChangeText={(text) => handleInputChange('description', text)}
        style={[styles.input, { height: 100 }]} // Adjust height for multiline input
        multiline
      />
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>{uploading ? 'Uploading...' : 'Pick an Image'}</Text>
      </TouchableOpacity>
      {productData.image ? (
        <Image source={{ uri: productData.image }} style={styles.image} />
      ) : null}
      <Button title="Save Product" onPress={handleSubmit} color="#4CAF50" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
    marginBottom: 16,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 5,
    height: 50,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 16,
    resizeMode: 'cover',
    borderRadius: 5,
  },
});

export default AddProductPage;
