/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { images } from '../../Utils/constants/Themes';
// import firebase from 'firebase/app';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {getMessages} from '../../Utils/Api';
import { postMessage } from '../../Utils/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserChat = () => {
  // const firebaseStore = firebase.initializeApp();
  // const [messages, setM?essages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [userMessages, setUserMessages] = useState('');
  const [senderId, setSenderId] = useState('');
  const [name, setName] = useState('')
 

  useEffect(() => {
    const getData = async () => {
      try {
        const [id, name] = await Promise.all([
          AsyncStorage.getItem('id'),
          AsyncStorage.getItem('name')
        ]);
        setName(name);
        setSenderId(id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    getData();
  }, []);
  
  const renderItem = ({ item }) => {

    return (
      <>

      <View style={item.sender_id===senderId? styles.MessageContainer:styles.ReceiverContainer}>
        <Text
          style={item.sender_id===senderId? styles.gptText:styles.receiverText}
          key={`${item.sender_id}  ${item.timestamp}`}>
          {item.content}
        </Text>
        </View>
        {item.sender_id===senderId?   <Text style={{ marginRight: responsiveWidth(2), alignSelf:"flex-end" }}>{name}</Text>:<Text style={{ marginLeft: responsiveWidth(2) ,  alignSelf:"flex-start" }}>{item.name}</Text>}
     
            </>

    );
  };

  const sendMessage = async () => {
    if (userInput === "") {
      return;
    }
    setUserMessages(userInput);
    setUserInput('');
    const result = await postMessage(userInput,senderId);
    console.log(result, 'posted successfully');
    // const res = await getMessages();
    // setUserMessages(res)

  };

  useEffect(() => {
    const FetchMessages = async () => {
      try {
        const res = await getMessages();
        // console.log(res, 'fetchd Response');
        if (res) {
          setUserMessages(res)

        }
      } catch (error) {
        console.log(error);
      }
    };
    setInterval(() => {
      FetchMessages()
 
}, 5000) 

  },[]);   
console.log(userMessages, "userMesages")
  return (
    <View style={styles.container}>
      <FlatList
        style={{height: '80%'}}

        data={Object?.values(userMessages).reverse()} 
        renderItem={renderItem} 
        inverted={true}
        keyExtractor={(item, index) => index.toString()} 
      />  
      <View style={styles.inputContainer}>
        <TextInput  
          style={styles.TextInput}
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Type a message"
        />
        <TouchableOpacity style={styles.button} onPress={sendMessage}>
          <Image style={styles.rightArrow} source={images.arrowRight}></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserChat;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'flex-start',
  },
  rightArrow: {
    height: responsiveHeight(2.2),
    width: responsiveWidth(5),
  },

  button: {
    borderRadius: responsiveWidth(100),
    height: responsiveHeight(7),
    width: responsiveWidth(13),
    backgroundColor: 'black',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextInput: {
    height: responsiveHeight(7),
    width: responsiveWidth(80),
    borderRadius: responsiveWidth(30),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: responsiveFontSize(2),
    backgroundColor: '#ebebeb',
  },
  chatText: {
    fontSize: responsiveFontSize(2),
    margin: 2,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    height: 'auto',
    backgroundColor: '#eaeaea',
    color: 'black',
  },
  gptText: {
    fontSize: responsiveFontSize(2),
    marginVertical: responsiveWidth(3),
    width: '95%',
    alignSelf: 'center',
    color: 'white',
  },

  receiverText: {
    fontSize: responsiveFontSize(2),
    marginVertical: responsiveWidth(3),
    width: '95%',
    alignSelf: 'center',
    color: 'black',
  },
  MessageContainer: {
    borderRadius: responsiveWidth(2),
    width: '85%',
    alignSelf: 'flex-end',
    marginTop: responsiveWidth(2),
    marginRight: responsiveWidth(2),
    height: 'auto',
    backgroundColor: 'black',
    color: 'white',
  },
  ReceiverContainer:{
    borderRadius: responsiveWidth(2),
    width: '85%',
    alignSelf: 'flex-start',
    marginTop: responsiveWidth(2),
    marginLeft: responsiveWidth(2),
    height: 'auto',
    backgroundColor: '#e0e0e0',
    color: '#000000',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: responsiveWidth(2),
  },
});
