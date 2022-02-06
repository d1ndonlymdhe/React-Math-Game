type InitPropsTypes = {
  setCurrentScreen: set<string>;
  name: string;
  setName: set<string>;
};
type WelcomeScreenPropsTypes = {
  name: string;
  setDifficulty: set<string>;
  setCurrentScreen: set<string>;
};

type GameScreenPropsTypes = {
  difficulty: string;
};

type question = {
  operand1: number;
  operand2: number;
  operator: string;
  ans: number;
};

type EasyQuestionPropsTypes = {
  questions: question[];
  answers: number[];
  setAnswers: set<number[]>;
  setFinished: set<boolean>;
};

type set<T> = React.Dispatch<T>;
