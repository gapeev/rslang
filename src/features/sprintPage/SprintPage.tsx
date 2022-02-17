import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { ArrayDifficult } from '../../common/Enums';
import getWords from './creatorPair';
import { GameSprint } from './GameSprint';
import { WelcomeSprint } from './welcomeSprint';
import { setGameAgain, setGroupGame, setStartGame } from './sprintSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useNavigate } from 'react-router-dom';

export const SpringPage: React.FC = () => {
  const [group, setGroup] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const isStart = useSelector((store: RootState) => store.sprint.isStart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  useEffect(() => {
    dispatch(setGameAgain());
  }, [navigate]);

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
