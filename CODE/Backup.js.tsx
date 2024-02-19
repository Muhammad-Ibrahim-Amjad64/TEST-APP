/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
/* eslint-disable prettier/prettier */
import About from './src/pages/screens/About';
import Home from './src/pages/screens/Home';
import Login from './src/pages/Auth/Login';
import Signup from './src/pages/Auth/Signup';
import Routes from './src/Navigation';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

// TO DO
// implement chatting
// layout creatiion
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

function App(): React.JSX.Element {
  // const RootStack = createNativeStackNavigator({
  //   // initialRouteName: 'intro',
  //   initialRouteName: 'home',
  //   screenOptions: {
  //     headerShown: false,
  //   },
  //   screens: {
  //     signup: Signup,
  //     login: Login,
  //     home: Home,
  //     about:About,
  //   },
  // });

  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaView style={{backgroundColor: 'red'}}>
      {/* <NavigationContainer >
        <StatusBar barStyle={'dark-content'} backgroundColor={'gray'} />
        <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Routes" component={Routes} />
        </Stack.Navigator>
      </NavigationContainer> */}
      <Home />
      {/* <About /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
