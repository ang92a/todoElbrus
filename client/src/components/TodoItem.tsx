import React, { useContext } from 'react';
import type { TodoTypeObj } from '../type';
import './TodoPage.css';
import { appContext } from '../contextTodo';

const TodoItem = ({ item }: { item: TodoTypeObj }): JSX.Element => {
  const { dispatch } = useContext(appContext);

  const onHandleRemoveToDo = (value: TodoTypeObj): void => {
    fetch(`/api/${value.id}`, {
      method: 'Delete',
    })
      .then((res) => res.json())
      .then((data: { obj: TodoTypeObj }) => dispatch({ type: 'delete/todo', payload: data.obj }))
      .catch(console.log);
  };

  // функция которая меняет чекбокс
  const onHandleCheckboxChange = (): void => {
    // Отправка запроса на сервер для обновления состояния задачи
    fetch(`/api/todo/${item.id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        check: !item.check, // Отправляем противоположное текущему состояние чекбокса
      }),
    })
      .then((res) => res.json())
      .then((data: { resObj: TodoTypeObj }) => {
        dispatch({ type: 'put/todo', payload: data.resObj });
      })
      .catch(console.log);
  };

  return (
    <div className="task">
      <input type="checkbox" checked={item.check} onChange={onHandleCheckboxChange} />
      {item.check ? <s>{item.description}</s> : <p>{item.description}</p>}
      <button type="button" onClick={() => onHandleRemoveToDo(item)}>
        удалить
      </button>
      <br />
    </div>
  );
};

export default TodoItem;
