import React from "react";
import { Badge, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default function(props) {
  const useStyles = makeStyles(theme => ({
    avatar: {
      width: theme.spacing(props.size),
      height: theme.spacing(props.size)
    }
  }));
  const classes = useStyles();
  return (
    <div>
      <Badge
        style={{
          cursor: "pointer"
        }}
        overlap="circle"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        badgeContent={props.badge}
      >
        <Avatar {...props} className={classes.avatar + " " + props.className} />
      </Badge>
    </div>
  );
}
