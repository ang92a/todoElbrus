import React, { useState } from 'react';
import type { TodoTypeObj } from '../type';
import './TodoPage.css';

const TodoItem = ({
  item,
  onHandleRemoveToDo,
  setTodo,
}: {
  item: TodoTypeObj;
  onHandleRemoveToDo: (value: TodoTypeObj) => void;
  setTodo: (value: TodoTypeObj[]) => void;
}) => {
  //функция которая меняет чекбокс
  const onHandleCheckboxChange = () => {
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
      .then((data) => {
        setTodo((prev) =>
          [...prev].map((el) => (el.id === data.resObj.id ? { ...el, check: !el.check } : el)),
        );
      })
      .catch((error) => {
        console.error('Error updating todo:', error);
      });
  };

  return (
    <div className="task">
      <input type="checkbox" checked={item.check} onChange={onHandleCheckboxChange} />
      {item.check ? <s>{item.description}</s> : <p>{item.description}</p>}
      <button onClick={() => onHandleRemoveToDo(item)}>удалить</button>
      <br />
    </div>
  );
};

export default TodoItem;
