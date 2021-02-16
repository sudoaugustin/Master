import React from "react";
import { connect } from "react-redux";
import { Paper } from "@material-ui/core";
import { TextField, PasswordField, Button, Select } from "../Utils/Input";
import VerifyCode from "./VerifyCode";
import { register } from "../../actions/authActions";
import { returnError } from "../../actions/msgActions";
import { setLang } from "../../actions/appActions";
import { appName, redirect } from "../../config";
import AUTH_WORDS from "../../lang/auth";
class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = { success: false };
  }
  handleSuccess = (v) => this.setState((prev) => ({ ...prev, success: v }));
  handleChange = (val, name) => {
    const msg = {};
    msg[name] = null;
    this.setState((prev) => ({ ...prev, [name]: val }));
    this.props.returnError(msg);
  };
  render() {
    const { placeholder, label, title } = AUTH_WORDS[this.props.lang];
    if (this.props.isAuthenticated) redirect("/app");
    else if (this.state.success)
      return <VerifyCode type="ACCOUNT_VERIFICATION" />;
    else {
      let msg = this.props.msg,
        email = {
          margin: "dense",
          err: msg.email ? true : false,
          msg: msg.email,
          name: "email",
          placeholder: placeholder.email,
          label: label.email,
          handleChange: this.handleChange,
        },
        username = {
          margin: "dense",
          err: msg.username ? true : false,
          msg: msg.username,
          name: "username",
          placeholder: placeholder.username,
          label: label.username,
          handleChange: this.handleChange,
        },
        password = {
          margin: "dense",
          err: msg.password ? true : false,
          msg: msg.password,
          name: "password",
          placeholder: placeholder.password,
          label: label.password,
          handleChange: this.handleChange,
        },
        confirm = {
          margin: "dense",
          err: msg.confirm ? true : false,
          msg: msg.confirm,
          name: "confirm",
          placeholder: placeholder.confirm,
          label: label.confirm,
          handleChange: this.handleChange,
        },
        reminder = {
          margin: "dense",
          err: msg.reminder ? true : false,
          msg: msg.reminder,
          name: "reminder",
          placeholder: placeholder.reminder,
          label: label.reminder,
          handleChange: this.handleChange,
        };
      return (
        <div className="w-full h-full flex-col  flex justify-center items-center">
          <Paper className="max-w-sm  p-3  xs:shadow-none xs:bg-clear sm:px-5 my-5">
            <form>
              <div>
                <p className="text-xl pb-3 text-primary text-center font-logo font-semibold">
                  {appName}
                </p>
                <p className=" text-lg pb-4  text-center text-gray-900 font-sans ">
                  {title.register}
                </p>
              </div>
              <TextField {...email} />
              <TextField {...username} />
              <PasswordField {...password} />
              <PasswordField {...confirm} />
              <TextField {...reminder} />
              <Button
                fullWidth
                label={label.register}
                loading={this.props.loading}
                onClick={() => {
                  this.props.register({
                    ...this.state,
                    callback: this.handleSuccess,
                  });
                }}
              />
              <Button
                fullWidth
                label={label.login}
                lowercase={true}
                variant="text"
                href="/login"
              />
            </form>
          </Paper>
          <div className="max-w-sm">
            <Select
              options={this.props.lang === "EN" ? ["EN", "MM"] : ["MM", "EN"]}
              handleChange={(val) =>
                this.props.setLang(val === "EN" ? "EN" : "MM")
              }
              margin="dense"
            />
          </div>
        </div>
      );
    }
  }
}
const mapStatetoProp = ({ auth, msg, app }) => ({
  isAuthenticated: auth.isAuthenticated,
  loading: auth.loading,
  msg: msg.error,
  lang: app.lang,
});
export default connect(mapStatetoProp, { register, returnError, setLang })(
  Register
);
