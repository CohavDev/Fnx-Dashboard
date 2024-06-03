import * as React from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import { FlightTakeoff } from "@mui/icons-material";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

export default function AlertDialogModal(props) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button
        variant="outlined"
        color={props.icon === "airplane" ? "danger" : "warning"}
        endDecorator={props.icon === "airplane" ? <FlightTakeoff /> : <></>}
        onClick={() => setOpen(true)}
      >
        {props.buttonText}
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ direction: "rtl" }}>
            האם אתה בטוח שברצונך לפתוח שליחות חדשה?
          </DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              color={props.icon === "airplane" ? "danger" : "primary"}
              onClick={() => {
                props.callBackConfirm();
                setOpen(false);
              }}
            >
              פתח שליחות חדשה
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setOpen(false)}
              loading={props.loading}
            >
              בטל
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  );
}
