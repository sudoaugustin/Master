import React from "react";
import MailOutlineRoundedIcon from "@material-ui/icons/MailOutlineRounded";
import DoneAllRoundedIcon from "@material-ui/icons/DoneAllRounded";
import { connect } from "react-redux";
import { Paper } from "@material-ui/core";
import { Button } from "../Utils/Input";
import { appName } from "../../config";
import AUTH_WORDS from "../../lang/auth";
import MESSAGE from "../../lang/message";
const ReminderSuccess = (props) => {
  const {
      reminder: { title, body },
    } = MESSAGE[props.lang],
    { label } = AUTH_WORDS[props.lang];
  return (
    <div className="w-screen h-screen  flex justify-center items-center overflow-x-hidden">
      <Paper className="max-w-sm  px-3 py-8  xs:shadow-none xs:bg-clear sm:px-5">
        <form>
          <div>
            <p className="text-xl pb-3 text-primary text-center font-logo font-semibold">
              {appName}
            </p>
            <p className=" text-base pb-4 text-center  text-gray-900 font-sans ">
              <span className="text-6xl relative flex justify-center items-center text-green-500">
                <MailOutlineRoundedIcon fontSize="inherit" />
                <i className="text-base absolute">
                  <DoneAllRoundedIcon
                    fontSize="inherit"
                    style={{ position: "relative", top: "6px" }}
                  />
                </i>
              </span>
              {title}
            </p>
            <p className=" text-sm leading-loose text-gray-700 font-serif">
              {body}
            </p>
          </div>
          <Button fullWidth label={label.login} href="/login" />
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

const mapStatetoProp = ({ app }) => ({ lang: app.lang });
export default connect(mapStatetoProp, {})(ReminderSuccess);
