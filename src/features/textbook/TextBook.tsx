import { useState, useEffect, useMemo } from 'react';
import {
  Link as NavLink,
  useLocation,
  Link,
  useNavigate,
} from 'react-router-dom';
import {
  Pagination,
  PaginationItem,
  Select,
  MenuItem,
  Container,
  Button,
  Box,
} from '@mui/material';
import TextBookCard from './TextBookCard';
import styles from './Textbook.module.css';
import { word } from './interfaces';
import { loadWords, loadUserWords } from './request/loadData';
import { userWord } from './interfaces';
import axios, { AxiosResponse } from 'axios';
import getURLParameter from './core/getUrlParam';
import backgroundGen from './core/backgroundGen';
import calcCorrectWords from './core/calcCorrectWords';
import ScrollToTop from 'react-scroll-up';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {
  setGroupGame,
  setIsTextBook,
  setPageGame,
} from '../sprintPage/sprintSlice';
import { useDispatch } from 'react-redux';
const BASE_URL = 'https://learnwords-team31.herokuapp.com/';

const TextBookPage = () => {
  const dispatch = useDispatch();
  let location = useLocation();
  const navigate = useNavigate();
  const AUTH =
    JSON.parse(localStorage.getItem('RSLANG_USER') as string) || false;
  const TOKEN = AUTH ? AUTH.token.token : '';
  const USERID = AUTH ? AUTH.token.userId : '';
  const [words, setWords] = useState<word[]>([]);
  const [userWords, setUserWords] = useState([]);
  const [category, setCategory] = useState(
    +getURLParameter(location.search, 'group')! || 1
  );
  const [page, setPage] = useState(
    +getURLParameter(location.search, 'page')! || 1
  );
  const [pageQty, setpageQty] = useState(30);
  const [correctWords, setCorrectWords] = useState(0);
  const [wrongWords, setWrongWords] = useState(0);
  const [audioList, setAudioList] = useState<string[]>([]);

  useEffect(() => {
    const arrPromis: Promise<AxiosResponse>[] = [];
    const wordsPromis = loadWords(
      BASE_URL + `words?group=${category - 1}&page=${page - 1}`
    );

    if (category === 7) {
      const loadHardWords = loadUserWords(
        BASE_URL +
          `users/${USERID}/aggregatedWords?page=${
            page - 1
          }&wordsPerPage=20&filter=%7B%22userWord.difficulty%22%3A%22hard%22%7D`,
        TOKEN
      );
      arrPromis.push(loadHardWords);
    } else {
      arrPromis.push(wordsPromis);
    }
    if (TOKEN) {
      const userPromis = loadUserWords(
        BASE_URL + `users/${USERID}/words`,
        TOKEN
      );
      arrPromis.push(userPromis);
    }
    axios
      .all(arrPromis)
      .then(
        axios.spread((data1, data2) => {
          if (data2) {
            setUserWords(data2.data);
            setCorrectWords(calcCorrectWords(data1.data, data2.data, 'easy'));
            setWrongWords(calcCorrectWords(data1.data, data2.data, 'hard'));
          }
          if (data1.data[0].paginatedResults) {
            setWords(data1.data[0].paginatedResults);
            if (data1.data[0].totalCount[0]) {
              setpageQty(Math.ceil(data1.data[0].totalCount[0].count / 20));
            }
          } else {
            setpageQty(30);
            setWords(data1.data);
          }
        })
      )
      .catch((err) => {
        if (err.response.status === 401) {
          document.location.href = '/signin';
        }
      });
  }, [TOKEN, USERID, category, navigate, page]);
  const audio = useMemo(() => new Audio(), []);
  useEffect(() => {
    if (audioList.length === 0) {
      return;
    }
    audio.pause();
    audio.src = audioList[0];
    audio.play();
    audio.onended = () => {
      audio.src = audioList[1];
      audio.play();
      audio.onended = () => {
        audio.src = audioList[2];
        audio.play();
        audio.onended = () => {
          audio.pause();
        };
      };
    };
  }, [audio, audioList]);
  return (
    <Box className={backgroundGen(category)}>
      <Container
        className={styles.paginationContainer}
        sx={{
          display: { xs: 'flex', sm: 'flex', md: 'block' },
          flexDirection: { xs: 'column', sm: 'column', md: 'row' },
        }}
      >
        <Select
          value={category}
          sx={{ mt: { xs: '10px', sm: '10px', md: '0px' } }}
          inputProps={{ 'aria-label': 'Without label' }}
          onChange={(event) => {
            setCategory(Number(event.target.value));
            if (event.target.value === 7) {
              setPage(1);
              navigate(`/textbook?group=${event.target.value}&page=1`);
            } else {
              navigate(`/textbook?group=${event.target.value}&page=${page}`);
            }
          }}
        >
          <MenuItem value={1}>Уровень 1</MenuItem>
          <MenuItem value={2}>Уровень 2</MenuItem>
          <MenuItem value={3}>Уровень 3</MenuItem>
          <MenuItem value={4}>Уровень 4</MenuItem>
          <MenuItem value={5}>Уровень 5</MenuItem>
          <MenuItem value={6}>Уровень 6</MenuItem>
          {TOKEN ? <MenuItem value={7}>Сложные слова</MenuItem> : ''}
        </Select>
        {!!pageQty && (
          <Pagination
            count={pageQty}
            page={page}
            onChange={(_, num) => setPage(num)}
            color="primary"
            sx={{ marginY: 3, marginX: 'auto' }}
            renderItem={(item) => (
              <PaginationItem
                classes={{
                  selected: ` ${
                    correctWords + wrongWords === 20 ? styles.easy : ' '
                  }`,
                }}
                component={NavLink}
                to={`/textbook?group=${category}&page=${item.page}`}
                {...item}
              />
            )}
          />
        )}
        <Button
          variant="contained"
          className={styles.button}
          component={Link}
          to={`/audiochallenge?group=${category - 1}&page=${page - 1}`}
          disabled={wrongWords + correctWords === 20 ? true : false}
        >
          Аудиовызов
        </Button>
        <Button
          variant="contained"
          className={styles.button}
          component={Link}
          to={`/sprint`}
          /* to={`/sprint?group=${category - 1}&page=${page - 1}`} */
          onClick={() => {
            dispatch(setPageGame(page - 1));
            dispatch(setGroupGame(category - 1));
            dispatch(setIsTextBook(true));
          }}
          /* disabled={wrongWords + correctWords === 20 ? true : false} */
        >
          Спринт
        </Button>
      </Container>
      <Container className={styles.cardsContainer}>
        {words.map((el: word) => (
          <Container key={el.id || el._id}>
            <TextBookCard
              id={el.id}
              _id={el._id}
              word={el.word}
              group={el.id}
              audio={el.audio}
              audioMeaning={el.audioMeaning}
              audioExample={el.audioExample}
              textMeaning={el.textMeaning}
              textExample={el.textExample}
              transcription={el.transcription}
              textExampleTranslate={el.textExampleTranslate}
              textMeaningTranslate={el.textMeaningTranslate}
              wordTranslate={el.wordTranslate}
              userWords={userWords.filter(
                (word: userWord) =>
                  word.wordId === el.id || word.wordId === el._id
              )}
              image={el.image}
              url={BASE_URL}
              TOKEN={TOKEN}
              USERID={USERID}
              AUTH={AUTH}
              stateSetCorrect={setCorrectWords}
              stateCorrect={correctWords}
              category={category}
              setAduioList={setAudioList}
              allWords={words}
              setAllWords={setWords}
              wrongWords={wrongWords}
              setWrongWords={setWrongWords}
            />
          </Container>
        ))}
      </Container>
      <ScrollToTop showUnder={160}>
        <ArrowUpwardIcon className={styles.scroll} />
      </ScrollToTop>
    </Box>
  );
};
export default TextBookPage;
