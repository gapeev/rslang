import { Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { CardSprint } from './CardSprint';
import { CounterPanelSprint } from './CounterPanelSprint';
import getWords, { calculatePoints } from './creatorPair';
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
import useSound from 'use-sound';
import styles from './SprintPage.module.css';
import sounds from '../../common/sounds';
import { Preloader } from '../../common/preloader';

export const GameSprint: React.FC = () => {
  const dispatch = useDispatch();
  const words: IPairOfGame[] = useSelector(
    (store: RootState) => store.sprint.words
  );
  const group: number = useSelector((store: RootState) => store.sprint.group);
  const statistics = useSelector((store: RootState) => store.sprint.stat);
  const [result, setResult] = useState<string>('');
  const [idx, setIdx] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //Points
  const [points, setPoints] = useState(0);
  const [factor, setFactor] = useState(1);
  const [counterTruth, setCounterTruth] = useState(0);

  //Sounds
  const [playCorrect] = useSound(sounds.correct);
  const [playWrong] = useSound(sounds.wrong);

  const toggleIcon = (str: string) => {
    setResult(str);
    setTimeout(() => {
      setResult('');
    }, 1000);
  };

  const onClickHandler = (result: boolean) => {
    if (result === words[idx].isTruth) {
      playCorrect();

      if (counterTruth > 2) {
        setCounterTruth(0);
        setFactor(factor + 1);
      } else {
        setCounterTruth(counterTruth + 1);
      }
      setPoints(calculatePoints(points, factor));

      dispatch(incrCorrectAnswers());
      dispatch(incrCurrentSeries());
      toggleIcon('true');
    } else {
      playWrong();
      setCounterTruth(0);

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
    console.log('points:', points, 'factor:', factor, 'points:', points);
  }, [points, factor]);

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
  const displayCounterPoints = () => {
    return (
      <Box>
        <StarIcon
          className={counterTruth < 1 ? styles.star : styles.star_active}
        />
        <StarIcon
          className={counterTruth < 2 ? styles.star : styles.star_active}
        />
        <StarIcon
          className={counterTruth < 3 ? styles.star : styles.star_active}
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
        justifyContent: 'space-around',
        alignItems: 'center',
        background: '#2c387e',
        width: '100%',
      }}
    >
      {words.length > 0 ? <Timer /> : ''}
      <CounterPanelSprint stat={statistics} points={points} />
      {displayCounterPoints()}
      {displayQuestion()}
      {dispalayResults()}
      {words.length === 0 ? <Preloader status={isLoading} /> : ''}
    </Box>
  );
};
