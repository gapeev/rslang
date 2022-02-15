import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { ArrayDifficult } from '../../common/Enums';
import getWords, { creatorPair, shuffle } from './creatorPair';
import { GameSprint } from './GameSprint';
import { WelcomeSprint } from './welcomeSprint';
import { Preloader } from '../../common/preloader';
import { setGroupGame, setPairOfGame, setStartGame } from './sprintSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export const SpringPage: React.FC = () => {
  const [group, setGroup] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const isStart = useSelector((store: RootState) => store.sprint.isStart);
  const [answers, setAnswers] = useState<String[]>([]);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = (event.target as HTMLInputElement).value;
    setGroup(ArrayDifficult.indexOf(val));
    dispatch(setGroupGame(ArrayDifficult.indexOf(val)));
    setIsReady(true);
  };

  const handleOnStartGame = async () => {
    dispatch(setStartGame(true));
    getWords(group, dispatch);
  };

  return (
    <Box
      sx={{
        minHeight: '89vh',
      }}
    >
      {isStart ? (
        <GameSprint />
      ) : (
        <WelcomeSprint
          isReady={isReady}
          handleChange={handleChange}
          handleOnStartGame={handleOnStartGame}
        />
      )}
    </Box>
  );
};
