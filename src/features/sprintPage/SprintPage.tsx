import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import sprint from '../../assets/sprint.jpg';
import { ArrayDifficult } from '../../common/Enums';
import getWords, { creatorPair, shuffle } from './creatorPair';
import { GameSprint } from './GameSprint';
import { WelcomeSprint } from './welcomeSprint';
import { getWordsSprint } from './sprintApi';
import { Preloader } from '../../common/preloader';
import { setGroupGame, setPairOfGame } from './sprintSlice';
import { useDispatch } from 'react-redux';

export const SpringPage: React.FC = () => {
  const [group, setGroup] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(false);
  const [answers, setAnswers] = useState<String[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = (event.target as HTMLInputElement).value;
    setGroup(ArrayDifficult.indexOf(val));
    dispatch(setGroupGame(ArrayDifficult.indexOf(val)));
    setIsReady(true);
  };

  const handleOnStartGame = async () => {
    setStart(true);
    setIsLoading(true);
    getWords(group, dispatch);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  useEffect(() => {
    console.log(answers);
  }, [answers]);
  return (
    <Box
      sx={{
        minHeight: '89vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${sprint})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {start ? (
        <GameSprint />
      ) : (
        <WelcomeSprint
          isReady={isReady}
          handleChange={handleChange}
          handleOnStartGame={handleOnStartGame}
        />
      )}
      <Preloader status={isLoading} />
    </Box>
  );
};
