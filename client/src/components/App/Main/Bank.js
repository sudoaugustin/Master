import React from "react";
import { connect } from "react-redux";
import { Paper } from "@material-ui/core";
import { showPopover } from "../../../actions/appActions";
import { bank_acc_format } from "../../../config";
const Bank = ({
  _id,
  holder = "",
  no = "",
  routing = "",
  type = "",
  name = "",
  title = "",
  updatedAt,
  own,
  writable,
  collaborators = [],
  showPopover,
}) => {
  const _type = name.toLowerCase().includes("kbz")
      ? "kbz"
      : name.toLowerCase().includes("cb")
      ? "cb"
      : name.toLowerCase().includes("aya")
      ? "aya"
      : name.toLowerCase().includes("yoma")
      ? "yoma"
      : name.toLowerCase().includes("agd")
      ? "agd"
      : "unknown",
    formatted_no = bank_acc_format(no),
    screambled = formatted_no
      .split("")
      .map((c, i, { length }) => (c === " " ? "   " : i < length - 5 ? "•" : c))
      .join("");
  console.log(formatted_no);
  return (
    <Paper
      style={{ height: 180 }}
      variant="outlined"
      className={`hover:shadow-md cursor-pointer bank-card rounded p-3 ${_type}`}
      onClick={() =>
        showPopover({
          component: "Bank",
          data: {
            _id,
            holder,
            no,
            routing,
            type,
            name,
            own,
            writable,
            title,
            collaborators,
            updatedAt,
          },
        })
      }
      key={_id}
    >
      <div className="flex flex-col h-full justify-around">
        <h3 className="my-2 text-right text-base sm:text-lg uppercase ">
          {name || type}
        </h3>
        <p className="text-lg my-1">
          {screambled || <span className="opacity-0">a</span>}
        </p>
        <p
          className="uppercase mt-4 mb-2 text-lg"
          style={{ fontFamily: "Consolas, Courier, monospace" }}
        >
          {holder || " "}
        </p>
      </div>
    </Paper>
  );
};
export default connect(null, { showPopover })(Bank);
