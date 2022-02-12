import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { CardSprint } from './CardSprint';
import getWords from './creatorPair';
import { IPairOfGame } from './sprintSlice';
import { Timer } from './Timer';

export const GameSprint: React.FC = () => {
  const words: IPairOfGame[] = useSelector(
    (store: RootState) => store.sprint.words
  );
  const group: number = useSelector((store: RootState) => store.sprint.group);
  const dispatch = useDispatch();
  const [idx, setIdx] = useState<number>(0);

  const onClickHandler = (result: boolean) => () => {
    console.log(result);
    setIdx(idx + 1);
  };

  useEffect(() => {
    displayQuestion();
    if (idx === words.length - 1) {
      getWords(group, dispatch);
    }
  }, [idx]);

  const displayQuestion = () => {
    if (words.length !== 0) {
      return (
        <CardSprint
          key={idx}
          word={words[idx].word}
          translate={words[idx].translate}
          onClickHandler={onClickHandler}
        />
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: '89vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Timer />
      {idx}
      {displayQuestion()}
    </Box>
  );
};
