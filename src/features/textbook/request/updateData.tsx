import axios from 'axios';
import { userWord } from '../interfaces';
const updateWord = (url: string, TOKEN: string, user: userWord) => {
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  const data = {
    difficulty: user.difficulty,
  };
  axios.put(url, data, config);
};
const createWord = (url: string, TOKEN: string, difficulty: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  const data = {
    difficulty: difficulty,
  };
  axios.post(url, data, config);
};
export { updateWord, createWord };
