import React, { FC } from 'react';

interface IProps {}
const userLayout: FC<IProps> = (props) => (
  <div>
    <div>Header</div>
    <div>-------------------------- 这是一个登录框</div>
    <div>{props.children}</div>
  </div>
);

export default userLayout;
