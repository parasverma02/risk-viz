import { useCallback } from "react";
import Select, { MultiValue, SingleValue } from "react-select";

// Project imports
import './custom-select.css';

export type CustomSelectProps = {
  label: string,
  options: Array<SelectOption>,
  onChange: ((value: string[] | string) => void),
  isMulti?: boolean,
  defaultValue?: SelectOption
}

export type SelectOption = {
  label: string,
  value: string,
}
const CustomSelect = (props: CustomSelectProps) => {
  const handleSelectChange = useCallback(
    (selectedOption: SingleValue<SelectOption> | MultiValue<SelectOption>) => {
      if ( selectedOption != null && typeof selectedOption === "object" && "value" in selectedOption) {
        props.onChange(selectedOption.value);
      } else {
        if (selectedOption != null) {
          const values = selectedOption.map(option => option.value);
          props.onChange(values);
        }
      }
    }, [props])

  return (
    <div className={"select-container"}>
      <p className={"select-label"}>{props.label}</p>
      <Select
        name={props.label}
        defaultValue={props.defaultValue}
        isMulti={props.isMulti? props.isMulti: false}
        options={props.options}
        className={"select-dropdown"}
        onChange={handleSelectChange}
      />
    </div>
  )
}

export default CustomSelect;