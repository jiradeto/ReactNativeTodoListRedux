import { RENDER_LIST, TASK_FILTER_TYPE } from '../actions/type';

const INITIAL_STATE = {
  tasks: [],
  filter: TASK_FILTER_TYPE.FILTER_ALL
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RENDER_LIST:
      return {
        ...state,
        tasks: action.payload.tasks,
        filter: action.payload.filter
      };
    default:
      return state;
  }
};
