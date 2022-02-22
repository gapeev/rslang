import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { ArrayDifficult } from '../../common/Enums';
import fetchWords from './utils';
import { GameSprint } from './GameSprint';
import { WelcomeSprint } from './welcomeSprint';
import {
  setGameAgain,
  setGroupGame,
  setIsTextBook,
  setStartGame,
} from './sprintSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useNavigate } from 'react-router-dom';
import { randomNumber } from './sprintApi';

export const SpringPage: React.FC = () => {
  const [group, setGroup] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const isStart = useSelector((store: RootState) => store.sprint.isStart);
  const pageTextBook = useSelector((store: RootState) => store.sprint.page);
  const groupTextBook = useSelector((store: RootState) => store.sprint.group);
  const isTextBook = useSelector((store: RootState) => store.sprint.isTextBook);
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
    fetchWords(group, randomNumber(), dispatch);
  };
  useEffect(() => {
    dispatch(setGameAgain());
    dispatch(setIsTextBook(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isTextBook) {
      setIsReady(true);
      dispatch(setStartGame(true));
      fetchWords(groupTextBook, pageTextBook, dispatch);
    }
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flex: 'auto',
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
