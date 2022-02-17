import { Box, Typography, Grid, Button } from '@mui/material';
import { SyntheticEvent, useEffect, useRef } from 'react';
import sounds from '../../common/sounds';
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
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFinish) {
        if (e.key === 'ArrowLeft') {
          audioRef.current?.play();
          onClickHandler(false);
        } else if (e.key === 'ArrowRight') {
          onClickHandler(true);
        }
      }
      e.preventDefault();
    };

    window.addEventListener('keyup', handleKeyDown);
    return () => window.removeEventListener('keyup', handleKeyDown);
  }, []);

  const handleMouse = (e: SyntheticEvent<HTMLButtonElement>) => {
    const val = e.target as HTMLButtonElement;
    if (val.textContent === 'Yes') {
      onClickHandler(true);
      audioRef.current?.play();
    } else if (val.textContent === 'No') {
      audioRef.current?.play();

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
      <audio ref={audioRef} src={'../../assets/sounds/correct.mp3'} />
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
        <Button onClick={handleMouse}>No</Button>
        <Button onClick={handleMouse}>Yes</Button>
      </Grid>
    </Box>
  );
};
