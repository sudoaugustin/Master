import React from "react";
import { connect } from "react-redux";
import {
  Typography,
  Paper,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  List,
  Divider,
} from "@material-ui/core";

import securityIssues from "../../../img/securityIssues.png";
import passwordIssues from "../../../img/passwordIssues.svg";
import CheckedIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import checkPasswordStrength from "pwd-strength";
import LanguageIcon from "@material-ui/icons/Language";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { showPopover } from "../../../actions/appActions";

const SecurityIssues = ({ enabled_2FA, reminder, lang }) => {
  const Lists = [
    {
      title: lang === "EN" ? "2-Step Verification" : "၂ ဆင့် အတည်ပြုခြင်း",
      condition: enabled_2FA ? "Enabled" : "Disabled",
    },
    {
      title: lang === "EN" ? "Password reminder" : "လျှို့ဝှက်နံပါတ်သတိပေးချက်",
      condition: reminder ? "Enabled" : "Disabled",
    },
  ];
  return (
    <Paper className="p-5 my-3" variant="outlined">
      <div className="flex  p-2 flex-wrap justify-center sm:flex-no-wrap sm:justify-between">
        <div className="text-center sm:text-left">
          <Typography variant="h5" style={{ marginBottom: 10 }}>
            {lang === "EN" ? "Security Issues" : "လုံခြုံရေးပြဿနာများ"}
          </Typography>
          <Typography variant="caption" className="text-gray-500">
            {lang === "EN"
              ? "Protect your account by resolving security issues"
              : "လုံခြုံရေး ပြဿနာများကို ဖြေရှင်းခြင်းဖြင့် သင့်အကောင့်ကိုကာကွယ်ပါ"}
          </Typography>
        </div>
        <div className="max-w-sm mt-3 sm:mt-0">
          <img src={securityIssues} alt="Security Issues" />
        </div>
      </div>
      {Lists.map(({ title, condition }, i) => (
        <div
          key={i}
          className="flex justify-between items-center text-base sm:text-lg py-5 px-2 cursor-default"
        >
          <p>{title}</p>
          <span
            className={`mr-1 text-lg sm:text-2xl ${
              condition === "Enabled" ? "text-green-500" : "text-yellow-500"
            }`}
          >
            {condition === "Enabled" ? (
              <CheckedIcon color="inherit" fontSize="inherit" />
            ) : (
              <ErrorIcon color="inherit" fontSize="inherit" />
            )}
          </span>
        </div>
      ))}
    </Paper>
  );
};

const PasswordIssues = ({ sites, showPopover, lang }) => {
  const ListWrapper = ({ site }) => (
    <ListItem
      button
      onClick={() =>
        showPopover({
          component: "Site",
          data: site,
        })
      }
    >
      <ListItemAvatar>
        <Avatar
          alt={site.domain}
          src={`https://logo.clearbit.com/${site.domain}?size=800`}
        >
          {site.domain[0] || <LanguageIcon />}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={site.title || site.domain}
        secondary={site.email}
      />
    </ListItem>
  );

  const PasswordStrengthConfig = {
    minUpperChars: 3,
    minLowerChars: 5,
    minSpecialChars: 2,
    minPasswordLength: 10,
  };
  const reuses = sites.filter(
      (site, index) =>
        sites.filter(({ password }) => site.password === password).length > 1
    ),
    weaks = sites.filter(
      ({ password }) =>
        password &&
        !checkPasswordStrength(password, PasswordStrengthConfig).success
    );
  const PanelStyle = { boxShadow: "none", paddingLeft: 0, paddingRight: 0 };
  return (
    <Paper variant="outlined" className="p-5 pb-0 my-3">
      <div className="flex  p-2 flex-wrap justify-center sm:flex-no-wrap sm:justify-between">
        <div className="text-center sm:text-left">
          <Typography variant="h5" style={{ marginBottom: 10 }}>
            {lang === "EN" ? "Password Issues" : "စကားဝှက် ပြဿနာများ "}
          </Typography>
          <Typography variant="caption" className="text-gray-500">
            {lang === "EN"
              ? "Check your saved passwords to strengthen your security."
              : "သင်၏လုံခြုံရေးကို မြှင့်တင်ရန် သင်၏ သိမ်းဆည်းထားသော စကားဝှက်များကို စစ်ဆေးပါ။"}
          </Typography>
        </div>
        <div className="max-w-sm mt-3 sm:mt-0">
          <img src={passwordIssues} alt="Password Issues" />
        </div>
      </div>
      <div>
        <ExpansionPanel style={PanelStyle} key="reuse">
          <ExpansionPanelSummary
            style={PanelStyle}
            expandIcon={<ExpandMoreIcon />}
          >
            <div className="flex justify-between items-center">
              <p
                className={`mx-2 text-lg ${
                  reuses.length ? "text-yellow-500" : "text-green-500"
                }`}
              >
                {reuses.length ? (
                  <ErrorIcon color="inherit" />
                ) : (
                  <CheckedIcon color="inherit" />
                )}
              </p>
              <div>
                <p className="text-base sm:text-lg">
                  {lang === "EN"
                    ? reuses.length +
                      "  reused password" +
                      (reuses.length > 1 ? "s" : "")
                    : reuses.length
                    ? "ပြန်လည် အသုံးပြုထားသော လျှို့ဝှက်နံပါတ်ရှိသည်"
                    : "ပြန်လည် အသုံးပြုထားသော စကားဝှက်မရှိပါ"}
                </p>
                <p variant="subtitle1" className="text-gray-500">
                  {lang === "EN"
                    ? "Create unique passwords"
                    : "ထူးခြားသောစကားဝှက်ကိုဖန်တီးပါ"}
                </p>
              </div>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={PanelStyle}>
            <List className="w-full">
              {reuses.map((site, i, a) => (
                <>
                  <ListWrapper site={site} key={i} />
                  {a.length !== i + 1 && <Divider light={true} />}
                </>
              ))}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel style={PanelStyle} key="weak">
          <ExpansionPanelSummary
            style={PanelStyle}
            expandIcon={<ExpandMoreIcon />}
          >
            <div className="flex justify-between items-center">
              <p
                className={`mx-2 text-lg ${
                  weaks.length ? "text-yellow-500" : "text-green-500"
                }`}
              >
                {weaks.length ? (
                  <ErrorIcon color="inherit" />
                ) : (
                  <CheckedIcon color="inherit" />
                )}
              </p>
              <div>
                <p className="text-base sm:text-lg">
                  {lang === "EN"
                    ? weaks.length +
                      "  weak password" +
                      (weaks.length > 1 ? "s" : "")
                    : weaks.length
                    ? "အားနည်းသော စကားဝှက်ရှိသည်"
                    : "အားနည်းသော စကားဝှက်မရှိပါ"}
                </p>
                <p className="text-gray-500">
                  {lang === "EN"
                    ? "Create strong passwords"
                    : "ခိုင်မာသော စကားဝှက်ကို ဖန်တီးပါ"}
                </p>
              </div>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={PanelStyle}>
            <List className="w-full">
              {weaks.map((site, i, a) => (
                <>
                  <ListWrapper site={site} key={i} />
                  {a.length !== i + 1 && <Divider light={true} />}
                </>
              ))}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </Paper>
  );
};
const Checkup = ({ user, lang, sites, showPopover }) => (
  <div>
    <SecurityIssues
      enabled_2FA={user.enabled_2FA}
      reminder={user.reminder}
      lang={lang}
    />
    <PasswordIssues sites={sites} showPopover={showPopover} lang={lang} />
  </div>
);

const mapStateToProp = ({ app }) => ({
  user: app.user,
  lang: app.lang,
  sites: app.items.sites,
});
export default connect(mapStateToProp, { showPopover })(Checkup);
