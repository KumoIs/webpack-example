import React from 'react';
import {hot, setConfig} from 'react-hot-loader';
import {ConnectedRouter} from 'connected-react-router';
import AppRouter from './routes';

const App = () => (
  <ConnectedRouter>
    <AppRouter />
  </ConnectedRouter>
);

setConfig({
  showReactDomPatchNotification: false,
});
export default hot(module)(App);
