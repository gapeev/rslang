export interface dataStat {
  data?: {
    optional?: {
      wordStatistics?: {
        date?: string;
      };
      gameStatistics: gameStatistics;
    };
  };
}
export interface gameStatistics {
  audiochallenge: {
    lastChanged: string;
    learnedWords: number;
    correctAnswers: number;
    wrongAnswers: number;
    longestSeries: number;
    answersCount: number;
    newWords: number;
  };
  sprint: {
    lastChanged: string;
    learnedWords: number;
    correctAnswers: number;
    wrongAnswers: number;
    longestSeries: number;
    answersCount: number;
    newWords: number;
  };
}
