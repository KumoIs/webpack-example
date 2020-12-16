import React from 'react';
import { hot, setConfig } from 'react-hot-loader';
import { HashRouter } from 'react-router-dom';
import AppRouter from './routes';

const App = () => (
  <HashRouter>
    <AppRouter />
  </HashRouter>
);

setConfig({
  showReactDomPatchNotification: false,
});
export default hot(module)(App);
