import { createSlice } from '@reduxjs/toolkit';
import { ISprintStat, SprintStat } from '../../common/Interfaces';

export interface ISprintGame {
  words: IPairOfGame[];
  group: number;
  isStart: boolean;
  stat: ISprintStat;
}
export interface IPairOfGame {
  isTruth: boolean;
  word: string;
  translate: string;
}

const initialState: ISprintGame = {
  words: [],
  group: 0,
  isStart: false,
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

export const sprintSlice = createSlice({
  name: 'sprintSlice',
  initialState,
  reducers: {
    setPairOfGame(state, action) {
      return { ...state, words: [...state.words, ...action.payload] };
    },
    setGroupGame(state, action) {
      state.group = action.payload;
    },
    setStartGame(state, action) {
      return { ...state, isStart: action.payload };
    },
    setGameAgain(state) {
      state.stat.correctAnswers = 0;
      state.stat.wrongAnswers = 0;
      state.stat.currentSeries = 0;
      state.stat.answersCount = 0;
      state.stat.newWords = 0;
      return {
        ...state,
        words: initialState.words,
        isStart: initialState.isStart,
      };
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
  },
});

export const {
  setPairOfGame,
  setGroupGame,
  setStartGame,
  setGameAgain,
  incrAnswersCount,
  incrCorrectAnswers,
  incrWrongAnswers,
  incrCurrentSeries,
  resetCurrentSeries,
  setLongestSeries,
} = sprintSlice.actions;
export default sprintSlice.reducer;
