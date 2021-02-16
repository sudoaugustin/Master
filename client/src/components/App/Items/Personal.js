import React from "react";
import { connect } from "react-redux";
import Slide from "@material-ui/core/Slide";
import csc from "country-state-city";
import { TextField, Select, DatePicker, ComboBox } from "../../Utils/Input";
import WORDS from "../../../lang/app";
const countries = csc.getAllCountries().map((country) => country.name);
const Personal = ({ lang, personal, handleChange }) => {
  const {
      placeholder: { personal: placeholder },
      label: { personal: label },
    } = WORDS[lang],
    fullName = {
      placeholder: placeholder.fullName,
      label: label.fullName,
      name: "fullName",
      handleChange,
      inputValue: personal.fullName,
      InputProps: { readOnly: !personal.writable },
    },
    userName = {
      placeholder: placeholder.userName,
      label: label.userName,
      name: "userName",
      handleChange,
      inputValue: personal.userName,
      InputProps: { readOnly: !personal.writable },
    },
    gender = {
      label: label.gender,
      name: "gender",
      handleChange,
      options: [label.male, label.female, label.other],
      defaultValue: personal.gender,
      InputProps: { readOnly: !personal.writable },
    },
    dob = {
      label: label.dob,
      placeholder: placeholder.dob,
      name: "dob",
      handleChange,
      defaultValue: personal.dob,
      InputProps: { readOnly: !personal.writable },
    },
    address1 = {
      label: label.address1,
      placeholder: placeholder.address1,
      name: "address1",
      handleChange,
      inputValue: personal.address1,
      InputProps: { readOnly: !personal.writable },
    },
    address2 = {
      label: label.address2,
      placeholder: placeholder.address2,
      name: "address2",
      handleChange,
      inputValue: personal.address2,
      InputProps: { readOnly: !personal.writable },
    },
    city = {
      label: label.city,
      placeholder: placeholder.city,
      name: "city",
      handleChange,
      inputValue: personal.city,
      InputProps: { readOnly: !personal.writable },
    },
    state = {
      label: label.state,
      placeholder: placeholder.state,
      name: "state",
      handleChange,
      inputValue: personal.state,
      InputProps: { readOnly: !personal.writable },
    },
    country = {
      placeholder: placeholder.country,
      label: label.country,
      name: "country",
      handleChange,
      options: countries,
      inputValue: personal.country,
      disabled: !personal.writable,
    },
    zip = {
      placeholder: placeholder.zip,
      label: label.zip,
      name: "zip",
      handleChange,
      inputValue: personal.zip,
      InputProps: { readOnly: !personal.writable },
    };
  return (
    <Slide direction="right" in={true}>
      <div className="py-2 px-4">
        <TextField
          {...fullName}
          margin="dense"
          inputProps={{ maxLength: "30" }}
        />
        <TextField
          {...userName}
          margin="dense"
          inputProps={{ maxLength: "15" }}
        />
        <div className="flex flex-wrap">
          <div className="flex-1 mr-1" style={{ minWidth: "150px" }}>
            <Select {...gender} margin="dense" />
          </div>
          <div className="flex-1" style={{ minWidth: "150px" }}>
            <DatePicker {...dob} margin="dense" />
          </div>
        </div>
        <TextField
          {...address1}
          margin="dense"
          inputProps={{ maxLength: "50" }}
        />
        <TextField
          {...address2}
          margin="dense"
          inputProps={{ maxLength: "50" }}
        />
        <div className="flex flex-wrap">
          <div className="flex-1 mr-1" style={{ minWidth: "180px" }}>
            <TextField
              {...city}
              margin="dense"
              inputProps={{ maxLength: "28" }}
            />
          </div>
          <div className="flex-1" style={{ minWidth: "180px" }}>
            <TextField
              {...state}
              margin="dense"
              inputProps={{ maxLength: "28" }}
            />
          </div>
        </div>
        <ComboBox {...country} margin="dense" />
        <div style={{ maxWidth: "10rem" }}>
          <TextField {...zip} margin="dense" inputProps={{ maxLength: "6" }} />
        </div>
      </div>
    </Slide>
  );
};
const mapStateToProp = ({ app }) => ({ lang: app.lang });
export default connect(mapStateToProp, {})(Personal);
