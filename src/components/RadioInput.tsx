import { RadioInputPropsTypes } from "./typings/components";
export function RadioInput(props: RadioInputPropsTypes) {
  const { id, name, labelValue, setReturnThis } = props;
  return (
    <div className="grid grid-cols-2 items-center justify-items-center">
      <input
        type="radio"
        id={id}
        name={name}
        onChange={() => {
          setReturnThis(labelValue);
        }}
      ></input>
      <label htmlFor={id}>{labelValue}</label>
    </div>
  );
}
