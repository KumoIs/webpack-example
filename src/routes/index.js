import React from 'react';
import lazy from '@loadable/component';
import { Route, Switch, Redirect } from 'react-router-dom';

const SuspenseComponent = props => {
  console.log(props)
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
const UserLayout = lazy(() => import("../layout/UserLayout"), suspense);



const Index = () => {
  return (
    <Switch>
      <Route path='/user' render={() => {
        return localStorage.getItem('key')
          ? (
            <Redirect to='/list' />
          )
          : (
            <UserLayout>
              <Route exact path='/user' component={Home}>
              </Route>
            </UserLayout>
          )
      }} />

      <Route path='/' render={() => {
        return localStorage.getItem('key')
          ? (
            <BasicLayout>
              <SecurityLayout>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route path='/list' component={List} />
                  <Route component={Error} />
                </Switch>
              </SecurityLayout>
            </BasicLayout>
          ) : (
            <Redirect to='/user' />
          )
      }} />
      <Route component={Error} />
    </Switch>
  )
}

export default Index