import React, { useState, useContext } from 'react';
import './TodoPage.css';
import TodoItem from './TodoItem';
import { appContext } from '../contextTodo';
import type { TodoTypeObj } from '../type';

const TodoPage = (): JSX.Element => {
  // интпут
  const [valueInput, setValueInput] = useState<string>('');

  // из контекста достаем массив с данными
  const { dispatch } = useContext(appContext);
  const { state } = useContext(appContext);

  const onHandleAddToDoServer: React.FormEventHandler<HTMLFormElement> = (e): void => {
    e.preventDefault();
    fetch('/api/todo', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        description: valueInput,
        check: false,
      }),
    })
      .then((res) => res.json())
      .then((data: { todoItem: TodoTypeObj }) => {
        console.log(data.todoItem);
        dispatch({ type: 'add/todo', payload: data.todoItem });
      })
      .catch(console.log);
  };

  return (
    <>
      <h3>Todo List</h3>
      <div className="container">
        <form action="" className="form" onSubmit={onHandleAddToDoServer}>
          <div className="add-btn">
            <input value={valueInput} type="text" onChange={(e) => setValueInput(e.target.value)} />
            <button type="submit">Add</button>
          </div>
        </form>
        <div className="todoList">
          {state.todo.map((item) => (
            <TodoItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TodoPage;
