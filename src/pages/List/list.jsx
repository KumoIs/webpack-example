import React from 'react';
import { connect } from 'react-redux';

const Index = (props) => {
  console.log(props);
  return (
    <div>List</div>
  );
};

export default connect((store) => ({
  store,
}), null)(Index);
