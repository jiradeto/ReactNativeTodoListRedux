import json from '../todos';
import { INITIALIZE_LIST, TASK_FILTER_TYPE } from './type';

export const filterTask = type => {
  console.log('FILTER ->', type);
};

export const initializeList = (tasks = json) => {
  return {
    type: INITIALIZE_LIST,
    payload: tasks
  };
};
