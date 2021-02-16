import React from "react";
import { connect } from "react-redux";
import { PasswordField, Button } from "../Utils/Input";
import { changePass } from "../../actions/authActions";
import { clearError } from "../../actions/msgActions";
import { appName } from "../../config";
function NewPassForm(props) {
  const [state, setState] = React.useState({});
  const handleChange = (val, ref) => {
    let name = ref.current.name;
    setState({
      ...state,
      [name]: val,
    });
  };
  const password = {
      err: props.msg.password,
      msg: props.msg.password,
      name: "password",
      handleChange,
    },
    confirm = {
      err: props.msg.confirm,
      msg: props.msg.confirm,
      name: "confirm",
      handleChange,
    };
  return (
    <div className="auth-form">
      <form>
        <div className="title">
          <p className="logo">{appName}</p>
          <h2>Enter new password</h2>
          <p className="desc">
            Next time, use this password to login to your {appName} account
          </p>
        </div>
        <PasswordField
          label="Password"
          placeholder="Enter password"
          {...password}
        />
        <PasswordField
          label="Confirm password"
          placeholder="Confirm password"
          {...confirm}
        />
        <Button
          fullWidth
          lowercase="true"
          label="Change Password"
          loading={props.loading}
          onClick={() => {
            let passwordVal = state.password,
              confirmVal = state.confirm,
              recover_id = props.recover_id;
            props.changePass({
              password: passwordVal,
              confirm: confirmVal,
              recover_id,
            });
          }}
        />
      </form>
    </div>
  );
}
const mapStatetoProp = (state) => ({
  loading: state.auth.loading,
  msg: state.msg.error,
});
export default connect(mapStatetoProp, { clearError, changePass })(NewPassForm);
