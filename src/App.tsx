import React from 'react';
import {Routes, Route} from 'react-router-dom';
import TodoList from "./components/TodoList";
import Login from "./components/Login";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<TodoList />}/>
        <Route path="login" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
