import React from 'react';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import './app.less';

const SecurityLayout = (props) => {
  const {
    router: { routers },
  } = props;

  return (
    <div className="layout">
      <div className="header">header</div>
      <div className="main">
        <div className="middle">
          <div className="content">{renderRoutes(routers)}</div>
        </div>
        <div className="side">
          <ul>
            <li>
              <Link to="/">首页</Link>
              <Link to="/list">列表</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer">footer</div>
    </div>
  );
};

export default SecurityLayout;
