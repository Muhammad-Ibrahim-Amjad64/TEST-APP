/* eslint-disable prettier/prettier */
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, {useContext, useEffect , useState} from 'react';
import {
  DrawerContent,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
// import { useNavigation,useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { images } from '../Utils/constants/Themes';
import { AuthContext } from '../store/auth-context';

const CoustomDrawer = (props, { navigation }) => {
  const authCtx = useContext(AuthContext);
  const handleLogout = async () => {
    authCtx.logout();
    await AsyncStorage.setItem('token', '');

  };

  return (
    <View
      style={{flex: 1, backgroundColor: '#000', height: responsiveHeight(100)}}>
      <DrawerContentScrollView >
           <View
          style={{
            height: responsiveHeight(25),
            borderBottomWidth: responsiveWidth(0.1),
            borderColor: '#FFF',
            left: responsiveWidth(4),
            marginTop: responsiveHeight(3),
          }}>
          <View>
            <Image
              resizeMode="cover"
            tintColor={"white"}
              source={images.AuthLogo}
              style={{
                borderRadius:responsiveHeight(100),
                height: responsiveHeight(15),
                width: responsiveHeight(15),
              }}
            />

            <Text
              style={{
                color: '#FFF',
                fontFamily: 'Poppins-Regular',
                marginTop:responsiveHeight(2),
                fontSize: responsiveFontSize(2.5),
                fontWeight:"bold"
              }}>
                      
                          Chat App
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            flexGrow: 1,
          }}>
          <TouchableOpacity style={{}}>
            <DrawerItem
              style={{}}
              inactiveTintColor="#fff"
            //   activeTintColor={colors.btncolor}
              icon={({color, size}) => (
                <Image
                  resizeMode="contain"
                  source={images.home}
                  style={{
                    height: size,
                    width: size,
                    tintColor: color,
                  }}
                />
              )}
              label="Home"
              labelStyle={{
                color: '#fff',
                fontFamily: 'Poppins-Regular',
                fontSize: responsiveFontSize(2.3),
              }}
              onPress={() => {
                props.navigation.navigate('Chat App');
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{}}>
            <DrawerItem
              style={{
                justifyContent: 'space-between',
              }}
              inactiveTintColor="#fff"
            //   activeTintColor={colors.btncolor}
              icon={({color, size}) => (
                <Image
                  resizeMode="contain"
                  source={images.about}
                  style={{height: size, width: size, tintColor: color}}
                />
              )}
              label="About"
              labelStyle={{
                color: '#fff',
                fontFamily: 'Poppins-Regular',
                fontSize: responsiveFontSize(2.3),
              }}
              onPress={() => {
          
                props.navigation.navigate('About');
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{}}>
            <DrawerItem
              style={{
                justifyContent: 'space-between',
              }}
              inactiveTintColor="#fff"
            //   activeTintColor={colors.btncolor}
              icon={({color, size}) => (
                <Image
                  resizeMode="contain"
                  source={images.settings}
                  style={{height: size, width: size, tintColor: color}}
                />
              )}
              label="Settings"
              labelStyle={{
                fontFamily: 'Poppins-Regular',
                fontSize: responsiveFontSize(2.3),
              }}
              onPress={() => {
                props.navigation.navigate('Settings');
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            bottom: responsiveHeight(12),
          }}>
          <DrawerItem
            style={{
              marginTop: responsiveHeight(30),
              justifyContent: 'space-between',
            }}
            inactiveTintColor="#fff"
            ac
            // activeTintColor={colors.btncolor}
            icon={({color, size}) => (
              <Image
                resizeMode="contain"
                source={images.logout}
                style={{height: size, width: size, tintColor: color}}
              />
            )}
            label="Logout"
            labelStyle={{
              color: '#fff',
              fontFamily: 'Poppins-Regular',
              fontSize: responsiveFontSize(2.3),
              paddingTop: responsiveHeight(1),
            }}
            onPress={handleLogout}
            
          />
        </View>
          {/* </> */}
        {/* } */}
       
      </DrawerContentScrollView>
    </View>
  );
};

export default CoustomDrawer;

const styles = StyleSheet.create({});
