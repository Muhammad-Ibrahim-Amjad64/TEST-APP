/* eslint-disable prettier/prettier */
// AIzaSyBnu0rp2QwuH1fk3Psydo_H9i5RL20hRHc




import axios from 'axios';

const API_KEY = 'AIzaSyBnu0rp2QwuH1fk3Psydo_H9i5RL20hRHc';

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  const token = response.data.idToken;
  console.log(response, "authResponse")
  return token;
}
export function createUser(email, password) {
  return authenticate('signUp', email, password);
}

export function login(email, password) {
  return authenticate('signInWithPassword', email, password);
}


