import { RadioInputPropsTypes } from "./typings/components";
export function RadioInput(props: RadioInputPropsTypes) {
  const { id, name, labelValue, setReturnThis } = props;
  return (
    <div>
      <input
        type="radio"
        id={id}
        name={name}
        onChange={() => {
          setReturnThis(labelValue);
          console.log(labelValue);
        }}
      ></input>
      <label htmlFor={id}>{labelValue}</label>
    </div>
  );
}
