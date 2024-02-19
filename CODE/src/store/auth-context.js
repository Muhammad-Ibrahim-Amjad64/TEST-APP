/* eslint-disable prettier/prettier */
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  token: '',
  userID: '',
  // name: '',
  // uri:'',
  setUserId: (id)=>{},
  authenticate: (token) => {},
  logout: () => {},

});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState("");
  const [userId, setUserID] = useState("")


  function authenticate(token) {
    setAuthToken(token);

  }
  function setUserId(id) {
    setUserID(id);
  
  }

  function logout() {
    setAuthToken(null);

  }
  // function setUsername(updatedName) {
  //   console.log("this called")
  //   setName(updatedName);

  // }
  // function setUri(updatedUri) {
  //  setImageUri(updatedUri)

  // }


  const value = {
    token: authToken,
    userID: userId,
    // name: name, 
    // uri:imageUri,
    setUserId:setUserId,
    authenticate: authenticate,
    logout: logout,
    // setUri: setUri,
    // setUsername: setUsername
    
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
