import React, { useState, useEffect } from 'react';
import type { TodoTypeObj } from './type';

import './App.css';
import TodoPage from './components/TodoPage';

function App(): JSX.Element {
  //переключать страницы
  const [page, setPage] = useState<number>(1);
  // обьект c массивом данных
  const [todo, setTodo] = useState<TodoTypeObj[]>([]);

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setTodo(data.todoDate);
      });
  }, []);

  //добавление нового обьекта в массив
  const onHandleAddToDo = (value: TodoTypeObj): void => {
    setTodo((prev) => [...prev, value]);
  };

  //удаление обьекта из массива, приходит обьект
  const onHandleRemoveToDo = (value: TodoTypeObj): void => {
    fetch(`/api/${value.id}`, {
      method: 'Delete',
    })
      .then((res) => res.json())
      .then((data) => setTodo((prev) => prev.filter((el) => el.id !== value.id)));
  };

  return (
    <div className="App">
      {page === 0 && (
        <>
          <h2>Elbrus Bootcamp</h2>
          <h1>Vite + React</h1>
          <div className="card">
            <button onClick={() => setPage(1)}>ToDo</button>
          </div>
        </>
      )}
      {page === 1 && (
        <>
          <TodoPage
            onHandleAddToDo={onHandleAddToDo}
            todo={todo}
            onHandleRemoveToDo={onHandleRemoveToDo}
            setTodo={setTodo}
            // setIsChecked={setIsChecked}
            // isChecked={isChecked}
          />
          <button onClick={() => setPage(0)}>Main</button>
        </>
      )}
    </div>
  );
}

export default App;
