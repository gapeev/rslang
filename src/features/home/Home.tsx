import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { loadWords } from '../textbook/request/loadData';
import { word } from '../textbook/interfaces';
import { useState, useEffect } from 'react';
import classes from './Home.module.css';
import { EnumRoutes } from '../../common/Enums';

export function Home() {
  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  const [word, setWord] = useState<word>();
  useEffect(() => {
    loadWords(
      `https://learnwords-team31.herokuapp.com/words?group=${getRandomInt(
        0,
        6
      )}&page=${getRandomInt(0, 30)}`
    ).then((data) => setWord(data.data[getRandomInt(0, 20)]));
  }, []);
  return (
    <main>
      <section className={classes.hero_section}>
        <div className={classes.card_grid}>
          <a className={classes.card} href={EnumRoutes.textbook}>
            <div
              className={`${classes.card__background} ${classes.book}`}
            ></div>
            <div className={classes.card__content}>
              <div className={classes.card__category}>Категория</div>
              <h3 className={classes.card__heading}>Учебник</h3>
              <Typography color="white">
                Более 3500 тысяч слов для изучения, разбитых на разделы по
                уровню твоей подготовки с удобной навигацией.
              </Typography>
            </div>
          </a>
          <a className={classes.card} href={EnumRoutes.audiochallenge}>
            <div
              className={`${classes.card__background} ${classes.audio}`}
            ></div>
            <div className={classes.card__content}>
              <div className={classes.card__category}>Категория</div>
              <h3 className={classes.card__heading}>Аудиовызов</h3>
              <Typography color="white">
                Аудирование для многих, пожалуй, самый сложный навык. Понять
                иностранную речь бывает очень трудно: половину слов ты не
                успеваешь расслышать и понять. Из-за этого теряется смысл
                высказывания в целом. Особенно, если это телефонный разговор,
                или у тебя нет контекста события..
              </Typography>
            </div>
          </a>
          <a className={classes.card} href={EnumRoutes.sprint}>
            <div
              className={`${classes.card__background} ${classes.sprint}`}
            ></div>
            <div className={classes.card__content}>
              <div className={classes.card__category}>Категория</div>
              <h3 className={classes.card__heading}>Спринт</h3>
              <Typography color="white">
                Суть проста: в игровом поле появляются английские слова, к
                которым предлагается перевод. Задача "спринтера" — определить,
                верен предложенный перевод или нет. И все это — на время!
              </Typography>
            </div>
          </a>
          <Card
            sx={{ maxWidth: 280, border: '24px' }}
            onClick={() => {
              loadWords(
                `https://learnwords-team31.herokuapp.com/words?group=${getRandomInt(
                  0,
                  6
                )}&page=${getRandomInt(0, 30)}`
              ).then((data) => setWord(data.data[getRandomInt(0, 20)]));
            }}
          >
            <CardActionArea>
              <CardHeader title="Случайное слово" />
              <CardMedia
                component="img"
                height="194"
                src={`https://learnwords-team31.herokuapp.com/${
                  word?.image || 'files/27_2934.jpg'
                }`}
                alt="Books"
              />
              <CardContent>
                <Typography color="text.secondary">
                  {word?.word + ' - ' + word?.wordTranslate}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </section>
    </main>
  );
}
