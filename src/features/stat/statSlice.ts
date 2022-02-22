import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Statistics } from './types';
import { getStatistics, setStatistics } from './statAPI';
import { getCurrentDateForStatistics, getEmptyStatistics } from './utils';
import { RIGHT_ANSWERS_ROW_TO_EASY } from '../audiochallenge/constants';

export interface User {
  id: string;
  token: string;
  isAuth: boolean;
}

export type Game = 'audiochallenge' | 'sprint';

export interface StatState {
  user: User;
  statistics: Statistics;
}

export interface StatWordPayload {
  game: Game;
  isNew: boolean;
  rightRow: number;
  isEasy: boolean;
  isRight: boolean;
}

const initialState: StatState = {
  user: {
    id: '',
    token: '',
    isAuth: false,
  },
  statistics: getEmptyStatistics(),
};

export const statInit = createAsyncThunk(
  'stat/statInit',
  async ({ user }: { user: User }) => {
    const statistics = user.isAuth
      ? await getStatistics(user)
      : getEmptyStatistics();
    return { user, statistics };
  }
);

export const statSlice = createSlice({
  name: 'stat',
  initialState,
  reducers: {
    statWord: (state, action: PayloadAction<StatWordPayload>) => {
      if (!state.user.isAuth) {
        return;
      }

      const { game, isNew, rightRow, isEasy, isRight } = action.payload;
      const date = getCurrentDateForStatistics();

      const gameStatistics =
        game === 'audiochallenge'
          ? state.statistics.optional.gameStatistics.audiochallenge
          : state.statistics.optional.gameStatistics.sprint;

      const { newWordStatistics, wordStatistics } = state.statistics.optional;

      if (date !== gameStatistics.lastChanged) {
        gameStatistics.newWords = 0;
      }

      gameStatistics.lastChanged = date;
      gameStatistics.correctAnswers += Number(isRight);
      gameStatistics.wrongAnswers += Number(!isRight);
      gameStatistics.answersCount += 1;
      if (isNew) {
        newWordStatistics[date] = (newWordStatistics[date] ?? 0) + 1;
        gameStatistics.newWords += 1;
      }

      if (isRight) {
        gameStatistics.currentSeries += 1;
        if (gameStatistics.currentSeries > gameStatistics.longestSeries) {
          gameStatistics.longestSeries = gameStatistics.currentSeries;
        }
      } else {
        gameStatistics.currentSeries = 0;
      }

      if (rightRow >= RIGHT_ANSWERS_ROW_TO_EASY - 1 && isRight && !isEasy) {
        const lastKey = Object.keys(wordStatistics);
        const lastValue = wordStatistics[lastKey[lastKey.length - 1]] || 0;
        wordStatistics[date] = lastValue + 1;
        gameStatistics.learnedWords += 1;
      }

      if (isEasy && !isRight) {
        const lastKey = Object.keys(wordStatistics);
        const lastValue = wordStatistics[lastKey[lastKey.length - 1]] || 0;
        wordStatistics[date] = lastValue - 1;
        gameStatistics.learnedWords -= 1;
      }

      setStatistics(state.statistics, state.user);
    },
    statLearnedWord: (state, action: PayloadAction<boolean>) => {
      const date = getCurrentDateForStatistics();

      state.statistics.optional.wordStatistics[date] =
        (state.statistics.optional.wordStatistics[date] ?? 0) +
        (action.payload ? 1 : -1) * 1;

      setStatistics(state.statistics, state.user);
    },
    setStatSprint(state, action) {
      state.statistics.optional.gameStatistics.sprint = action.payload;
      //setStatistics(state.statistics, state.user);
    },
    /*  setNewWord(state) {
      const date = getCurrentDateForStatistics();
      state.statistics.optional.newWordStatistics[date] += 1;
      setStatistics(state.statistics, state.user);
    }, */
    /*  setLearnedWord(state, action) {
      state.statistics.optional.gameStatistics.sprint.learnedWords += 1;
      setStatistics(state.statistics, state.user);
    }, */
  },
  extraReducers: (builder) => {
    builder.addCase(statInit.fulfilled, (state, action) => {
      const { user, statistics } = action.payload;
      state.user = user;
      state.statistics = statistics;
    });
  },
});

export const { statWord, statLearnedWord, setStatSprint } = statSlice.actions;

export const selectStatState = (state: RootState) => state.stat.statistics;

export default statSlice.reducer;
