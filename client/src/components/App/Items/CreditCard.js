import React from "react";
import { connect } from "react-redux";
import Slide from "@material-ui/core/Slide";
import { TextField } from "../../Utils/Input";
import WORDS from "../../../lang/app";
import { cc_format } from "../../../config";

const CreditCard = ({ lang, handleChange, card }) => {
  const {
      placeholder: { card: placeholder },
      label: { card: label },
    } = WORDS[lang],
    name = {
      placeholder: placeholder.name,
      label: label.name,
      name: "name",
      inputValue: card.name,
      InputProps: { readOnly: !card.writable },
      handleChange: (v, name, { setValue }) => {
        v = v.toUpperCase();
        setValue(v);
        handleChange(v, name);
      },
    },
    no = {
      placeholder: placeholder.no,
      label: label.no,
      name: "no",
      inputValue: card.no,
      InputProps: { readOnly: !card.writable },
      handleChange: (v, name, { setValue }) => {
        v = v.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
        v = cc_format(v);
        setValue(v);
        handleChange(v, name);
      },
      type: "tel",
    },
    cvc = {
      placeholder: placeholder.cvc,
      label: label.cvc,
      name: "cvc",
      type: "tel",
      inputValue: card.cvc,
      InputProps: { readOnly: !card.writable },
      handleChange: (v, name, { setValue }) => {
        v = v.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
        setValue(v);
        handleChange(v, name);
      },
    },
    exp = {
      placeholder: placeholder.exp,
      label: label.exp,
      name: "exp",
      type: "tel",
      inputValue: card.exp,
      InputProps: { readOnly: !card.writable },
      handleChange: (v, name, { setValue }) => {
        v = v.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
        if (parseInt(v[0]) > 1) v = "0" + v[0];
        if (parseInt(v[0] + v[1]) > 12) v = 12;
        setValue(v);
        handleChange(v, name);
      },
    };
  return (
    <Slide direction="right" in={true}>
      <div className="py-2 px-4">
        <TextField {...name} inputProps={{ maxLength: "25" }} />
        <TextField {...no} inputProps={{ maxLength: "20" }} />
        <div className="flex w-full">
          <div className="mr-1 flex-1">
            <TextField {...cvc} inputProps={{ maxLength: "4" }} />
          </div>
          <div className="ml-1 flex-1">
            <TextField {...exp} inputProps={{ maxLength: "7" }} />
          </div>
        </div>
      </div>
    </Slide>
  );
};
const mapStateToProp = ({ app }) => ({
  lang: app.lang,
});
export default connect(mapStateToProp, {})(CreditCard);
