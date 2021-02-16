const composeMail = ({ user, code, reminder, type }) => {
  const msg = {};
  switch (type) {
    case "ACCOUNT_VERIFICATION":
      msg.subject = "Email verification";
      msg.html =
        "You have requested to create an account on Master.<br/>Your account verification code is" +
        code;
      break;

    case "2FA_VERIFICATION":
      msg.subject = "Two-Factor Authentication";
      msg.html = "Two factor authentication code for Master Login is" + code;
      break;
    case "CHANGE_PASSWORD":
      msg.subject = "Password reset code ";
      msg.html = "Password rest code" + code;
      break;
    case "REMINDER":
      msg.subject = "Password Reminder";
      msg.html = "Your password reminder for Master id" + reminder;
      break;
    default:
      break;
  }
  return msg;
};

module.exports = composeMail;
