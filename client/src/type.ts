export type TodoTypeObj = {
  id: number;
  description: string;
  check: boolean;
};

export type StateTodo = {
  todo: TodoTypeObj[];
};

export type StateItem = {
  item: TodoTypeObj;
};

export type Action =
  | { type: 'load/todo'; payload: TodoTypeObj[] }
  | { type: 'add/todo'; payload: TodoTypeObj }
  | { type: 'delete/todo'; payload: TodoTypeObj }
  | { type: 'put/todo'; payload: TodoTypeObj };
