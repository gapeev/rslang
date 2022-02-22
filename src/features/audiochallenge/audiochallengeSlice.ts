import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { addUserWord, fetchWords, updateUserWord } from './audiochallengeAPI';
import { shuffle } from './utils';
import { RIGHT_ANSWERS_ROW_TO_EASY, WRONG_ANSWERS_COUNT } from './constants';

export type Difficulty = 'easy' | 'normal' | 'hard';

export interface Optional {
  rightCount: number;
  wrongCount: number;
  rightRow: number;
}

export interface Word {
  _id: string;
  id: string;
  word: string;
  wordTranslate: string;
  isRight: boolean;
  audio: string;
  image: string;
  wordId: string;
  difficulty?: Difficulty;
  optional: Optional;
  userWord: {
    difficulty: Difficulty;
    optional: Optional;
  };
  isNew: boolean;
}

export interface UserWord {
  id: string;
  wordId: string;
  difficulty?: Difficulty;
  optional: Optional;
}

export interface Answer {
  index: number;
  isRight: boolean;
}

export interface AggregationResponse {
  paginatedResults: Word[];
}

export interface AudiochallengeState {
  gameState: 'stop' | 'question' | 'answer' | 'over';
  words: Word[];
  wordSets: Array<Word[]>;
  currentWordIndex: number;
  answers: Answer[];
}

export interface User {
  id: string;
  token: string;
  isAuth: boolean;
}

const initialState: AudiochallengeState = {
  gameState: 'stop',
  words: [],
  wordSets: [],
  currentWordIndex: 0,
  answers: [],
};

export const startGame = createAsyncThunk(
  'audiochallenge/startGame',
  async ({
    group,
    page,
    user,
  }: {
    group: number;
    page: number;
    user: User;
  }) => {
    const words = shuffle<Word>(await fetchWords(group, page, user));

    const wordSets = words.map((mainWord) => {
      const restWords = shuffle<Word>(
        words.filter((additionalWord) => additionalWord.id !== mainWord.id)
      ).slice(0, WRONG_ANSWERS_COUNT);
      return shuffle<Word>([
        { ...mainWord, isRight: true },
        ...restWords.map((word) => ({ ...word, isRight: false })),
      ]);
    });

    return { group, page, words: words, wordSets };
  }
);

export const audiochallengeSlice = createSlice({
  name: 'audiochallenge',
  initialState,
  reducers: {
    resetGame: (state) => {
      state.gameState = initialState.gameState;
      state.currentWordIndex = initialState.currentWordIndex;
      state.answers = [];
    },
    setAnswer: (state, action: PayloadAction<Answer & { user: User }>) => {
      const { index, isRight, user } = action.payload;
      state.answers.push({ index, isRight });
      state.gameState = 'answer';

      if (!user.isAuth) {
        return;
      }

      const word = state.words[state.currentWordIndex];
      const setUserWord = word.difficulty ? updateUserWord : addUserWord;

      const newRightCount = word.optional.rightCount + (isRight ? 1 : 0);
      const newWrongCount = word.optional.wrongCount + (isRight ? 0 : 1);
      const newRightRow = isRight ? word.optional.rightRow + 1 : 0;

      let newDifficulty =
        newRightRow >= RIGHT_ANSWERS_ROW_TO_EASY ? 'easy' : word.difficulty;
      newDifficulty =
        newRightRow === 0 && word.difficulty !== 'hard'
          ? 'normal'
          : newDifficulty;

      setUserWord(
        {
          ...word,
          difficulty: newDifficulty || 'normal',
          optional: {
            ...word.optional,
            rightCount: newRightCount,
            wrongCount: newWrongCount,
            rightRow: newRightRow,
          },
        },
        user
      );
    },
    nextQuestion: (state) => {
      state.currentWordIndex += 1;
      state.gameState =
        state.currentWordIndex === state.words.length ? 'over' : 'question';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(startGame.fulfilled, (state, action) => {
      const { words, wordSets } = action.payload;
      state.gameState = 'question';
      state.words = words;
      state.wordSets = wordSets;
    });
  },
});

export const { resetGame, setAnswer, nextQuestion } =
  audiochallengeSlice.actions;

export const selectAudiochallengeState = (state: RootState) =>
  state.audiochallenge;

export default audiochallengeSlice.reducer;
