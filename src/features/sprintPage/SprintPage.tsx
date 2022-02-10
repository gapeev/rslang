import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import sprint from '../../assets/sprint.jpg';
import { ArrayDifficult } from '../../common/Enums';
import { getWordsSprint } from './apiSprint';
import { GameSprint } from './GameSprint';
import { WelcomeSprint } from './welcomeSprint';

export const SpringPage: React.FC = () => {
  const [group, setGroup] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(false);
  const [wrongAnswers, setWrongAnswers] = useState<String[]>([]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = (event.target as HTMLInputElement).value;
    setGroup(ArrayDifficult.indexOf(val));
    setIsReady(true);
  };

  const handleOnStartGame = async () => {
    setStart(true);
    getWordsSprint(group.toString()).then((res) => {
      setWrongAnswers(res.map((item) => item.word));
    });
  };
  useEffect(() => {
    console.log(wrongAnswers);
  }, [wrongAnswers]);
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
    </Box>
  );
};
