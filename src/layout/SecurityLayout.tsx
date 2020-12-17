import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { Layout, Header, Middle, Side, Main, Footer } from './styled';

interface IProps {
  route: RouteConfig;
}
const SecurityLayout: FC<IProps> = (props) => {
  return (
    <Layout>
      <Header>header</Header>
      <Main>
        <Middle>
          <div className="content">{renderRoutes(props.route.routes)}</div>
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
