import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectAudiochallengeState } from './audiochallengeSlice';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { BASE_URL } from './constants';

export default function Results() {
  const navigate = useNavigate();
  const { words, answers } = useAppSelector(selectAudiochallengeState);

  const rightCount = answers.filter(({ isRight }) => isRight).length;
  const wrongCount = answers.filter(({ isRight }) => !isRight).length;

  const handleClose = () => {
    navigate(-1);
  };

  const handlePlayAudio = (url: string) => {
    const audio = new Audio(url);
    audio.play();
  };

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={true}
        onClose={handleClose}
        scroll="paper"
      >
        <DialogTitle id="scroll-dialog-title">Результаты</DialogTitle>
        <DialogContent dividers={true}>
          <Box>
            <Typography variant="h5">
              Знаю{' '}
              <Chip
                component="span"
                sx={{ fontSize: '1rem' }}
                label={rightCount}
                color="success"
              />
            </Typography>
            <List>
              {words.map(
                ({ id, word, wordTranslate, audio }, index) =>
                  answers[index].isRight && (
                    <ListItem
                      disablePadding
                      key={id}
                      onClick={() => handlePlayAudio(`${BASE_URL}${audio}`)}
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <VolumeUpIcon />
                        </ListItemIcon>
                        <ListItemText
                          primaryTypographyProps={{ fontSize: '1.4rem' }}
                          primary={`${word} — ${wordTranslate}`}
                        />
                      </ListItemButton>
                    </ListItem>
                  )
              )}
            </List>
            <Divider sx={{ mb: '16px' }} />
            <Typography variant="h5">
              Ошибок{' '}
              <Chip
                sx={{ fontSize: '1rem' }}
                label={wrongCount}
                color="warning"
              />
            </Typography>
            <List>
              {words.map(
                ({ id, word, wordTranslate, audio }, index) =>
                  !answers[index].isRight && (
                    <ListItem
                      disablePadding
                      key={id}
                      onClick={() => handlePlayAudio(`${BASE_URL}${audio}`)}
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <VolumeUpIcon />
                        </ListItemIcon>
                        <ListItemText
                          primaryTypographyProps={{ fontSize: '1.4rem' }}
                          primary={`${word} — ${wordTranslate}`}
                        />
                      </ListItemButton>
                    </ListItem>
                  )
              )}
            </List>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Назад</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
