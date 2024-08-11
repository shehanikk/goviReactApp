import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
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
      <Text style={styles.cardTitle}>Location: {item.location}</Text>
      <Text>Land Type: {item.landType}</Text>
      <Text>Land Size: {item.landSize}</Text>
      <Text>Description: {item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Lands</Text>
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
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 16,
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
});
