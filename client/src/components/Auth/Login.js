import React from "react";
import { connect } from "react-redux";
import { Link, Paper } from "@material-ui/core";
import {
  TextField,
  PasswordField,
  Button,
  Checkbox,
  Select,
} from "../Utils/Input";
import { login } from "../../actions/authActions";
import { returnError } from "../../actions/msgActions";
import { setLang } from "../../actions/appActions";
import { appName, redirect } from "../../config";
import VerifyCode from "./VerifyCode";
import AUTH_WORDS from "../../lang/auth";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saveLogin: true,
      success: false,
    };
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
    if (this.props.isAuthenticated) {
      redirect("/app");
      return <></>;
    } else if (this.state.success)
      return <VerifyCode type={this.state.success.type} />;
    else {
      let msg = this.props.msg,
        email = {
          err: msg.email ? true : false,
          msg: msg.email,
          name: "email",
          placeholder: placeholder.email,
          label: label.email,
          handleChange: this.handleChange,
        },
        password = {
          err: msg.password ? true : false,
          msg: msg.password,
          name: "password",
          placeholder: placeholder.password,
          label: label.password,
          handleChange: this.handleChange,
        },
        checkbox = {
          checked: this.state.saveLogin,
          name: "saveLogin",
          label: label.remember,
          handleChange: this.handleChange,
        };
      return (
        <div className="h-screen  flex flex-col justify-center items-center overflow-x-hidden">
          <Paper className="max-w-sm  px-3 py-8  xs:shadow-none xs:bg-clear sm:px-5">
            <form>
              <div className="title">
                <p className="text-xl pb-3 text-primary text-center font-logo font-semibold">
                  {appName}
                </p>
                <p className=" text-lg pb-4  text-center text-gray-900 font-sans ">
                  {title.login}
                </p>
              </div>
              <TextField {...email} />
              <PasswordField {...password} />
              <div className="flex justify-between flex-row items-center">
                <Checkbox {...checkbox} />
                <Link href="/forgetpass">{label.forget}</Link>
              </div>
              <Button
                fullWidth
                label={label.login}
                loading={this.props.loading}
                onClick={() => {
                  this.props.login({
                    ...this.state,
                    callback: this.handleSuccess,
                  });
                }}
              />
              <Button
                fullWidth
                label={label.register}
                lowercase={true}
                variant="text"
                href="/signup"
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
export default connect(mapStatetoProp, { login, returnError, setLang })(Login);
