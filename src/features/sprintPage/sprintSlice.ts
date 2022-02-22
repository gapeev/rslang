import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ISprintStat } from '../../common/Interfaces';
import { UserWord } from '../audiochallenge/audiochallengeSlice';
import { User } from '../stat/statSlice';
import { fetchUserWords, postUserWords, putUserWords } from './sprintApi';

export interface ISprintGame {
  words: IPairOfGame[];
  wordsUser: UserWord[];
  group: number;
  page: number;
  isTextBook: boolean;
  isStart: boolean;
  isFinish: boolean;
  stat: ISprintStat;
}
export interface IPairOfGame {
  isTruth: boolean;
  word: string;
  translate: string;
  idWord: string;
}

const initialState: ISprintGame = {
  words: [],
  wordsUser: [],
  group: 0,
  page: 0,
  isTextBook: false,
  isStart: false,
  isFinish: false,
  stat: {
    lastChanged: '',
    learnedWords: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    longestSeries: 0,
    currentSeries: 0,
    answersCount: 0,
    newWords: 0,
  },
};

export const startSprint = createAsyncThunk(
  'sprint/startSprint',
  async (user: User) => {
    let words: UserWord[];
    try {
      words = user.isAuth ? await fetchUserWords(user) : [];
      return words;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
);

export const sprintSlice = createSlice({
  name: 'sprint',
  initialState,
  reducers: {
    setUserWords(state, action: PayloadAction<{ word: UserWord; user: User }>) {
      const user = action.payload.user;
      const word = action.payload.word;
      if (user.isAuth) postUserWords(user, word);

      state.wordsUser.push(word);
    },
    updateUserWords(
      state,
      action: PayloadAction<{ word: UserWord; user: User }>
    ) {
      const user = action.payload.user;
      const word = action.payload.word;
      if (user.isAuth) {
        putUserWords(user, word).then(() => {
          state.wordsUser = [...state.wordsUser];
        });
      }
    },
    setPairOfGame(state, action) {
      return { ...state, words: [...state.words, ...action.payload] };
    },
    setGroupGame(state, action) {
      state.group = action.payload;
    },
    setPageGame(state, action) {
      state.page = action.payload;
    },
    setIsTextBook(state, action) {
      state.isTextBook = action.payload;
    },
    setStartGame(state, action) {
      return { ...state, isStart: action.payload };
    },
    setFinishGame(state, action) {
      state.isFinish = action.payload;
    },
    setGameAgain(state) {
      state.words = [];
      state.isStart = false;
      state.isFinish = false;
      state.stat.correctAnswers = 0;
      state.stat.wrongAnswers = 0;
      state.stat.currentSeries = 0;
      state.stat.answersCount = 0;
      state.stat.newWords = 0;
    },

    incrAnswersCount(state) {
      state.stat.answersCount = state.stat.answersCount + 1;
    },
    incrCorrectAnswers(state) {
      state.stat.correctAnswers = state.stat.correctAnswers + 1;
    },
    incrWrongAnswers(state) {
      state.stat.wrongAnswers = state.stat.wrongAnswers + 1;
    },
    incrCurrentSeries(state) {
      state.stat.currentSeries = state.stat.currentSeries + 1;
    },
    resetCurrentSeries(state) {
      state.stat.currentSeries = 0;
    },
    setLongestSeries(state, action) {
      state.stat.longestSeries = action.payload;
    },
    incrNewWords(state) {
      state.stat.newWords += 1;
    },
    incrLearnedWord(state) {
      state.stat.learnedWords = state.stat.learnedWords + 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(startSprint.fulfilled, (state, action) => {
      state.wordsUser = action.payload;
    });
  },
});

export const {
  setUserWords,
  updateUserWords,
  setPairOfGame,
  setGroupGame,
  setPageGame,
  setStartGame,
  setGameAgain,
  setIsTextBook,
  incrAnswersCount,
  incrCorrectAnswers,
  incrWrongAnswers,
  incrCurrentSeries,
  resetCurrentSeries,
  setLongestSeries,
  setFinishGame,
  incrNewWords,
  incrLearnedWord,
} = sprintSlice.actions;
export default sprintSlice.reducer;
