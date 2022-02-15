import axios from 'axios';

const loadStat = (url: string, TOKEN: string) => {
  const config = {
    headers: { Authorization: `Bearer ${TOKEN}` },
  };
  return axios.get(url, config);
};

export { loadStat };
