import React, { useEffect } from "react";
import { connect } from "react-redux";
import { CircularProgress, IconButton, Tooltip } from "@material-ui/core";
import LoadedIcon from "@material-ui/icons/CloudDoneOutlined";
import AddIcon from "@material-ui/icons/AddRounded";
import MenuIcon from "@material-ui/icons/Menu";
import RefreshIcon from "@material-ui/icons/ReplayRounded";
import { appName } from "../../config";
import {
  showPopover,
  toggleMobileOpen,
  requestData,
} from "../../actions/appActions";
const HandleableIcon = ({ requestData }) => {
  const [icon, setIcon] = React.useState("loaded");
  const handeleClick = () => requestData();
  useEffect(() => {
    const refresh = setTimeout(() => {
      setIcon("refresh");
    }, 1000);
    return () => {
      clearTimeout(refresh);
    };
  }, []);
  return (
    <div className="ease-in-out duration-1000 transition-all">
      {icon === "loaded" ? (
        <Tooltip title="Up to date">
          <LoadedIcon />
        </Tooltip>
      ) : (
        <Tooltip title="Refresh">
          <IconButton
            color="inherit"
            size="small"
            style={{ transform: "rotateY(180deg)" }}
            className="hover:text-gray-900 text-blue-100"
            onClick={handeleClick}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

const _AppBar = ({ loading, showPopover, toggleMobileOpen, requestData }) => {
  return (
    <header className="h-12 flex items-center border-b border-gray-200 px-1 bg-white md:pr-5 md:pl-3 justify-between z-10  md:z-20 fixed w-full ">
      <p className="ml-1 hidden md:inline-block font-logo   text-lg font-semibold text-primary-500">
        {appName}
      </p>
      <p className="md:hidden">
        <IconButton size="small" onClick={() => toggleMobileOpen()}>
          <MenuIcon />
        </IconButton>
      </p>

      <div className="flex items-center justify-around text-gray-600 ">
        <span className="inline-flex justify-center items-center w-12 h-12">
          {loading ? (
            <CircularProgress color="inherit" size={18} />
          ) : (
            <HandleableIcon requestData={requestData} />
          )}
        </span>

        <Tooltip title="Add item">
          <IconButton
            color="inherit"
            size="small"
            className="hover:text-gray-900"
            onClick={() => showPopover({ component: "NewItem", data: {} })}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </div>
    </header>
  );
};
const mapStateToProp = ({ app, auth }) => ({
  lang: app.lang,
  loading: auth.loading,
});
export default connect(mapStateToProp, {
  showPopover,
  toggleMobileOpen,
  requestData,
})(_AppBar);
