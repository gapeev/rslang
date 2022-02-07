import axios from 'axios';

const loadWords = (url: string) => {
  return axios.get(url);
};

const loadUserWords = (url: string, TOKEN: string) => {
  const config = {
    headers: { Authorization: `Bearer ${TOKEN}` },
  };
  return axios.get(url, config);
};
const loadHardWords = (url: string, TOKEN: string) => {
  const config = {
    headers: { Authorization: `Bearer ${TOKEN}` },
  };
  return axios.get(url, config);
};
export { loadWords, loadUserWords, loadHardWords };
