import { Box, Paper, Typography, Grid, Button } from '@mui/material';
import { useHotkeys } from 'react-hotkeys-hook';
import { getWordsSprint } from './apiSprint';

interface PropsCardSprint {
  result?: boolean;
  onClick?: (res: boolean) => void;
}

export const CardSprint: React.FC<PropsCardSprint> = ({ result, onClick }) => {
  const handleClick = (result: boolean) => () => {
    console.log(result);
  };
  useHotkeys('left', handleClick(false), [onClick]);
  useHotkeys('right', handleClick(true), [onClick]);
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
        <Typography>Cat</Typography>
        <Typography>Кот</Typography>?
      </Paper>
      <Grid
        container
        sx={{
          justifyContent: 'space-around',
        }}
      >
        <Button onClick={handleClick(true)}>Yes</Button>
        <Button>No</Button>
      </Grid>
    </Box>
  );
};
