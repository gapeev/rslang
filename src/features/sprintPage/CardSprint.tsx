import { Box, Paper, Typography, Grid, Button } from '@mui/material';
import { fail } from 'assert';
import { MouseEventHandler, SyntheticEvent } from 'react';
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
  /* 

  useHotkeys('left', onClickHandler(false), [onClickHandler]);
  useHotkeys('right', onClickHandler(true), [onClickHandler]); */
  return (
    <Box
      sx={{
        display: 'flex',
        width: '500px',
        height: '500px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        my: '1rem',
      }}
    >
      <Paper
        sx={{
          width: '80%',
          justifyContent: 'space-around',
          display: 'flex',
        }}
      >
        <Typography>{word}</Typography>
        <Typography>{translate}</Typography>?
      </Paper>
      <Grid
        container
        sx={{
          justifyContent: 'space-around',
        }}
      >
        <Button onClick={onClickHandler(true)}>Yes</Button>
        <Button onClick={onClickHandler(false)}>No</Button>
      </Grid>
    </Box>
  );
};
