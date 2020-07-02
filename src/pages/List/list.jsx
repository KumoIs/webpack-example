import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import list, { listAction } from "@pages/List/module";

const List = props => {
  const [i , setI] = useState(0)
  useEffect(() => {
    setI((cur) => cur + 1);
    setI((cur) => cur + 1);
    setI((cur) => cur + 1);
    console.log(i)
  }, [])
  console.log(i)
  return (
    <div>
      {props.list.list}
      <button onClick={() => props.updList('333333')}>修改</button>
    </div>
  )
}

const mapStateToProps = ({ list }) => ({
  list
})

const mapDispatchToProps = dispatch => ({
  updList(data) {
    dispatch(listAction.upd(data))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(List)