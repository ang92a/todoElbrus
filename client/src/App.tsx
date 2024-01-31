import React, { useState, useEffect, useReducer, useMemo } from 'react';
import type { TodoTypeObj } from './type';

import './App.css';
import TodoPage from './components/TodoPage';
import { appContext as AppContext } from './contextTodo';
import { reducer, initState } from './reducer/reducer';

function App(): JSX.Element {
  // переключать страницы
  const [page, setPage] = useState<number>(1);

  // обьект c массивом данных
  const [state, dispatch] = useReducer(reducer, initState);

  const loadTodo = async (): Promise<void> => {
    const res = await fetch('/api');
    const data: { todoDate: TodoTypeObj[] } = (await res.json()) as { todoDate: TodoTypeObj[] };
    dispatch({ type: 'load/todo', payload: data.todoDate });
  };

  useEffect(() => {
    loadTodo().catch(console.log);
  }, []);

  const stateContext = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <AppContext.Provider value={stateContext}>
      <div className="App">
        {page === 0 && (
          <>
            <h2>Elbrus Bootcamp</h2>
            <h1>Vite + React</h1>
            <div className="card">
              <button type="button" onClick={() => setPage(1)}>
                ToDo
              </button>
            </div>
          </>
        )}
        {page === 1 && (
          <>
            <TodoPage />
            <button type="button" onClick={() => setPage(0)}>
              Main
            </button>
          </>
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;
