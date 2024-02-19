/* eslint-disable prettier/prettier */
import {
  Image,
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {login} from '../../Utils/auth';
import LinearGradient from 'react-native-linear-gradient';
import {Formik} from 'formik';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../store/auth-context';
import {images} from '../../Utils/constants/Themes';
import {postUsers} from '../../Utils/Api';
import {loginSchema} from '../../Schemas/LoginSchema';
import Loading from '../../components/common/Loading/Loading';
const Login = props => {
  const [loading, setLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();
  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
  
      // Execute both login and postUsers concurrently using Promise.all
      const [resToken, id] = await Promise.all([
        login(email, password),
        postUsers(email, password)
      ]);
  
      // Authenticate user
      authCtx.authenticate(resToken);
  
      // Set user id in AsyncStorage
      await AsyncStorage.setItem('id', id.toString());
      authCtx.setUserId(id);
  
      console.log(resToken);
      console.log(id, 'new generated id');
  
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      Alert.alert(
        'Invalid Credentials',
        'Please enter a valid email and password',
      );
    }
  };
  
  if (loading) {
    return <Loading />;
  }
  return (
    <ScrollView
      style={{
        flex: 1,
      }}>
      <KeyboardAvoidingView>
        <StatusBar
          translucent={true}
          barStyle={'dark-content'}
          backgroundColor={'transparent'}
        />

        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Signup');
            }}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={images.AuthLogo}
          resizeMode="cover"
          style={{
            marginTop: responsiveWidth(15),
            // top:responsiveWidth(20),
            borderRadius: responsiveHeight(100),
            marginBottom: responsiveWidth(15),
            width: responsiveWidth(40),
            height: responsiveWidth(40),
            alignSelf: 'center',
          }}></Image>
        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={loginSchema}
          onSubmit={values => handleLogin(values.email, values.password)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View
              style={{
                flex: 0.8,
                height: 'auto',
              }}>
              <View>
                <Text style={styles.txt_intro}>Login</Text>
              </View>
              <View
                style={{
                  gap: 20,
                  alignSelf: 'center',
                  marginTop: responsiveHeight(5),
                }}>
                <View style={styles.txt_input}>
                  <TextInput
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    placeholder="Your Email"
                    placeholderTextColor={'#000'}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.error}>{errors.email}</Text>
                  )}
                </View>
                <View style={styles.txt_input}>
                  <TextInput
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    placeholder="Password"
                    placeholderTextColor={'#000'}
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.error}>{errors.password}</Text>
                  )}
                </View>
              </View>

              <TouchableOpacity onPress={handleSubmit}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#232323', '#020f00']}
                  style={styles.linearGradient}>
                  <Text style={[styles.btnText]}>Login</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
export default Login;

const styles = StyleSheet.create({
  txt_intro: {
    color: '#000',
    fontFamily: 'Taviraj-Regular',
    textAlign: 'center',
    fontSize: responsiveFontSize(4.5),
  },
  error: {
    color: 'red',
  },

  linearGradient: {
    height: responsiveHeight(7),
    width: responsiveWidth(85),
    borderRadius: responsiveWidth(30),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: responsiveHeight(4),
  },
  btnText: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonText: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(6),
    paddingTop: responsiveHeight(4),
    flex: 0.2,
  },
  txt_input: {
    height: responsiveHeight(8),
    width: responsiveWidth(85),
    borderWidth: responsiveWidth(0.2),
    borderColor: '#000',
    borderRadius: responsiveWidth(30),
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(5),
  },
});
