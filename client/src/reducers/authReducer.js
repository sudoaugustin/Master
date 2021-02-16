import { getToken, setToken, rmvToken } from "../config";
const initState = {
  isAuthenticated: getToken(),
  token: getToken(),
  loading: false,
  counter: "",
  value: {},
};

export default function (state = initState, { type, payload }) {
  switch (type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
      };

    case "LOADED":
      return {
        ...state,
        loading: false,
      };

    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      setToken(payload);
      return {
        ...state,
        ...initState,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case "SET_VALUE":
      return {
        ...state,
        loading: false,
        value: payload,
      };
    case "SET_COUNTER":
      return {
        ...state,
        counter: payload,
      };

    case "LOGIN_FAIL":
    case "REGISTER_FAIL":
    case "AUTH_ERROR":
    case "LOGOUT_SUCCESS":
      rmvToken();
      localStorage.removeItem("theme");
      return {
        ...state,
        isAuthenticated: false,
        token: null,
      };

    default:
      return state;
  }
}
