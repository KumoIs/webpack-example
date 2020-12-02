import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

const Home = (props) => {
  useEffect(() => {
    console.table('asdasd');
    props.dispatch({
      type: 'global/test',
    });
    props.dispatch(
      push({
        pathname: '/list',
        search: 'sadsad=asdaskodjo&asd=asdasd',
        query: {
          name: '123',
          dd: '1q23123',
        },
      })
    );
  }, []);
  return <div>Home Component</div>;
};

export default connect(({ global, router }) => ({
  global,
  router,
  push,
}))(Home);
