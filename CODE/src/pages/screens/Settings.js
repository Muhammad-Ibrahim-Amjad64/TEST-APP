/* eslint-disable prettier/prettier */
import {
    Image,
    ImageBackground,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {colors, images} from '../../Utils/constants/Themes';
  import {
    responsiveFontSize,
    responsiveHeight,
    responsiveScreenHeight,
    responsiveScreenWidth,
    responsiveWidth,
  } from 'react-native-responsive-dimensions';
//   import Header from '../../../Components/Common/Header';
import ToggleSwitch from 'toggle-switch-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//   import {useDispatch, useSelector} from 'react-redux';
//   import {authSlice, toggleLanguage} from '../../../Store/Reducers/Login';
const SettingsHome = ({ navigation }) => {
   
  const [isEnabled, setIsEnabled] = useState(false);
  const [name, setName] = useState('')
  
    // const dispatch = useDispatch();
      const handleLanguageToggle = () => {
        setIsEnabled(!isEnabled)
    //   dispatch(toggleLanguage());
    //   setIsEnabled(previousState => !previousState);
    };
  useEffect(() => {
    const getName = async () => {
      const name = await AsyncStorage.getItem('name')
      setName(name)
    }
    getName()
})
    return (
      <View
        // source={images.Backgroundimage}
        style={{
          height: responsiveScreenHeight(100),
          width: responsiveScreenWidth(100),
          flex: 1,
        }}>
        <SafeAreaView>
          <View
            style={{
              marginTop:
                Platform.OS === 'ios' ? responsiveHeight(2) : responsiveHeight(6),
              marginVertical: responsiveHeight(1),
            }}>
            {/* <Header
              heading={language === 'English' ? 'Settings' : 'instellingen'}
              leftimage={images.logoDrawer}
              rightimage={images.logoSearch}
              rightOnpress={() => {
                navigation.navigate('Search');
              }}
              leftOnpress={() => {
                navigation.openDrawer();
              }}
            /> */}
          </View>
          <View
            style={{
              marginHorizontal: responsiveWidth(5),
              marginTop: responsiveHeight(2),
            }}>
            {/*===================profile=================*/}
            <View
              style={[
                styles.boxcontainer,
                {borderBottomWidth: 0, marginVertical: responsiveHeight(1)},
              ]}>
              <View style={styles.titleheadingcontain}>
                {/* <View><Text style={{color:"#fff"}}>Muhammad Ibrahim Khan</Text></View> */}
                <View>
                  <Text
                    style={[
                      styles.heading,
                                        {
                                            fontSize: responsiveFontSize(2.4),
                                           
                                        },
                    ]}>
                    {name}
                  </Text>
                </View>
              </View>
            </View>
  
            {/*=====================language=========================*/}
            <View style={styles.boxcontainer}>
              <View style={styles.titleheadingcontain}>
                <View>
                  <Image
                    resizeMode="contain"
                    source={images.notifications}
                    style={styles.logoicons}
                  />
                </View>
                <View>
                 
                    <Text style={styles.heading}>Push Notifications</Text>
                
                </View>
              </View>
              <TouchableOpacity style={styles.titleheadingcontain}>
                <View>
                  <ToggleSwitch
                    isOn={isEnabled}
                    onColor={"black"}
                    offColor="#d5d5d5"
                    trackOnStyle={{transform: [{scaleY: 0.9}, {scaleX: 0.9}]}}
                    trackOffStyle={{transform: [{scaleY: 0.9}, {scaleX: 0.9}]}}
                    labelStyle={{color: 'black', fontWeight: '900'}}
                    size="medium"
                    thumbOffStyle={{
                      backgroundColor: colors.btncolor,
                    }}
                    onToggle={handleLanguageToggle}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.boxcontainer}>
              <View style={styles.titleheadingcontain}>
                <View>
                  <Image
                    tintColor={"black"} 
                    resizeMode="contain"
                    source={images.about}
                    style={styles.logoicons}
                  />
                </View>
                <View>
        
                    <Text style={styles.heading}>About application</Text>
              
                </View>
              </View>
              <View style={styles.titleheadingcontain}>
                <View>
                    <Image
                    tintColor={"black"}    
                    resizeMode="contain"
                    source={images.arrowRight}
                    style={styles.arrowicon}
                  />
                </View>
              </View>
            </TouchableOpacity>
  
            {/*=================Help================*/}
            <TouchableOpacity style={styles.boxcontainer}>
              <View style={styles.titleheadingcontain}>
                <View>
                  <Image
                    tintColor={"black"} 
                    resizeMode="contain"
                    source={images.help}
                    style={styles.logoicons}
                  />
                </View>
                <View>
                    <Text style={styles.heading}>Help</Text>

                </View>
              </View>
              <View style={styles.titleheadingcontain}>
                <View>
                    <Image
                    tintColor={"black"} 
                    resizeMode="contain"
                    source={images.arrowRight}
                    style={styles.arrowicon}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  };
  
  export default SettingsHome;
  
  const styles = StyleSheet.create({
    boxcontainer: {
      height: responsiveHeight(9),
      borderBottomWidth: responsiveWidth(0.2),
    //   borderColor: colors.btncolor,
      flexDirection: 'row',
      gap: responsiveWidth(3),
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    logoicons: {
    height: responsiveHeight(3),
    width: responsiveHeight(3),
     
     
    },
    arrowicon: {
      height: responsiveHeight(3),
      width: responsiveHeight(3),
    },
    titleheadingcontain: {
      flexDirection: 'row',
      gap: responsiveWidth(3),
      alignItems: 'center',
    },
    heading: {
      fontFamily: 'Poppins-Light',
      fontSize: responsiveFontSize(2.1),
      color: 'black',
    },
  });
