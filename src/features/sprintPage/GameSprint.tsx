import { Box } from '@mui/system';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { CardSprint } from './CardSprint';
import { CounterPanelSprint } from './CounterPanelSprint';
import fetchWords, {
  calculatePoints,
  /*   checkWord,
  updateStatistics, */
} from './utils';
import {
  incrAnswersCount,
  incrCorrectAnswers,
  incrCurrentSeries,
  incrWrongAnswers,
  IPairOfGame,
  resetCurrentSeries,
  setLongestSeries,
  startSprint,
} from './sprintSlice';
import { Timer } from './Timer';
import styles from './SprintPage.module.css';
import { Preloader } from '../../common/preloader';
import { /* setStatSprint,  statInit,*/ User } from '../stat/statSlice';
import { randomNumber } from './sprintApi';
/* import { UserWord } from '../audiochallenge/audiochallengeSlice';
 */ import { StyledBadge } from './constants';

export const GameSprint: React.FC = () => {
  const dispatch = useDispatch();
  const words: IPairOfGame[] = useSelector(
    (store: RootState) => store.sprint.words
  );
  /*  const wordsUser: UserWord[] = useSelector(
    (store: RootState) => store.sprint.wordsUser
  ); */
  const group: number = useSelector((store: RootState) => store.sprint.group);
  const statisticsSprint = useSelector((store: RootState) => store.sprint.stat);
  /*   const statisticsGlobal = useSelector(
    (store: RootState) => store.stat.statistics.optional.gameStatistics.sprint
  ); */
  const userAuth = useSelector((store: RootState) => store.user.token);
  const user: User = useMemo(
    () => ({
      id: userAuth.userId,
      token: userAuth.token,
      isAuth: userAuth.userId !== '',
    }),
    [userAuth]
  );

  const [result, setResult] = useState<string>('');
  const [idx, setIdx] = useState<number>(0);
  const [isLoading] = useState<boolean>(true);
  //const isFinish = useSelector((store: RootState) => store.sprint.isFinish);

  //Points
  const [points, setPoints] = useState(0);
  const [factor, setFactor] = useState(1);
  const [counterTruth, setCounterTruth] = useState(0);

  const toggleIcon = (str: string) => {
    setResult(str);
    setTimeout(() => {
      setResult('');
    }, 1000);
  };

  useEffect(() => {
    dispatch(startSprint(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAuth]);

  //update stat after finish game
  /*   useEffect(() => {
    const user: User = {
      id: userAuth.userId,
      token: userAuth.token,
      isAuth: userAuth.userId !== '',
    };
    dispatch(statInit({ user }));
    dispatch(
      setStatSprint(updateStatistics(statisticsSprint, statisticsGlobal))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinish]); */

  const onClickHandler = (result: boolean) => {
    if (result === words[idx].isTruth) {
      //checkWord(wordsUser, words, true, idx, user, dispatch);

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
      // checkWord(wordsUser, words, false, idx, user, dispatch);
      setFactor(1);
      setCounterTruth(0);

      dispatch(incrWrongAnswers());
      if (statisticsSprint.currentSeries > statisticsSprint.longestSeries) {
        dispatch(setLongestSeries(statisticsSprint.currentSeries));
      }
      toggleIcon('false');
      dispatch(resetCurrentSeries());
    }
    dispatch(incrAnswersCount());
    setIdx(idx + 1);
  };

  useEffect(() => {
    displayQuestion();
    if (idx === words.length - 4) {
      fetchWords(group, randomNumber(), dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Box sx={{ justifyContent: 'space-around', m: '1rem' }}>
        <CancelIcon
          className={`${result === 'false' ? active : styles.icon_answers}`}
          sx={{ p: '1rem', color: '#ab003c' }}
          color="error"
          fontSize="large"
        />
        <CheckCircleOutlineIcon
          className={`${result === 'true' ? active : styles.icon_answers}`}
          sx={{ p: '1rem', color: '#00bcd4' }}
          fontSize="large"
        />
      </Box>
    );
  };
  const displayCounterPoints = () => {
    return (
      <Box sx={{ '& > :not(style) + :not(style)': { ml: 4 } }}>
        <StyledBadge badgeContent={factor}>
          <StarIcon
            className={counterTruth < 1 ? styles.star : styles.star_active}
          />
          <StarIcon
            className={counterTruth < 2 ? styles.star : styles.star_active}
          />
          <StarIcon
            className={counterTruth < 3 ? styles.star : styles.star_active}
          />
        </StyledBadge>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        background: '#2c387e',
        width: '100%',
      }}
    >
      {words.length > 0 ? <Timer /> : ''}
      <CounterPanelSprint stat={statisticsSprint} points={points} />
      {displayCounterPoints()}
      {displayQuestion()}
      {dispalayResults()}
      {words.length === 0 ? <Preloader status={isLoading} /> : ''}
    </Box>
  );
};
