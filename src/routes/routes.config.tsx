import React from 'react';
import lazy, { LoadableLibrary } from '@loadable/component';
import { Redirect } from 'react-router';
import { RouteConfig } from 'react-router-config';
import SuspenseComponent from './SuspenseComponent';

const suspense: LoadableLibrary<any> = {
  fallback: SuspenseComponent,
};

const Home = lazy(() => import('@pages/Home/Home'), suspense);
const List = lazy(() => import('@pages/List/List'), suspense);
const Error = lazy(() => import('@pages/404'), suspense);
const BasicLayout = lazy(() => import('../layout/BasicLayout'), suspense);
const SecurityLayout = lazy(() => import('../layout/SecurityLayout'), suspense);

const routers: RouteConfig[] = [
  {
    component: BasicLayout,
    routes: [
      {
        component: SecurityLayout,
        routes: [
          {
            path: '/',
            exact: true,
            hidden: true,
            render: () => <Redirect to="home" />,
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
            component: Error,
          },
        ],
      },
    ],
  },
];

export default routers;
