import { User } from '../audiochallenge/audiochallengeSlice';
import { getEmptyStatistics } from './utils';
import { BASE_URL } from '../audiochallenge/constants';
import { Statistics } from './types';

export async function getStatistics(user: User): Promise<Statistics> {
  try {
    const rawResponse = await fetch(`${BASE_URL}users/${user.id}/statistics`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (rawResponse.ok) {
      return rawResponse.json();
    } else {
      throw new Error('Something went wrong');
    }
  } catch (e) {
    return getEmptyStatistics();
  }
}

export async function setStatistics(
  statistics: Statistics,
  user: User
): Promise<void> {
  fetch(`${BASE_URL}users/${user.id}/statistics`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${user.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ optional: statistics.optional }),
  });
}
