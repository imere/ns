export function countReducer(state = { count:0 }, action) {
  switch (action.type) {
  case 'add':
    return {
      ...state,
      count: state.count + 1
    };
  default: {
    return state;
  }
  }
}
