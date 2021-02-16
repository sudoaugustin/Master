import React from "react";
import { connect } from "react-redux";
import Home from "./Home";
import Sites from "./Sites";
import Notes from "./Notes";
import Cards from "./Cards";
import Banks from "./Banks";
import Personals from "./Personals";
import Setting from "./Setting";
import Checkup from "./Checkup";
import Generate from "./Generate";

const Main = ({ activeTab }) => {
  return (
    <main className="main duration-300 ease-linear p-2 md:px-3 font-serif">
      {activeTab === 0 ? (
        <Home />
      ) : activeTab === 1 ? (
        <Sites />
      ) : activeTab === 2 ? (
        <Notes />
      ) : activeTab === 3 ? (
        <Personals />
      ) : activeTab === 4 ? (
        <Cards />
      ) : activeTab === 5 ? (
        <Banks />
      ) : activeTab === 6 ? (
        <Generate />
      ) : activeTab === 7 ? (
        <Checkup />
      ) : (
        <Setting />
      )}
    </main>
  );
};

const mapStateToProp = ({ app }) => ({
  activeTab: app.activeTab,
});

export default connect(mapStateToProp, {})(Main);
