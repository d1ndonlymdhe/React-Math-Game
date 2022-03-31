import { Input } from "./Input";
import { LabelInputPropsTypes } from "./typings/components";
export default function LabelInput(props: LabelInputPropsTypes) {
  const { labelText, inputId, InputProps, inputRef } = props;
  return (
    <div className="flex flex-col items-center">
      <label htmlFor={inputId}>{labelText}</label>
      <Input type="number" id={inputId} {...InputProps} ref={inputRef}></Input>
    </div>
  );
}
