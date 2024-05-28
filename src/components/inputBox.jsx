import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

export default function InputBox(props) {
  const [val, setVal] = useState("");
  useEffect(() => {
    setVal(props.val);
    props.set(props.val);
  }, [props.val]);
  function handleOnChange(e) {
    // e.target.value.trim()
    setVal(e.target.value);
    props.set(e.target.value);
    if (props.autoCompleteBySub) {
      props.autoCompleteBySub(e.target.value);
    }
  }
  return (
    <NumericFormat
      value={val}
      label={props.label}
      onChange={(e) => handleOnChange(e)}
      customInput={TextField}
      type="text"
    />
  );
}
