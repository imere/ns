function compose (...fns) {

  if (!fns) {

    return (arg) => arg;

  }

  if (fns.length === 1) {

    return fns[0];

  }

  return fns.reduce((a, b) => (...args) => a(b(...args)));

}

export function applyMiddleware(...middlewares) {
  return function (oldCreateStore) {
    return function newCreateStore(state, action) {
      const store = oldCreateStore(state, action);
      const chian = middlewares.map((middleware) => middleware(store));
      const dispatch = compose(...chian)(store.dispatch);
      store.dispatch = dispatch;
      return store;
    };
  };
}
