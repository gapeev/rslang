import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice from '../features/authPage/authSlice';
import counterReducer from '../features/counter/counterSlice';
import audiochallengeReducer from '../features/audiochallenge/audiochallengeSlice';
import statReducer from '../features/stat/statSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: authSlice,
    audiochallenge: audiochallengeReducer,
    stat: statReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
