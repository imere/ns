export function combineReducers(reducers) {
  return function (state = {}, action) {
    const nextState = {};
    for (const [key, reducer] of Object.entries(reducers)) {
      nextState[key] = reducer(state[key], action);
    }
    return nextState;
  };
}
