type InitPropsTypes = {
  setCurrentScreen: set<string>;
  name: string;
  setName: set<string>;
};
type WelcomeScreenPropsTypes = {
  name: string;
  setDifficulty: set<Difficulty>;
  setCurrentScreen: set<string>;
};

type GameScreenPropsTypes = {
  difficulty: Difficulty;
  name: string;
};
type customDiffEditorProps = {
  setDifficulty: set<Difficulty>;
  setCurrentScreen: set<string>;
};

type EasyGamePropsTypes = {
  name: string;
};
type GameProps = {
  name: string;
  difficulty: Difficulty;
};
// type Question = EasyQuestion | MedQuestion;

type Question = {
  operands: number[];
  operators: Operators;
  ans?: number;
  log?: boolean;
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

type InputPropsTypes = {
  // returnThis: string;
  placeholder?: string;
  id?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  name?: string;
  type?: "text" | "password" | "number" | undefined;
  setReturnThis?: set<string>;
  className?: string;
  inputRef?: React.MutableRefObject<HTMLInputElement | null>;
};

// type expression = {
//   operand1: number;
//   operator?: string;
//   operand2?: string;
// };

type Difficulty = {
  rounds: number;
  numberOfOperands: number;
  timeout: number;
};

type Answer = {
  submited: boolean;
  value?: number;
};
type EasyQuestionPropsTypes = {
  questions: Question[];
  answers: answer[];
  setAnswers: set<answer[]>;
  setFinished: set<boolean>;
  timeout: number;
};

type RenderEasyResultsPropsTypes = {
  name: string;
  questions: Question[];
  answers: answer[];
};

type set<T> = React.Dispatch<T>;
