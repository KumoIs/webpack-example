import React from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';

const Layout = ({ route }: { route: RouteConfig }): JSX.Element => <>{renderRoutes(route.routes)}</>;

export default Layout;
