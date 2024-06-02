import { Alert, Box } from "@mui/material";
import InputSection from "./inputSection";
import { useEffect, useState } from "react";
import connectUnit from "../services/connectUnit";
import { Button } from "@mui/joy";
import replaceUnit from "../services/replaceUnit";
//redux
import { useSelector, useDispatch } from "react-redux";
import { setLicense } from "../features/slices/licenseSlice";
import { setInnerID } from "../features/slices/innerIDSlice";
import { setSubscriber } from "../features/slices/subscriberSlice";
import AlertDialogModal from "./alertDialog";
//end of redux

export default function MainPage(props) {
  const dispatch = useDispatch();
  const subscriber = useSelector((state) => state.subscriber.value);
  const license = useSelector((state) => state.license.value);
  const innerID = useSelector((state) => state.innerID.value);
  const [loading, setLoading] = useState(false);
  const [autoCompleteData, setAutoCompleteData] = useState([]);
  const [serverMsgSuccess, setMsgSuccess] = useState("");

  async function connectUnitHandleClick() {
    const result = await connectUnit(subscriber, license, innerID, setLoading);
    if (result) {
      setMsgSuccess(result);
    }
  }
  async function replaceUnitHandleClick() {
    if (autoCompleteData) {
      const vehicle_id = autoCompleteData[license]["vehicle_id"];
      const result = await replaceUnit(license, vehicle_id, setLoading);
      if (result) {
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

          {/* <Button
            loading={loading}
            variant="outlined"
            color="danger"
            onClick={() => replaceUnitHandleClick()}
          >
            החלף יחידה (כשיש יחידה קיימת)
          </Button> */}
          <AlertDialogModal
            buttonText={"החלף יחידה (כשיש יחידה קיימת)"}
            callBackConfirm={replaceUnitHandleClick}
            loading={loading}
          />
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
