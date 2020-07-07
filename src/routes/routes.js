import React from 'react';
import lazy from '@loadable/component';
import { Redirect } from "react-router";

const SuspenseComponent = props => {
  return (
    <div>
      loading...
    </div>
  )
}

const suspense = {
  callback: <SuspenseComponent />
}

const Home = lazy(() => import("@pages/Home/home"), suspense);
const List = lazy(() => import("../pages/List/list"), suspense);
const Error = lazy(() => import("../pages/404"), suspense);
const BasicLayout = lazy(() => import("../layout/BasicLayout"), suspense);
const SecurityLayout = lazy(() => import("../layout/SecurityLayout"), suspense);


export default [
  {
    component: BasicLayout,
    path: '/',
    routes: [
      {
        component: SecurityLayout,
        path: '/',
        routes: [
          {
            path: '/',
            exact: true,
            hidden: true,
            render: () => <Redirect to="/home"/>
          },
          {
            path: '/home',
            name: '工作台',
            component: Home,
          },
          {
            path: '/list',
            name: '列表',
            component: List
          },
          {
            component: Error
          }
        ]
      }
    ]
  }
];