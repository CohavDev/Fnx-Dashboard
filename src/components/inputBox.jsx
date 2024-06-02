import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useDispatch } from "react-redux";
import { InputAdornment } from "@mui/material";
import { Person, AdUnits } from "@mui/icons-material";

export default function InputBox(props) {
  const dispatch = useDispatch();
  const [val, setVal] = useState(props.val);

  useEffect(() => {
    setVal(props.val);
  }, [props.val]);
  useEffect(() => {
    console.log("change! ", val);
  }, [val]);
  function handleOnChange(e) {
    setVal(e.target.value);
    dispatch(props.set(e.target.value));
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
