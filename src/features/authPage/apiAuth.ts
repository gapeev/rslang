import { baseUrl } from '../../common/axios';
import {
  IUserSignUp,
  IUserSignIn,
  JWTToken,
  SignUpResponse,
} from './../../common/Interfaces';
import axios, { AxiosError } from 'axios';

const usersURL = `${baseUrl}/users`;
const signinUrl = `${baseUrl}/signin`;

export async function axiosUserSignUp(
  data: IUserSignUp
): Promise<SignUpResponse> {
  let response;
  let errorMessage = '';
  try {
    response = await axios.post(usersURL, data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorMessage =
        (error as AxiosError).response?.status === 417
          ? 'Пользователь с такой электронной почтой уже существует'
          : 'Неизвестная ошибка';
    }
  }

  return { ...(response?.data || {}), error: errorMessage };
}

export async function axiosUserSignIn(
  data: IUserSignIn
): Promise<JWTToken & { error: string }> {
  let response;
  let errorMessage = '';
  try {
    response = await axios.post(signinUrl, data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      switch ((error as AxiosError).response?.status) {
        case 404:
          errorMessage = 'Пользователь с такой электронной почтой не найден';
          break;
        case 403:
          errorMessage = 'Вы указали неверный пароль';
          break;
        default:
          errorMessage = 'Неизвестная ошибка';
      }
    }
  }

  return {
    ...(response?.data || {
      message: '',
      token: '',
      refreshToken: '',
      userId: '',
      name: '',
    }),
    error: errorMessage,
  };
}
