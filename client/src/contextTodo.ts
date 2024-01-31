// 1.подтягиваем метод
// import { Action } from '@remix-run/router';
import { type Dispatch, createContext } from 'react';
import type { StateTodo, Action } from './type';
import { initState } from './reducer/reducer';

// 2.начальное состояние
export type StateContext = {
  state: StateTodo;
  dispatch: Dispatch<Action>;
};

const stateTodo: StateContext = {
  state: initState,
  dispatch: () => {},
};

export const appContext = createContext(stateTodo);
