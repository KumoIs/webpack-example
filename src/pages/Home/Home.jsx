import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

const Home = (props) => {
  useEffect(() => {
    props.dispatch({
      type: 'global/test',
    });
  }, []);
  return (
    <div>

      <div onClick={() => props.dispatch(
        push({
          pathname: '/list',
          search: 'sadsad=asdaskodjo&asd=asdasd',
          query: {
            name: '123',
            dd: '1q23123',
          },
        })
      )}>
        跳转List页面
      </div>
    </div>
  );
};

export default connect(({ global, router }) => ({
  global,
  router,
  push,
}))(Home);
