import { Effect, Model, SubscriptionsMapObject } from 'dva-core-ts';
import { Reducer } from 'redux';

export const namespace = 'global';
export interface GlobalState {
  list: [];
}
interface GlobalModel extends Model {
  namespace: typeof namespace;
  state: GlobalState;
  effects: {
    fetchSelect: Effect,
  };
  reducers: {
    setState: Reducer<GlobalState>,
  };
  subscriptions: SubscriptionsMapObject;
}

const initialState: GlobalState = {
  list: [],
};
const globalModel: GlobalModel = {
  namespace,
  state: initialState,
  effects: {
    *fetchSelect(_, { select }) {
      yield console.log(select);
    },
  },
  reducers: {
    setState: (state = initialState, { payload }) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
  subscriptions: {},
};

export default globalModel;
