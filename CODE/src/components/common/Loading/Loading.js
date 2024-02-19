/* eslint-disable prettier/prettier */
import {
    StyleSheet,
    View,
    ActivityIndicator,
    
  } from 'react-native';
  import React from 'react';
  import {
    responsiveHeight,
    responsiveWidth,
  } from 'react-native-responsive-dimensions';
  import {colors, images} from '../../../Utils/constants/Themes';
  
  const Loading = () => {
    return (
      <View
        style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:"black"}}>

        <View
          style={{
            height: responsiveHeight(20),
            width: responsiveWidth(60),
            borderRadius: responsiveWidth(10),
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 1,
            backgroundColor: colors.btncolor,
          }}>
          <ActivityIndicator size={'large'} color={'white'} />
        </View>
      </View>
    );
  };
  
  export default Loading;
  
  const styles = StyleSheet.create({});
  