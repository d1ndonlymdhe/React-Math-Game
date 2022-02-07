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
  name: string;
};

type EasyGamePropsTypes = {
  name: string;
};

type question = {
  operand1: number;
  operand2: number;
  operator: string;
  ans: number;
};
type answer = {
  submited: boolean;
  value?: number;
};
type EasyQuestionPropsTypes = {
  questions: question[];
  answers: answer[];
  setAnswers: set<answer[]>;
  setFinished: set<boolean>;
};

type RenderEasyResultsPropsTypes = {
  name: string;
  questions: question[];
  answers: answer[];
};

type set<T> = React.Dispatch<T>;
