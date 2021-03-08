import React from 'react';
import { renderRoutes } from 'react-router-config';

const Canvas = ({ route }) => {
  return <div>{renderRoutes(route.routes)}</div>;
};

export default Canvas;
