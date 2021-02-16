import React from "react";
import NotificationIcon from "@material-ui/icons/NotificationsNoneOutlined";
import IconsBadge from "./IconBadge";
import { SearchBar } from "./Input";

const TopAppBar = props => (
  <header>
    {/* <SearchBar
       margin="dense"
       className="searchBar"
       variant="outlined"
       placeholder="Search people by name"
       hideMsg
     /> */}

    <ul>
      <li>
        <IconsBadge color="primary" icon={NotificationIcon} />
      </li>
    </ul>
  </header>
);
export default TopAppBar;
