export default {
  namespace: 'global',
  state: {
    list: ['1', '2'],
  },
  reducers: {
    setState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {},
  subscriptions: {},
};
