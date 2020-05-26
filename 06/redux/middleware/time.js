export function time(store) {
  return function (dispatch) {
    return function (action) {
      console.log('time');
      dispatch(action);
      console.log('time2');
    };
  };
}
