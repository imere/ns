const inital = {
  count: 1
};

export default function countReducer(state = inital, action) {
  switch (action.type) {
    case "add":
      return {
        ...inital,
        count: inital.count + 1
      };
    default:
      return state;
  }
}
