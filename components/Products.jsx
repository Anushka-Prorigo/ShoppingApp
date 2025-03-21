import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View, ScrollView, Pressable, StyleSheet } from 'react-native';

const Products = ({ route }) => {
  const { name } = route.params || {};
  console.log('products page:', name);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleProductClick = async () => {
    try {
        console.log(`Fetching URL: https://dummyjson.com/products/category/${name}`);
      const url = `https://dummyjson.com/products/category/${name}`;
      const response = await fetch(url);
      let json = await response.json();
      console.log('Fetched data:', json.products);
      setData(json.products);
    } catch (error) {
      console.error('Error occurred while fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleProductClick();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>{name}</Text>
      <ScrollView >
        {data.length > 0 ? (
          data.map((item, index) => (
            <Pressable key={index} style={styles.productItem}>
              <Text style={styles.itemText}>{item.title}</Text> {/* Use title or valid property */}
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
        padding: 10,
        backgroundColor: '#5f9ea0',
      },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noDataText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  productItem: {
    width: '100%',
    height: 100,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  title:{
     fontSize:20,
     fontWeight:'bold',
     textAlign:'center',
  },
  products: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default Products;
