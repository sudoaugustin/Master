const initState = {
  activeTab: 0,
  mobileOpen: false,
  theme: localStorage.getItem("theme") || "light",
  lang: localStorage.getItem("lang") || "MM",
  popover: {
    component: false,
    data: {
      collaborators: [],
      title: "",
      _id: null,
    },
  },
  domains: ["facebook.com", "google.com", "amazon.com"],
  unsaved: {},
  user: {},
  sessions: [],
  items: {
    sites: [],
    notes: [],
    cards: [],
    banks: [],
    personals: [],
  },
};
export default function (state = initState, { type, payload = {} }) {
  const { items } = state;
  switch (type) {
    case "SET_DOMAINS":
      return {
        ...state,
        domains: payload,
      };
    case "SET_DARK_MODE":
      localStorage.setItem("theme", payload);
      return {
        ...state,
        theme: payload,
      };
    case "SET_TAB":
      return {
        ...state,
        activeTab: payload,
        mobileOpen: false,
      };
    case "SET_LANG":
      localStorage.setItem("lang", payload);
      return {
        ...state,
        lang: payload,
      };
    case "SHOW_POPOVER":
      return {
        ...state,
        popover: payload,
      };
    case "HIDE_POPOVER":
      return {
        ...state,
        popover: initState.popover,
      };
    case "UPDATE_ACCOUNT":
      return {
        ...state,
        user: { ...state.user, ...payload },
      };
    case "SET_DATA":
      return {
        ...state,
        ...payload,
      };
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        mobileOpen: !state.mobileOpen,
      };
    case "EDIT_ITEM":
      return {
        ...state,
        items: {
          ...items,
          [payload.item]: payload.data,
        },
      };
    case "DELETE_ITEM":
      return {
        ...state,
        popover: initState.popover,
        items: {
          ...items,
          [payload.item]: payload.data,
        },
      };

    default:
      return state;
  }
}
