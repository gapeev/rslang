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
import classes from './SpringPage.module.css';

const DESCRIBE_GAME =
  'Спринт - тренировка на скорость. Попробуй угадать как можно больше слов за 30 секунд.';
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
    <Box className={classes.start_screen}>
      <Box className={classes.block_title}>
        <Typography component="h3">{TITLE_GAME}</Typography>
        <Typography component="h4">{DESCRIBE_GAME}</Typography>
      </Box>
      <Box className={classes.block_control}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            <Typography component="h5">{CHOOSE_DIFFICULT}</Typography>
          </FormLabel>
          <RadioGroup
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
