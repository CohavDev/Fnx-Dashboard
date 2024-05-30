import { Alert, Box } from "@mui/material";
import InputSection from "./inputSection";
import { useEffect, useState } from "react";
import connectUnit from "../services/connectUnit";
import { Button } from "@mui/joy";
import replaceUnit from "../services/replaceUnit";
//redux
import { useSelector, useDispatch } from "react-redux";
import { setLicense } from "../features/license/licenseSlice";
//end of redux

export default function MainPage(props) {
  const [subscriber, setSubscriber] = useState(0);
  // const [license, setLicense] = useState(0);
  const license = useSelector((state) => state.license.value);
  const dispatch = useDispatch();
  const [innerId, setInnerId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [autoCompleteData, setAutoCompleteData] = useState([]);
  const [serverMsgSuccess, setMsgSuccess] = useState("");

  async function connectUnitHandleClick() {
    const result = await connectUnit(subscriber, license, innerId, setLoading);
    if (result) {
      // const info = subscriber +", "+license +", "+innerId
      setMsgSuccess(result);
    }
  }
  async function replaceUnitHandleClick() {
    if (autoCompleteData) {
      const vehicle_id = autoCompleteData[license]["vehicle_id"];
      const result = await replaceUnit(license, vehicle_id, setLoading);
      if (result) {
        // const info = subscriber +", "+license +", "+innerId
        setMsgSuccess(
          "בקשה לשליחות חדשה נשלחה, בדוק בדינמיקה כדי לוודא שהתקבלה"
        );
      } else {
        setMsgSuccess("בקשת שליחות נכשלה");
      }
    }
  }
  return (
    <Box>
      <InputSection
        set={{
          subscriber: setSubscriber,
          // license: setLicense,
          license: (val) => dispatch(setLicense(val)),
          innerId: setInnerId,
          autoCompleteData: setAutoCompleteData,
        }}
      />
      <Box sx={{ paddingTop: 10 }}>
        <Button
          loading={loading}
          sx={{ width: "25ch", m: 1 }}
          onClick={() => connectUnitHandleClick()}
        >
          צמד
        </Button>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined">פתח שליחות פקטיבית</Button>

          <Button
            loading={loading}
            variant="outlined"
            color="danger"
            onClick={() => replaceUnitHandleClick()}
          >
            החלף יחידה (כשיש יחידה קיימת)
          </Button>
        </Box>
      </Box>
      {serverMsgSuccess !== "" && (
        <Alert
          variant="outlined"
          severity="info"
          sx={{ marginTop: 5, backgroundColor: "white" }}
        >
          {serverMsgSuccess}
        </Alert>
      )}
    </Box>
  );
}
