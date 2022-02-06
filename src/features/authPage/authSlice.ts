import { RSLANG_USER } from './../../common/Enums';
import { IUserSign, IUserSignIn, JWTToken } from './../../common/Interfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosUserSignIn } from './apiAuth';

export interface IAuthState {
  token: JWTToken;
  user: string;
}
const userLocalStorage: IAuthState = JSON.parse(
  localStorage.getItem(RSLANG_USER)!
);
const emptyLocalStorage: IAuthState = {
  token: { message: '', token: '', refreshToken: '', userId: '', name: '' },
  user: '',
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
    },
    logoutUser(state) {
      state = { ...state, ...emptyLocalStorage };
      console.log(state, 'logout');
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
