import React from "react";
import { connect } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import Personal from "./Personal";
import APP_WORD from "../../../lang/app";
import VisualSvg from "../../../img/noPersonals.svg";
import { Button } from "../../Utils/Input";
import { showPopover } from "../../../actions/appActions";
const Wrap = ({ title, personals }) =>
  personals.length ? (
    <div className="my-3">
      <Typography className="py-1">{title}</Typography>
      <Grid container direction="row" spacing={1} className="py-3 ">
        {personals.map((personal, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Personal {...personal} />
          </Grid>
        ))}
      </Grid>
    </div>
  ) : (
    <></>
  );

const Personals = ({ own, share, lang, showPopover }) =>
  own.length || share.length ? (
    <div>
      <Wrap title={APP_WORD[lang].title.share} personals={share} key="Sahre" />
      <Wrap title={APP_WORD[lang].title.own} personals={own} key="Own" />
    </div>
  ) : (
    <div className="w-full h-90 flex justify-center items-center flex-col">
      <div className="max-w-xs flex items-center flex-col">
        <img src={VisualSvg} alt="Visula for Personal" />
        <p className="text-gray-500 mt-4 text-base tracking-wide text-center">
          {APP_WORD[lang].title.empty.personals}
        </p>
        <div className="mt-4 captilized">
          <Button
            variant="contained"
            color="primary"
            label={APP_WORD[lang].title.add.personal}
            lowercase
            onClick={() =>
              showPopover({
                component: "Personal",
                data: { writable: true, own: true },
              })
            }
          />
        </div>
      </div>
    </div>
  );

const mapStateToProp = ({ app }) => ({
  own: app.items.personals.filter(({ own }) => own),
  share: app.items.personals.filter(({ own }) => !own),
  lang: app.lang,
});

export default connect(mapStateToProp, { showPopover })(Personals);
