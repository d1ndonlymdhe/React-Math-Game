import React, { useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { Wrapper } from "./components/Wrapper";
import { MotionWrapper } from "./components/MotionWrapper";
import { AnimatePresence } from "framer-motion";
function App() {
  const [name, setName] = useState("");
  const [currentScreen, setCurrentScreen] = useState("init");
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-slate-900">
      <AnimatePresence initial={false} exitBeforeEnter={true}>
        {currentScreen === "init" && (
          <Init
            setCurrentScreen={setCurrentScreen}
            name={name}
            setName={setName}
          />
        )}
        {/* </AnimatePresence> */}
        {/* <AnimatePresence initial={false} exitBeforeEnter={true}> */}
        {currentScreen === "welcomeScreen" && (
          <WelcomeScreen name={name}></WelcomeScreen>
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
      <div className="my-2">
        <form
          name="initForm"
          onSubmit={(e) => {
            e.preventDefault();
            setCurrentScreen("");
            setTimeout(() => {
              if (name !== "") {
                setCurrentScreen("welcomeScreen");
              }
            }, 1000);
          }}
        >
          <Input
            setReturnThis={setName}
            name="name"
            type="text"
            autoComplete="off"
          ></Input>
          <Button
            text="Submit"
            type="submit"
            bonClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              setCurrentScreen("");
              setTimeout(() => {
                if (name !== "") {
                  setCurrentScreen("welcomeScreen");
                }
              }, 1000);
            }}
          ></Button>
        </form>
      </div>
    </MotionWrapper>
  );
}

function WelcomeScreen(props: WelcomeScreenPropsTypes) {
  const { name } = props;
  return (
    <MotionWrapper>
      <div className="my-5">Hello {name}</div>
    </MotionWrapper>
  );
}

export default App;
