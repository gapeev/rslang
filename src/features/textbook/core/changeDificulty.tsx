import { userWord } from '../interfaces';
import { createWord, updateWord } from '../request/updateData';
const changeDificulty = (
  BASEURL: string,
  dificulty: string,
  userWord: userWord,
  USERID: string,
  TOKEN: string,
  wordID: string | undefined
) => {
  if (!userWord) {
    createWord(BASEURL + `users/${USERID}/words/${wordID}`, TOKEN, dificulty);
  } else {
    userWord.difficulty = dificulty;
    updateWord(BASEURL + `users/${USERID}/words/${wordID}`, TOKEN, userWord);
  }
};
export default changeDificulty;
