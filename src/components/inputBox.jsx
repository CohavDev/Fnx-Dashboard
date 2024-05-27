import { TextField } from "@mui/material";

export default function InputBox(props) {
  return (
    <TextField
      id="outlined-basic"
      label={props.label}
      variant="outlined"
      type="number"
      sx={{
        width: "30%",
        WebkitBoxShadow: "2px 2px 2px 0px rgba(0,0,0,0.4)",
        justifyContent: "center",
      }}
    />
  );
}
