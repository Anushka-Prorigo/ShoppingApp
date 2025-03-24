import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';

const Productdetails = ({route}) => {
  const {id} = route.params || {};
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const handleProductDetails = async () => {
    try {
      const url = `https://dummyjson.com/products/${id}`;
      const response = await fetch(url);
      let json = await response.json();
      console.log('hello', data);
      console.log('fetched data is:', json.productdetails);
      setData(json);
      setLoading(false);
    } catch (error) {
      console.error('error fetching product details', error);
    }
  };

  useEffect(() => {
    handleProductDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Text style={styles.arrowText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{data.title}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          <Text style={styles.bold}>Description: </Text>
          {data.description}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Price: </Text>
          {data.price}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Category: </Text>
          {data.category}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Shipping Information: </Text>
          {data.shippingInformation}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Return Policy: </Text>
          {data.returnPolicy}
        </Text>
      </View>

      <View style={styles.button}>
        <Button
          title="Update Product Details"
          onPress={() => {
            navigation.navigate('UpdateProductDetails', {id: id});
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#5f9ea0',
  },
  textContainer: {
    backgroundColor: 'white',
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
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginLeft: 100,
  },
  products: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  backButton: {
    marginRight: 10,
  },
  arrowText: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  button: {
    height: 40,
    width: 'auto',
    marginTop: 50,
    alignItems: 'center',
  },
  text: {
    marginBottom: 5,
  },
});

export default Productdetails;
