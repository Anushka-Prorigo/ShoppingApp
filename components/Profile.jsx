/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Login from "./Login";

const Profile = ({route}) =>{
  const {id} = route.params;
    console.log(id);
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const navigation = useNavigation();
    const getUserDetails = async () => {
      try {
        const url = `https://dummyjson.com/users/${id}`;
        let result = await fetch(url);
        let json = await result.json();
        setData(json);
        setFilteredData(json);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  useEffect(() => {
        getUserDetails();
    }, []);

    return(
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
                 <Text style={styles.bold}>firstName: </Text>
                 {data.firstName}
               </Text>
               <Text style={styles.text}>
                 <Text style={styles.bold}>lastName: </Text>
                 {data.lastName}
               </Text>
               <Text style={styles.text}>
                 <Text style={styles.bold}>age: </Text>
                 {data.age}
               </Text>
               <Text style={styles.text}>
                 <Text style={styles.bold}>email: </Text>
                 {data.email}
               </Text>
               <Text style={styles.text}>
                 <Text style={styles.bold}>birthDate: </Text>
                 {data.birthDate}
               </Text>
             </View>
       
             <View style={styles.button}>
               <Button
                 title="LogOut"
                 onPress={() => {
                   navigation.navigate('Login Page');
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
export default Profile;
