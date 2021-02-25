import React from 'react';
import lazy, { LoadableLibrary } from '@loadable/component';
import { Redirect } from 'react-router';
import { RouteConfig } from 'react-router-config';
import Loading '../routes/Loading';

const lazyOptions: LoadableLibrary<any> = {
  fallback: Loading,
};

const Home = lazy(() => import('@pages/Home/Home'), lazyOptions);
const List = lazy(() => import('@pages/List/List'), lazyOptions);
const Error = lazy(() => import('@pages/404'), lazyOptions);
const BasicLayout = lazy(() => import('@layout/BasicLayout'), lazyOptions);
const SecurityLayout = lazy(() => import('@layout/SecurityLayout'), lazyOptions);

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
