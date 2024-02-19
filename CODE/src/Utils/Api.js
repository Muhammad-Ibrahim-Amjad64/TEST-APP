/* eslint-disable prettier/prettier */
import axios from 'axios'
import { Backend_URL } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const fetchUsers = async () => {
     try {
        const res = await axios.get(`${Backend_URL}/Users.json`)
        return res.data
     } catch (error) {
        console.log(error)
     }

}

export const postUsers = async ( email, password, name) => {
    try {
        const body =  {
            email,
            name:name?name:"guest",
           password
        }
       const res = await axios.post(`${Backend_URL}/Users.json`,body)
       return res.data.name
    } catch (error) {
       console.log(error, "error here")
    }
}

export const updateUsersName = async (name) => {
   try {
      const id = await AsyncStorage.getItem('id')
     const body = {
       name,
     };
     const res = await axios.patch(
       `Backend_URL/Users/${id}.json`,
       body,
     );
     return res.data.name;
   } catch (error) {
     console.log(error, 'error here');
   }
 };
 
export const updatePhote = async (imgUri) => {
   const id = await AsyncStorage.getItem('id')
   console.log(id, "id fetched from local storage")
   try {
     const body = {
        imgUri
     };
     const res = await axios.patch(
       `${Backend_URL}/Users/${id}.json`,
       body,
     );
     return res.data.name;
   } catch (error) {
     console.log(error, 'error here');
   }
};
 

export const getMessages = async () => {
   try {
      const res = await axios.get(`${Backend_URL}/messages.json`)
      return res.data;
   } catch (error) {
      console.log(error);
   }

}

export const postMessage = async (content, sender_id) => {
   try {
      const name = await AsyncStorage.getItem('name')
      const body = {
         content,
         name,
         sender_id,
         timestamp: new Date()
      }
      const res = await axios.post(`${Backend_URL}/messages.json`, body);
      return res.data.name;
   } catch (error) {
      console.log(error, "error here")
   }
}

