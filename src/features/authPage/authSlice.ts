import { RSLANG_USER } from './../../common/Enums';
import { IUserSignIn, JWTToken } from './../../common/Interfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosUserSignIn } from './apiAuth';

export interface IAuthState {
  token: JWTToken;
  user: string;
  isAuth: boolean;
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
      state.token = action.payload.data;
      state.isAuth = true;
    },
    logoutUser(state) {
      state.user = emptyLocalStorage.user;
      state.token = emptyLocalStorage.token;
      state.isAuth = false;
      localStorage.setItem(RSLANG_USER, JSON.stringify(state));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getToken.fulfilled, (state, action) => {
      state.token = action.payload;
      localStorage.setItem(RSLANG_USER, JSON.stringify(state));
    });
  },
});
export const { setToken, setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
