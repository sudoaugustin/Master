import axios from "axios";
import { headerConfig } from "../config";
import { returnError } from "./msgActions";
import { v1 as uuidv1 } from "uuid";
import { loading, loaded } from "./authActions";
import LZString from "lz-string";

export const setTab = (index) => ({
  type: "SET_TAB",
  payload: index,
});

export const requestData = () => (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();
  dispatch(loading());
  axios
    .get("app/user/", headerConfig(token))
    .then((res) => {
      dispatch(loaded());
      dispatch({ type: "SET_DATA", payload: res.data });
    })
    .catch((err) => {
      if (err.response.status === 404) {
        dispatch({ type: "LOGIN_FAIL" });
      } else {
        dispatch(loaded());
        let msg = {};
        msg.modal = "Unknown error";
        dispatch(returnError(msg));
      }
    });
};
export const handleEdit = ({
  component,
  name,
  value,
  checked = false,
  cid,
  file,
  imgIndex,
  removeUser,
  removeImage,
  toggleCheckBox,
  addNewCollaborator,
  addImage,
}) => (dispatch, getState) => {
  const {
    auth: { token },
    app: {
      popover: { data },
      items,
    },
  } = getState();
  if (!data._id) {
    data._id = uuidv1();
    data.new = true;
  }
  if (!data.images) data.images = [];
  if (!data.collaborators) data.collaborators = [];
  if (toggleCheckBox || removeUser || addNewCollaborator) {
    const newCollaborators = removeUser
      ? data.collaborators.filter(({ _id }) => _id !== cid)
      : toggleCheckBox
      ? data.collaborators.map((c) =>
          c._id === cid ? { ...c, writable: checked } : c
        )
      : data.collaborators.concat(value);
    data.collaborators = newCollaborators;
  } else if (removeImage) {
    const newImages = data.images.filter((img, i) => i !== imgIndex);
    data.images = newImages;
  } else if (addImage) {
    data.images = data.images.concat(
      LZString.compressToEncodedURIComponent(file)
    );
  } else {
    data[name] = value;
    data.focused = name === "cvc";
  }

  component = component.toLowerCase() + "s";
  let newItems = [];
  if (data.new) {
    dispatch(loading());
    axios
      .post("app/item", { item: { ...data, component } }, headerConfig(token))
      .then(() => dispatch(loaded()))
      .catch((err) => {
        dispatch(loaded());
        let msg = {};
        msg.modal = "Unknown error";
        dispatch(returnError(msg));
      });
    newItems = items[component].concat(data);

    data.new = false;
  } else {
    dispatch(loading());
    axios
      .put("app/item", { item: { ...data, component } }, headerConfig(token))
      .then(() => dispatch(loaded()))
      .catch((err) => {
        dispatch(loaded());
        console.log(err.response);
        let msg = {};
        msg.modal = "Unknown error";
        dispatch(returnError(msg));
      });
    newItems = items[component].map((item) =>
      item._id === data._id ? data : item
    );
  }
  dispatch(editItems({ item: component, data: newItems }));
};

export const updateAccount = ({ name, value, changed }) => (
  dispatch,
  getState
) => {
  const {
    app: { user },
    auth: { token },
  } = getState();
  if (changed) {
    user[name] = value;
    dispatch({ type: "UPDATE_ACCOUNT", payload: { [name]: value } });
    axios
      .put("app/user", { user: { [name]: value } }, headerConfig(token))
      .then(() => dispatch(loaded()))
      .catch((err) => {
        dispatch(loaded());
        const msg = { modal: "Unknown error" };
        dispatch(returnError(msg));
      });
  }
};
export const handleDelete = (component) => (dispatch, getState) => {
  const {
    auth: { token },
    app: {
      popover: { data },
      items,
    },
  } = getState();

  axios
    .delete("app/item/" + data._id, headerConfig(token))
    .then(() => dispatch(loaded()))
    .catch((err) => {
      console.log(err.response);
      dispatch(loaded());
      let msg = {};
      msg.modal = "Unknown error";
      dispatch(returnError(msg));
    });
  component = component.toLowerCase() + "s";
  const newItems = items[component].filter(({ _id }) => _id !== data._id);
  dispatch(deleteItems({ item: component, data: newItems }));
};
export const showPopover = (payload) => ({ type: "SHOW_POPOVER", payload });
export const hidePopover = () => ({ type: "HIDE_POPOVER" });
export const editItems = (payload) => ({ type: "EDIT_ITEM", payload });
export const fetchCollaborators = ({ email, setUsers }) => (
  dispatch,
  getState
) => {
  const {
    auth: { token },
  } = getState();
  axios
    .get("/app/user/" + email, headerConfig(token))
    .then(({ data }) => {
      const users = data.map(({ _id, email, name, avatar }) => ({
        _id,
        email,
        name,
        avatar,
      }));
      setUsers(users);
    })
    .catch((err) => console.log(err));
};
export const deleteItems = (payload) => ({ type: "DELETE_ITEM", payload });
export const toggleMobileOpen = () => ({ type: "TOGGLE_SIDEBAR" });
export const fetchDomains = (query) => (dispatch) => {
  axios
    .get(
      `https://autocomplete.clearbit.com/v1/companies/suggest?query="${query}"`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then(({ data }) => {
      const domains = data.map(({ domain }) => domain);
      dispatch({
        type: "SET_DOMAINS",
        payload: domains,
      });
    })
    .catch((err) => {
      console.log({ err });
    });
};
export const setLang = (lang) => ({ type: "SET_LANG", payload: lang });
export const setDarkMode = (payload) => ({ type: "SET_DARK_MODE", payload });
