import React from "react";
import { connect } from "react-redux";
import LanguageIcon from "@material-ui/icons/Language";
import { Avatar, Paper, Grid, Typography } from "@material-ui/core";
import { showPopover } from "../../../actions/appActions";

const Site = ({
  _id,
  domain = "",
  email,
  password,
  title,
  updatedAt,
  own,
  writable,
  collaborators = [],
  showPopover,
}) => (
  <Paper
    variant="outlined"
    className="hover:shadow-md cursor-pointer "
    onClick={() =>
      showPopover({
        component: "Site",
        data: {
          domain,
          email,
          password,
          title,
          collaborators,
          _id,
          updatedAt,
          own,
          writable,
        },
      })
    }
    key={_id}
  >
    <Grid container wrap="nowrap" className="p-2 items-center">
      <Grid item className="pr-2">
        <Avatar
          alt={domain}
          src={`https://logo.clearbit.com/${domain}?size=800`}
        >
          {domain[0] || <LanguageIcon />}
        </Avatar>
      </Grid>
      <Grid item xs zeroMinWidth>
        <Typography variant="subtitle1" noWrap>
          {title || domain}
        </Typography>
        <Typography variant="body2" noWrap>
          {email}
        </Typography>
      </Grid>
    </Grid>
  </Paper>
);
export default connect(null, { showPopover })(Site);
