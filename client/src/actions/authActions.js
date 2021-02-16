import axios from "axios";
import { getOS } from "simple-os-platform";
import { isMail, isName, headerConfig } from "../config";
import { returnError, clearError } from "./msgActions";
import ERROR from "../lang/error";
import { detect } from "detect-browser";
const result = detect();
const browser = `${result.name} ${result.version.split(".")[0]}`;
const OS = getOS();
const URL = "https://get.geojs.io/v1/ip/geo.json";
export const login = ({ email, password, saveLogin, callback }) => async (
  dispatch,
  getState
) => {
  const msg = {},
    {
      app: { lang },
    } = getState(),
    { NULL, INVALID, WRONG, UNKNOWN } = ERROR[lang];
  if (!email) msg.email = NULL.email;
  else if (!isMail(email)) msg.email = INVALID.email;
  if (!password) msg.password = NULL.password;
  if (msg.email || msg.password) dispatch(returnError(msg));
  else {
    dispatch(clearError());
    dispatch(loading());
    const { data = {} } = (await axios.get(URL)) || {};
    const { ip = null, city = "", country = "" } = data;
    axios
      .post("/auth/login/", {
        email,
        password,
        OS,
        ip,
        city,
        browser,
        country,
        gateway: "Web App",
      })
      .then(({ data: { token, status } }) => {
        if (status === 200)
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { token, temp: !saveLogin },
          });
        else {
          dispatch({
            type: "SET_VALUE",
            payload: { email, token, temp: !saveLogin },
          });
          callback({ type: "2FA_VERIFICATION" });
        }
      })
      .catch(({ response: { status } }) => {
        dispatch(loaded());
        if (status === 404) msg.email = WRONG.email_2;
        else if (status === 403) {
          dispatch({
            type: "SET_VALUE",
            payload: { email, temp: !saveLogin },
          });
          callback({ type: "ACCOUNT_VERIFICATION" });
        } else if (status === 401) msg.password = WRONG.password;
        else if (status === 500) msg.modal = UNKNOWN;
        dispatch(returnError(msg));
      });
  }
};
export const destroySession = (tokenId) => (dispatch, getState) => {
  const {
    auth: { token },
    app: { sessions },
  } = getState();
  dispatch(loading());

  axios
    .delete("app/token/" + tokenId, headerConfig(token))
    .then((res) => {
      dispatch(loaded());
      if (token === tokenId)
        dispatch({
          type: "LOGOUT_SUCCESS",
        });
      else {
        const newSessions = sessions.filter(({ _id }) => _id !== tokenId);
        dispatch({
          type: "SET_DATA",
          payload: { sessions: newSessions },
        });
      }
    })
    .catch((err) => {
      dispatch(loaded());
      const msg = { modal: "Unknown error" };
      dispatch(returnError(msg));
    });
};

export const register = ({
  email,
  password,
  confirm,
  reminder,
  username,
  callback,
}) => (dispatch, getState) => {
  const msg = {},
    {
      app: { lang },
    } = getState(),
    { NULL, INVALID, WRONG, UNKNOWN } = ERROR[lang];
  if (!email) msg.email = NULL.email;
  else if (!isMail(email)) msg.email = INVALID.email;
  if (!password) msg.password = NULL.password;
  else if (password.length < 8) msg.password = INVALID.password;
  if (!confirm) msg.confirm = NULL.confirm;
  else if (confirm !== password) msg.confirm = INVALID.confirm;
  if (!username) msg.username = NULL.username;
  else if (username.length < 5) msg.username = INVALID.username_1;
  else if (!isName(username)) msg.username = INVALID.username_2;
  if (msg.email || msg.password || msg.confirm || msg.username)
    dispatch(returnError(msg));
  else {
    dispatch(clearError());
    dispatch(loading());
    axios
      .post("/auth/register/", {
        email,
        password,
        confirm,
        reminder,
        name: username,
      })
      .then(() => {
        dispatch({
          type: "SET_VALUE",
          payload: { email },
        });
        callback(true);
      })
      .catch(({ response: { status } }) => {
        dispatch(loaded());
        status === 409 ? (msg.email = WRONG.email_1) : (msg.modal = UNKNOWN);
        dispatch(returnError(msg));
      });
  }
};

export const verifyCode = ({
  email,
  code,
  token,
  temp,
  type,
  callback,
}) => async (dispatch, getState) => {
  const {
      app: { lang },
    } = getState(),
    msg = {},
    { NULL, INVALID, UNKNOWN, WRONG } = ERROR[lang];
  if (!token) {
    if (!email) msg.email = NULL.recovery_email;
    else if (!isMail(email)) msg.email = INVALID.email;
  }
  if (!code) msg.code = NULL.code;
  else if (code.length !== 6) msg.code = INVALID.code;
  if (msg.email || msg.code) dispatch(returnError(msg));
  else {
    const { data = {} } = (await axios.get(URL)) || {};
    const { ip = null, city = "", country = "" } = data;

    dispatch(clearError());
    dispatch(loading());
    axios
      .post("/auth/verify", {
        email,
        code,
        type,
        token,
        OS,
        ip,
        browser,
        city,
        country,
        gateway: "Web App",
      })
      .then(({ data: { token } }) => {
        dispatch(loaded());
        switch (type) {
          case "2FA_VERIFICATION":
            dispatch({
              type: "LOGIN_SUCCESS",
              payload: { token, temp },
            });
            break;
          case "ACCOUNT_VERIFICATION":
            dispatch({
              type: "REGISTER_SUCCESS",
              payload: { token, temp: false },
            });
            break;

          case "CHANGE_PASSWORD":
            dispatch({
              type: "SET_VALUE",
              payload: { email },
            });
            callback("NEW_PASSWORD");
            break;
          default:
        }
      })
      .catch(({ response: { status = null } }) => {
        dispatch(loaded());
        const msg = {};
        if (status === 404) msg.email = WRONG.email_2;
        else if (status === 401) msg.code = WRONG.code;
        else msg.modal = UNKNOWN;
        dispatch(returnError(msg));
      });
  }
};

export const request = ({ email, type, callback }) => (dispatch, getState) => {
  const {
      app: { lang },
    } = getState(),
    msg = {},
    { NULL, INVALID, UNKNOWN, WRONG } = ERROR[lang];
  if (!email) msg.email = NULL.recovery_email;
  else if (!isMail(email)) msg.email = INVALID.email;
  if (msg.email) dispatch(returnError(msg));
  else {
    dispatch(clearError());
    dispatch(loading());
    axios
      .post("/auth/request", {
        email,
        type,
        lang,
      })
      .then(() => {
        dispatch(loaded());
        if (type !== "REMINDER") {
          var sec = 60;
          const suspend = setInterval(() => {
            if (sec === 0) {
              const msg = {
                reqCodeSuspense: false,
              };
              dispatch(returnError(msg));
              dispatch(setCounter(""));
              clearInterval(suspend);
              return;
            }
            sec--;
            dispatch(setCounter(sec));
          }, 1000);
          const msg = {
            reqCodeSuspense: true,
          };
          dispatch(returnError(msg));
        } else if (type === "REMINDER") {
          callback("REMINDER_SUCCESS");
        }
      })
      .catch(({ response: { status } }) => {
        dispatch(loaded());
        status === 404
          ? (msg.email = WRONG.email_2)
          : status === 400
          ? (msg.email = NULL.reminder)
          : (msg.modal = UNKNOWN);
        dispatch(returnError(msg));
      });
  }
};

export const changePass = ({ password, confirm, email, callback }) => (
  dispatch,
  getState
) => {
  const msg = {},
    {
      app: { lang },
    } = getState(),
    { NULL, INVALID, UNKNOWN } = ERROR[lang];
  if (!password) msg.password = NULL.password;
  else if (password.length < 8) msg.password = INVALID.password;
  if (!confirm) msg.confirm = NULL.confirm;
  else if (password !== confirm) msg.confirm = INVALID.confirm;
  if (msg.password || msg.confirm) dispatch(returnError(msg));
  else {
    dispatch(clearError());
    dispatch(loading());
    axios
      .post("/auth/changePass", {
        email,
        password,
      })
      .then((res) => {
        dispatch(loaded());
        callback("PASSWORD_SUCCESS");
      })
      .catch(({ response: { status = 500 } }) => {
        dispatch(loaded());
        if (status === 404) msg.modal = INVALID.req_token;
        else if (status === 409) msg.password = INVALID.newpassword;
        else msg.modal = UNKNOWN;
        dispatch(returnError(msg));
      });
  }
};

export const setCounter = (val) => ({ type: "SET_COUNTER", payload: val });
export const loading = () => ({ type: "LOADING" });
export const loaded = () => ({ type: "LOADED" });
