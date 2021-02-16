import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Paper, IconButton, Tooltip, InputAdornment } from "@material-ui/core";
import MailOutlineRoundedIcon from "@material-ui/icons/MailOutlineRounded";
import DoneAllRoundedIcon from "@material-ui/icons/DoneAllRounded";
import LockOpenRoundedIcon from "@material-ui/icons/LockOpenRounded";
import NearMeIcon from "@material-ui/icons/NearMe";
import { TextField, Button, PasswordField } from "../Utils/Input";
import { request, verifyCode, changePass } from "../../actions/authActions";
import { returnError } from "../../actions/msgActions";
import { appName, redirect } from "../../config";
import AUTH_WORDS from "../../lang/auth";
import MESSAGE from "../../lang/message";
function ForgetPass({
  lang,
  msg,
  loading,
  request,
  isAuthenticated,
  returnError,
  counter,
  verifyCode,
  changePass,
  value,
}) {
  if (isAuthenticated) redirect("/app");
  const [state, setState] = React.useState({ email: value.email });
  const [component, setComponent] = React.useState("REMINDER");
  const handleChange = (val, name) => {
    const msg = {};
    msg[name] = null;
    setState({
      ...state,
      [name]: val,
    });
    returnError(msg);
  };
  const { placeholder, label, title } = AUTH_WORDS[lang],
    { reminder, newpassword } = MESSAGE[lang],
    email = {
      err: msg.email ? true : false,
      msg: msg.email,
      name: "email",
      placeholder: placeholder.recover_email,
      label: label.email,
      handleChange,
    },
    code = {
      err: msg.code ? true : false,
      msg: msg.code,
      name: "code",
      placeholder: placeholder.code,
      label: label.code,
      handleChange,
    },
    password = {
      err: msg.password ? true : false,
      msg: msg.password,
      name: "password",
      placeholder: placeholder.password,
      label: label.password,
      handleChange,
    },
    confirm = {
      err: msg.confirm ? true : false,
      msg: msg.confirm,
      name: "confirm",
      placeholder: placeholder.confirm,
      label: label.confirm,
      handleChange,
    };
  return (
    <div className="w-full h-screen  flex justify-center items-center overflow-x-hidden">
      <Paper className="max-w-sm  px-3 py-8  xs:shadow-none xs:bg-clear sm:px-5">
        <form>
          <div className="title">
            <p className="text-xl pb-3 text-primary text-center font-logo font-semibold">
              {appName}
            </p>
            {component.includes("SUCCESS") ? (
              <p className=" text-base pb-4 text-center  text-gray-900 font-sans ">
                <span className="text-6xl relative flex justify-center items-center text-green-500">
                  {component.includes("REMINDER") ? (
                    <Fragment>
                      <MailOutlineRoundedIcon fontSize="inherit" />
                      <i className="text-base absolute">
                        <DoneAllRoundedIcon
                          fontSize="inherit"
                          style={{ position: "relative", top: "6px" }}
                        />
                      </i>
                    </Fragment>
                  ) : (
                    <LockOpenRoundedIcon fontSize="inherit" />
                  )}
                </span>
                {component.includes("REMINDER")
                  ? reminder.title
                  : newpassword.title}
              </p>
            ) : (
              <p className=" text-base pb-4  text-gray-900 font-sans ">
                {title[component.toLocaleLowerCase()]}
              </p>
            )}
          </div>
          {component.includes("SUCCESS") && (
            <p className=" text-sm leading-loose text-gray-700 font-serif">
              {component.includes("REMINDER")
                ? reminder.body
                : newpassword.body}
            </p>
          )}
          {(component === "CHANGE_PASSWORD" || component === "REMINDER") && (
            <TextField {...email} />
          )}
          {component === "CHANGE_PASSWORD" && (
            <TextField
              style={{
                width: "200px",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    {counter ? (
                      <p class="counter">{counter}</p>
                    ) : (
                      <Tooltip disableFocusListener title={label.reqCode}>
                        <IconButton
                          style={{
                            cursor: loading ? "not-allowed" : "pointer",
                          }}
                          color="primary"
                          disabled={loading || msg.reqCodeSuspense}
                          onClick={() =>
                            !(loading || msg.reqCodeSuspense) &&
                            request({ ...state, type: component })
                          }
                          edge="end"
                          children={<NearMeIcon />}
                        />
                      </Tooltip>
                    )}
                  </InputAdornment>
                ),
              }}
              placeholder="e.g.348975"
              label="Verification Code"
              {...code}
            />
          )}

          {component === "NEW_PASSWORD" && (
            <Fragment>
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
            </Fragment>
          )}
          <Button
            fullWidth
            label={
              component === "REMINDER"
                ? label.reqRiminder
                : component === "CHANGE_PASSWORD"
                ? label.verify
                : component === "NEW_PASSWORD"
                ? label.changePass
                : label.login
            }
            loading={loading}
            onClick={() => {
              if (
                component === "PASSWORD_SUCCESS" ||
                component === "REMINDER_SUCCESS"
              ) {
                redirect("/login");
              } else if (component === "REMINDER")
                request({
                  ...state,
                  type: component,
                  callback: setComponent,
                });
              else if (component === "CHANGE_PASSWORD")
                verifyCode({
                  ...state,
                  type: component,
                  callback: setComponent,
                });
              else if (component === "NEW_PASSWORD")
                changePass({ ...state, callback: setComponent });
            }}
          />
          {component === "REMINDER" && (
            <p className="flex row items-center">
              <span className="block flex-1 bg-gray-500 h-px"></span>
              <span className="p-1 text-gray-700">{label.or}</span>
              <span className="block flex-1 bg-gray-500 h-px"></span>
            </p>
          )}
          {component !== "PASSWORD_SUCCESS" && component !== "NEW_PASSWORD" && (
            <Button
              fullWidth
              label={
                component === "REMINDER" || component === "REMINDER_SUCCESS"
                  ? label.changePass
                  : component === "CHANGE_PASSWORD"
                  ? label.reqRiminder
                  : component === "NEW_PASSWORD"
                  ? ""
                  : label.login
              }
              lowercase={true}
              variant="text"
              onClick={() => {
                setComponent(() =>
                  component === "REMINDER" || component === "REMINDER_SUCCESS"
                    ? "CHANGE_PASSWORD"
                    : component === "CHANGE_PASSWORD"
                    ? "REMINDER"
                    : "REMINDER"
                );
              }}
            />
          )}
        </form>
      </Paper>
    </div>
  );
}
const mapStatetoProp = ({ auth, msg, app }) => ({
  isAuthenticated: auth.isAuthenticated,
  loading: auth.loading,
  msg: msg.error,
  lang: app.lang,
  counter: auth.counter,
  value: auth.value,
});
export default connect(mapStatetoProp, {
  request,
  returnError,
  changePass,
  verifyCode,
})(ForgetPass);
