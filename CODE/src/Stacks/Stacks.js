/* eslint-disable prettier/prettier */
import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Home from '../pages/screens/Home';
import About from '../pages/screens/About';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Routes = () => {

    const RootStack = createNativeStackNavigator({
        // initialRouteName: 'intro',
        initialRouteName: 'home',
        screenOptions: {
          headerShown: false,
        },
        
        screens: {
          signup: Signup,
          login: Login,
          home: Home,
          about:About
        },
      });
  return (
    <View>
      <Text>ABOUT US</Text>
    </View>
  );
};

export default Routes;
const styles = StyleSheet.create({});
