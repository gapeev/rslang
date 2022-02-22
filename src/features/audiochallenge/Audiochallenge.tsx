import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { resetGame, selectAudiochallengeState } from './audiochallengeSlice';
import Answer from './Answer';
import Question from './Question';
import Results from './Results';
import Welcome from './Welcome';

export function Audiochallenge() {
  const dispatch = useAppDispatch();
  const { gameState } = useAppSelector(selectAudiochallengeState);

  useEffect(() => {
    return () => {
      dispatch(resetGame());
    };
  }, [dispatch]);

  switch (gameState) {
    case 'stop':
      return <Welcome />;
    case 'question':
      return <Question />;
    case 'answer':
      return <Answer />;
    case 'over':
      return <Results />;
  }
}
