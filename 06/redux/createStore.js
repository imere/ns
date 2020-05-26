export function createStore(reducer, initialState = {}, newCreateStore) {
  if (newCreateStore) {
    return newCreateStore(createStore)(reducer, initialState);
  }
  let state = initialState;
  const listeners = [];
  function getState() {
    return state;
  }
  function subscribe(listener) {
    listeners.push(listener);
  }
  function dispatch(action) {
    state = reducer(state, action);
    for (const listener of listeners) {
      listener();
    }
  }
  
  return {
    getState,
    subscribe,
    dispatch
  };
}
