import React from 'react';
import lazyComponent from '@loadable/component';
import { Redirect } from 'react-router';
import SuspenseComponent from './SuspenseComponent';

const suspense = {
  fallback: <SuspenseComponent />,
};

const lazy = (imp) => lazyComponent(() => imp, suspense);

// 布局组件
const BasicLayout = lazy(import('../layout/BasicLayout'));
const SecurityLayout = lazy(import('../layout/SecurityLayout'));

// 业务页面
const Home = lazy(import('../pages/Home/Home'));
const List = lazy(import('../pages/List/List'));
const Canvas = lazy(import('@pages/Canvas/Canvas'));
const CanvasLineToBeginPath = lazy(import('@pages/Canvas/Canvas_lineTo_beginPath'));
const CanvasRect = lazy(import('@pages/Canvas/Canvas_Rect'));

const Error = lazy(import('../pages/404'));

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
    routes: [
      {
        path: '/canvas/Canvas_lineTo_beginPath',
        name: 'Canvas_lineTo_beginPath',
        component: CanvasLineToBeginPath,
      },
      {
        path: '/canvas/CanvasRect',
        name: 'CanvasRect',
        component: CanvasRect,
      },
    ],
  },
  {
    hidden: true,
    component: Error,
  },
];

export const rootRoutes = [
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
