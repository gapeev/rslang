import { Box, Paper, Typography, Grid, Button } from '@mui/material';
import {
  MouseEventHandler,
  SyntheticEvent,
  useCallback,
  useEffect,
} from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { getWordsSprint } from './sprintApi';

interface PropsCardSprint {
  onClickHandler: (
    result: boolean
  ) => MouseEventHandler<HTMLButtonElement> | undefined;
  word: string;
  translate: string;
}

export const CardSprint: React.FC<PropsCardSprint> = ({
  onClickHandler,
  word,
  translate,
}) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (true) {
      if (e.key === 'ArrowLeft') {
        console.log('left');
        onClickHandler(true);
      } else if (e.key === 'ArrowRight') {
        console.log('right');
        onClickHandler(false);
      }
    }
    e.preventDefault();
  };

  useEffect(() => {
    window.addEventListener('keyup', handleKeyDown);
    return () => window.removeEventListener('keyup', handleKeyDown);
  });
  /* 
/
  useHotkeys('left', onClickHandler(false), [onClickHandler]);
  useHotkeys('right', onClickHandler(true), [onClickHandler]); */
  return (
    <Box
      sx={{
        display: 'flex',
        width: '500px',
        height: '300px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Gilroy-Heavy',
        fontSize: '3.5rem',
        my: '1rem',
      }}
    >
      <Box
        sx={{
          width: '80%',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            color: '#ffd600',
            fontSize: '3.5rem',
            fontFamily: 'Gilroy-Heavy',
          }}
        >
          {word.toUpperCase()}
        </Typography>
        <Typography
          sx={{
            color: '#ffd600',
            fontSize: '2.5rem',
            fontFamily: 'Gilroy-Heavy',
          }}
        >
          {translate.toUpperCase()}
        </Typography>
      </Box>
      <Grid
        container
        sx={{
          justifyContent: 'space-around',
        }}
      >
        {/*       <Button onClick={onClickHandler(true)}>Yes</Button>
        <Button onClick={onClickHandler(false)}>No</Button> */}
      </Grid>
    </Box>
  );
};
