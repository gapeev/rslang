import { styled, Box } from '@mui/system';
import BadgeUnstyled from '@mui/base/BadgeUnstyled';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { CardSprint } from './CardSprint';
import { CounterPanelSprint } from './CounterPanelSprint';
import fetchWords, { calculatePoints, updateStatistics } from './creatorPair';
import {
  incrAnswersCount,
  incrCorrectAnswers,
  incrCurrentSeries,
  incrLearnedWord,
  incrNewWords,
  incrWrongAnswers,
  IPairOfGame,
  resetCurrentSeries,
  setLongestSeries,
  startSprint,
} from './sprintSlice';
import { Timer } from './Timer';
import useSound from 'use-sound';
import styles from './SprintPage.module.css';
import sounds from '../../common/sounds';
import { Preloader } from '../../common/preloader';
import { getStatistics, setStatistics } from '../stat/statAPI';
import { setStatSprint, statInit, User } from '../stat/statSlice';
import { JWTToken } from '../../common/Interfaces';
import { IAuthState } from '../authPage/authSlice';
import { Statistics } from '../stat/types';
import { fetchUserWords, randomNumber } from './sprintApi';
import { UserWord } from '../audiochallenge/audiochallengeSlice';

const StyledBadge = styled(BadgeUnstyled)`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: 'tnum';
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol';
  position: relative;
  display: inline-block;
  line-height: 1;

  & .MuiBadge-badge {
    z-index: auto;
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    white-space: nowrap;
    text-align: center;
    color: #ffc53d;
    border-radius: 10px;
    box-shadow: 0 0 0 1px #ffc53d;
  }
  & .MuiBadge-anchorOriginTopRight {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    transform-origin: 100% 0;
  }
`;
type TypeUserStat = {
  id: JWTToken['userId'];
  token: JWTToken['token'];
  isAuth: IAuthState['isAuth'];
};

export const GameSprint: React.FC = () => {
  const dispatch = useDispatch();
  const words: IPairOfGame[] = useSelector(
    (store: RootState) => store.sprint.words
  );
  const wordsUser: UserWord[] = useSelector(
    (store: RootState) => store.sprint.wordsUser
  );
  const group: number = useSelector((store: RootState) => store.sprint.group);
  const statisticsSprint = useSelector((store: RootState) => store.sprint.stat);
  const statisticsGlobal = useSelector(
    (store: RootState) => store.stat.statistics.optional.gameStatistics.sprint
  );
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isFinish = useSelector((store: RootState) => store.sprint.isFinish);

  //Points
  const [points, setPoints] = useState(0);
  const [factor, setFactor] = useState(1);
  const [counterTruth, setCounterTruth] = useState(0);

  //Sounds
  // const [audio] = useState(new Audio(sounds.correct));
  //const audioRef = new Audio(sounds.correct);
  const [playCorrect] = useSound(sounds.skip);
  const [playWrong] = useSound(sounds.wrong);

  const toggleIcon = (str: string) => {
    setResult(str);
    setTimeout(() => {
      setResult('');
    }, 1000);
  };

  useEffect(() => {
    dispatch(startSprint(user));
  }, [userAuth]);

  //UPDATE STATISTICS AFTER FINISH GAME
  useEffect(() => {
    const user: User = {
      id: userAuth.userId,
      token: userAuth.token,
      isAuth: userAuth.userId !== '',
    };
    dispatch(statInit({ user }));
    dispatch(
      setStatSprint(updateStatistics(statisticsSprint, statisticsGlobal))
    );
  }, [isFinish]);

  const onClickHandler = (result: boolean) => {
    /* playSound(true, true); */

    //TODO
    const userWord = wordsUser.find((el) => el.id === words[idx].idWord) ?? {
      id: words[idx].idWord,
      wordId: words[idx].idWord,
      optional: {
        rightCount: 0,
        wrongCount: 0,
        rightRow: 0,
      },
    };

    const { rightCount, wrongCount, rightRow } = userWord.optional;
    if (rightCount === 0 && wrongCount === 0 && rightRow === 0) {
      dispatch(incrNewWords());
    } else if (rightCount > 1) {
      dispatch(incrLearnedWord());
    }

    console.log(userWord);

    if (result === words[idx].isTruth) {
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
    if (idx === words.length - 1) {
      fetchWords(group, randomNumber(), dispatch);
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
      <CounterPanelSprint stat={statisticsSprint} points={points} />
      {displayCounterPoints()}
      {displayQuestion()}
      {dispalayResults()}
      {words.length === 0 ? <Preloader status={isLoading} /> : ''}
      <audio id="correctSound" src="../assets/correct.mp3" />
    </Box>
  );
};
/* const playSound = (isCorrect: any, soundOn: any) => {
  const correctSound = document.querySelector("#correctSound") as HTMLAudioElement;
  const errorSound = document.querySelector("#errorSound") as HTMLAudioElement;
  if (soundOn) {
    isCorrect ? correctSound.play() : errorSound.play();
  }
}; */
