import { Box, InputAdornment, TextField } from "@mui/material";
import InputBox from "./inputBox";
import autoCompleteBySubscriber from "../services/autoComplete";
import { useEffect, useState } from "react";
import { MenuItem } from "@mui/material";
import { DirectionsCar, GpsFixed } from "@mui/icons-material";
//redux
import { useSelector, useDispatch } from "react-redux";
import { setLicense } from "../features/slices/licenseSlice";
import { setInnerID } from "../features/slices/innerIDSlice";
import { setSubscriber } from "../features/slices/subscriberSlice";
//end of redux

export default function InputSection(props) {
  const dispatch = useDispatch();
  const subscriber = useSelector((state) => state.subscriber.value);
  const license = useSelector((state) => state.license.value);
  const innerID = useSelector((state) => state.innerID.value);
  const [lastGRPS, setLastGRPS] = useState();
  const [autoCompleteData, setAutoCompleteData] = useState([]);

  function selectLicense() {
    if (license) {
      console.log(autoCompleteData);
      let licenseData = autoCompleteData[license];
      if (!licenseData) {
        return;
      }
      let temp = licenseData["inner_id"];
      let lastGRPS = licenseData["last_GRPS"];
      if (temp) {
        temp = temp.replace(/^0+/, ""); //remove leading zeroes
        dispatch(setInnerID(temp));
        setLastGRPS(lastGRPS);
      } else {
        dispatch(setInnerID(""));
        setLastGRPS("");
      }
    } else {
      props.set.autoCompleteData();
      dispatch(setInnerID(""));
      setLastGRPS("");
    }
  }
  async function autoComplete() {
    const res = await autoCompleteBySubscriber(subscriber);
    if (res === false) {
      props.set.autoCompleteData([]);
      setAutoCompleteData([]);
    } else {
      props.set.autoCompleteData(res);
      setAutoCompleteData(res);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("typing has ended, calling autocomplete...");
      autoComplete();
    }, 500);
    return () => clearTimeout(timer);
  }, [subscriber]);

  useEffect(() => {
    console.log("license use effect ! ", license);
    selectLicense();
  }, [license]);
  useEffect(() => {
    const licenseFirst = Object.keys(autoCompleteData)[0];
    console.log("licenses = ", licenseFirst);
    dispatch(setLicense(licenseFirst));
  }, [autoCompleteData]);

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
        set={setSubscriber}
        autoCompleteBySub={setSubscriber}
      />
      <TextField
        label="מספר רכב"
        select
        value={license === undefined ? "" : license}
        onChange={(e) => dispatch(setLicense(e.target.value))}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <DirectionsCar />
            </InputAdornment>
          ),
        }}
      >
        {Object.keys(autoCompleteData).map((optionLicense) => (
          <MenuItem value={optionLicense} key={optionLicense}>
            {optionLicense}
          </MenuItem>
        ))}
      </TextField>
      <InputBox label="מספר יחידה" val={innerID} set={setInnerID} />
      {lastGRPS !== "" && (
        <TextField
          label="תאריך שידור אחרון"
          value={lastGRPS}
          disabled
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <GpsFixed />
              </InputAdornment>
            ),
          }}
        ></TextField>
      )}
    </Box>
  );
}
