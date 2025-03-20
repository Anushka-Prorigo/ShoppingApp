import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';

const Categories = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const getApiCall = async () => {
    try {
      const url = 'https://dummyjson.com/products/categories'; // Correct API endpoint
      let result = await fetch(url);
      let json = await result.json();
      setData(json);
      setFilteredData(json);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getApiCall();
  }, []);

  useEffect(() => {
    const results = data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
    setFilteredData(results);
  }, [searchQuery, data]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search here..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
     <ScrollView style={styles.scrollView}>
  {filteredData.length > 0 ? (
    filteredData.map((item) => (
      <Pressable
        key={item.slug}
        style={({ pressed }) => [
          styles.item,
          { backgroundColor: pressed ? '#e0e0e0' : '#f9f9f9' },
        ]}
      >
        <Text style={styles.itemText}>{item.name}</Text>
        {/* Render additional data if needed */}
      </Pressable>
    ))
  ) : (
    <Text style={styles.noDataText}>No items found</Text>
  )}
</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
  },
  noDataText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
  },
});

export default Categories;
