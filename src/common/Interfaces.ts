export interface IUserSign {
  id: string;
  name: string;
  email: string;
  password: string;
}
export type IUserSignUp = Omit<IUserSign, 'id'>;
export type ResIUserSignUp = Omit<IUserSign, 'password'>;

//type for login
export type IUserSignIn = Pick<IUserSign, 'email' | 'password'>;

export interface ResponseAuth {
  data: JWTToken;
}
export interface JWTToken {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export interface IWord {
  id: string;
  group: 0;
  page: 0;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

export interface GameStatistics {
  audiochallenge: {
    lastChanged: string;
    learnedWords: number;
    correctAnswers: number;
    wrongAnswers: number;
    longestSeries: number;
    currentSeries: number;
    answersCount: number;
    newWords: number;
  };
  sprint: {
    lastChanged: string;
    learnedWords: number;
    correctAnswers: number;
    wrongAnswers: number;
    longestSeries: number;
    currentSeries: number;
    answersCount: number;
    newWords: number;
  };
}

export type SprintStat = Pick<GameStatistics, 'sprint'>;

export interface ISprintStat {
  lastChanged: string;
  learnedWords: number;
  correctAnswers: number;
  wrongAnswers: number;
  longestSeries: number;
  currentSeries: number;
  answersCount: number;
  newWords: number;
}
export interface SignUpResponse {
  id: string;
  name: string;
  email: string;
  error?: string;
}
