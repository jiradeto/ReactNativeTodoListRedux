import json from '../todos';
import { RENDER_LIST, TASK_FILTER_TYPE } from './type';

export const filterTask = type => {
  switch (type) {
    case TASK_FILTER_TYPE.FILTER_ALL:
      return renderList(json, type);
      break;
    case TASK_FILTER_TYPE.FILTER_ACTIVE:
      const active_tasks = json.filter(d => {
        return d.completed === false;
      });
      return renderList(active_tasks, type);
      break;
    case TASK_FILTER_TYPE.FILTER_COMPLETE:
      const complete_tasks = json.filter(d => {
        return d.completed === true;
      });
      return renderList(complete_tasks, type);
      break;
  }
};

export const addTask = ({ tasks, text }) => {
  return renderList([
    ...tasks,
    {
      id: tasks.length + 1,
      text: text,
      completed: false
    }
  ]);
};

export const renderList = (
  tasks = json,
  filter = TASK_FILTER_TYPE.FILTER_ALL
) => {
  return {
    type: RENDER_LIST,
    payload: { tasks, filter }
  };
};
