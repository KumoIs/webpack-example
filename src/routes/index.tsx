import { renderRoutes } from 'react-router-config';
import routers from '../config/routes.config';

const AppRouter = (): JSX.Element => renderRoutes(routers);

export default AppRouter;
