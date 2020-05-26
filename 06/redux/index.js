import { createStore } from './createStore.js';
import { combineReducers } from './combineReducers.js';
import { add } from './action/count.js';
import { countReducer } from './reducer/count.js';
import { infoReducer } from './reducer/info.js';
import { logger } from './middleware/logger.js';
import { time } from './middleware/time.js';
import { applyMiddleware } from './applyMiddleware.js';

const reducers = {
  countReducer,
  infoReducer
};

const store = createStore(combineReducers(reducers), {}, applyMiddleware(logger, time));

store.subscribe(() => {
  console.log('listen', store.getState());
});

console.log('state', store.getState());

store.dispatch(add());
