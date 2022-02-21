import { IWord } from '../../common/Interfaces';
import { instanceAxios } from '../../common/axios';
import { MAX_PAGES } from '../../common/Enums';
import { User } from '../stat/statSlice';
import { UserWord } from '../audiochallenge/audiochallengeSlice';
import { AxiosResponse } from 'axios';

export function randomNumber() {
  let min = 0;
  return Math.floor(min + Math.random() * (MAX_PAGES + 1 - min));
}

export async function fetchWordsSprint(
  difficult: string,
  page: number
): Promise<IWord[]> {
  let resp;
  try {
    resp = await instanceAxios.get(`/words`, {
      params: { group: difficult, page: page },
    });
  } catch {
    console.log('req failed');
  }
  return resp?.data;
}

export async function fetchUserWords(user: User): Promise<UserWord[]> {
  let response: AxiosResponse;
  try {
    response = await instanceAxios.get(`users/${user.id}/words`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (response.status) {
    } else {
      throw new Error('Something went wrong');
    }
  } catch (e) {
    return [];
  }
  return response.data;
}

export async function postUserWords(
  user: User,
  userWord: UserWord
): Promise<void> {
  const { difficulty, optional } = userWord;
  try {
    await instanceAxios.post(
      `users/${user.id}/words/${userWord.id}`,
      { difficulty, optional },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
  } catch (e) {}
}

export async function putUserWords(
  user: User,
  userWord: UserWord
): Promise<void> {
  const { difficulty, optional } = userWord;
  console.log(userWord);
  try {
    await instanceAxios.put(
      `users/${user.id}/words/${userWord.id}`,
      { difficulty, optional },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
  } catch (e) {}
}
