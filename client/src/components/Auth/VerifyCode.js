import React, { useState } from "react";
import { connect } from "react-redux";
import NearMeIcon from "@material-ui/icons/NearMe";
import { Paper, IconButton, Tooltip, InputAdornment } from "@material-ui/core";
import { TextField, Button } from "../Utils/Input";
import { request, verifyCode } from "../../actions/authActions";
import { returnError } from "../../actions/msgActions";
import { appName } from "../../config";
import AUTH_WORDS from "../../lang/auth";
const VerifyCode = (props) => {
  const {
      loading,
      verifyCode,
      request,
      msg,
      counter,
      lang,
      value,
      type,
    } = props,
    { placeholder, label, title, subtitle } = AUTH_WORDS[lang],
    [state, setState] = useState({
      email: value.email,
      token: value.token,
      temp: value.temp,
      OS: value.OS,
      IP: value.IP,
    }),
    handleChange = (val, name) => {
      const msg = {};
      msg[name] = null;
      setState({
        ...state,
        [name]: val,
      });
      props.returnError(msg);
    },
    code = {
      err: msg.code ? true : false,
      msg: msg.code,
      name: "code",
      placeholder: placeholder.code,
      label: label.code,
      handleChange,
    };
  return (
    <div className="w-full h-screen flex justify-center items-center overflow-x-hidden">
      <Paper className="max-w-sm  px-3 py-8  xs:shadow-none xs:bg-clear sm:px-5">
        <form>
          <div className="title">
            <p className="text-xl pb-3 text-primary text-center font-logo font-semibold">
              {appName}
            </p>
            <p className=" text-lg pb-4 text-center text-gray-900 font-sans ">
              {title[type.replace("2", "two").toLowerCase()]}
            </p>
            {type === "ACCOUNT_VERIFICATION" && (
              <p className="my-2 text-base">{subtitle[type.toLowerCase()]}</p>
            )}
          </div>
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
                          request({ ...state, type })
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
          <Button
            fullWidth
            label={label.verify}
            loading={loading}
            onClick={() => verifyCode({ ...state, type })}
          />
        </form>
      </Paper>
    </div>
  );
};
const mapStatetoProp = ({ auth, msg, app }) => ({
  isAuthenticated: auth.isAuthenticated,
  loading: auth.loading,
  value: auth.value,
  counter: auth.counter,
  msg: msg.error,
  lang: app.lang,
});
export default connect(mapStatetoProp, {
  request,
  verifyCode,
  returnError,
})(VerifyCode);
