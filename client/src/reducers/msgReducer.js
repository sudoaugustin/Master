const initState = {
  error: {},
  success: {},
};

export default function (state = initState, action) {
  switch (action.type) {
    case "GET_ERROR":
      return {
        ...state,
        error: { ...state.error, ...action.payload },
      };
    case "GET_MSG":
      return {
        ...state,
        success: action.payload,
      };

    case "CLEAR_ERROR":
      return initState;

    default:
      return state;
  }
}
