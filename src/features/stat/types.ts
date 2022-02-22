export interface Statistics {
  optional: {
    wordStatistics: {
      [date: string]: number;
    };
    gameStatistics: GameStatistics;
    newWordStatistics: {
      [date: string]: number;
    };
  };
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
