export default function createStore(reducer) {
  let currentState;
  const listeners = [];

  const getState = () => {
    return currentState;
  };

  const dispatch = action => {
    currentState = reducer(currentState, action);
    listeners.forEach(f => f());
  };

  const subscribe = listener => {
    listeners.push(listener);
  };

  return {
    getState,
    dispatch,
    subscribe
  };
}
