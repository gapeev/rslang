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
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import updateStat from './core/updateStat';
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
  const rightRow = props.userWords[0]?.optional?.rightRow || 0;
  const rightCount = props.userWords[0]?.optional?.rightCount || 0;
  const wrongCount = props.userWords[0]?.optional?.wrongCount || 0;
  const difficulty = props.userWords[0]?.difficulty || '';
  const WORDID = props.id || props._id;
  const [color, setColor] = useState(defaultColor);
  return (
    <Card key={props.id} className={`${styles.card} ${color}`}>
      <Container
        className={styles.cardContent}
        sx={{
          display: { xs: 'flex', sm: 'flex', md: 'block' },
          flexDirection: { xs: 'column', sm: 'column', md: 'row' },
        }}
      >
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
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className={styles.cardTitle}
          >
            {props.word + ' - ' + props.transcription}{' '}
            {
              <VolumeUpIcon
                className={styles.cardSound}
                onClick={() => {
                  props.setAduioList([
                    props.url + props.audio,
                    props.url + props.audioMeaning,
                    props.url + props.audioExample,
                  ]);
                }}
              ></VolumeUpIcon>
            }
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
            {`${props.textExampleTranslate}`}
          </Typography>
        </CardContent>
        {
          <Container
            className={
              props.TOKEN ? styles.buttonControlContainer : styles.hideContainer
            }
          >
            <Typography style={{ margin: '0 auto' }}>
              {difficulty !== 'easy'
                ? `Прогресс: ${rightRow > 3 ? 3 : rightRow} / 3`
                : ''}
            </Typography>
            <Typography style={{ margin: '0 auto' }}>
              {difficulty !== 'easy' ? `Правильно: ${rightCount}` : ''}
            </Typography>
            <Typography style={{ margin: '0 auto' }}>
              {difficulty !== 'easy' ? `Неправильно: ${wrongCount}` : ''}
            </Typography>
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
                    WORDID
                  );
                  if (props.category === 7) {
                    props.setAllWords(
                      props.allWords.filter((el) => el.id !== WORDID)
                    );
                  }
                  updateStat('minus', props.TOKEN, props.USERID, props.url);
                  props.stateSetCorrect(props.stateCorrect - 1);
                } else {
                  setColor(styles.easy);
                  changeDificulty(
                    props.url,
                    'easy',
                    props.userWords[0],
                    props.USERID,
                    props.TOKEN,
                    WORDID
                  );
                  if (props.category === 7) {
                    setTimeout(() => {
                      window.location.reload();
                    }, 1000);
                  }
                  if (color === styles.hard) {
                    props.setWrongWords(props.wrongWords - 1);
                    props.stateSetCorrect(props.stateCorrect + 1);
                  }
                  if (color === '') {
                    props.stateSetCorrect(props.stateCorrect + 1);
                  }
                  updateStat('plus', props.TOKEN, props.USERID, props.url);
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
                  setColor('normal');
                  changeDificulty(
                    props.url,
                    'normal',
                    props.userWords[0],
                    props.USERID,
                    props.TOKEN,
                    WORDID
                  );
                  if (props.category === 7) {
                    setTimeout(() => {
                      window.location.reload();
                    }, 1000);
                  }
                  props.setWrongWords(props.wrongWords - 1);
                } else {
                  if (color === styles.easy) {
                    updateStat('minus', props.TOKEN, props.USERID, props.url);
                  }
                  setColor(styles.hard);
                  changeDificulty(
                    props.url,
                    'hard',
                    props.userWords[0],
                    props.USERID,
                    props.TOKEN,
                    WORDID
                  );
                  if (color === styles.easy) {
                    props.stateSetCorrect(props.stateCorrect - 1);
                    props.setWrongWords(props.wrongWords + 1);
                  }
                  if (color === '') {
                    props.setWrongWords(props.wrongWords + 1);
                  }
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
