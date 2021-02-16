import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import {
  Typography,
  Tabs,
  Paper,
  Avatar,
  Badge,
  Switch,
  Button,
} from "@material-ui/core";
import { Select, TextField, PasswordField } from "../../Utils/Input";
import {
  setLang,
  setDarkMode,
  updateAccount,
} from "../../../actions/appActions";
import { destroySession } from "../../../actions/authActions";
import TimeAgo from "react-timeago";
import CameraIcon from "@material-ui/icons/CameraAlt";
import ArrowForward from "@material-ui/icons/ArrowForwardIosRounded";
import WORDS from "../../../lang/auth";
import OnIcon from "@material-ui/icons/CheckCircleRounded";
import OffIcon from "@material-ui/icons/RemoveCircle";
import Unknown from "../../../img/Devices/Unknown.png";
import Android from "../../../img/Devices/Android.png";
import Window from "../../../img/Devices/Window.png";
import iOS from "../../../img/Devices/iOS.png";
import Linux from "../../../img/Devices/Linux.png";
import Mac from "../../../img/Devices/Mac.png";
import { toBase64 } from "../../../config";
import ERR_WORD from "../../../lang/error";
import AUTH_WORD from "../../../lang/auth";
const devices = {
  Unknown,
  Android,
  Window,
  iOS,
  Linux,
  Mac,
};

const General = ({
  lang,
  theme,
  setLang,
  setDarkMode,
  user,
  updateAccount,
  setSubActive,
}) => {
  const { label } = WORDS[lang];
  const imgRef = useRef();
  const [hovered, setHovered] = useState("");
  const Lists_1 = [
    {
      name: label.photo,
      desc: label.photodesc,
      actionContent: (
        <Badge
          overlap="circle"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          badgeContent={
            <div className="bg-white rounded-full p-1 text-gray-500 text-base">
              <CameraIcon fontSize="inherit" color="inherit" />
            </div>
          }
          onClick={() => imgRef.current.click()}
        >
          <Avatar
            alt={user.name}
            src={user.avatar || " "}
            className="w-12 h-12 lg:w-16 lg:h-16"
          />
        </Badge>
      ),
    },
    {
      name: label.username,
      value: user.name,
      onClick: () => setSubActive("name"),
    },
    {
      name: label.email,
      value: user.email || " ",
      actionContent: <div></div>,
    },
    {
      name: label._reminder,
      desc: label._reminderdesc,
      onClick: () => setSubActive("reminder"),
    },
  ];
  const Lists_2 = [
    {
      name: label.dark_mode,
      actionContent: (
        <Switch
          edge="end"
          size="small"
          checked={theme === "dark"}
          onChange={({ target: { checked } }) =>
            setDarkMode(checked ? "dark" : "light")
          }
          color="primary"
        />
      ),
    },
    {
      name: label.lang,
      actionContent: (
        <Select
          options={
            lang === "EN" ? ["English", "မြန်မာ"] : ["မြန်မာ", "English"]
          }
          handleChange={(val) => setLang(val === "English" ? "EN" : "MM")}
          margin="dense"
        />
      ),
    },
  ];
  return (
    <>
      <Paper variant="outlined" className="my-5 pt-4 " key="profile">
        <div kye="title" className="mb-2">
          <Typography variant="h5" className="px-4">
            {lang === "EN" ? "Profile" : "ကိုယ်ရေးအကျဉ်း"}
          </Typography>
        </div>
        {Lists_1.map(({ name, value, desc, actionContent, onClick }, i) => (
          <div
            key={i}
            onMouseOut={() => setHovered("")}
            onMouseOver={() => setHovered(i)}
            onClick={() => onClick && onClick()}
            className={`${
              i !== 0 && "border-t"
            } flex items-center cursor-pointer   ${
              i === hovered + 1 || i === hovered ? "mx-0 px-4 " : "px-0 mx-4 "
            }py-2 md:py-6 hover:bg-gray-200 border-gray-400`}
          >
            <div
              key="display"
              className=" flex flex-3 flex-col md:flex-row items-start md:items-center  flex-grow"
            >
              <p
                key="title"
                className=" md:flex-1 text-xs  text-gray-600 uppercase"
              >
                {name}
              </p>
              {value ? (
                <p
                  key="value"
                  className=" md:flex-3 text-base md:text-lg mt-2 md:mt-0"
                >
                  {value}
                </p>
              ) : (
                <p
                  key="description"
                  className="md:flex-3 text-sm  text-gray-600 mt-2 md:mt-0"
                >
                  {desc}
                </p>
              )}
            </div>
            <div
              key="action"
              className="text-base px-1 md:w-16 justify-end flex"
            >
              {actionContent || <ArrowForward fontSize="inherit" />}
            </div>
          </div>
        ))}
      </Paper>
      <Paper variant="outlined" className="my-5 pt-4 " key="accessibility">
        <input
          multiple="false"
          type="file"
          accept="image/*"
          className="display-none opacity-0 fixed"
          style={{ top: "-500px", right: "-1000px" }}
          ref={imgRef}
          onChange={() => {
            const files = Array.prototype.slice.call(imgRef.current.files);
            files.forEach(async (file) => {
              file = await toBase64(file);
              updateAccount({ name: "avatar", value: file, changed: true });
            });
          }}
        />
        <div className="mb-2" kye="title">
          <Typography variant="h5" className="px-4">
            {lang === "EN" ? "Accessibility" : "ပြသခြင်းဆက်တင်"}
          </Typography>
        </div>
        {Lists_2.map(({ name, actionContent }, i) => (
          <div
            key={i}
            onMouseOut={() => setHovered("")}
            onMouseOver={() => setHovered(i)}
            className={`${
              i !== 0 && "border-t"
            } flex items-center cursor-pointer   ${
              i === hovered + 1 || i === hovered ? "mx-0 px-4 " : "px-0 mx-4 "
            }py-2 md:py-4 hover:bg-gray-200 border-gray-400`}
          >
            <div
              key="display"
              className=" flex flex-col md:flex-row items-start md:items-center  flex-grow"
            >
              {name}
            </div>
            <div key="action" className="">
              {actionContent}
            </div>
          </div>
        ))}
      </Paper>
    </>
  );
};

const Security = ({
  user,
  sessions,
  setSubActive,
  updateAccount,
  destroySession,
  lang,
}) => {
  const { label } = WORDS["EN"];
  const [hovered, setHovered] = useState("");
  const checkRef = useRef();
  const Lists_1 = [
    { name: label.password, onClick: () => setSubActive("password") },
    {
      name: label._2FA,

      value: user.enabled_2FA ? (
        <>
          <OnIcon color="primary" fontSize="inherit" />
          <span className="ml-1">On</span>
        </>
      ) : (
        <>
          <OffIcon color="disabled" fontSize="inherit" />
          <span className="ml-1">Off</span>
        </>
      ),
      actionContent: (
        <Switch
          edge="end"
          size="small"
          checked={user.enabled_2FA}
          inputRef={checkRef}
          color="primary"
          onChange={({ target: { checked } }) =>
            updateAccount({
              value: checked,
              name: "enabled_2FA",
              changed: true,
            })
          }
        />
      ),
    },
  ];

  return (
    <>
      <Paper key="security" variant="outlined" className="my-5 pt-4 ">
        <div className="mb-2" kye="title">
          <Typography variant="h5" className="px-4">
            {lang === "EN" ? "Sign in" : "ဆိုင်းအင်လုပ်ခြင်း"}
          </Typography>
        </div>
        {Lists_1.map(({ name, value, desc, actionContent, onClick }, i) => (
          <div
            key={i}
            onMouseOut={() => setHovered("")}
            onMouseOver={() => setHovered(i)}
            onClick={() => onClick && onClick()}
            className={`${
              i !== 0 && "border-t"
            } flex items-center cursor-pointer   ${
              i === hovered + 1 || i === hovered ? "mx-0 px-4 " : "px-0 mx-4 "
            }py-2 md:py-6 hover:bg-gray-200 border-gray-400`}
          >
            <div
              key="display"
              className=" flex flex-3 flex-col md:flex-row items-start md:items-center  flex-grow"
            >
              <p
                key="title"
                className=" md:flex-1 text-xs  text-gray-600 uppercase"
              >
                {name}
              </p>
              {value ? (
                <p
                  key="value"
                  className=" md:flex-3 text-base md:text-lg mt-2 md:mt-0"
                >
                  {value}
                </p>
              ) : (
                <p
                  key="description"
                  className="md:flex-3 text-sm  text-gray-600 mt-2 md:mt-0"
                >
                  {desc}
                </p>
              )}
            </div>
            <div
              key="action"
              className="text-base px-1 md:w-16 justify-end flex"
            >
              {actionContent || <ArrowForward fontSize="inherit" />}
            </div>
          </div>
        ))}
      </Paper>
      <Paper key="logged" variant="outlined" className="my-5 pt-4 ">
        <div className="mb-2">
          <Typography variant="h5" className="px-4">
            {lang === "EN"
              ? "Logged devices"
              : "လော့ဂ်အင် လုပ်ထားသော ကိရိယာများ"}
          </Typography>
        </div>
        {sessions.map(
          ({ OS, city, country, createdAt, browser, IP, _id }, i) => (
            <div
              key={_id}
              onMouseOut={() => setHovered("")}
              onMouseOver={() => setHovered(i)}
              className={`${
                i !== 0 && "border-t"
              } flex items-center cursor-pointer mx-4 py-2 md:py-6 border-gray-400`}
            >
              <div
                key="display"
                className=" flex flex-col md:flex-row items-start md:items-center  flex-grow"
              >
                <div key="OSIMG" className="w-16 h-16 p-2">
                  <img src={devices[OS]} alt={OS} />
                </div>
                <div key="OS">
                  <p key="name" className="capitalize">
                    {OS + " - " + (browser || " ")}
                  </p>
                  <p key="geo" className="text-sm text-gray-600">
                    {country} ({city})
                  </p>
                  <p key="ip" className="text-xs text-gray-600">
                    {IP}
                  </p>
                  <p key="created" className="text-xs text-gray-500">
                    Logged <TimeAgo date={createdAt} />
                  </p>
                </div>
              </div>
              <Button
                variant="text"
                color="primary"
                onClick={() => destroySession(_id)}
              >
                {lang === "EN" ? "Logout" : "လော့ဂ်အောက်လုပ်ရန်"}
              </Button>
            </div>
          )
        )}
      </Paper>
    </>
  );
};

const Setting = ({
  lang,
  theme,
  setLang,
  setDarkMode,
  user,
  sessions,
  updateAccount,
  destroySession,
}) => {
  const [active, setActive] = useState(0);
  const [subActive, setSubActive] = useState(null);
  const [input, setInput] = useState({ value: "", changed: false });
  const [confirm, setConfirm] = useState({ changed: false });
  return (
    <div className=" setting-root">
      {subActive ? (
        <Paper variant="outlined" className="mt-4 p-2 md:p-8">
          {subActive !== "password" ? (
            <TextField
              name={subActive}
              placeholder={
                AUTH_WORD[lang].placeholder[
                  subActive === "name" ? "username" : subActive
                ]
              }
              label={
                AUTH_WORD[lang].label[
                  subActive === "name" ? "username" : subActive
                ]
              }
              inputValue={user[subActive]}
              handleChange={(value, name, { setState }) =>
                setInput({ value, setState, changed: true })
              }
            />
          ) : (
            <>
              <PasswordField
                name="passowrd"
                label="Password"
                handleChange={(value, name, { setState }) =>
                  setInput({ value, setState, changed: true })
                }
              />
              <PasswordField
                name="confirm"
                label="Confirm Password"
                handleChange={(value, name, { setState }) =>
                  setConfirm({ value, setState, changed: true })
                }
              />
            </>
          )}
          <div className="flex justify-end">
            <div className="pr-2">
              <Button
                variant="text"
                fullWidth
                onClick={() => setSubActive(null)}
              >
                Go Back
              </Button>
            </div>
            <div className="pl-2">
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => {
                  if (subActive !== "password") {
                    if (!input.value && input.changed) {
                      const xxxx =
                        subActive === "name" ? "username" : subActive;
                      const msg = ERR_WORD[lang].NULL[xxxx];
                      input.setState && input.setState({ err: true, msg });
                    } else {
                      updateAccount({
                        name: subActive,
                        value: input.value,
                        changed: input.changed,
                      });
                      setSubActive(null);
                    }
                  } else {
                    let err = false;
                    if (!input.value) {
                      err = true;
                      const msg = ERR_WORD[lang].NULL["password"];
                      input.setState && input.setState({ err, msg });
                    } else if (input.value.length < 10 && input.changed) {
                      err = true;
                      const msg = ERR_WORD[lang].INVALID["password"];
                      input.setState && input.setState({ err, msg });
                    }
                    if (!confirm.value) {
                      err = true;
                      const msg = ERR_WORD[lang].NULL["confirm"];
                      confirm.setState &&
                        confirm.setState({
                          err,
                          msg,
                        });
                    } else if (
                      confirm.value !== input.value &&
                      confirm.changed
                    ) {
                      err = true;
                      const msg = ERR_WORD[lang].INVALID["confirm"];
                      confirm.setState &&
                        confirm.setState({
                          err,
                          msg,
                        });
                    }
                    if (!err) {
                      updateAccount({
                        value: input.value,
                        name: "password",
                        changed: input.changed,
                      });
                      setSubActive(null);
                    }
                  }
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </Paper>
      ) : (
        <>
          <Tabs indicator="" variant="scrollable" scrollButtons="auto">
            <div className="flex items-center w-full mt-4 font-sans px-1">
              {["General", "Security"].map((text, index) => (
                <p
                  key={index}
                  className={`${
                    index === active && "text-primary-400 after-primary"
                  }  flex justify-center mr-6 py-2 cursor-pointer  relative `}
                  onClick={() => setActive(index)}
                >
                  {text}
                </p>
              ))}
            </div>
          </Tabs>
          <div>
            {active === 0 ? (
              <General
                user={user}
                lang={lang}
                setLang={setLang}
                setDarkMode={setDarkMode}
                theme={theme}
                updateAccount={updateAccount}
                setSubActive={setSubActive}
              />
            ) : (
              <Security
                user={user}
                sessions={sessions}
                updateAccount={updateAccount}
                setSubActive={setSubActive}
                destroySession={destroySession}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProp = ({ app }) => ({
  lang: app.lang,
  theme: app.theme,
  user: app.user,
  sessions: app.sessions,
});
export default connect(mapStateToProp, {
  setLang,
  setDarkMode,
  updateAccount,
  destroySession,
})(Setting);
