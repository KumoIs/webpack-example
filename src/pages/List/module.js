const namespace = 'list';

export const type = {
  UPD: `${namespace}/UPD`,
};

const defaultState = {
  list: '测试 redux',
};

function list(state = defaultState, action) {
  switch (action.type) {
    case type.UPD:
      return {
        ...state,
        list: action.data,
      };
    default:
      return state;
  }
}

export default list;

export const listAction = {
  upd: (data) => ({
    type: type.UPD,
    data,
  }),
};
