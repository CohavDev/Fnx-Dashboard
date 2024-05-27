import { Box } from "@mui/material";
import InputBox from "./inputBox";

export default function InputSection(props) {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": {
          width: "15ch",
          m: 1,
        },
      }}
      noValidate
      autoComplete="off"
    >
      <InputBox label="מספר מנוי" />
      <InputBox label="מספר רכב" />
      <InputBox label="מספר יחידה" />
    </Box>
  );
}
