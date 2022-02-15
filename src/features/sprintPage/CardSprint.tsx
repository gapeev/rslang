import { Box, Typography, Grid, Button } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';

interface PropsCardSprint {
  onClickHandler: (result: boolean) => void | undefined;
  word: string;
  translate: string;
}

export const CardSprint: React.FC<PropsCardSprint> = ({
  onClickHandler,
  word,
  translate,
}) => {
  useEffect(() => {
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

    window.addEventListener('keyup', handleKeyDown);
    return () => window.removeEventListener('keyup', handleKeyDown);
  });

  const handleMouse = (e: SyntheticEvent<HTMLButtonElement>) => {
    const val = e.target as HTMLButtonElement;
    if (val.textContent === 'Yes') {
      onClickHandler(true);
    } else if (val.textContent === 'No') {
      onClickHandler(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Gilroy-Heavy',
        fontSize: '3.5rem',
      }}
    >
      <Box
        sx={{
          width: '100%',
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
        <Button onClick={handleMouse}>Yes</Button>
        <Button onClick={handleMouse}>No</Button>
      </Grid>
    </Box>
  );
};
