import { createSlice } from '@reduxjs/toolkit';

export interface ISprintGame {
  words: IPairOfGame[];
  group: number;
}
export interface IPairOfGame {
  isTruth: boolean;
  word: string;
  translate: string;
}

const initialState: ISprintGame = {
  words: [],
  group: 0,
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
  },
});

export const { setPairOfGame, setGroupGame } = sprintSlice.actions;
export default sprintSlice.reducer;
