import React from "react";
import { connect } from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
const LinearProgressBar = ({ loading, isAuthenticated }) => (
  <LinearProgress
    style={{ opacity: !isAuthenticated && loading ? 1 : 0, position: "fixed" }}
    className="fixed top-0 overflow-x-hidden inset-x-0 "
  />
);
const mapStatetoProp = ({ auth, app }) => ({
  loading: auth.loading || app.loading,
  isAuthenticated: auth.isAuthenticated,
});
export default connect(mapStatetoProp, {})(LinearProgressBar);
