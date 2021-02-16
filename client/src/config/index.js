import functions from "./function";
const {
  isMail,
  isName,
  isDate,
  isURL,
  isPhone,
  redirect,
  getToken,
  setToken,
  rmvToken,
  toBase64,
  cc_format,
  bank_acc_format,
  headerConfig,
} = functions;

const appName = "Master";

export {
  appName,
  isMail,
  isName,
  isDate,
  isURL,
  isPhone,
  redirect,
  getToken,
  setToken,
  rmvToken,
  toBase64,
  cc_format,
  bank_acc_format,
  headerConfig,
};
