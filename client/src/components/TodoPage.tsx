import React, { useState } from 'react';
import './TodoPage.css';
import type { TodoTypeObj } from '../type';
import TodoItem from './TodoItem';

const TodoPage = ({
  onHandleAddToDo,
  onHandleRemoveToDo,
  todo,
  setTodo,
  // setIsChecked,
  // isChecked,
}: {
  onHandleAddToDo: (value: TodoTypeObj) => void;
  onHandleRemoveToDo: (value: TodoTypeObj) => void;
  todo: TodoTypeObj[];
  setTodo: (value: TodoTypeObj[]) => void;
  // setIsChecked: (value: boolean) => void;
  // isChecked: boolean;
}): JSX.Element => {
  //интпут
  const [valueInput, setValueInput] = useState<string>('');

  // функция которая достает мз инпутов значение, а затем передает это значение в функцию
  const onHandleAddToDoServer: React.FormEventHandler<HTMLFormElement> = async (
    e,
  ): Promise<void> => {
    e.preventDefault();
    const res = await fetch('/api/todo', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        description: valueInput,
        check: false,
      }),
    });
    const data: { todo: TodoTypeObj } = (await res.json()) as { todo: TodoTypeObj };
    // функция которая добавляет на страницу добавленный обьект
    onHandleAddToDo(data.todoItem);
  };

  return (
    <>
      <h3>Todo List</h3>
      <div className="container">
        <form action="" className="form" onSubmit={onHandleAddToDoServer}>
          <div className="add-btn">
            <input value={valueInput} type="text" onChange={(e) => setValueInput(e.target.value)} />
            <button type="text">Add</button>
          </div>
        </form>
        <div className="todoList">
          {todo.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              onHandleRemoveToDo={onHandleRemoveToDo}
              setTodo={setTodo}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default TodoPage;
