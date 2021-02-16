import React from "react";
import { connect } from "react-redux";
import { Paper, Grid, Typography } from "@material-ui/core";
import { showPopover } from "../../../actions/appActions";

import ellipsis from "text-ellipsis";

const Note = ({
  _id,
  title,
  body = "",
  images,
  updatedAt,
  collaborators = [],
  own,
  writable,
  showPopover,
}) => (
  <Paper
    variant="outlined"
    className="hover:shadow-md cursor-pointer "
    onClick={() =>
      showPopover({
        component: "Note",
        data: {
          _id,
          title,
          body,
          images,
          collaborators,
          updatedAt,
          own,
          writable,
        },
      })
    }
    key={_id}
  >
    <Grid container className="px-3 py-1">
      <Grid item xs zeroMinWidth>
        <Typography variant="subtitle1" noWrap>
          {title || "Untitled"}
        </Typography>
        <Typography
          variant="body2"
          className="mb-1 opacity-25 overflow-hidden "
          style={{ height: 150 }}
        >
          {ellipsis(body, 180)}
        </Typography>
      </Grid>
    </Grid>
  </Paper>
);
export default connect(null, { showPopover })(Note);
