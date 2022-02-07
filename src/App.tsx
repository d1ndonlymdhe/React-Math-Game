import React, { useEffect, useRef, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { MotionWrapper } from "./components/MotionWrapper";
import { AnimatePresence } from "framer-motion";
import { RadioInput } from "./components/RadioInput";
//@ts-ignore
import uuid from "react-uuid";
import { timeEnd } from "console";
function App() {
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("");
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
          <WelcomeScreen
            key="WelcomeScreen"
            name={name}
            setDifficulty={setDifficulty}
            setCurrentScreen={setCurrentScreen}
          ></WelcomeScreen>
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
        className="w-[80%]"
        onSubmit={(e) => {
          e.preventDefault();
          if (inputRef !== null && inputRef.current !== null) {
            setName(inputRef.current.value);
            setCurrentScreen("welcomeScreen");
          }
        }}
      >
        <div className="flex flex-row justify-center my-2">
          <Input
            setReturnThis={setName}
            name="name"
            type="text"
            autoComplete="off"
            ref={inputRef}
            // setReturnThis = {setName}
            autoFocus={true}
          ></Input>
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
      </form>
      {/* </div> */}
    </MotionWrapper>
  );
}

function WelcomeScreen(props: WelcomeScreenPropsTypes) {
  const { name, setDifficulty, setCurrentScreen } = props;

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
      <form name="difficulty">
        <div className="mb-5">
          <RadioInput
            name="difficulty"
            id="diffEasy"
            labelValue="Easy"
            setReturnThis={setDifficulty}
          ></RadioInput>
          {/* <br /> */}
          <RadioInput
            name="difficulty"
            id="diffMedi"
            labelValue="Medium"
            setReturnThis={setDifficulty}
          ></RadioInput>
          {/* <br /> */}
          <RadioInput
            name="difficulty"
            id="diffHard"
            labelValue="Hard"
            setReturnThis={setDifficulty}
          ></RadioInput>
        </div>
        <div className="mb-5">
          <Button
            type="submit"
            text="Submit"
            name="diffSubmit"
            bonClick={handleSubmit}
          ></Button>
        </div>
      </form>
    </MotionWrapper>
  );
}

function GameScreen(props: GameScreenPropsTypes) {
  const { difficulty, name } = props;
  return (
    <MotionWrapper>
      <EasyGame name={name}></EasyGame>
    </MotionWrapper>
  );
}

function EasyGame(props: EasyGamePropsTypes) {
  const { name } = props;
  const [answers, setAnswers] = useState<answer[]>([]);
  const [finished, setFinished] = useState(false);
  const rounds = 10;
  const operators = ["+", "-", "x"];
  const questions: question[] = [];
  for (let i = 0; i < rounds; i++) {
    const operand1 = generateRandom(2, 9, []);
    const operand2 = generateRandom(2, 9, []);
    const operatorIndex = generateRandom(0, 3, []);
    // console.log(operand1, operand2, operatorIndex);
    const operator = operators[operatorIndex];
    const ans = getAns(operand1, operand2, operator);
    questions.push({
      operand1,
      operand2,
      operator,
      ans,
    });
  }
  const [reactiveQuestions, setReactiveQuestions] =
    useState<question[]>(questions);
  // setReactiveQuestions(questions);
  if (!finished) {
    return (
      <EasyQuestion
        {...{ questions: reactiveQuestions, setAnswers, answers, setFinished }}
      ></EasyQuestion>
    );
  }
  return (
    <RenderEasyResults
      {...{ questions: reactiveQuestions, answers, name }}
    ></RenderEasyResults>
  );
}

function EasyQuestion(props: EasyQuestionPropsTypes) {
  const { questions, setAnswers, answers, setFinished } = props;
  const [index, setIndex] = useState(0);
  // console.log(index, questions[index]);

  //try to refactor to use a single object
  const [operand1, setOperand1] = useState(questions[0].operand1);
  const [operator, setOperator] = useState(questions[0].operator);
  const [operand2, setOperand2] = useState(questions[0].operand2);
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
        setOperand1(questions[index + 1].operand1);
        setOperator(questions[index + 1].operator);
        setOperand2(questions[index + 1].operand2);
      } else {
        setFinished(true);
        let tempAns = answers;
        tempAns.push({ submited: false });
        setAnswers(tempAns);
      }
    }, 4000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [index]);
  useEffect(() => {
    const glowRed = "animate-glowRed";
    const timeoutId = setTimeout(() => {
      formWrapperRef.current?.classList.add(glowRed);
    }, 2000);
    return () => {
      clearTimeout(timeoutId);
      formWrapperRef.current?.classList.remove(glowRed);
    };
  }, [index]);
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
                  console.log("rerender");
                  setIndex(index + 1);
                  //The value of index will not be updatad until rerender so +1
                  setOperand1(questions[index + 1].operand1);
                  setOperand2(questions[index + 1].operand2);
                  setOperator(questions[index + 1].operator);
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
          <span>{`${operand1} ${operator} ${operand2} = `}</span>
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

function RenderEasyResults(props: RenderEasyResultsPropsTypes) {
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
          const { operand1, operand2, operator, ans } = questions[i];
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
                {operand1} {operator} {operand2}
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

function getAns(operand1: number, operand2: number, operator: string) {
  if (operator === "+") {
    return operand1 + operand2;
  } else if (operator === "-") {
    return operand1 - operand2;
  }
  return operand1 * operand2;
}

function generateRandom(start: number, end: number, dontInclude: number[]) {
  let ans;
  do {
    ans = (Math.floor(Math.random() * end) % end) + start;
  } while (dontInclude.includes(ans));
  return ans;
}

export default App;
