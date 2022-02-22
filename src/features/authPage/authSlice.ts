import { RSLANG_USER } from './../../common/Enums';
import { IUserSignIn, JWTToken } from './../../common/Interfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosUserSignIn } from './apiAuth';

export interface IAuthState {
  token: JWTToken;
  user: string;
  isAuth: boolean;
  errorMessage?: string;
}
const userLocalStorage: IAuthState = JSON.parse(
  localStorage.getItem(RSLANG_USER)!
);
const emptyLocalStorage: IAuthState = {
  token: { message: '', token: '', refreshToken: '', userId: '', name: '' },
  user: '',
  isAuth: false,
};
const initialState: IAuthState = userLocalStorage || emptyLocalStorage;

export const getToken = createAsyncThunk(
  'authPage/axiosUserSignIn',
  async (data: IUserSignIn, { rejectWithValue, dispatch }) => {
    const response = await axiosUserSignIn(data);
    dispatch(setToken(response));
    return response;
  }
);

export const authSlice = createSlice({
  name: 'authPage',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.isAuth = true;
      state.token = action.payload;
    },
    logoutUser(state) {
      state.user = emptyLocalStorage.user;
      state.token = emptyLocalStorage.token;
      state.isAuth = false;
      localStorage.setItem(RSLANG_USER, JSON.stringify(state));
    },
    clearErrorMessage(state) {
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getToken.fulfilled, (state, action) => {
      const { error } = action.payload;
      state.errorMessage = '';
      if (error) {
        state.errorMessage = error;
      } else {
        state.token = action.payload;
        state.user = action.payload.name;
        localStorage.setItem(RSLANG_USER, JSON.stringify(state));
      }
    });
  },
});
export const { setToken, setUser, logoutUser, clearErrorMessage } =
  authSlice.actions;
export default authSlice.reducer;
