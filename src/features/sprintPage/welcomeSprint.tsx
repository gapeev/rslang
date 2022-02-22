import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { ArrayDifficult } from '../../common/Enums';
import { /* statInit, */ User } from '../stat/statSlice';
import classes from './SprintPage.module.css';

const DESCRIBE_GAME =
  'Спринт - тренировка на скорость. Попробуй угадать как можно больше слов за минуту.';
const TITLE_GAME = 'SPRINT';
const CHOOSE_DIFFICULT = 'Выбери раздел : ';

type propsWelcome = {
  isReady: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnStartGame: () => void;
};

export const WelcomeSprint: React.FC<propsWelcome> = ({
  isReady,
  handleChange,
  handleOnStartGame,
}) => {
  const {
    token: { token, userId },
  } = useAppSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const user: User = useMemo(
    () => ({
      id: userId,
      token,
      isAuth: userId !== '',
    }),
    [userId, token]
  );

  useEffect(() => {
    //dispatch(statInit({ user }));
  }, [dispatch, user]);

  return (
    <Box className={classes.start_screen}>
      <Box className={classes.block_title}>
        <Typography
          sx={{
            color: '#ffd600',
            fontSize: '3.5rem',
            fontFamily: 'Gilroy-Heavy',
          }}
        >
          {TITLE_GAME}
        </Typography>
        <Typography
          sx={{
            color: 'white',
            fontSize: '1.5rem',
            fontFamily: 'Gilroy-Heavy',
          }}
        >
          {DESCRIBE_GAME}
        </Typography>
        <ul className={classes.featuresList}>
          <li>В тренировке можно использовать мышь</li>
          <li>Используйте клавиши влево и вправо</li>
        </ul>
      </Box>
      <Box className={classes.block_control}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            <Typography
              sx={{
                color: 'white',
                fontSize: '1.5rem',
                fontFamily: 'Gilroy-Heavy',
              }}
            >
              {CHOOSE_DIFFICULT}
            </Typography>
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            onChange={handleChange}
          >
            {ArrayDifficult.map((item: string, idx: number) => {
              return (
                <FormControlLabel
                  sx={{
                    border: '1px solid rgba(0, 0, 0, 0.23)',
                    padding: '0.5rem',
                  }}
                  key={idx}
                  control={<Radio value={item} />}
                  label={item}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </Box>
      <Button
        variant="contained"
        size="large"
        disabled={isReady ? false : true}
        onClick={handleOnStartGame}
      >
        Начать
      </Button>
    </Box>
  );
};
