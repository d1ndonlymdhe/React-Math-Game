type InitPropsTypes = {
  setCurrentScreen: React.Dispatch<string>;
  name: string;
  setName: set<string>;
};
type WelcomeScreenPropsTypes = {
  name: string;
};

type set<T> = React.Dispatch<T>;
