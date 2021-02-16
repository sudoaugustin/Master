import React from "react";
import { connect } from "react-redux";
import { Paper, Grid, Typography } from "@material-ui/core";
import { showPopover } from "../../../actions/appActions";
import PersonalIcon from "@material-ui/icons/PersonOutlineTwoTone";

const Personal = ({
  _id,
  title,
  fullName,
  userName,
  gender,
  dob,
  address1,
  address2,
  city,
  state,
  country,
  zip,
  updatedAt,
  own,
  writable,
  collaborators = [],
  showPopover,
}) => (
  <Paper
    variant="outlined"
    className="hover:shadow-md cursor-pointer"
    onClick={() =>
      showPopover({
        component: "Personal",
        data: {
          _id,
          title,
          fullName,
          userName,
          gender,
          dob,
          address1,
          address2,
          city,
          state,
          country,
          zip,
          collaborators,
          updatedAt,
          own,
          writable,
        },
      })
    }
    key={_id}
  >
    <Grid container wrap="nowrap" className="p-3">
      <Grid item className="pr-2">
        <PersonalIcon color="primary" />
      </Grid>
      <Grid item xs zeroMinWidth>
        <Typography variant="subtitle1" noWrap>
          {title || "Untitled"}
        </Typography>
      </Grid>
    </Grid>
  </Paper>
);
export default connect(null, { showPopover })(Personal);
