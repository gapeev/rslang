import axios from 'axios';
const updateWord = (url: string, TOKEN: string) => {
  const config = {
    headers: { Authorization: `Bearer ${TOKEN}` },
  };
  return axios.get(url, config);
};
const createWord = (url: string, TOKEN: string) => {
  const config = {
    headers: { Authorization: `Bearer ${TOKEN}` },
  };
  return axios.get(url, config);
};
export { updateWord, createWord };
