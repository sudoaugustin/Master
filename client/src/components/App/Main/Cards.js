import React from "react";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import { Button } from "../../Utils/Input";
import APP_WORD from "../../../lang/app";
import Card from "./Card";
import VisualSvg from "../../../img/noCards.svg";
import { showPopover } from "../../../actions/appActions";
const Wrap = ({ title, cards }) =>
  cards.length ? (
    <div className="my-3">
      <Typography className="px-2">{title}</Typography>
      <div className="py-3 flex flex-wrap xs:justify-center sm:justify-start">
        {cards.map((card, i) => (
          <Card {...card} key={i} />
        ))}
      </div>
    </div>
  ) : (
    <></>
  );

const Cards = ({ own, share, lang, showPopover }) =>
  own.length || share.length ? (
    <div>
      <Wrap title={APP_WORD[lang].title.share} cards={share} key="Share" />
      <Wrap title={APP_WORD[lang].title.own} cards={own} key="Own" />
    </div>
  ) : (
    <div className="w-full h-90 flex justify-center items-center flex-col">
      <div className="max-w-xs flex items-center flex-col">
        <img src={VisualSvg} alt="Visula for Card" />
        <p className="text-gray-500 mt-4 text-base tracking-wide text-center">
          {APP_WORD[lang].title.empty.cards}
        </p>
        <div className="mt-4 captilized">
          <Button
            variant="contained"
            color="primary"
            label={APP_WORD[lang].title.add.card}
            lowercase
            onClick={() =>
              showPopover({
                component: "Card",
                data: { writable: true, own: true },
              })
            }
          />
        </div>
      </div>
    </div>
  );

const mapStateToProp = ({ app }) => ({
  own: app.items.cards.filter(({ own }) => own),
  share: app.items.cards.filter(({ own }) => !own),
  lang: app.lang,
});

export default connect(mapStateToProp, { showPopover })(Cards);
