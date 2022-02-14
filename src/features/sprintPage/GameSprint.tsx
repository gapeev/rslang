import { Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { CardSprint } from './CardSprint';
import { CounterPanelSprint } from './CounterPanelSprint';
import getWords from './creatorPair';
import {
  incrAnswersCount,
  incrCorrectAnswers,
  incrCurrentSeries,
  incrWrongAnswers,
  IPairOfGame,
  resetCurrentSeries,
  setLongestSeries,
} from './sprintSlice';
import { Timer } from './Timer';
import styles from './SprintPage.module.css';

export const GameSprint: React.FC = () => {
  const dispatch = useDispatch();
  const words: IPairOfGame[] = useSelector(
    (store: RootState) => store.sprint.words
  );
  const group: number = useSelector((store: RootState) => store.sprint.group);
  const statistics = useSelector((store: RootState) => store.sprint.stat);
  const [result, setResult] = useState<string>('');
  const [idx, setIdx] = useState<number>(0);

  const toggleIcon = (str: string) => {
    setResult(str);
    setTimeout(() => {
      setResult('');
    }, 1000);
  };

  const onClickHandler = (result: boolean) => () => {
    console.log(result);
    if (result === words[idx].isTruth) {
      dispatch(incrCorrectAnswers());
      dispatch(incrCurrentSeries());
      toggleIcon('true');
    } else {
      dispatch(incrWrongAnswers());
      if (statistics.currentSeries > statistics.longestSeries) {
        dispatch(setLongestSeries(statistics.currentSeries));
      }
      toggleIcon('false');
      dispatch(resetCurrentSeries());
    }
    dispatch(incrAnswersCount());
    setIdx(idx + 1);
  };

  useEffect(() => {
    displayQuestion();
    if (idx === words.length - 1) {
      getWords(group, dispatch);
    }
  }, [idx]);

  const displayQuestion = () => {
    if (words.length !== 0) {
      return (
        <CardSprint
          key={idx}
          word={words[idx].word}
          translate={words[idx].translate}
          onClickHandler={onClickHandler}
        />
      );
    }
  };

  const dispalayResults = () => {
    const active = styles.icon_answers + ' ' + styles.active;

    return (
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <CheckCircleOutlineIcon
          className={`${result === 'true' ? active : styles.icon_answers}`}
          sx={{ p: '1rem', color: '#00bcd4' }}
          fontSize="large"
        />
        <CancelIcon
          className={`${result === 'false' ? active : styles.icon_answers}`}
          sx={{ p: '1rem', color: '#ab003c' }}
          color="error"
          fontSize="large"
        />
      </Box>
    );
  };

  return (
    <Box
      sx={{
        minHeight: '89vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#2c387e',
        width: '100%',
      }}
    >
      <Timer />
      <CounterPanelSprint stat={statistics} />
      {displayQuestion()}
      {dispalayResults()}
    </Box>
  );
};
