import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase'; // Ensure correct Firebase configuration

export default function HomeScreen() {
  const [lands, setLands] = useState([]);

  const fetchLands = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const landData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLands(landData);
    } catch (error) {
      console.error('Error fetching lands:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchLands();
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.cardImage} />
      ) : (
        <Text>No image available</Text>
      )}
      <Text style={styles.cardTitle}>Location: {item.location}</Text>
      <Text>Land Type: {item.landType}</Text>
      <Text>Land Size: {item.landSize}</Text>
      <Text>Description: {item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarHeading}>Lands</Text>
      </View>
      <FlatList
        data={lands}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarHeading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardImage: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
    resizeMode: 'cover',
  },
});
