import React from "react";
import { connect } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import { Button } from "../../Utils/Input";
import APP_WORD from "../../../lang/app";
import Bank from "./Bank";
import VisualSvg from "../../../img/noBanks.svg";
import { showPopover } from "../../../actions/appActions";
const Wrap = ({ title, banks }) =>
  banks.length ? (
    <div className="my-3">
      <Typography>{title}</Typography>
      <Grid container wrap="wrap" direction="row" spacing={1} className="py-3">
        {banks.map((bank, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Bank {...bank} />
          </Grid>
        ))}
      </Grid>
    </div>
  ) : (
    <></>
  );

const Banks = ({ own, share, lang, showPopover }) =>
  own.length || share.length ? (
    <div>
      <Wrap
        title={APP_WORD[lang].title.share}
        banks={share}
        key="Shared Items"
      />
      <Wrap title={APP_WORD[lang].title.own} banks={own} key="Own Items" />
    </div>
  ) : (
    <div className="w-full h-90 flex justify-center items-center flex-col">
      <div className="max-w-xs flex items-center flex-col">
        <img src={VisualSvg} alt="Visula for Bank" />
        <p className="text-gray-500 mt-4 text-base tracking-wide text-center">
          {APP_WORD[lang].title.empty.banks}
        </p>
        <div className="mt-4 captilized">
          <Button
            variant="contained"
            color="primary"
            label={APP_WORD[lang].title.add.bank}
            lowercase="true"
            onClick={() =>
              showPopover({
                component: "Bank",
                data: { writable: true, own: true },
              })
            }
          />
        </div>
      </div>
    </div>
  );

const mapStateToProp = ({ app }) => ({
  own: app.items.banks.filter(({ own }) => own),
  share: app.items.banks.filter(({ own }) => !own),
  lang: app.lang,
});

export default connect(mapStateToProp, { showPopover })(Banks);
