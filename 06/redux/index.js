import createStore from "./createStore.js";
import reducers from "./reducers/index.js";
import combineReducers from "./combineReducers.js";

const store = createStore(combineReducers(reducers));

console.log("init", store.getState());

store.subscribe(() => console.log("current", store.getState()));

store.dispatch({ type: "add" });

store.dispatch({ type: "changeinfo", payload: { info: "new" } });
