export default {
  namespace: 'global',
  state: {
    list: ['1', '2'],
  },
  reducers: {
    setState(state, action) {
    // 保存数据到 state
      console.log(state, action);
      return {
        ...state,
      };
    },
  },
  effects: {
    * test(_, { put, select }) {
      const state = yield select((store) => store);
      yield put({
        type: 'setState',
      });
      console.log(state);
    },
  },
  subscriptions: {
    setup(action, done) {
      console.log(action, done);
    },
  },
};
