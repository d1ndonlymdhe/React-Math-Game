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

type set<T> = React.Dispatch<T>;
