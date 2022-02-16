import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { RootState } from '../../app/store';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  setAnswer,
  selectAudiochallengeState,
  User,
} from './audiochallengeSlice';
import { Box, Button, ButtonGroup, IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Progress from './Progress';
import { BASE_URL, NO_INDEX } from './constants';
import { statWord, StatWordPayload } from '../stat/statSlice';

export default function Question() {
  const dispatch = useAppDispatch();
  const { words, wordSets, currentWordIndex } = useAppSelector(
    selectAudiochallengeState
  );

  const {
    isNew: currentIsNew,
    difficulty: currentDifficulty,
    optional: { rightRow: currentRightRow },
  } = words[currentWordIndex];

  const statWordData: Omit<StatWordPayload, 'isRight'> = useMemo(
    () => ({
      game: 'audiochallenge',
      isNew: currentIsNew,
      rightRow: currentRightRow,
      isEasy: currentDifficulty === 'easy',
    }),
    [currentIsNew, currentRightRow, currentDifficulty]
  );

  const {
    token: { token, userId },
  } = useAppSelector((state: RootState) => state.user);

  const user: User = useMemo(
    () => ({
      id: userId,
      token,
      isAuth: userId !== '',
    }),
    [userId, token]
  );

  const audioRef = useRef<HTMLAudioElement>(null);

  const handleKeyDown = useCallback(
    (event: Event) => {
      const code = (event as KeyboardEvent).code;
      switch (code) {
        case 'Space':
          audioRef.current?.play();
          break;
        case 'Enter':
          dispatch(setAnswer({ index: NO_INDEX, isRight: false, user }));
          dispatch(statWord({ ...statWordData, isRight: false }));
          break;
        case 'Digit1':
        case 'Digit2':
        case 'Digit3':
        case 'Digit4':
        case 'Digit5':
          const index = Number(code.slice(-1)) - 1;
          const isRight = wordSets[currentWordIndex][index].isRight;
          dispatch(setAnswer({ index, isRight, user }));
          dispatch(statWord({ ...statWordData, isRight }));
          break;
      }
    },
    [currentWordIndex, dispatch, wordSets, user, statWordData]
  );

  useEffect(() => {
    audioRef.current?.play();
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <Box
      maxWidth="lg"
      sx={{
        margin: 'auto',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '40px',
      }}
    >
      <Progress />
      <audio
        ref={audioRef}
        src={`${BASE_URL}${words[currentWordIndex].audio}`}
      ></audio>
      <IconButton
        sx={{
          background: 'rgba(0, 74, 144, 0.29)',
          width: '170px',
          height: '170px',
          mt: '40px',
          mb: '40px',
          '&:hover': {
            background: 'rgba(0, 74, 144, 0.49)',
          },
        }}
        onClick={() => audioRef.current?.play()}
      >
        <VolumeUpIcon sx={{ fontSize: '85px', color: '#fff' }} />
      </IconButton>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        sx={{
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '20px',
          boxShadow: 'none',
        }}
      >
        {wordSets[currentWordIndex].map(
          ({ id, wordTranslate, isRight }, index) => (
            <Button
              key={id}
              size="large"
              startIcon={index + 1}
              onClick={() => {
                dispatch(setAnswer({ index, isRight, user }));
                dispatch(statWord({ ...statWordData, isRight }));
              }}
            >
              {wordTranslate}
            </Button>
          )
        )}
      </ButtonGroup>
      <Button
        size="large"
        variant="contained"
        onClick={() => {
          dispatch(setAnswer({ index: NO_INDEX, isRight: false, user }));
          dispatch(statWord({ ...statWordData, isRight: false }));
        }}
      >
        Не знаю
      </Button>
    </Box>
  );
}
