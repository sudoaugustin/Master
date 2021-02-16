import React from "react";
import { connect } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import Site from "./Site";
import Note from "./Note";
import Card from "./Card";
import Bank from "./Bank";
import Personal from "./Personal";
import VisualSvg from "../../../img/noItems.svg";
import { Button } from "../../Utils/Input";
import { showPopover } from "../../../actions/appActions";
import APP_WORD from "../../../lang/app";
import SiteIcon from "@material-ui/icons/VpnKeyOutlined";
import PersonalIcon from "@material-ui/icons/SupervisedUserCircle";
const Sites = ({ sites }) =>
  sites.length ? (
    <div className="py-2">
      <Typography variant="h6">Passwords</Typography>
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
const Cards = ({ cards }) =>
  cards.length ? (
    <div className="py-2 overflow-hidden">
      <Typography variant="h6">Cards</Typography>
      <div className="py-3 flex overflow-x-auto customScrollBar">
        {cards.map((card, i) => (
          <Card {...card} key={i} />
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
const Notes = ({ notes }) =>
  notes.length ? (
    <div className="py-2 overflow-hidden">
      <Typography variant="h6">Notes</Typography>
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

const Banks = ({ banks }) =>
  banks.length ? (
    <div className="py-2">
      <Typography variant="h6">Bank accounts</Typography>
      <Grid container wrap="wrap" direction="row" spacing={1} className="py-3">
        {banks.map((bank, i) => (
          <Grid item xs={9} sm={6} md={4} key={i}>
            <Bank {...bank} />
          </Grid>
        ))}
      </Grid>
    </div>
  ) : (
    <></>
  );

const Personals = ({ personals }) =>
  personals.length ? (
    <div className="py-2">
      <Typography variant="h6">Personals</Typography>
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
const Overview = ({ items }) => (
  <div className="py-2">
    <Typography variant="h6">Overview</Typography>
    <Grid container direction="row" spacing={1} className="py-3 ">
      {items.map(
        ({ count, name, icon, color }, i) =>
          count > 0 && (
            <Grid item xs={6} sm={4} md={3} key={i}>
              <Grid
                container
                wrap="nowrap"
                className={`p-2 items-center bg-${color}-200 rounded`}
              >
                <Grid item className={`pr-2 text-3xl text-${color}-500`}>
                  {icon}
                </Grid>
                <Grid item xs zeroMinWidth className={` text-${color}-500`}>
                  <Typography variant="subtitle1" noWrap>
                    {count}
                  </Typography>
                  <Typography variant="body2" noWrap>
                    {name + (count > 1 ? "s" : "")}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          )
      )}
    </Grid>
  </div>
);

const Home = ({ items, lang, showPopover }) => {
  const sites = items.sites.slice(0, 5),
    cards = items.cards.slice(0, 5),
    notes = items.notes.slice(0, 5),
    banks = items.banks.slice(0, 5),
    personals = items.personals.slice(0, 5);
  return sites.length ||
    cards.length ||
    notes.length ||
    banks.length ||
    personals.length ? (
    <div>
      <Overview
        items={[
          {
            name: "Password",
            count: sites.length,
            icon: <SiteIcon fontSize="inherit" />,
            color: "red",
          },
          {
            name: "Card",
            count: cards.length,
            icon: <i className="bx bx-credit-card-front"></i>,
            color: "teal",
          },

          {
            name: "Personal",
            count: personals.length,
            icon: <PersonalIcon fontSize="inherit" />,
            color: "indigo",
          },

          {
            name: "Bank",
            count: banks.length,
            icon: <i className="bx bxs-bank"></i>,
            color: "green",
          },

          {
            name: "Note",
            count: notes.length,
            icon: <i className="bx bx-notepad"></i>,
            color: "purple",
          },
        ]}
      />
      <Sites sites={sites} />
      <Personals personals={personals} />
      <Notes notes={notes} />
      <Banks banks={banks} />
      <Cards cards={cards} />
    </div>
  ) : (
    <div className="w-full h-90 flex justify-center items-center flex-col">
      <div className="max-w-xs flex items-center flex-col">
        <img src={VisualSvg} alt="Welcomme Home" />
        <p className="text-gray-500 mt-4 text-base tracking-wide text-center">
          {APP_WORD[lang].title.empty.items}
        </p>
        <div className="mt-4 captilized">
          <Button
            variant="contained"
            color="primary"
            label={APP_WORD[lang].title.add.item}
            onClick={() => showPopover({ component: "NewItem", data: {} })}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProp = ({ app }) => ({
  items: app.items,
  lang: app.lang,
});

export default connect(mapStateToProp, { showPopover })(Home);
