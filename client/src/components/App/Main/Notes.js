import React from "react";
import { connect } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import APP_WORD from "../../../lang/app";
import Note from "./Note";
import VisualSvg from "../../../img/noNotes.svg";
import { Button } from "../../Utils/Input";
import { showPopover } from "../../../actions/appActions";
const Wrap = ({ title, notes }) =>
  notes.length ? (
    <div className="my-3">
      <Typography className="py-1">{title}</Typography>
      <Grid container direction="row" spacing={1} className="py-3">
        {notes.map((note, i) => (
          <Grid item xs={6} sm={4} md={3} key={i}>
            <Note {...note} />
          </Grid>
        ))}
      </Grid>
    </div>
  ) : (
    <></>
  );

const Notes = ({ own, share, lang, showPopover }) =>
  own.length || share.length ? (
    <div>
      <Wrap title={APP_WORD[lang].title.share} notes={share} key="Share" />
      <Wrap title={APP_WORD[lang].title.own} notes={own} key="Own" />
    </div>
  ) : (
    <div className="w-full h-90 flex justify-center items-center flex-col">
      <div className="max-w-xs flex items-center flex-col">
        <img src={VisualSvg} alt="Visula for Note" />
        <p className="text-gray-500 mt-4 text-base tracking-wide text-center">
          {APP_WORD[lang].title.empty.notes}
        </p>
        <div className="mt-4 captilized">
          <Button
            variant="contained"
            color="primary"
            label={APP_WORD[lang].title.add.note}
            lowercase
            onClick={() =>
              showPopover({
                component: "Note",
                data: { writable: true, own: true },
              })
            }
          />
        </div>
      </div>
    </div>
  );

const mapStateToProp = ({ app }) => ({
  own: app.items.notes.filter(({ own }) => own),
  share: app.items.notes.filter(({ own }) => !own),
  lang: app.lang,
});

export default connect(mapStateToProp, { showPopover })(Notes);
