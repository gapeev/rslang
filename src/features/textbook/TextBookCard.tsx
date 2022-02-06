import { Container, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import parse from 'html-react-parser';
import styles from './Textbook.module.css';
import { useState } from 'react';
import { CardParam } from './interfaces';
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
        <Container className={styles.buttonControlContainer}>
          <Button
            variant="contained"
            color="success"
            className={styles.buttonControl}
            onClick={() => {
              if (color === styles.easy) {
                setColor('');
              } else {
                setColor(styles.easy);
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
              } else {
                setColor(styles.hard);
              }
            }}
          >
            Сложное
          </Button>
        </Container>
      </Container>
    </Card>
  );
}
export default TextBookCard;
