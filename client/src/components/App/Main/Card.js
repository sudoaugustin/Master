import React from "react";
import { connect } from "react-redux";
import { showPopover } from "../../../actions/appActions";
import Cards from "react-credit-cards";
import Tilt from "react-parallax-tilt";
import "react-credit-cards/lib/styles.scss";

const Note = ({
  _id,
  title,
  name,
  no = "",
  cvc,
  exp,
  focused,
  own,
  writable,
  updatedAt,
  showPopover,
}) => (
  <div
    className="m-2 ml-1 cursor-pointer font-serif"
    onClick={() =>
      showPopover({
        component: "Card",
        data: { _id, title, name, no, cvc, exp, updatedAt, own, writable },
      })
    }
  >
    <Tilt>
      <Cards
        cvc={cvc}
        expiry={exp}
        name={name}
        number={no.substring(0, 4)}
        focused={focused && "cvc"}
        locale={{
          valid: "Exp",
        }}
        style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.18)" }}
      />
    </Tilt>
  </div>
);
export default connect(null, { showPopover })(Note);
