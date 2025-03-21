import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Login from './components/Login';
import Registration from './components/Registration';
import Home from './components/Home';
import Categories from './components/Categories';
import Profile from './components/Profile';
import Products from './components/Products';
const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login Page">
        <Stack.Screen
          name="Login Page"
          component={Login}
          options={{headerShadowVisible: false}}
        />
        <Stack.Screen
          name="Registration Page"
          component={Registration}
          options={{headerShadowVisible: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShadowVisible: false , headerShown: false}}
        />
        <Stack.Screen
          name="Categories"
          component={Categories}
          options={{headerShadowVisible: false , headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShadowVisible: false ,  headerShown: false}}
        />
         <Stack.Screen
          name="Products"
          component={Products}
          options={{headerShadowVisible: false ,  headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
