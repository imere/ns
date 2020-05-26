export function infoReducer(state = {}, action) {
  switch (action.type) {
  case 'info':
    return {
      ...state,
      info: action.info
    };
  default: {
    return state;
  }
  }
}
