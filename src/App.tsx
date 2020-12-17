import React from 'react';
import { hot, setConfig } from 'react-hot-loader';
import { HashRouter } from 'react-router-dom';
import AppRouter from './routes';

import { Provider } from 'react-redux';
import store from '@config/dva.config';

const App = () => (
  <Provider store={store}>
    <HashRouter>
      <AppRouter />
    </HashRouter>
  </Provider>
);

setConfig({
  showReactDomPatchNotification: false,
});
export default hot(module)(App);
