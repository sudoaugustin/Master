import React from "react";
import { connect } from "react-redux";
import { Grid, Typography } from "@material-ui/core";

import Site from "./Site";
import APP_WORD from "../../../lang/app";
import VisualSvg from "../../../img/noSites.svg";
import { Button } from "../../Utils/Input";
import { showPopover } from "../../../actions/appActions";
const Wrap = ({ title, sites }) =>
  sites.length ? (
    <div className="my-3">
      <Typography className="py-1">{title}</Typography>
      <Grid container direction="row" spacing={1} className="py-3 ">
        {sites.map((site, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Site {...site} />
          </Grid>
        ))}
      </Grid>
    </div>
  ) : (
    <></>
  );

const Sites = ({ own, share, lang, showPopover }) =>
  own.length || share.length ? (
    <div>
      <Wrap title={APP_WORD[lang].title.share} sites={share} key="Share" />
      <Wrap title={APP_WORD[lang].title.own} sites={own} key="Own" />
    </div>
  ) : (
    <div className="w-full h-90 flex justify-center items-center flex-col">
      <div className="max-w-xs flex items-center flex-col">
        <img src={VisualSvg} alt="Visula for Sites" />
        <p className="text-gray-500 mt-4 text-base tracking-wide text-center">
          {APP_WORD[lang].title.empty.sites}
        </p>
        <div className="mt-4 captilized">
          <Button
            variant="contained"
            color="primary"
            label={APP_WORD[lang].title.add.site}
            lowercase
            onClick={() =>
              showPopover({
                component: "Site",
                data: { writable: true, own: true },
              })
            }
          />
        </div>
      </div>
    </div>
  );

const mapStateToProp = ({ app }) => ({
  own: app.items.sites.filter(({ own }) => own),
  share: app.items.sites.filter(({ own }) => !own),
  lang: app.lang,
});

export default connect(mapStateToProp, { showPopover })(Sites);
