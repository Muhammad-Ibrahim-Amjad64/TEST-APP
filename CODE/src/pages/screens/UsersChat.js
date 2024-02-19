/* eslint-disable prettier/prettier */

//  I WILL UTILIZE THIS SCREEN FOR CHATTIING OF USERS TO MAKE MESSENGER LIKE APP
import { useEffect, useState, useContext } from 'react';
import * as React  from 'react';
import axios from 'axios';
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchUsers } from '../../Utils/Api';
import logo from "../../Assets/logo.png"
import { AuthContext } from '../../store/auth-context';

const UsersChat = () => {
  const authCtx = useContext(AuthContext)
  const fetchedid = authCtx.userID
  const navigation = useNavigation()
const [users, setUsers] = useState(null)

useEffect(()=>{
  const getUsers = async () => {
   try {
     const res = await fetchUsers();
     const usersList = Object?.entries(res)?.map(([userId, userData]) => 
      
       ({
         id: userId,
         email: userData.email,
         name: userData.name,
         password: userData.password
       })
     );
  
     setUsers(usersList);
    console.log(res.data,"res")

   } catch (error) {
    console.log(error);
   }
  }

},[])
  
  const handleChat = (name) => {
    console.log(name, "name ")
    const props = {
      name,
    };
    navigation.navigate("UserChat")
  };
  const renderItem = ({ item }) =>
 
  {
    if (item.id===fetchedid) {
      return
    }
    return (
      <TouchableOpacity onPress={() => handleChat(item.name)} style={{ flexDirection: 'row', padding: 10, alignItems: "center" }}>
        <Image
          source={logo}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ color: "black", fontWeight: "bold" }}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    )
  };
 
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default UsersChat;
const styles = StyleSheet.create({
  
});
