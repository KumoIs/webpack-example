import React from 'react';
import { hot, setConfig } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { rootRoutes } from '@routes/routes.config';
import { renderRoutes } from 'react-router-config';
import store, { history } from './store/dva.config';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <ConnectedRouter history={history}>{renderRoutes(rootRoutes)}</ConnectedRouter>
    </BrowserRouter>
  </Provider>
);

setConfig({
  showReactDomPatchNotification: false,
});
export default hot(module)(App);
