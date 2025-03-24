import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Categories = ({route}) => {
  const {id} = route.params;
  console.log(id);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const navigation = useNavigation();
  const getApiCall = async () => {
    try {
      const url = 'https://dummyjson.com/products/categories';
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
    const results = data.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredData(results);
  }, [searchQuery, data]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Text style={styles.arrowText}>{'<'}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.searchBar}
          placeholder="Search here..."
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
        <TouchableOpacity style={styles.profileIcon} onPress={()=>{navigation.navigate('Profile',{id:id})}}>
          <Text style={styles.iconText}>{'👤'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.categoriesContainer}>
        <View style={styles.categories}>
          {filteredData.length > 0 ? (
            filteredData.map(item => (
              <Pressable
                key={item.slug}
                style={({pressed}) => [
                  styles.categoryItem,
                  {backgroundColor: pressed ? '#e0e0e0' : '#f9f9f9'},
                ]}
                onPress={() =>
                  navigation.navigate('Products', {name: item.name})
                }>
                <Text style={styles.categoryItemText}> {item.name}</Text>
              </Pressable>
            ))
          ) : (
            <Text style={styles.noDataText}>No items found</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#5f9ea0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  profileIcon: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  iconText: {
    fontSize: 18,
  },
  categoriesContainer: {
    flex: 1,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    height: 150,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  categoryItemText: {
    fontSize: 16,
    textAlign: 'center',
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
  },
  backButton: {
    marginRight: 10,
  },
  arrowText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Categories;
