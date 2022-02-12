import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice from '../features/authPage/authSlice';
import counterReducer from '../features/counter/counterSlice';
import sprintSlice from '../features/sprintPage/sprintSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: authSlice,
    sprint: sprintSlice,
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
