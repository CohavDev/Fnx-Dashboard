import { Alert, Box } from "@mui/material";
import InputSection from "./inputSection";
import { useEffect, useState } from "react";
import connectUnit from "../services/connectUnit";
import { Button } from "@mui/joy";

export default function MainPage(props) {
  const [subscriber, setSubscriber] = useState(0);
  const [license, setLicense] = useState(0);
  const [innerId, setInnerId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [serverMsgSuccess, setMsgSuccess] = useState("");

  async function connectUnitHandleClick() {
    const result = await connectUnit(subscriber, license, innerId, setLoading);
    if (result) {
      // const info = subscriber +", "+license +", "+innerId
      setMsgSuccess(result);
    }
  }
  return (
    <Box>
      <InputSection
        set={{
          subscriber: setSubscriber,
          license: setLicense,
          innerId: setInnerId,
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
          <Button variant="outlined">פתח שליחות</Button>

          <Button variant="outlined">החלף יחידה</Button>
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
