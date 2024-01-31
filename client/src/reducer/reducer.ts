import { StateTodo, Action } from '../type';

export const initState: StateTodo = {
  todo: [],
};

export const reducer = (state: StateTodo, action: Action): StateTodo => {
  switch (action.type) {
    case 'load/todo':
      return {
        ...state,
        todo: action.payload,
      };
    case 'add/todo':
      return {
        ...state,
        todo: [...state.todo, action.payload],
      };
    case 'delete/todo':
      return {
        ...state,
        todo: state.todo.filter((el) => el.id !== action.payload.id),
      };
    case 'put/todo':
      return {
        ...state,
        todo: [
          ...state.todo.map((el) =>
            el.id === action.payload.id ? { ...el, check: !el.check } : el,
          ),
        ],
      };
    default:
      return state;
  }
};
