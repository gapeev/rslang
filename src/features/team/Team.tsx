import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from '@mui/material';
import styles from './Team.module.css';
import gitHub from './img/github.svg';
import alePashkou from './img/alePashkou.jpg';
import gapeev from './img/gapeev.png';
import uladziby from './img/uladziby.png';
const Team = () => {
  return (
    <Container className={styles.mainContainer}>
      <Card sx={{ width: 345 }} className={styles.cardContainer}>
        <CardActionArea>
          <CardMedia component="img" alt="Books" image={alePashkou} />
          <CardContent>
            <Typography variant="body2" color="text.secondary" align={'center'}>
              Разработчик
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              align={'center'}
            >
              Alexander Pashkou
            </Typography>
            <Typography variant="h6" color="text.secondary" align={'center'}>
              <a
                href={'https://github.com/alepashkou'}
                target="_blank"
                rel="noreferrer"
                className={styles.githubContainer}
              >
                <CardMedia
                  component="img"
                  alt="Books"
                  image={gitHub}
                  className={styles.githubImg}
                />
                alePashkou
              </a>
            </Typography>
            <Typography gutterBottom component="div" align={'center'}>
              <p>Страница учебника</p>
              <p>Страница статистики</p>
              <p>Страница о команде</p>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ width: 345 }} className={styles.cardContainer}>
        <CardActionArea>
          <CardMedia component="img" alt="Books" image={gapeev} />
          <CardContent>
            <Typography variant="body2" color="text.secondary" align={'center'}>
              Разработчик
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              align={'center'}
            >
              Dzmitry Hapeyeu
            </Typography>
            <Typography variant="h6" color="text.secondary" align={'center'}>
              <a
                href={'https://github.com/gapeev'}
                target="_blank"
                rel="noreferrer"
                className={styles.githubContainer}
              >
                <CardMedia
                  component="img"
                  alt="Books"
                  image={gitHub}
                  className={styles.githubImg}
                />
                gapeev
              </a>
            </Typography>
            <Typography gutterBottom component="div" align={'center'}>
              <p>Главная страница, Футер, Шапка</p>
              <p>Игра «Аудио вызов»</p>
              <p>Создание сборки проекта</p>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ width: 345 }} className={styles.cardContainer}>
        <CardActionArea>
          <CardMedia component="img" alt="Books" image={uladziby} />
          <CardContent>
            <Typography variant="body2" color="text.secondary" align={'center'}>
              Разработчик
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              align={'center'}
            >
              Vlad Yanushevsky
            </Typography>
            <Typography variant="h6" color="text.secondary" align={'center'}>
              <a
                href={'https://github.com/Uladziby'}
                target="_blank"
                rel="noreferrer"
                className={styles.githubContainer}
              >
                <CardMedia
                  component="img"
                  alt="Books"
                  image={gitHub}
                  className={styles.githubImg}
                />
                uladziby
              </a>
            </Typography>
            <Typography gutterBottom component="div" align={'center'}>
              <p>Страница регистрации и логина</p>
              <p>Игра "Спринт"</p>
              <p>Навигация</p>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Container>
  );
};
export default Team;
