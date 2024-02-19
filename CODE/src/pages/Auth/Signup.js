/* eslint-disable prettier/prettier */
import {
  Alert,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useContext} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {postUsers} from '../../Utils/Api';
import {images} from '../../Utils/constants/Themes';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {createUser} from '../../Utils/auth';
import {AuthContext} from '../../store/auth-context';
import {Formik} from 'formik';
import { signupSchema } from '../../Schemas/SignupShema';
import Loading from '../../components/common/Loading/Loading';

const Signup = () => {
  const navigation = useNavigation();
  
  const [loading, setLoading] = useState(false);
  
  // const [name, setName] = useState("")

  const authCtx = useContext(AuthContext);

  const handleSignup = async (email, password) => {
    setLoading(true)
    try {
      console.log(email, password, 'email and password');
  
      const res = await createUser(email, password);


      if (res) {
        console.log('Signed up');
        navigation.navigate('Login');
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
      Alert.alert('Invalid Credentials', 'Please Enter a valid  email.');
    }
  };

  if (loading) {
    return<Loading/>
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
              navigation.navigate('Login');
            }}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={images.AuthLogo}
          resizeMode="cover"
          style={{
            marginTop: responsiveWidth(15),
            borderRadius: responsiveHeight(100),
            marginBottom: responsiveWidth(15),
            width: responsiveWidth(40),
            height: responsiveWidth(40),
            alignSelf: 'center',
          }}></Image>
        <Formik
          initialValues={{email: '', password: '', confirmPassword: ''}}
          validationSchema={signupSchema}
          onSubmit={values => handleSignup(values.email, values.password)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={{flex: 0.66}}>
              <View>
                <Text style={styles.txt_intro}>Sign Up</Text>
              </View>
              <View
                style={{
                  gap: 10,
                  alignSelf: 'center',
                  marginTop: responsiveHeight(3),
                }}>
                <View style={styles.txt_input}>
                  <TextInput
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    placeholder="Your Email"
                    placeholderTextColor={'#000'}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.error}>{errors.email}</Text>
                  )}
                </View>
                <View style={styles.txt_input}>
                  <TextInput
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    placeholder="Password"
                    placeholderTextColor={'#000'}
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.error}>{errors.password}</Text>
                  )}
                </View>
                <View style={styles.txt_input}>
                  <TextInput
                    placeholder="Confirm Password"
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    placeholderTextColor={'#000'}
                    value={values.confirmPassword}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text style={styles.error}>{errors.confirmPassword}</Text>
                  )}
                </View>
              </View>
              <TouchableOpacity onPress={handleSubmit}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#232323', '#020f00']}
                  style={styles.linearGradient}>
                  <Text style={[styles.btnText]}>Sign Up</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  txt_intro: {
    color: '#000',
    fontFamily: 'Taviraj-Regular',

    textAlign: 'center',
    fontSize: responsiveFontSize(4),
  },
  error: {
    color: 'red',
    // marginBottom:responsiveHeight(10)
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
    flex: 0.1,
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
  back: {
    height: responsiveHeight(4),
    width: responsiveWidth(8),
    top: responsiveHeight(4),
  },
});
