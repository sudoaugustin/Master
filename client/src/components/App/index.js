import React from "react";
import { connect } from "react-redux";
import AppBar from "./AppBar";
import SideBar from "./SideBar";
import PopOver from "./PopOver";
import Main from "./Main";
import "../../style/app.scss";
import { requestData } from "../../actions/appActions";
import { redirect } from "../../config";
import { CssBaseline } from "@material-ui/core";

const App = ({ theme, isAuthenticated, requestData }) => {
  if (!isAuthenticated) redirect("/");
  else {
    requestData();
    return (
      <>
        <CssBaseline />
        <div id="app" className={`${theme}`}>
          <AppBar />
          <SideBar />
          <Main />
          <PopOver />
        </div>
      </>
    );
  }
};
const mapStateToProp = ({ app, auth }) => ({
  theme: app.theme,
  isAuthenticated: auth.isAuthenticated,
});
export default connect(mapStateToProp, { requestData })(App);
