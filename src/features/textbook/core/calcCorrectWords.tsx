import { userWord, word } from '../interfaces';

const calcCorrectWords = (pageWords: word[], userWords: userWord[]): number => {
  let counter = 0;
  pageWords.forEach((word) => {
    userWords.forEach((el) => {
      if (word.id === el.wordId && el.difficulty === 'easy') {
        counter += 1;
      }
    });
  });
  return counter;
};
export default calcCorrectWords;
