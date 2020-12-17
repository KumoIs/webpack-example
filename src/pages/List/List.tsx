import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores';

interface IProps {}
const List: FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const globalModel = useSelector((models: RootState) => models.global);

  console.log(globalModel);
  return <div>List component</div>;
};

export default List;
