import React from 'react';
import { Menu } from 'antd';

import { useDispatch } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { menuRouters } from '@routes/routes.config';
import { push } from 'connected-react-router';
import { Layout, Header, Side, Main, Footer } from './styled';

const SecurityLayout = (props) => {
  const {
    route: { routes },
  } = props;
  const dispatch = useDispatch();

  const renderMenuItem = menuRouters.map((item) => {
    if (item.hidden) return false;
    return (
      <Menu.Item key={item.path} name={item.name}>
        {item.name}
      </Menu.Item>
    );
  });

  const handleMenuClick = ({ item, key }) => {
    dispatch(push(key));
    document.title = item.props.name;
  };

  return (
    <Layout>
      <Header>header</Header>
      <Side>
        <Menu onClick={handleMenuClick}>{renderMenuItem}</Menu>
      </Side>
      <Main>{renderRoutes(routes)}</Main>
      <Footer>footer</Footer>
    </Layout>
  );
};

export default SecurityLayout;
