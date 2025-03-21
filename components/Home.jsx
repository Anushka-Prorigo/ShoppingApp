import {View, Text, TouchableOpacity, StyleSheet, Button,FlatList, Alert} from 'react-native';
import Categories from './Categories';

const Home = (props) => {
  return (

      <View style={styles.listContainer}>
        <Categories style={styles.listContainer}/>
      </View>
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#5f9ea0',
        position: 'relative',
      },
  profileIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  iconText: {
    fontSize: 24,
  },
  listContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    },
 });
export default Home;
