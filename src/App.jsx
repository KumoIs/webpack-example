import React from 'react';
import { hot } from 'react-hot-loader';
import {HashRouter, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';

import routes from './routes/routes';
import store from "@store";

const App = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          {renderRoutes(routes)}
        </Switch>
      </HashRouter>
    </Provider>
  )
}

export default hot(module)(App)