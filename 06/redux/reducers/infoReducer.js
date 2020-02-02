const inital = {
  info: "info1"
};

export default function infoReducer(state = inital, action) {
  switch (action.type) {
    case "changeinfo":
      return {
        ...inital,
        info: action.payload.info || "info"
      };
    default:
      return state;
  }
}
