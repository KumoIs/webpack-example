import React  from 'react';
import lazy, { LoadableLibrary } from '@loadable/component';
import { Redirect } from 'react-router';
import { RouteConfig } from 'react-router-config';
import Loading from '../routes/Loading';

const lazyOptions: LoadableLibrary<any> = {
  fallback: Loading,
};

const Home = lazy(() => import('@pages/Home/Home'), lazyOptions);
const List = lazy(() => import('@pages/List/List'), lazyOptions);
const Error = lazy(() => import('@pages/404'), lazyOptions);
const BasicLayout = lazy(() => import('@layout/BasicLayout'), lazyOptions);
const SecurityLayout = lazy(() => import('@layout/SecurityLayout'), lazyOptions);
const UserLayout = lazy(() => import('@layout/UserLayout'), lazyOptions);

export const menuRouter: RouteConfig[] = [
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
]

const rootRouter: RouteConfig[] = [
  {
    component: BasicLayout,
    routes: [
      {
        path: '/user',
        component: UserLayout,
      },
      {
        component: SecurityLayout,
        routes: menuRouter
      },
      {
        component: Error,
      },
    ],
  },
];

export default rootRouter;
