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
import { ArrayDifficult } from '../../common/Enums';
import classes from './SprintPage.module.css';

const DESCRIBE_GAME =
  'Спринт - тренировка на скорость. Попробуй угадать как можно больше слов за минуту.';
const TITLE_GAME = 'SPRINT';
const CHOOSE_DIFFICULT = 'Выбери сложность игры';

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
  return (
    <Box
      sx={{
        minHeight: '79vh',
      }}
      className={classes.start_screen}
    >
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
