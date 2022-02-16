import React, { useCallback, useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { nextQuestion, selectAudiochallengeState } from './audiochallengeSlice';
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Typography,
  Zoom,
} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Progress from './Progress';
import { BASE_URL } from './constants';

export default function Answer() {
  const dispatch = useAppDispatch();
  const { words, wordSets, currentWordIndex, answers } = useAppSelector(
    selectAudiochallengeState
  );

  const audioRef = useRef<HTMLAudioElement>(null);

  const handleKeyDown = useCallback(
    (event: Event) => {
      switch ((event as KeyboardEvent).code) {
        case 'Space':
          audioRef.current?.play();
          break;
        case 'Enter':
          dispatch(nextQuestion());
          break;
      }
    },
    [dispatch]
  );

  useEffect(() => {
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
      <Zoom in={true} style={{ transitionDelay: '100ms' }}>
        <Box sx={{ height: '250px', position: 'relative' }}>
          <Box
            component="img"
            src={`${BASE_URL}${words[currentWordIndex].image}`}
            alt={words[currentWordIndex].wordTranslate}
            sx={{ height: '100%' }}
          />
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              padding: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 30,
            }}
          >
            <Typography variant="h5">{words[currentWordIndex].word}</Typography>

            <audio
              ref={audioRef}
              src={`${BASE_URL}${words[currentWordIndex].audio}`}
            ></audio>
            <IconButton
              size="large"
              sx={{ color: '#fff' }}
              onClick={() => audioRef.current?.play()}
            >
              <VolumeUpIcon />
            </IconButton>
          </Box>
        </Box>
      </Zoom>
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
          ({ id, wordTranslate, isRight }, index) => {
            let status: 'success' | 'warning' | undefined;
            if (isRight) {
              status = 'success';
            } else if (index === answers[currentWordIndex].index) {
              status = 'warning';
            }
            return (
              <Button
                key={id}
                size="large"
                startIcon={index + 1}
                color={status}
              >
                {wordTranslate}
              </Button>
            );
          }
        )}
      </ButtonGroup>
      <Button
        size="large"
        variant="contained"
        onClick={() => dispatch(nextQuestion())}
      >
        Дальше
      </Button>
    </Box>
  );
}
