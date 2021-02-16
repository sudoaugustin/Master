import React from "react";
import { connect } from "react-redux";
import Slide from "@material-ui/core/Slide";
import { TextField } from "../../Utils/Input";
import WORDS from "../../../lang/app";

const BankAccount = ({ lang, handleChange, bank }) => {
  const {
      placeholder: { bank: placeholder },
      label: { bank: label },
    } = WORDS[lang],
    holder = {
      placeholder: placeholder.holder,
      label: label.holder,
      name: "holder",
      handleChange: (v, name, { setValue }) => {
        v = v.replace(/\s+/g, "").replace(/[^a-zA-Z]/gi, "");
        setValue(v);
        handleChange(v, name);
      },
      inputValue: bank.holder,
      InputProps: { readOnly: !bank.writable },
    },
    no = {
      placeholder: placeholder.no,
      label: label.no,
      name: "no",
      handleChange: (v, name, { setValue }) => {
        v = v.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
        setValue(v);
        handleChange(v, name);
      },
      inputValue: bank.no,
      InputProps: { readOnly: !bank.writable },
      type: "tel",
    },
    routing = {
      placeholder: placeholder.routing,
      label: label.routing,
      name: "routing",
      handleChange: (v, name, { setValue }) => {
        v = v.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
        setValue(v);
        handleChange(v, name);
      },
      inputValue: bank.routing,
      InputProps: { readOnly: !bank.writable },
      type: "tel",
    },
    type = {
      placeholder: placeholder.type,
      label: label.type,
      name: "type",
      handleChange: (v, name, { setValue }) => {
        v = v.replace(/\s+/g, "").replace(/[^a-zA-Z]/gi, "");
        setValue(v);
        handleChange(v, name);
      },
      inputValue: bank.type,
      InputProps: { readOnly: !bank.writable },
    },
    name = {
      placeholder: placeholder.name,
      label: label.name,
      name: "name",
      handleChange,
      inputValue: bank.name,
      InputProps: { readOnly: !bank.writable },
    };

  return (
    <Slide direction="right" in={true}>
      <div className="py-2 px-4">
        <TextField {...name} inputProps={{ maxLength: "30" }} />
        <TextField {...holder} inputProps={{ maxLength: "20" }} />
        <TextField {...no} inputProps={{ maxLength: "17" }} />
        <TextField {...routing} inputProps={{ maxLength: "9" }} />
        <TextField {...type} inputProps={{ maxLength: "10" }} />
      </div>
    </Slide>
  );
};

const mapStateToProp = ({ app }) => ({ lang: app.lang });
export default connect(mapStateToProp, {})(BankAccount);
