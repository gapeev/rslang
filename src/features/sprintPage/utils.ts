import { User } from './../audiochallenge/audiochallengeSlice';
import { ISprintStat } from '../../common/Interfaces';
import { IWord } from '../../common/Interfaces';
import { fetchWordsSprint } from './sprintApi';
import {
  incrLearnedWord,
  incrNewWords,
  IPairOfGame,
  setPairOfGame,
  setUserWords,
  updateUserWords,
} from './sprintSlice';
import { getCurrentDateForStatistics } from '../stat/utils';
import { UserWord } from '../audiochallenge/audiochallengeSlice';
import { Dispatch } from '@reduxjs/toolkit';

export function creatorPair(obj: IWord[]): IPairOfGame[] {
  const _obj = shuffle(obj);
  const out: IPairOfGame[] = [];
  const arrTrans = obj.map((item) => item.wordTranslate);

  _obj.forEach((item) => {
    const randomBool = Math.round(Math.random());

    if (randomBool) {
      out.push({
        isTruth: true,
        word: item.word,
        translate: item.wordTranslate,
        idWord: item.id,
      });
    } else {
      out.push({
        isTruth: false,
        word: item.word,
        translate: arrTrans[random(0, arrTrans.length - 1)],
        idWord: item.id,
      });
    }
  });
  return out;
}

export function updateStatistics(
  currentStat: ISprintStat,
  globalStat: ISprintStat
): ISprintStat {
  const {
    learnedWords,
    correctAnswers,
    wrongAnswers,
    longestSeries,
    currentSeries,
    answersCount,
    newWords,
  } = currentStat;

  const statSprint = {
    lastChanged: getCurrentDateForStatistics(),
    learnedWords: globalStat.learnedWords + learnedWords,
    correctAnswers: globalStat.correctAnswers + correctAnswers,
    wrongAnswers: globalStat.wrongAnswers + wrongAnswers,
    longestSeries:
      globalStat.longestSeries > longestSeries
        ? globalStat.longestSeries
        : longestSeries,
    currentSeries: currentSeries,
    answersCount: globalStat.answersCount + answersCount,
    newWords: globalStat.newWords + newWords,
  };
  return statSprint;
}

export default async function fetchWords(
  group: number,
  page: number,
  dispatch: (arg0: any) => void
) {
  await fetchWordsSprint(group.toString(), page).then((res) => {
    dispatch(setPairOfGame(creatorPair(res)));
  });
}

export function calculatePoints(currPoints: number, factor: number) {
  const startPoints = 10;
  const points = startPoints * factor + currPoints;
  return points;
}

export function calculateEffect(
  correctANswers: number,
  answersCount: number
): number {
  const out = Math.round((correctANswers / answersCount) * 100);
  if (isNaN(out)) {
    return 0;
  }
  return out;
}

export function shuffle<T>(array: T[]): T[] {
  const shallowCopy = [...array];
  for (let i = shallowCopy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shallowCopy[i], shallowCopy[j]] = [shallowCopy[j], shallowCopy[i]];
  }
  return shallowCopy;
}

export function random(min: number, max: number) {
  return Math.round(min + Math.random() * (max - min));
}

export function checkWord(
  wordsUser: UserWord[],
  words: IPairOfGame[],
  isTruth: boolean,
  idx: number,
  user: User,
  dispatch: Dispatch<any>
) {
  const userWord = wordsUser.find((el) => el.id === words[idx].idWord) ?? {
    id: words[idx].idWord,
    wordId: words[idx].idWord,
    difficulty: 'easy',
    optional: {
      rightCount: 0,
      wrongCount: 0,
      rightRow: 0,
    },
  };
  let { rightCount, wrongCount, rightRow } = userWord.optional;

  if (isTruth) {
    if (rightCount === 0 && wrongCount === 0 && rightRow === 0) {
      userWord.optional.rightCount += 1;
      userWord.optional.rightRow += 1;

      dispatch(incrNewWords());
      // dispatch(setNewWord());
      dispatch(setUserWords({ word: userWord, user: user }));
    } else if (rightCount === 2) {
      userWord.optional.rightCount += 1;
      userWord.optional.rightRow += 1;
      dispatch(updateUserWords({ word: userWord, user: user }));
      dispatch(incrLearnedWord());
    } else {
      userWord.optional.rightCount += 1;
      userWord.optional.rightRow += 1;
    }
  } else {
    userWord.optional.wrongCount += 1;
    userWord.optional.rightRow = 0;
    userWord.difficulty = 'hard';
  }
}
