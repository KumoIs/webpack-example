import React, { lazy, Suspense } from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import RouterConfig from './routes/index';

const App = props => {
  return (
    <Router>
      <RouterConfig />
    </Router>
  )
}

export default App