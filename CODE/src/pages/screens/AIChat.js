/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import {images} from "../../Utils/constants/Themes"
import { responsiveFontSize, responsiveHeight,responsiveWidth } from 'react-native-responsive-dimensions';
import {generateResponse} from './ChatGptScreen';
const AIChat = () => {

  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  

  const sendMessage = async () => {
    if (!userInput) return;

    // setMessages(prevMessages => [...prevMessages, `You\n  ${userInput}`]);
    setMessages(prevMessages => [...prevMessages,  { sender: 'user', message: userInput }]);
    const botResponse = await generateResponse(userInput);
    setMessages(prevMessages => [...prevMessages, { sender: 'bot', message: botResponse }]);
    setUserInput('');
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        {!messages.length&&<Image source={images.ai} style={{width:responsiveWidth(22), height:responsiveHeight(12), alignSelf:"center", marginTop:responsiveWidth(50)}}></Image>}
        {messages.map((msg, index) => {
          if (msg.sender==='user') {
            return<Text style={styles.chatText} key={`${index}${msg.message}`}>{msg.message}</Text>
              
          } else if(msg.sender==='bot') {
            return<Text style={styles.gptText} key={`${index}${msg.message}`}>{msg.message}</Text>
              
          }
        })}
    </ScrollView> 
    <View style={styles.inputContainer}>
        <TextInput 
          style={styles.TextInput}
        value={userInput}
        onChangeText={setUserInput}
        placeholder="Type a message"
      />
              <TouchableOpacity style={styles.button} onPress={sendMessage} ><Image style={styles.rightArrow} source={images.arrowRight}></Image></TouchableOpacity>
    </View>
  </View>
  );
};

export default AIChat;
const styles = StyleSheet.create({
  container:{
    flex: 1, 
    backgroundColor:"#ffffff"
    },
    rightArrow: {
        height:responsiveHeight(2.2),
        width:responsiveWidth(5),
    },

    button: {
    borderRadius:responsiveWidth(100),
    height:responsiveHeight(7),
    width:responsiveWidth(13),
    backgroundColor: "black",
    color: "white",
    justifyContent: "center",
    alignItems:"center"
  },
  TextInput: {
    height: responsiveHeight(7),
    width: responsiveWidth(80),
    borderRadius: responsiveWidth(30),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: responsiveFontSize(2),
    backgroundColor:"#ebebeb"
  }, 
  chatText: {
    paddingVertical: responsiveHeight(2),
    paddingLeft:responsiveHeight(1),
    fontSize: responsiveFontSize(2),
    borderRadius: responsiveHeight(3) ,
    margin: 2,
    width: "90%",
    alignSelf: "flex-end",
    marginRight:responsiveWidth(2),
    marginTop: 20, 
    height: "auto",
    backgroundColor: "#eaeaea",
    color:"black"
   
  }, 
  gptText: {
    paddingLeft:responsiveHeight(1),
    fontSize: responsiveFontSize(2),
    paddingBottom: responsiveHeight(2),
    borderRadius: responsiveHeight(3) ,
    borderWidth: 1,
    width: "90%",
    alignSelf: "flex-start",
    marginLeft:responsiveWidth(2),
    marginTop: responsiveWidth(2), 
    height: "auto",
    backgroundColor: "black",
    color:"white"
  }, inputContainer:{flexDirection:"row", justifyContent:"space-around", alignItems:"center", marginVertical:responsiveWidth(2)}
});
