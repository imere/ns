export function logger(store) {
  return function (dispatch) {
    return function (action) {
      console.log('logger');
      dispatch(action);
      console.log('logger2');
    };
  };
}
