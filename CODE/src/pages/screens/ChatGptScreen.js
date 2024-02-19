/* eslint-disable prettier/prettier */
import axios from 'axios'; 
import { OPENAI_KEY } from '@env';
// console.log( process.env.OPENAI_KEY, "openaikeu from env ")
const instance = axios.create({
  baseURL: 'https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_KEY}`
  }
});

export const generateResponse = async (message) => {
  try {
    const response = await instance.post('', {
      prompt: message,
      max_tokens: 60

    });
    return response.data.choices[0].text;
  } catch (error) {
    console.error(error);
    return '';
  }
};