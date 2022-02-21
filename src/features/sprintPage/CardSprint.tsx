import { Box, Typography, Grid, Button } from '@mui/material';
import { SyntheticEvent, useEffect } from 'react';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';

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
  const isFinish = useSelector((store: RootState) => store.sprint.isFinish);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFinish) {
        if (e.key === 'ArrowLeft') {
          onClickHandler(false);
        } else if (e.key === 'ArrowRight') {
          onClickHandler(true);
        }
      }
      e.preventDefault();
    };

    window.addEventListener('keyup', handleKeyDown);
    return () => window.removeEventListener('keyup', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouse = (e: SyntheticEvent<HTMLButtonElement>) => {
    const val = e.target as HTMLButtonElement;
    if (val.textContent === 'Да') {
      onClickHandler(true);
    } else if (val.textContent === 'Нет') {
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
        <Button onClick={handleMouse}>Нет</Button>
        <Button onClick={handleMouse}>Да</Button>
      </Grid>
    </Box>
  );
};
