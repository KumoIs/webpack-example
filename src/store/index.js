import { createStore, applyMiddleware, compose } from 'redux';

import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReduces from "@store/rootReduces";

// 启动插件
const composeEnhancers = typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose

const middlewares = [
  thunkMiddleware,
  createLogger()
];

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

const store = createStore(rootReduces, enhancer);
export default store;