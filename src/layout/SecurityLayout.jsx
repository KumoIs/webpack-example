import React from 'react';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Layout, Header, Middle, Side, Main, Footer } from './styled';

// import './app.less';

const SecurityLayout = (props) => {
  const {
    route: { routes },
  } = props;

  return (
    <Layout>
      <Header>header</Header>
      <Main>
        <Middle>
          <div className="content">{renderRoutes(routes)}</div>
        </Middle>
        <Side>
          <ul>
            <li>
              <Link to="/">首页</Link>
              <Link to="/list">列表</Link>
            </li>
          </ul>
        </Side>
      </Main>
      <Footer>footer</Footer>
    </Layout>
  );
};

export default SecurityLayout;
