import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, TextInput, Button } from 'react-native';
import { getDocs, collection, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import { db } from './firebase';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { getAuth, signOut } from 'firebase/auth';

const ProfileScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [location, setLocation] = useState('');
  const [landType, setLandType] = useState('');
  const [landSize, setLandSize] = useState('');
  const [description, setDescription] = useState('');

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productList);
    } catch (error) {
      console.error('Error fetching products:', error);
      Alert.alert('Error', 'Failed to fetch products.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProducts(); // Fetch products every time the screen is focused
    }, [])
  );

  const handleUpdate = (product) => {
    setCurrentProduct(product);
    setLocation(product.location);
    setLandType(product.landType);
    setLandSize(product.landSize);
    setDescription(product.description);
    setModalVisible(true); // Show the modal
  };

  const handleSave = async () => {
    if (!location || !landType || !landSize || !description) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    try {
      const productRef = doc(db, 'products', currentProduct.id);
      await updateDoc(productRef, {
        location,
        landType,
        landSize,
        description
      });
      setModalVisible(false); // Hide the modal
      fetchProducts(); // Refresh the product list after update
      Alert.alert('Success', 'Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      Alert.alert('Error', 'Failed to update product.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const productRef = doc(db, 'products', id);
      await deleteDoc(productRef);
      fetchProducts(); // Refresh the product list after deletion
      Alert.alert('Success', 'Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      Alert.alert('Error', 'Failed to delete product.');
    }
  };

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      navigation.navigate('WelcomeScreen');
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Error', 'Failed to log out.');
    }
  };

  const renderProduct = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>Location: {item.location}</Text>
      <Text style={styles.cardText}>Land Type: {item.landType}</Text>
      <Text style={styles.cardText}>Land Size: {item.landSize}</Text>
      <Text style={styles.cardText}>Description: {item.description}</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => handleUpdate(item)}>
          <MaterialCommunityIcons name="pencil" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <MaterialCommunityIcons name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarHeading}>Your Products</Text>
        <TouchableOpacity onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
      />
      <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeading}>Edit Product</Text>
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
          />
          <TextInput
            style={styles.input}
            placeholder="Land Type"
            value={landType}
            onChangeText={setLandType}
          />
          <TextInput
            style={styles.input}
            placeholder="Land Size"
            value={landSize}
            onChangeText={setLandSize}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
          <Button title="Save" onPress={handleSave} color="#4CAF50" />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  topBar: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topBarHeading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  productList: {
    padding: 16,
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 16,
  },
  modalHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});

export default ProfileScreen;
