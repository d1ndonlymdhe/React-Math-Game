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
  difficulty: string | "Easy" | "Medium" | "Hard";
  name: string;
};

type EasyGamePropsTypes = {
  name: string;
};
type GameProps = {
  name: string;
  rounds: number;
  numberOfOperands: number;
};
// type Question = EasyQuestion | MedQuestion;

type Question = {
  operands: number[];
  operators: Operators;
  ans?: number;
};

type Operator = {
  value: "+" | "-" | "x";
  pos: number;
};

type Operators = Operator[];

type MedQuestion = {
  type: "Med";
  operand1: number;
  operator1: string;
  operand2: number;
  operator2: string;
  operand3: number;
  ans: number;
};

// type expression = {
//   operand1: number;
//   operator?: string;
//   operand2?: string;
// };

type Answer = {
  submited: boolean;
  value?: number;
};
type EasyQuestionPropsTypes = {
  questions: Question[];
  answers: answer[];
  setAnswers: set<answer[]>;
  setFinished: set<boolean>;
};

type RenderEasyResultsPropsTypes = {
  name: string;
  questions: Question[];
  answers: answer[];
};

type set<T> = React.Dispatch<T>;
