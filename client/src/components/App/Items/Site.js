import React from "react";
import { connect } from "react-redux";
import Slide from "@material-ui/core/Slide";
import { TextField, PasswordField, TextFieldAuto } from "../../Utils/Input";
import WORDS from "../../../lang/app";
import { fetchDomains } from "../../../actions/appActions";
const Site = ({ lang, site, domains, fetchDomains, handleChange }) => {
  const {
      placeholder: { site: placeholder },
      label: { site: label },
    } = WORDS[lang],
    domain = {
      placeholder: placeholder.domain,
      label: label.domain,
      inputChange: fetchDomains,
      options: domains,
      name: "domain",
      inputValue: site.domain,
      disabled: site.writable,
      handleChange,
    },
    email = {
      placeholder: placeholder.email,
      label: label.email,
      name: "email",
      inputValue: site.email,
      InputProps: { readOnly: !site.writable },
      handleChange,
    },
    password = {
      placeholder: placeholder.password,
      label: label.password,
      name: "password",
      inputValue: site.password,
      InputProps: { readOnly: !site.writable },
      handleChange,
    };
  return (
    <Slide direction="right" in={true}>
      <div className="py-2 px-4 font-serif">
        <TextFieldAuto {...domain} />
        <TextField {...email} inputProps={{ maxLength: "25" }} />
        <PasswordField {...password} inputProps={{ maxLength: "30" }} />
      </div>
    </Slide>
  );
};
const mapStateToProp = ({ app }) => ({
  lang: app.lang,
  domains: app.domains,
});
export default connect(mapStateToProp, { fetchDomains })(Site);

// folder = {
//   placeholder: placeholder.folder,
//   label: label.folder,
//   name: "folder",
//   handleChange,
//   options: ["A", "B", "C", "D"],
// };
/* <ComboBox {...folder} margin="dense" /> */
