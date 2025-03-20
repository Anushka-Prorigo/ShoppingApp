import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";
import Home from './Home';

const Login = () => {
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = async() =>{
        try{
            const url = 'https://api.escuelajs.co/api/v1/users';
            const result = await fetch(url);
            const users = await result.json();
            const user = users.find(
                (u) => u.email === email && u.password === password
            );
            if(user)
            {
                navigation.navigate(Home,{id:user.id});
            }
            else{
                Alert.alert('Error','Invalid user name or password');
            }
        }catch(error){
              console.error('error fetching users:',error);
              Alert.alert('Error','Something went wrong');

        }
    };

    return(
         <View style={styles.container}>
             <TextInput
             style={styles.textInput}
               placeholder="Enter Email"
               value={email}
               onChangeText={setEmail}
               keyboardType="email-address"
             />
              <TextInput
              style={styles.textInput}
               placeholder="Enter Password"
               value={password}
               onChangeText={setPassword}
               keyboardType="password"
               secureTextEntry
             />
             <Button title="Login" style={styles.button} onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
        flex:1,
    },
    textInput:{
        borderColor:'black',
        borderWidth:2,
       padding:10,
        margin:10,
        width:300,
    },
    button:{
        height:20,
        width:20,
    },
});
export default Login;
