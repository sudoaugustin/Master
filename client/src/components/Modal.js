import React from "react";
import { connect } from "react-redux";
import { returnError, clearError } from "../actions/msgActions";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

function Modal(props) {
  const [msg, setMsg] = React.useState(props.msg);
  React.useEffect(() => {
    if (msg !== props.msg) setMsg(props.msg);
    setTimeout(() => {
      props.clearError();
    }, 3000);
  }, [props, msg]);
  const handleClose = () => props.clearError();
  return msg ? (
    <Snackbar
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      open={msg ? true : false}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        variant="filled"
        severity={props.success ? "success" : "error"}
      >
        {msg}
      </Alert>
    </Snackbar>
  ) : (
    " "
  );
}
const mapStatetoProp = (state) => ({
  msg: state.msg.error.modal || state.msg.success.modal,
  success: state.msg.success.modal ? true : false,
});

export default connect(mapStatetoProp, { returnError, clearError })(Modal);
