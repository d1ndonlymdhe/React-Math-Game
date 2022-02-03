import React, { useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { Wrapper } from "./components/Wrapper";
import { MotionWrapper } from "./components/MotionWrapper";
import { AnimatePresence } from "framer-motion";
import { RadioInput } from "./components/RadioInput";
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
          <GameScreen difficulty={difficulty}></GameScreen>
        )}
      </AnimatePresence>
    </div>
  );
}
function Init(props: InitPropsTypes) {
  const { setCurrentScreen, name, setName } = props;
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
          setCurrentScreen("welcomeScreen");
        }}
      >
        <div className="flex flex-row justify-center my-2">
          <Input
            setReturnThis={setName}
            name="name"
            type="text"
            autoComplete="off"
            autoFocus={true}
          ></Input>
          <Button
            text="Submit"
            type="submit"
            bonClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              setCurrentScreen("welcomeScreen");
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
  const { difficulty } = props;
  return <MotionWrapper>GAME {difficulty}</MotionWrapper>;
}

function EasyGame() {}

function generateRandom(start: number, end: number, dontInclude: number[]) {
  let ans;
  do {
    ans = (Math.floor(Math.random() * end) % end) + end;
  } while (dontInclude.includes(ans));
  return ans;
}

export default App;
