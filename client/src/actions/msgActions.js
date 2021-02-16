export const returnError = (msg) => {
  return {
    type: "GET_ERROR",
    payload: msg,
  };
};

export const returnMsg = (msg) => ({
  type: "GET_MSG",
  payload: msg,
});

export const clearError = () => ({
  type: "CLEAR_ERROR",
});
