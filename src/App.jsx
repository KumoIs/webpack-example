import React from 'react';
import { hot, setConfig } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './store/dva.config';
import AppRouter from './routes';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppRouter />
    </ConnectedRouter>
  </Provider>
);

setConfig({
  showReactDomPatchNotification: false,
});
export default hot(module)(App);
