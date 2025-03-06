import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import EditTask from "./pages/EditTask";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { Counter } from "./pages/Counter";

function App() {
  const [tasks, setTasks] = useState([]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/count" element={<Counter />} />
        <Route path="/edit/:index" element={<EditTask tasks={tasks} setTasks={setTasks} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;