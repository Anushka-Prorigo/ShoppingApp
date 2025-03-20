import {View, Text, TouchableOpacity, StyleSheet, Button,FlatList} from 'react-native';
import Categories from './Categories';

const Home = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.profileIcon}
        onPress={() => alert('Profile Icon Clicked!')}
      >
        <Text style={styles.iconText}>👤</Text>
      </TouchableOpacity>

      <View style={styles.listContainer}>
        <Categories/>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
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
