/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
// @ts-nocheck



import React, {useEffect, useContext} from 'react';
import { Image, Platform} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Login from './src/pages/Auth/Login';
import About from './src/pages/screens/About';
import Signup from './src/pages/Auth/Signup';
import Settings from './src/pages/screens/Settings';
import UsersChat from './src/pages/screens/UsersChat';
import UserChat from './src/pages/screens/UserChat';
import AIChat from './src/pages/screens/AIChat';
import CoustomDrawer from './src/Navigation/CustomDrawer';
import {images} from './src/Utils/constants/Themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import  {AuthContext} from './src/store/auth-context';
const App = () => {
 
  const authCtx = useContext(AuthContext);
  const token = authCtx.token

  useEffect(
    () => {
      try {
        async function fetchToken() {
          await AsyncStorage.setItem('token', token);
          const StoredToken = await AsyncStorage?.getItem('token');
          authCtx.authenticate(StoredToken);

        }
        fetchToken();
      } catch (error) {
        console.log(error)
      }

}
  );
  const Tab = createBottomTabNavigator();
  const Drawer = createDrawerNavigator();
  const Stack = createNativeStackNavigator();

  const BottomTab = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            borderTopLeftRadius: responsiveHeight(6),
            borderTopRightRadius: responsiveHeight(6),
            width: responsiveWidth(100),
            backgroundColor: 'black',
            height:
              Platform.OS === 'ios' ? responsiveHeight(13) : responsiveHeight(8),
            elevation: 4,

            bottom: Platform.OS === 'ios' ? responsiveHeight(-2) : 0,
          },
        }}>
        <Tab.Screen
          options={{
            tabBarActiveTintColor: 'white',
            tabBarIcon: ({focused}) => (
              <Image
                source={images.ai}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? 'white' : 'gray',
                }}
              />
            ),
          }}
          name="Chat with AI"
          component={AIChat} />
        <Tab.Screen
          options={{
            tabBarActiveTintColor: 'white',
            tabBarIcon: ({focused}) => (
              <Image
                source={images.group}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? 'white' : 'gray',
                }}
              />
            ),
          }}
          name="Chat with Friends"
          component={UserChat}
        />
      </Tab.Navigator>
    );
  };

  const Auth = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    );
  };

  const ChatApp = () => {
    return (
      <Drawer.Navigator
        screenOptions={{
          headerTintColor: 'white',
          headerStyle: {
            borderBottomLeftRadius: responsiveHeight(6),
            borderBottomRightRadius: responsiveHeight(6),
            backgroundColor: 'black',

          },
          drawerStyle: {borderBottomWidth: 0, justifyContent: 'center'},
          drawerActiveTintColor: 'black',
        
        }}
        drawerContent={props => <CoustomDrawer {...props} />}>
        <Drawer.Screen
          options={{
            drawerLabel: 'Home',
          }}
          name="Chat App"
          component={BottomTab} />
        <Drawer.Screen name="About" component={About} />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="UserChat" component={UserChat} />
      </Drawer.Navigator>
    );
  };
  return (

        <NavigationContainer>
          {token ? <ChatApp /> : <Auth />}
        </NavigationContainer>
  );
};

export default App;
