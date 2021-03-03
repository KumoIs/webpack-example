import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import qs from 'qs';
import dayjs from 'dayjs';

const Index = (props) => {
  useEffect(() => {
    console.log(dayjs().format('YYYY-MM-DD'), dayjs().add(1, 'month').format('YYYY-MM-DD'));
    console.log(qs.parse(props.location.search, { ignoreQueryPrefix: true }));
    console.log(props)
  }, []);
  return <div>List</div>;
};

export default connect(
  (store) => ({
    store,
  }),
  null
)(Index);
