export default function combineReducers(reducerMap) {
  const keys = Object.keys(reducerMap);

  return (state, action) => {
    let nextState = {};
    keys.forEach(k => {
      const currentReducer = reducerMap[k];
      nextState[k] = currentReducer(state && state[k], action);
    });

    return nextState;
  };
}
