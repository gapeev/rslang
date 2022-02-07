import { Container, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import parse from 'html-react-parser';
import styles from './Textbook.module.css';
import { useState } from 'react';
import { CardParam } from './interfaces';
import changeDificulty from './core/changeDificulty';
function TextBookCard(props: CardParam) {
  const defaultColor = () => {
    if (props.userWords[0]) {
      if (props.userWords[0].difficulty === 'hard') {
        return styles.hard;
      } else if (props.userWords[0].difficulty === 'easy') {
        return styles.easy;
      }
    }
    return '';
  };
  const [color, setColor] = useState(defaultColor);
  return (
    <Card key={props.id} className={`${styles.card} ${color}`}>
      <Container className={styles.cardContent}>
        <CardMedia
          component="img"
          image={props.url + props.image}
          className={styles.picture}
        />
        <CardContent
          style={{
            width: '100%',
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {props.word + ' - ' + props.transcription}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {props.wordTranslate}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {parse(props.textMeaning)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`${props.textMeaningTranslate}`}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className={styles.typography}
          >
            {parse(props.textExample)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`${props.textMeaningTranslate}`}
          </Typography>
        </CardContent>
        {
          <Container
            className={
              props.AUTH ? styles.buttonControlContainer : styles.hideContainer
            }
          >
            <Button
              variant="contained"
              color="success"
              className={styles.buttonControl}
              onClick={() => {
                if (color === styles.easy) {
                  setColor('');
                  changeDificulty(
                    props.url,
                    'normal',
                    props.userWords[0],
                    props.USERID,
                    props.TOKEN,
                    props.id
                  );
                } else {
                  setColor(styles.easy);
                  changeDificulty(
                    props.url,
                    'easy',
                    props.userWords[0],
                    props.USERID,
                    props.TOKEN,
                    props.id
                  );
                }
              }}
            >
              Изучено
            </Button>
            <Button
              variant="outlined"
              color="error"
              className={styles.buttonControl}
              onClick={() => {
                if (color === styles.hard) {
                  setColor('');
                  changeDificulty(
                    props.url,
                    'normal',
                    props.userWords[0],
                    props.USERID,
                    props.TOKEN,
                    props.id
                  );
                } else {
                  setColor(styles.hard);
                  changeDificulty(
                    props.url,
                    'hard',
                    props.userWords[0],
                    props.USERID,
                    props.TOKEN,
                    props.id
                  );
                }
              }}
            >
              Сложное
            </Button>
          </Container>
        }
      </Container>
    </Card>
  );
}
export default TextBookCard;
