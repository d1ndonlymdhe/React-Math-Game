import React, { useEffect, useRef, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { MotionWrapper } from "./components/MotionWrapper";
import { AnimatePresence } from "framer-motion";
import { RadioInput } from "./components/RadioInput";
import LabelInput from "./components/LabelInput";
//@ts-ignore
import uuid from "react-uuid";
import { Wrapper } from "./components/Wrapper";
function App() {
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>({
    rounds: 10,
    numberOfOperands: 1,
    timeout: 3000,
  });
  const [currentScreen, setCurrentScreen] = useState("init");
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-slate-900">
      <AnimatePresence initial={false} exitBeforeEnter={true}>
        {currentScreen === "init" && (
          <Init
            key="Init"
            setCurrentScreen={setCurrentScreen}
            name={name}
            setName={setName}
          />
        )}
        {currentScreen === "welcomeScreen" && (
          <ChooseDiffScreen
            key="WelcomeScreen"
            name={name}
            setDifficulty={setDifficulty}
            setCurrentScreen={setCurrentScreen}
          ></ChooseDiffScreen>
        )}
        {currentScreen === "gameScreen" && (
          <GameScreen difficulty={difficulty} name={name}></GameScreen>
        )}
      </AnimatePresence>
    </div>
  );
}
function Init(props: InitPropsTypes) {
  const { setCurrentScreen, setName } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <MotionWrapper>
      <div className="mx-5">Hello There</div>
      <div className="mx-5">Enter Your Name</div>
      {/* <div className="my-2"> */}
      <form
        name="initForm"
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
          if (inputRef !== null && inputRef.current !== null) {
            setName(inputRef.current.value);
            setCurrentScreen("welcomeScreen");
          }
        }}
      >
        <div className="flex my-2 w-[96%] justify-evenly">
          {/* <div className="grid grid-cols-[80%_20%] w-full gap-x-5 my-2"> */}
          <div>
            <Input
              setReturnThis={setName}
              name="name"
              type="text"
              autoComplete="off"
              ref={inputRef}
              // setReturnThis = {setName}
              autoFocus={true}
            ></Input>
          </div>
          <div>
            <Button
              text="Submit"
              type="submit"
              bonClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                if (inputRef !== null && inputRef.current !== null) {
                  setName(inputRef.current.value);
                  setCurrentScreen("welcomeScreen");
                }
              }}
            ></Button>
          </div>
        </div>
      </form>
      {/* </div> */}
    </MotionWrapper>
  );
}

function ChooseDiffScreen(props: WelcomeScreenPropsTypes) {
  const { name, setDifficulty, setCurrentScreen } = props;
  const [createCustom, setCreateCustom] = useState(false);
  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setCurrentScreen("gameScreen");
  };

  return (
    <MotionWrapper>
      <span className="mt-5 text-4xl">Hello {name}</span>
      <span>Select Difficulty:</span>
      <form name="difficulty" onSubmit={handleSubmit}>
        <div className="mb-5 flex w-[96%] flex-wrap justify-evenly">
          <div>
            <Button
              type="submit"
              text="Easy"
              bgColor="bg-green-400"
              bonClick={() => {
                setDifficulty({
                  rounds: 10,
                  numberOfOperands: 2,
                  timeout: 3000,
                });
              }}
            ></Button>
          </div>
          {/* <br /> */}
          <div>
            <Button
              type="submit"
              text="Medium"
              bgColor="bg-yellow-400"
              bonClick={() => {
                setDifficulty({
                  rounds: 10,
                  numberOfOperands: 3,
                  timeout: 5000,
                });
              }}
            ></Button>
          </div>
          {/* <br /> */}
          <div>
            <Button
              type="submit"
              text="Hard"
              bgColor="bg-red-400"
              bonClick={() => {
                setDifficulty({
                  rounds: 10,
                  numberOfOperands: 4,
                  timeout: 8000,
                });
              }}
            ></Button>
          </div>
          <div className="mt-5">
            <Button
              text=" Custom  "
              bgColor="bg-cyan-400"
              bonClick={(e) => {
                e.preventDefault();
                setCreateCustom(true);
              }}
            ></Button>
          </div>
        </div>
        {/* <div className="mb-5 flex w-[96%] justify-center">
          <Button
            type="submit"
            text="Submit"
            name="diffSubmit"
            bonClick={handleSubmit}
          ></Button>
        </div> */}
      </form>
      {createCustom && (
        <CustomDiffEditor
          setDifficulty={setDifficulty}
          setCurrentScreen={setCurrentScreen}
        ></CustomDiffEditor>
      )}
    </MotionWrapper>
  );
}

function CustomDiffEditor(props: customDiffEditorProps) {
  const { setDifficulty, setCurrentScreen } = props;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (roundsRef.current && operandsRef.current && timeoutRef.current) {
      const rounds = parseInt(roundsRef.current.value, 10);
      const numberOfOperands = parseInt(operandsRef.current.value, 10);
      const timeout = parseInt(timeoutRef.current.value, 10) * 1000;
      setDifficulty({ rounds, numberOfOperands, timeout });
      setCurrentScreen("gameScreen");
    }
  };
  const roundsRef = useRef<HTMLInputElement>(null);
  const operandsRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<HTMLInputElement>(null);

  return (
    <Wrapper>
      {/* Hello Make custom difficulties */}
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1 w-full items-center">
          <LabelInput
            labelText="Rounds"
            inputId="Rounds"
            InputProps={{ placeholder: "Rounds", min: 1 }}
            inputRef={roundsRef}
          ></LabelInput>
          <LabelInput
            labelText="Operands"
            inputId="Operands"
            InputProps={{ placeholder: "Operands", min: 1 }}
            inputRef={operandsRef}
          ></LabelInput>

          <LabelInput
            labelText="Timeout Duration"
            inputId="Timeout"
            InputProps={{ placeholder: "Timeout Duration" }}
            inputRef={timeoutRef}
          ></LabelInput>
          <Button
            text="submit"
            type="submit"
            bonClick={handleSubmit}
            bgColor="bg-cyan-400"
          ></Button>
        </div>
      </form>
    </Wrapper>
  );
}

function GameScreen(props: GameScreenPropsTypes) {
  const { difficulty, name } = props;
  // const { rounds, numberOfOperands, timeout } = difficulty;
  // let rounds: number = 10,
  //   numberOfOperands: number = 2;
  // if (difficulty === "Medium") {
  //   rounds = 10;
  //   numberOfOperands = 3;
  // } else if (difficulty === "Hard") {
  //   rounds = 10;
  //   numberOfOperands = 4;
  // }
  return (
    <MotionWrapper>
      <Game difficulty={difficulty} name={name}></Game>
    </MotionWrapper>
  );
}

function GetAnswers(props: EasyQuestionPropsTypes) {
  const { questions, setAnswers, answers, setFinished, timeout } = props;
  const [index, setIndex] = useState(0);

  //try to refactor to use a single object

  const [operands, setOperands] = useState(questions[0].operands);
  const [operators, setOperators] = useState(questions[0].operators);
  let expression = "";
  for (let i = 0; i < operands.length; i++) {
    if (i !== operands.length - 1) {
      expression = `${expression} ${operands[i]} ${operators[i].value}`;
    } else {
      expression = `${expression} ${operands[i]}`;
    }
  }
  const inputRef = useRef<HTMLInputElement>(null);
  const formWrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log("changed automatically");
      if (inputRef && inputRef.current) {
        inputRef.current.value = "";
      }
      if (index + 1 < questions.length) {
        let tempAns = answers;
        tempAns.push({ submited: false });
        setAnswers(tempAns);
        setIndex(index + 1);
        setOperands(questions[index + 1].operands);
        setOperators(questions[index + 1].operators);
      } else {
        setFinished(true);
        let tempAns = answers;
        tempAns.push({ submited: false });
        setAnswers(tempAns);
      }
    }, timeout);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [index, answers, questions, setAnswers, setFinished]);
  useEffect(() => {
    const formWrapper = formWrapperRef.current;
    const glowRed = "animate-glowRed";
    const timeoutId = setTimeout(() => {
      formWrapper?.classList.add(glowRed);
    }, timeout - 2000);
    return () => {
      clearTimeout(timeoutId);
      formWrapper?.classList.remove(glowRed);
    };
  }, [index, answers, questions, setAnswers, setFinished]);
  return (
    <MotionWrapper>
      <div className="mb-5">
        {index + 1} of {questions.length}
      </div>
      <div
        className="w-4/6 border-solid border-slate-900 border-4 rounded-lg"
        ref={formWrapperRef}
      >
        <form
          className="grid grid-cols-[1.2fr_1fr] justify-items-center my-2 mx-3 "
          name="question"
          onSubmit={(e) => {
            e.preventDefault();

            //need to refactor this
            if (index + 1 < questions.length) {
              if (inputRef !== null) {
                if (
                  inputRef.current !== null &&
                  inputRef.current.value !== ""
                ) {
                  let tempAns = answers;
                  tempAns.push({
                    submited: true,
                    value: parseInt(inputRef.current.value, 10),
                  });
                  setAnswers(tempAns);
                  setIndex(index + 1);
                  //The value of index will not be updatad until rerender so +1
                  setOperands(questions[index + 1].operands);
                  setOperators(questions[index + 1].operators);
                  inputRef.current.value = "";
                }
              }
            } else {
              if (inputRef.current && inputRef.current.value !== "") {
                setFinished(true);
                let tempAns = answers;
                tempAns.push({
                  submited: true,
                  value: parseInt(inputRef.current.value, 10),
                });
                setAnswers(tempAns);
              }
            }
          }}
        >
          <span>{expression}</span>
          {/* <span>{`${operands[0]} ${operators[0]} ${operands[1]} = `}</span> */}
          <Input
            type="number"
            autoComplete="off"
            autoFocus={true}
            className="appearance-[textfield] appearance-none"
            //@ts-ignore
            ref={inputRef}
          ></Input>
        </form>
      </div>
    </MotionWrapper>
  );
}

function RenderResults(props: RenderEasyResultsPropsTypes) {
  const { answers, questions, name } = props;

  const score = answers.filter((el, i) => {
    return el.submited && el.value === questions[i].ans;
  }).length;

  return (
    <MotionWrapper key={uuid()}>
      <div className="pb-2">
        <span> {name}, your score is </span>
        <span>{score}</span>
      </div>

      <div className="grid grid-cols-3 gap-1 text-[clamp(13px,0.5vw,0px)] justify-center justify-items-center items-center bg-slate-900 border-4 border-slate-900 rounded-lg">
        <div className="bg-slate-300 w-full h-full flex items-center justify-center text-center p-2">
          Question
        </div>
        <div className="bg-slate-300 w-full h-full flex items-center justify-center text-center p-2">
          Correct Answer
        </div>
        <div className="bg-slate-300 w-full h-full flex items-center justify-center text-center p-2">
          Your Answer
        </div>

        {answers.map((el, i) => {
          const { operands, operators, ans } = questions[i];
          let expression = "";
          for (let i = 0; i < operands.length; i++) {
            if (i !== operands.length - 1) {
              expression = `${expression} ${operands[i]} ${operators[i].value}`;
            } else {
              expression = `${expression} ${operands[i]}`;
            }
          }
          // const [operand1, operand2] = operands;
          // const [operator] = operators;
          let ansColor = "bg-red-400";
          if (el.submited && el.value === ans) {
            ansColor = "bg-green-400";
          }
          return (
            <React.Fragment key={uuid()}>
              <div
                className="bg-slate-300 w-full h-full flex items-center justify-center text-center p-2"
                key={uuid()}
              >
                {/* {operand1} {operator} {operand2} */}
                {expression}
              </div>
              <div
                className="bg-slate-300 w-full h-full flex items-center justify-center text-center p-2"
                key={uuid()}
              >
                {ans}
              </div>
              <div
                className={`${ansColor} w-full h-full flex items-center justify-center text-center p-2`}
                key={uuid()}
              >
                {el.submited ? el.value : "did not submit"}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </MotionWrapper>
  );
}
function Game(props: GameProps) {
  console.log("rendering game");
  const { name, difficulty } = props;
  const { rounds, numberOfOperands, timeout } = difficulty;
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [finished, setFinished] = useState(false);
  const operators: Operators = [
    { value: "+", pos: 0 },
    { value: "-", pos: 0 },
    { value: "x", pos: 0 },
  ];
  const questions: Question[] = [];
  for (let i = 0; i < rounds; i++) {
    const operands: number[] = [];
    const qOperators: Operators = [];
    for (let j = 0; j < numberOfOperands; j++) {
      operands.push(generateRandom(2, 9, []));
      if (j < numberOfOperands - 1) {
        let operator: Operator = { value: "+", pos: 0 };
        operator.value = operators[generateRandom(0, 3, [])].value;
        // operator.pos = j;
        qOperators.push(operator);
      }
    }
    const ans = getResultComplex({ operands, operators: qOperators });
    // console.log(ans);
    questions.push({ operands, operators: qOperators, ans });
  }
  const [reactiveQuestions] = useState<Question[]>(questions);
  if (!finished) {
    return (
      <GetAnswers
        questions={reactiveQuestions}
        setAnswers={setAnswers}
        answers={answers}
        setFinished={setFinished}
        timeout={timeout}
      ></GetAnswers>
    );
  }
  return (
    <RenderResults
      {...{ questions: reactiveQuestions, answers, name }}
    ></RenderResults>
  );
}

function getResult(operand1: number, operand2: number, operator: string) {
  if (operator === "+") {
    return operand1 + operand2;
  } else if (operator === "-") {
    return operand1 - operand2;
  } else if (operator === "x") {
    return operand1 * operand2;
  } else if (operator === "/") {
    return operand1 / operand2;
  }
  return 0;
}
function appendToIndex(el: any, arr: typeof el[], index: number) {
  let returnArr = [];
  let balancer = 0;
  for (let i = 0; i <= arr.length; i++) {
    if (i === index) {
      returnArr.push(el);
      balancer = -1;
    } else {
      returnArr.push(arr[i + balancer]);
    }
  }
  return returnArr;
}

// function getResultComplex2(question: Question) {
//   let { operands, operators, log } = question;
//   if (log) {
//     console.log(operands, operators);
//   }

// }

function getResultComplex(question: Question): number {
  let { operands, operators, log } = question;
  // let parsed = parseOperators(operands, operators);
  // operands = parsed.operands;
  // operators = parsed.operators;
  if (log) {
    console.log(operands, operators);
  }

  operators = operators.map((e, i) => {
    e.pos = i;
    return e;



    
  });
  // console.log("inside getans2");
  // console.log(operands);
  // console.log(operators);
  operators = sortOperators(operators);
  const ans = getResult(
    operands[operators[0].pos],
    operands[operators[0].pos + 1],
    operators[0].value
  );
  if (operators.length === 1) {
    return ans;
  }
  operands = removeFromArr(operands[operators[0].pos], operands);
  operands = removeFromArr(operands[operators[0].pos], operands);
  operands = appendToIndex(ans, operands, operators[0].pos);

  operators = updateOperators(operators[0], operators);

  let x = getResultComplex({ operands, operators, log });
  // console.log(x);
  return x;
}

function parseOperators(operands: number[], operators: Operator[]) {
  operators.forEach((operator, i) => {
    if (operator.value == "-") {
      operands[i + 1] = 0 - operands[i + 1];
      operator.value = "+";
    }
  });
  return { operands, operators };
}

function updateOperators(toBeRemoved: Operator, operators: Operators) {
  for (let i = 0; i < operators.length; i++) {
    if (operators[i].pos > toBeRemoved.pos) {
      operators[i].pos -= 1;
    }
  }
  return removeFromArr(toBeRemoved, operators);
}

function removeFromArr(el: any, arr: typeof el[]) {
  let allTrue = false;
  const retArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === el && !allTrue) {
      allTrue = true;
    } else {
      retArr.push(arr[i]);
    }
  }
  return retArr;
}

function sortOperators(operators: Operators) {
  const priority = {
    x: 2,
    "+": 1,
    "-": 1,
    "/": 2,
  };
  for (let i = 0; i < operators.length; i++) {
    for (let j = 0; j < operators.length; j++) {
      if (priority[operators[j].value] < priority[operators[i].value]) {
        const temp = operators[i];
        operators[i] = operators[j];
        operators[j] = temp;
      }
    }
  }
  return operators;
}

function generateRandom(start: number, end: number, dontInclude: number[]) {
  let ans;
  do {
    ans = (Math.floor(Math.random() * end) % end) + start;
  } while (dontInclude.includes(ans));
  return ans;
}

export default App;
