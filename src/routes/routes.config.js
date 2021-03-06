import React from 'react';
import lazy from '@loadable/component';
import { Redirect } from 'react-router';
import SuspenseComponent from './SuspenseComponent';

const suspense = {
  fallback: <SuspenseComponent />,
};

// 布局组件
const BasicLayout = lazy(() => import('../layout/BasicLayout'), suspense);
const SecurityLayout = lazy(() => import('../layout/SecurityLayout'), suspense);

// 业务页面
const Home = lazy(() => import('../pages/Home/Home'), suspense);
const List = lazy(() => import('../pages/List/List'), suspense);
const Canvas = lazy(() => import('@pages/Canvas/canvas'), suspense);
const Error = lazy(() => import('../pages/404'), suspense);

export const menuRouters = [
  {
    path: '/',
    exact: true,
    hidden: true,
    render: () => <Redirect to="/home" />,
  },
  {
    path: '/home',
    name: '工作台',
    component: Home,
  },
  {
    path: '/list',
    name: '列表',
    component: List,
  },
  {
    path: '/canvas',
    name: 'Canvas',
    component: Canvas,
  },
  {
    hidden: true,
    component: Error,
  },
];

const rootRoutes = [
  {
    component: BasicLayout,
    routes: [
      {
        component: SecurityLayout,
        routes: menuRouters,
      },
    ],
  },
];

export default rootRoutes;
