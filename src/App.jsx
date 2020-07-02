import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';

import RouterConfig from './routes/index';
import store from '@store';

const App = props => {
  return (
    <Router>
      <Provider store={store}>
        <RouterConfig />
      </Provider>
    </Router>
  )
}

export default hot(module)(App)