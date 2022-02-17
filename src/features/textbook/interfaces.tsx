export interface word {
  _id?: string | undefined;
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
}
export interface userWord {
  id: string;
  difficulty: string;
  wordId: string;
  optional: {
    rightCount: number;
    wrongCount: number;
    rightRow: number;
  };
}
export interface CardParam {
  id: string;
  _id: string | undefined;
  word: string;
  group: string;
  url: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
  userWords: userWord[];
  TOKEN: string;
  USERID: string;
  AUTH: boolean;
  category: number;
  stateCorrect: number;
  stateSetCorrect: React.Dispatch<React.SetStateAction<number>>;
  setAduioList: React.Dispatch<React.SetStateAction<string[]>>;
  allWords: word[];
  wrongWords: number;
  setWrongWords: React.Dispatch<React.SetStateAction<number>>;
  setAllWords: React.Dispatch<React.SetStateAction<word[]>>;
}
