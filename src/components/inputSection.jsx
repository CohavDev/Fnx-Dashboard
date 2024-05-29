import {
  Box,
  Select,
  TextField,
  Typography,
  autocompleteClasses,
} from "@mui/material";
import InputBox from "./inputBox";
import autoCompleteBySubscriber from "../services/autoComplete";
import { useEffect, useState } from "react";
import { MenuItem } from "@mui/material";
import { Input } from "@mui/base";

export default function InputSection(props) {
  const [subscriber, setSubscriber] = useState(0);
  const [license, setLicense] = useState();
  const [innerId, setInnerId] = useState();
  const [lastGRPS, setLastGRPS] = useState();
  const [autoCompleteData, setAutoCompleteData] = useState([]);
  async function autoComplete() {
    const res = await autoCompleteBySubscriber(subscriber);
    setAutoCompleteData(res);
    props.set.autoCompleteData(res);
    const licenseFirst = Object.keys(res)[0];
    console.log("licenses = ", licenseFirst);
    setLicense(licenseFirst);
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("typing has ended, calling autocomplete...");
      autoComplete();
    }, 500);
    return () => clearTimeout(timer);
  }, [subscriber]);

  useEffect(() => {
    if (license) {
      let temp = autoCompleteData[license]["inner_id"];
      let lastGRPS = autoCompleteData[license]["last_GRPS"];
      if (temp) {
        temp = temp.replace(/^0+/, ""); //remove leading zeroes
        setInnerId(temp);
        setLastGRPS(lastGRPS);
      } else {
        setInnerId("");
        setLastGRPS("");
      }
      props.set.license(license);
    } else {
      props.set.license();
      props.set.autoCompleteData();
      setInnerId("");
      setLastGRPS("");
    }
  }, [license]);
  useEffect(() => {
    if (innerId) props.set.innerId(innerId);
  }, [innerId]);

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
      <InputBox
        label="מספר מנוי"
        set={props.set.subscriber}
        autoCompleteBySub={(sub) => setSubscriber(sub)}
      />
      {/* <InputBox label="מספר רכב" set = {props.set.license} license = {license} /> */}
      <TextField
        label="מספר רכב"
        select
        value={license === undefined ? "" : license}
        onChange={(e) => setLicense(e.target.value)}
      >
        {Object.keys(autoCompleteData).map((optionLicense) => (
          <MenuItem value={optionLicense} key={optionLicense}>
            {optionLicense}
          </MenuItem>
        ))}
      </TextField>
      <InputBox label="מספר יחידה" val={innerId} set={props.set.innerId} />
      {lastGRPS !== "" && <TextField value={lastGRPS} disabled></TextField>}
    </Box>
  );
}
