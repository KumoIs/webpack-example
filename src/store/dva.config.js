import { create } from 'dva-core';
import createLoading from 'dva-loading';
import { createHashHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';

import models from './index';

export const history = createHashHistory();

const app = create({
  extraReducers: {
    router: connectRouter(history),
  },
  onAction: routerMiddleware(history),
});

models.forEach((model) => app.model(model));

app.use(createLoading());
app.start();

export default app._store;
