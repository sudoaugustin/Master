import React, { useState, useRef, useEffect } from "react";
import Avatar from "./Avatar";
import {
  Checkbox,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Button,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import DateFnsUtils from "@date-io/date-fns";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDropIcon from "@material-ui/icons/ArrowDropDownOutlined";
import ClearIcon from "@material-ui/icons/ClearRounded";
import CameraIcon from "@material-ui/icons/CameraAltOutlined";

const helperTextProps = {
  style: {
    marginLeft: "1px",
    marginTop: "1px",
    height: "17px",
  },
  component: "div",
};
const filter = createFilterOptions();
const Inputbase = (props) => {
  const [value, setValue] = useState(props.inputValue || "");
  const ref = useRef();
  const handleChange = () => {
    const { value } = ref.current;
    setValue(value);
    props.handleChange && props.handleChange(value, props.name);
  };
  return (
    <InputBase
      {...props}
      value={value}
      inputRef={ref}
      fullWidth
      onChange={handleChange}
    />
  );
};
const Textfield = (props) => {
  const [value, setValue] = useState(props.inputValue || "");
  const [state, setState] = useState({ err: props.err, msg: props.msg });
  const ref = useRef();
  const handleChange = () => {
    const { value } = ref.current;
    setValue(value);
    props.handleChange &&
      props.handleChange(value, props.name, { setValue, setState });
  };

  useEffect(() => {
    setState({ err: props.err, msg: props.msg });
  }, [props.err, props.msg]);

  return (
    <TextField
      {...props}
      variant={props.variant || "outlined"}
      error={state.err}
      value={value}
      inputRef={ref}
      fullWidth
      onChange={handleChange}
      className={props.classes || ""}
      FormHelperTextProps={props.hideMsg ? "" : helperTextProps}
      helperText={
        props.hideMsg ? "" : <HelperText error={state.err} msg={state.msg} />
      }
    />
  );
};

const PasswordField = (props) => {
  const [showPassword, setPasswordVisibility] = useState(null);
  const inputProps = {
    endAdornment: (
      <InputAdornment>
        <IconButton
          size={props.margin && props.margin === "dense" ? "small" : "medium"}
          edge="end"
          onClick={() => setPasswordVisibility(!showPassword)}
          children={showPassword ? <Visibility /> : <VisibilityOff />}
        />
      </InputAdornment>
    ),
    ...props.InputProps,
  };
  return (
    <Textfield
      {...props}
      type={showPassword ? "text" : "password"}
      InputProps={inputProps}
    />
  );
};

const SearchBar = (props) => {
  const inputProps = {
    startAdornment: (
      <InputAdornment>
        <IconButton
          edge="start"
          disabled
          children={<SearchIcon fontSize="small" />}
        />
      </InputAdornment>
    ),
    endAdornment: (
      <InputAdornment>
        <IconButton
          edge="end"
          size="small"
          children={
            props.value ? (
              <ClearIcon fontSize="small" />
            ) : (
              <ArrowDropIcon fontSize="small" />
            )
          }
        />
      </InputAdornment>
    ),
    ...props.InputProps,
  };
  return <Textfield {...props} InputProps={inputProps} />;
};

function PhoneField(props) {
  const inputProps = {
    startAdornment: <InputAdornment>{"+" + props.phoneCode}</InputAdornment>,
    ...props.InputProps,
  };
  return <Textfield {...props} InputProps={inputProps} />;
}

function Button_(props) {
  const btnProps = {
    style: {
      textTransform: props.lowercase && "none",
      margin: "5px 0px",
    },
    variant: props.variant || "contained",
    children: props.label,
    disabled: props.loading,
    color: props.color || "primary",
  };
  return (
    <Button
      {...props}
      {...btnProps}
      size={props.size || "large"}
      onClick={() => !props.loading && props.onClick && props.onClick()}
    />
  );
}

function CheckBox(props) {
  const [status, setStatus] = useState(props.checked);
  const inputRef = React.createRef();
  const toogleChange = () => {
    setStatus(!status);
    let checked = inputRef.current.checked;
    props.handleChange && props.handleChange(checked, props.name);
  };
  return (
    <FormControlLabel
      onChange={toogleChange}
      className="checkbox"
      style={{ fontSize: "20px" }}
      control={
        <Checkbox
          name={props.name}
          inputRef={inputRef}
          checked={status}
          icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 20 }} />}
          checkedIcon={
            <CheckBoxIcon color="primary" style={{ fontSize: 20 }} />
          }
        />
      }
      label={
        <Typography style={{ fontSize: "0.9rem" }}>{props.label}</Typography>
      }
      labelPlacement="end"
    />
  );
}

function ComboBox(props) {
  const [value, setValue] = useState(props.inputValue || "");
  const [state, setState] = useState({ err: props.err, msg: props.msg });
  React.useEffect(() => {
    setState({ err: props.err, msg: props.msg });
  }, [props.err, props.msg]);
  return (
    <Autocomplete
      style={{
        margin: "2px 0px",
      }}
      options={props.options}
      getOptionLabel={(option) => option}
      onChange={(e, v) => {
        if (v) {
          setValue(v);
          setState({ err: false, msg: "" });
          props.handleChange(v, props.name);
        }
      }}
      value={value}
      disabled={props.disabled || false}
      {...props.autoCompleteProps}
      renderInput={(params) => (
        <Textfield
          {...params}
          {...props}
          {...state}
          handleChange={props.inputChange}
        />
      )}
    />
  );
}

function TextFieldAuto(props) {
  const [value, setValue] = useState(props.inputValue || "");
  const [state, setState] = useState({ err: props.err, msg: props.msg });
  React.useEffect(() => {
    setState({ err: props.err, msg: props.msg });
  }, [props.err, props.msg]);
  return (
    <Autocomplete
      value={value}
      style={{
        margin: "2px 0px",
      }}
      onChange={(e, v) => {
        if (v) {
          setValue(v);
          setState({ err: false, msg: "" });
          props.handleChange(v, props.name);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        if (params.inputValue !== "") filtered.push(params.inputValue);
        return filtered;
      }}
      options={props.options}
      getOptionLabel={(option) => option}
      renderOption={(option) => option}
      renderInput={(params) => (
        <Textfield
          {...params}
          {...props}
          {...state}
          handleChange={props.inputChange}
        />
      )}
    />
  );
}

function HelperText(props) {
  const HelperIcon = props.icon || props.error ? ErrorIcon : InfoIcon;
  return props.msg ? (
    <div className="flex flex-row align-center text-sm">
      <span style={{ top: "-1.3px", position: "relative", marginRight: "3px" }}>
        <HelperIcon fontSize="inherit" />
      </span>
      <span>{props.msg}</span>
    </div>
  ) : (
    " "
  );
}

function DatePicker(props) {
  const [state, setState] = useState({ err: props.err, msg: props.msg });
  const [date, setDate] = useState(props.defaultValue || "");
  React.useEffect(() => {
    setState({ err: props.err, msg: props.msg });
  }, [props.err, props.msg]);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        KeyboardButtonProps={{ edge: "end" }}
        className="input"
        FormHelperTextProps={helperTextProps}
        helperText={<HelperText error={state.err} msg={state.msg} />}
        inputVariant={props.variant || "outlined"}
        format="dd/MM/yyyy"
        placeholder="e.g.DD/MM/YYYY"
        value={date}
        {...props}
        onChange={(date) => {
          const valid = date instanceof Date && !isNaN(date);
          if (valid) {
            setState({ err: false, msg: "" });
            setDate(date);
            props.handleChange && props.handleChange(date, props.name);
          } else {
            setState({ err: true, msg: "Invalid date format" });
          }
        }}
        error={state.err}
      />
    </MuiPickersUtilsProvider>
  );
}

const TimePicker = (props) => {
  const [date, setDate] = useState(props.defaultValue);
  const [state, setState] = useState({ err: props.err, msg: props.msg });
  React.useEffect(() => {
    setState({ err: props.err, msg: props.msg });
  }, [props.err, props.msg]);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardTimePicker
        KeyboardButtonProps={{
          edge: "end",
        }}
        FormHelperTextProps={helperTextProps}
        inputVariant={props.variant}
        helperText={<HelperText error={state.err} msg={state.msg} />}
        placeholder="hh:mm AM/PM"
        value={date}
        {...props}
        error={state.err}
        onChange={(date) => {
          setDate(date);
          date.toString() === "Invalid Date"
            ? setState({ err: true, msg: "Invalid time format" })
            : setState({ err: false, msg: "" });
          props.handleChange(date, props.name);
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

const AvatarPicker = (props) => {
  const inputRef = React.useRef();
  const [loading, setLoading] = React.useState(false);
  return (
    <div>
      <Avatar
        {...props}
        className={loading ? "avatar_uploading" : ""}
        badge={
          !loading ? (
            <IconButton
              onClick={() => inputRef.current.click()}
              size="small"
              style={{
                boxShadow: "1px 1px 2px 1px rgb(0,0,0,0.2)",
                backgroundColor: "#fff",
              }}
              children={<CameraIcon fontSize="small" />}
            />
          ) : undefined
        }
      />
      <input
        style={{
          display: "none",
        }}
        multiple={false}
        onChange={() => {
          setLoading(true);
          const avatar = inputRef.current.files[0];
          props.onChange(avatar, setLoading);
        }}
        type="file"
        ref={inputRef}
        accept=".svg,.png,.jpg"
      />
    </div>
  );
};

const Select_ = (props) => {
  const [value, setValue] = useState(props.options[0]);
  return (
    <FormControl
      fullWidth
      variant={props.variant || "outlined"}
      margin={props.margin || "none"}
    >
      <InputLabel>{props.label}</InputLabel>
      <Select
        value={value}
        onChange={({ target: { value = "" } }) => {
          if (value) {
            setValue(value);
            props.handleChange(value, props.name);
          }
        }}
        label={props.label}
        inputProps={{ name: props.name }}
      >
        {props.options.map((option) => (
          <option
            className="px-1 py-2 cursor-pointer font-serif"
            value={option}
          >
            {option}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export {
  Textfield as TextField,
  PasswordField,
  PhoneField,
  Button_ as Button,
  CheckBox as Checkbox,
  DatePicker,
  TimePicker,
  AvatarPicker,
  ComboBox,
  SearchBar,
  TextFieldAuto,
  Inputbase as InputBase,
  Select_ as Select,
};
