import React from "react";
import { connect } from "react-redux";
import { Drawer, Divider } from "@material-ui/core";
import PasswordIcon from "@material-ui/icons/LockOutlined";
import NoteIcon from "@material-ui/icons/NoteOutlined";
import CardIcon from "@material-ui/icons/CreditCardOutlined";
import BankIcon from "@material-ui/icons/AccountBalanceOutlined";

import AddressIcon from "@material-ui/icons/ContactMailOutlined";
import SecurityIcon from "@material-ui/icons/SecurityOutlined";
import GenerateIcon from "@material-ui/icons/VpnKey";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { setTab, toggleMobileOpen } from "../../actions/appActions";
import { appName } from "../../config";
import APP_WORD from "../../lang/app";

const drawerWidth = 250;
const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: drawerWidth,
    borderRight: "0px",
  },
}));

const SideBar = ({
  setTab,
  activeTab,
  mobileOpen,
  toggleMobileOpen,
  lang,
  _theme,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const { nav } = APP_WORD[lang];
  const Lists1 = [
    { icon: <i className="bx bx-home-circle"></i>, text: nav.home, index: 0 },
    {},
    { icon: <PasswordIcon fontSize="inherit" />, text: nav.site, index: 1 },
    { icon: <NoteIcon fontSize="inherit" />, text: nav.note, index: 2 },
    {
      icon: <AddressIcon fontSize="inherit" />,
      text: nav.personal,
      index: 3,
    },
    { icon: <CardIcon fontSize="inherit" />, text: nav.card, index: 4 },
    { icon: <BankIcon fontSize="inherit" />, text: nav.bank, index: 5 },
    {},
    {
      icon: <GenerateIcon fontSize="inherit" />,
      text: nav.generate,
      index: 6,
    },
  ];
  const Lists2 = [
    {
      icon: <SecurityIcon fontSize="inherit" />,
      text: nav.security,
      index: 7,
    },
    { icon: <i className="bx bx-cog"></i>, text: nav.setting, index: 8 },
  ];
  const drawer = (
    <div
      className={`h-full flex flex-col justify-between uppercase ${
        _theme === "dark" && "drak-drawer"
      }`}
    >
      <section className="pr-2 py-2 md:p-2">
        <p className="font-logo px-3 py-4   text-lg font-semibold text-primary-500">
          {appName}
        </p>
        {Lists1.map(({ text, icon, index }, i) =>
          text ? (
            <li
              key={text}
              onClick={() => setTab(index)}
              className={` font-sans rounded-r-full  my-1 md:rounded transition duration-400 text-xl p-2 cursor-pointer flex items-end ${
                index === activeTab
                  ? " text-primary-500 bg-primary-200"
                  : " hover:text-gray-800 text-gray-600"
              } `}
            >
              {icon}
              <span className="text-sm ml-3">{text}</span>
            </li>
          ) : (
            <li className="h-0 md:h-8 opacity-0" key={i}></li>
          )
        )}
      </section>

      <section className="pr-2 py-2 md:p-2">
        <Divider />
        {Lists2.map(({ text, icon, index }) =>
          text ? (
            <li
              key={text}
              onClick={() => setTab(index)}
              className={` font-sans rounded-r-full my-1 md:rounded transition duration-400 text-xl py-2 pr-8 pl-2 cursor-pointer flex items-center${
                index === activeTab
                  ? " text-gray-700 bg-gray-300"
                  : " hover:text-gray-800 text-gray-600"
              } `}
            >
              {icon}
              <span className="text-sm ml-3">{text}</span>
            </li>
          ) : (
            <li className="h-8"></li>
          )
        )}
      </section>
    </div>
  );
  return (
    <nav>
      <div className="flex md:hidden">
        <Drawer
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={toggleMobileOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </div>
      <div className="hidden  md:flex">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </div>{" "}
    </nav>
  );
};
const mapStateToProp = ({ app }) => ({
  activeTab: app.activeTab,
  mobileOpen: app.mobileOpen,
  _theme: app.theme,
  lang: app.lang,
});
export default connect(mapStateToProp, { setTab, toggleMobileOpen })(SideBar);
