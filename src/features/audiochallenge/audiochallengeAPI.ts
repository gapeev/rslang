import {
  Word,
  UserWord,
  AggregationResponse,
  User,
} from './audiochallengeSlice';
import { random } from './utils';
import {
  BASE_URL,
  HARD_GROUP_INDEX,
  NO_PAGE,
  PAGES_COUNT,
  WORDS_PER_PAGE,
} from './constants';

export async function fetchWords(
  group: number,
  page: number,
  user: User
): Promise<Word[]> {
  const pageNumber = page === NO_PAGE ? random(0, PAGES_COUNT - 1) : page;
  const useAllWords = page === NO_PAGE;

  const words: Word[] =
    group === HARD_GROUP_INDEX && user.isAuth
      ? await fetchHardWords(page || 0, user)
      : [];
  const userWords = user.isAuth ? await fetchUserWords(user) : [];

  let currentGroup = group === HARD_GROUP_INDEX ? group - 1 : group;
  let currentPageNumber =
    group === HARD_GROUP_INDEX ? PAGES_COUNT - 1 : pageNumber;
  while (
    words.length < WORDS_PER_PAGE &&
    currentPageNumber >= 0 &&
    currentGroup >= 0
  ) {
    const rawResponse = await fetch(
      `${BASE_URL}words?group=${currentGroup}&page=${currentPageNumber}`
    );

    const chunk: Word[] = await rawResponse.json();

    const mergedWords: Word[] = chunk.map((word) => {
      const userWord: UserWord = userWords.find(
        ({ wordId }) => wordId === word.id
      ) ?? {
        id: word.id,
        wordId: word.id,
        optional: {
          rightCount: 0,
          wrongCount: 0,
          rightRow: 0,
        },
      };

      if (!userWord.optional) {
        userWord.optional = {
          rightCount: 0,
          wrongCount: 0,
          rightRow: 0,
        };
      }

      const { rightCount, wrongCount, rightRow } = userWord.optional;
      if (rightCount === 0 && wrongCount === 0 && rightRow === 0) {
        word.isNew = true;
      }

      return { ...word, ...userWord, id: word.id };
    });

    words.push(
      ...(useAllWords
        ? mergedWords
        : mergedWords.filter(({ difficulty }) => difficulty !== 'easy'))
    );

    if (currentPageNumber === 0) {
      currentPageNumber = PAGES_COUNT - 1;
      currentGroup -= 1;
    } else {
      currentPageNumber -= 1;
    }
  }

  return words.slice(0, WORDS_PER_PAGE);
}

export async function fetchUserWords(user: User): Promise<UserWord[]> {
  try {
    const rawResponse = await fetch(`${BASE_URL}users/${user.id}/words`, {
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
    return [];
  }
}

export async function fetchHardWords(
  page: number,
  user: User
): Promise<Word[]> {
  try {
    const rawResponse = await fetch(
      `${BASE_URL}users/${user.id}/aggregatedWords?` +
        new URLSearchParams({
          page: String(page),
          wordsPerPage: String(WORDS_PER_PAGE),
          filter: `{"userWord.difficulty":"hard"}`,
        }),
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (rawResponse.ok) {
      const data: AggregationResponse[] = await rawResponse.json();
      return data[0].paginatedResults.map((word) => {
        const hardWord = {
          ...word,
          id: word._id,
          wordId: word._id,
          difficulty: word.userWord.difficulty,
          optional: word.userWord.optional || {
            rightCount: 0,
            wrongCount: 0,
            rightRow: 0,
          },
        };

        const { rightCount, wrongCount, rightRow } = hardWord.optional;
        if (rightCount === 0 && wrongCount === 0 && rightRow === 0) {
          hardWord.isNew = true;
        }
        return hardWord;
      });
    } else {
      throw new Error('Something went wrong');
    }
  } catch (e) {
    return [];
  }
}

async function setUserWord(
  userWord: UserWord,
  user: User,
  method: string
): Promise<void> {
  const { difficulty, optional } = userWord;
  fetch(`${BASE_URL}users/${user.id}/words/${userWord.id}`, {
    method,
    headers: {
      Authorization: `Bearer ${user.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ difficulty, optional }),
  });
}

export async function addUserWord(
  userWord: UserWord,
  user: User
): Promise<void> {
  setUserWord(userWord, user, 'POST');
}

export async function updateUserWord(
  userWord: UserWord,
  user: User
): Promise<void> {
  setUserWord(userWord, user, 'PUT');
}
