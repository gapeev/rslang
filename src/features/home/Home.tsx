import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import textbook from '../../assets/textbook.jpg';
import audiochallenge from '../../assets/audiochallenge.jpg';
import sprint from '../../assets/sprint.jpg';

export function Home() {
  return (
    <Container maxWidth="lg" sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          mt: '40px',
          mb: '40px',
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'space-between',
          gap: '30px',
        }}
      >
        <Card sx={{ maxWidth: 345, flex: 1 }}>
          <CardActionArea component={Link} to="/textbook">
            <CardHeader title="Электронный учебник" />
            <CardMedia
              component="img"
              height="194"
              image={textbook}
              alt="Books"
            />
            <CardContent>
              <Typography color="text.secondary">
                Более 3500 тысяч слов для изучения, разбитых на разделы по
                уровню твоей подготовки с удобной навигацией.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card sx={{ maxWidth: 345, flex: 1 }}>
          <CardActionArea component={Link} to="/audiochallenge">
            <CardHeader title="Аудиовызов" />
            <CardMedia
              component="img"
              height="194"
              image={audiochallenge}
              alt="Headphones"
            />
            <CardContent>
              <Typography gutterBottom color="text.secondary">
                Аудирование для многих, пожалуй, самый сложный навык. Понять
                иностранную речь бывает очень трудно: половину слов ты не
                успеваешь расслышать и понять. Из-за этого теряется смысл
                высказывания в целом. Особенно, если это телефонный разговор,
                или у тебя нет контекста события.
              </Typography>
              <Typography color="text.secondary">
                Ты слышишь слово и видишь 5 вариантов его перевода. При этом не
                видишь, как это слово пишется по-английски. Твоя задача выбрать
                правильный перевод озвученного слова.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card sx={{ maxWidth: 345, flex: 1 }}>
          <CardActionArea component={Link} to="/sprint">
            <CardHeader title="Спринт" />
            <CardMedia
              component="img"
              height="194"
              image={sprint}
              alt="Track"
            />
            <CardContent>
              <Typography color="text.secondary">
                Суть проста: в игровом поле появляются английские слова, к
                которым предлагается перевод. Задача "спринтера" — определить,
                верен предложенный перевод или нет. И все это — на время!
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Container>
  );
}
