import { Box, Button } from "@mui/material";
import InputSection from "./inputSection";

export default function MainPage(props) {
  return (
    <Box>
      <InputSection />
      <Box sx={{ paddingTop: 10 }}>
        <Button color="error" sx={{ width: "25ch", m: 1 }} variant="contained">
          צמד
        </Button>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined">פתח שליחות</Button>
          <Button variant="outlined">החלף יחידה</Button>
        </Box>
      </Box>
    </Box>
  );
}
