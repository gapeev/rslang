import axios from 'axios';
export const baseUrl = 'https://learnwords-team31.herokuapp.com';
export const instanceAxios = axios.create({
  baseURL: `${baseUrl}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
