import { Statistics } from './types';

export function getCurrentDateForStatistics() {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).padStart(2, '0');
  return `${day}.${month}.${year}`;
}

export function getEmptyStatistics(): Statistics {
  const dateForStatistics = getCurrentDateForStatistics();

  return {
    optional: {
      wordStatistics: {
        [dateForStatistics]: 0,
      },
      gameStatistics: {
        audiochallenge: {
          lastChanged: dateForStatistics,
          learnedWords: 0,
          correctAnswers: 0,
          wrongAnswers: 0,
          longestSeries: 0,
          currentSeries: 0,
          answersCount: 0,
          newWords: 0,
        },
        sprint: {
          lastChanged: dateForStatistics,
          learnedWords: 0,
          correctAnswers: 0,
          wrongAnswers: 0,
          longestSeries: 0,
          currentSeries: 0,
          answersCount: 0,
          newWords: 0,
        },
      },
      newWordStatistics: {
        [dateForStatistics]: 0,
      },
    },
  };
}

export function getFilledStatistics(statistics: Statistics): Statistics {
  return {
    ...getEmptyStatistics(),
    ...statistics,
  };
}
