import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { RootState } from '@/stores';

interface IProps extends ConnectedProps<typeof connector> {}
const Home: FC<IProps> = (props) => {
  console.log(props);
  return <div>Home Component</div>;
};

const mapStateToProps = ({ global }: { global: RootState }) => ({
  global,
});
const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  dispatch,
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Home);
