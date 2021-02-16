import React from "react";
import { connect } from "react-redux";
import { Paper } from "@material-ui/core";
import { TextField, Button } from "../Utils/Input";
import { request } from "../../actions/authActions";
import { returnError } from "../../actions/msgActions";
import { appName, redirect } from "../../config";
import AUTH_WORDS from "../../lang/auth";

const SendReminder = (props) => {
  const [state, setState] = React.useState({}),
    handleChange = (val, ref) => {
      const name = ref.current.name,
        msg = {};
      msg[name] = null;
      setState({
        ...state,
        [name]: val,
      });
      props.returnError(msg);
    },
    { lang, msg, loading, isAuthenticated, request } = props,
    { placeholder, label, title } = AUTH_WORDS[lang],
    email = {
      err: msg.email ? true : false,
      msg: msg.email,
      name: "email",
      placeholder: placeholder.recover_email,
      label: label.email,
      handleChange,
    };

  return (
    <div className="w-screen h-screen  flex justify-center items-center overflow-x-hidden">
      <Paper className="max-w-sm  px-3 py-8  xs:shadow-none xs:bg-clear sm:px-5">
        <form>
          <div className="title">
            <p className="text-xl pb-3 text-primary text-center font-logo font-semibold">
              {appName}
            </p>
            <p className=" text-base pb-4  text-gray-900 font-sans ">
              {title.reminder}
            </p>
          </div>
          <TextField {...email} />
          <Button
            fullWidth
            label={label.reqRiminder}
            loading={loading}
            onClick={() =>
              request({
                ...state,
                type: "REMINDER",
              })
            }
          />
          <p className="flex row items-center">
            <span className="block flex-1 bg-gray-500 h-px"></span>
            <span className="p-1 text-gray-700">{label.or}</span>
            <span className="block flex-1 bg-gray-500 h-px"></span>
          </p>
          <Button
            fullWidth
            label={label.changePass}
            lowercase={true}
            variant="text"
            href="/verify/password"
          />
        </form>
      </Paper>
    </div>
  );
};
const mapStatetoProp = ({ auth, msg, app }) => ({
  isAuthenticated: auth.isAuthenticated,
  loading: auth.loading,
  msg: msg.error,
  lang: app.lang,
});
export default connect(mapStatetoProp, { request, returnError })(SendReminder);
