import React from "react";
import { Routes, Route } from "react-router-dom";
import TaskList from "./pages/TaskList";
import TaskForm from "./pages/TaskForm";
import TaskDetails from "./pages/TaskDetails";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TaskList />} />
      <Route path="/add" element={<TaskForm />} />
      <Route path="/edit/:id" element={<TaskForm />} />
      <Route path="/task/:id" element={<TaskDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
