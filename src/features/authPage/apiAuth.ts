import { IUserSignUp, IUserSignIn, JWTToken } from './../../common/Interfaces';
import axios from 'axios';

export const baseUrl = 'https://learnwords-team31.herokuapp.com';
const usersURL = `${baseUrl}/users`;
const signinUrl = `${baseUrl}/signin`;

export async function axiosUserSignUp(data: IUserSignUp): Promise<any> {
  let response;
  console.log('await');
  try {
    response = await axios.post(usersURL, data);
  } catch (error) {
    if (response?.status === 422) {
      throw new Error('Invalid email or password was specified');
    }
    throw error;
  }

  return response.data;
}

export async function axiosUserSignIn(data: IUserSignIn): Promise<JWTToken> {
  let response;
  try {
    response = await axios.post(signinUrl, data);
    console.log('axiosUserSignIn', response.data);
  } catch (error) {
    if (response?.status === 403) {
      throw new Error('Incorrect e-mail or password');
    }
    throw error;
  }

  return response.data;
}
