const isMail = (email) => {
  let reg = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(String(email).toLowerCase());
};
const isName = (name) => {
  name = name.trim();
  let reg = /[^a-zA-Z]/gi;
  return !reg.test(name);
};
const isDate = (date) => !isNaN(date.getTime());
const isPhone = (phone) => {
  var regExp = /[^0-9 ]/gi;
  return !regExp.test(phone);
};
const isURL = (url) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!pattern.test(url);
};

const headerConfig = (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) config.headers["x-auth-token"] = token;
  return config;
};
const redirect = (url, time) => {
  time
    ? window.location.replace(url)
    : window.setTimeout(() => {
        window.location.replace(url);
      }, time);
};

const getToken = () =>
  localStorage.getItem("token") || sessionStorage.getItem("token") || false;

const setToken = ({ token, temp }) =>
  !temp
    ? localStorage.setItem("token", token)
    : sessionStorage.setItem("token", token);

const rmvToken = () =>
  localStorage.removeItem("token") || sessionStorage.removeItem("token");

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const cc_format = (value = "") => {
  var v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  var matches = v.match(/\d{4,16}/g);
  var match = (matches && matches[0]) || "";
  var parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(" ");
  } else {
    return value;
  }
};
const bank_acc_format = (value = "") => {
  var v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  var matches = v.match(/\d{4,17}/g);
  var match = (matches && matches[0]) || "";
  var parts = [];
  for (let i = 0, len = match.length; i < len; i += 5) {
    parts.push(match.substring(i, i + 5));
  }

  if (parts.length) {
    return parts.join(" ");
  } else {
    return value;
  }
};
// export function copyCmd(text, success, fail, $) {
//   const input = `<input id="copyText" value=${text} style="left:-1000px;width:0;height:0;position:fixed"/>`;
//   document/
//   $("#copyText").focus();
//   $("#copyText").select();
//   let status = document.execCommand("copy");
//   $("input#copyText").remove();
//   if (status && success) success();
//   else if (!status && fail) fail();
// }
// export function copy(text, success, fail) {
//   if (!navigator.clipboard) copyCmd(text, success, fail);
//   else {
//     navigator.clipboard.writeText(text).then(
//       () => {
//         if (success) success();
//       },
//       () => copyCmd(text, success, fail)
//     );
//   }
// }
export default {
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
  headerConfig,
  bank_acc_format,
};
