import { INITIALIZE_LIST } from '../actions/type';

const INITIAL_STATE = {
  tasks: [],
  filter_type: 'all'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INITIALIZE_LIST:
      return { ...state, tasks: action.payload };
    default:
      return state;
  }
};
