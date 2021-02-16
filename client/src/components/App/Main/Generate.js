import React from "react";
import { connect } from "react-redux";
import generator from "generate-password";
import { Paper, Typography, Slider } from "@material-ui/core";
import copy from "copy-to-clipboard";
import { returnMsg } from "../../../actions/msgActions";

import { Checkbox, Button } from "../../Utils/Input";
const Generate = ({ lang, returnMsg }) => {
  const lowercase = true;
  const [length, setLength] = React.useState(10);

  const [uppercase, setUppercase] = React.useState(true);
  const [numbers, setNumbers] = React.useState(true);
  const [symbols, setSymbols] = React.useState(true);

  const [password, setPassword] = React.useState(
    generator.generate({
      length,
      lowercase,
      uppercase,
      numbers,
      symbols,
    })
  );
  const generate = (v, name = "") => {
    const password = generator.generate({
      length,
      lowercase,
      uppercase,
      numbers,
      symbols,
      [name]: v,
    });
    setPassword(password);
  };
  return (
    <div className="h-90 flex justify-center items-center">
      <Paper className="p-5  w-full max-w-lg" variant="outlined">
        <Typography variant="h5" className="mb-3 text-center">
          {lang === "EN"
            ? "Generate a secure password"
            : "လုံခြုံတဲ့ စကားဝှက်တခု ကိုထုတ်လုပ်ပါ"}
        </Typography>
        <p className="text-center font-semibold flex-1 flex-grow my-3 px-2 py-4 max-w-sm  md:max-w-md">
          {password}
        </p>
        <div>
          <Typography variant="subtitle1" gutterBottom>
            {lang === "EN"
              ? "Customize your password"
              : "သင်၏စကားဝှက်ကိုစိတ်ကြိုက်ပြင်ဆင်ပါ"}
          </Typography>
          <Typography gutterBottom>Password length</Typography>
          <Slider
            value={length}
            min={10}
            max={50}
            getAriaValueText={(v) => v}
            valueLabelFormat={(v) => v}
            onChange={(e, v) => {
              setLength(v);
              generate(v, "length");
            }}
            valueLabelDisplay="auto"
            aria-labelledby="non-linear-slider"
          />
          <Checkbox
            name="uppercase"
            checked={uppercase}
            label="Uppercase"
            handleChange={(v) => {
              setUppercase(v);
              generate(v, "uppercase");
            }}
          />
          <Checkbox
            name="numbers"
            checked={numbers}
            label="Numbers"
            handleChange={(v) => {
              setNumbers(v);
              generate(v, "numbers");
            }}
          />
          <Checkbox
            name="symbols"
            checked={symbols}
            label="Symbols"
            handleChange={(v) => {
              setSymbols(v);
              generate(v, "symbols");
            }}
          />
        </div>
        <div>
          <Button
            label="Copy Passowrd"
            onClick={() => {
              copy(password);
              returnMsg({ modal: "Copied " });
            }}
            fullWidth
            lowercase="true"
          />
        </div>
      </Paper>
    </div>
  );
};

const mapStateToProp = ({ app }) => ({
  lang: app.lang,
});

export default connect(mapStateToProp, { returnMsg })(Generate);
