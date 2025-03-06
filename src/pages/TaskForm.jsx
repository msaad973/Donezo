import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../redux/slices/taskSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField, Box } from "@mui/material";

function TaskForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const task = useSelector((state) => state.tasks.tasks.find((t) => t.id === Number(id)));

  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(editTask({ id: Number(id), title, description, completed: task.completed }));
    } else {
      dispatch(addTask({ title, description }));
    }
    navigate("/");
  };

  return (
    <Box p={2}>
      <h2>{id ? "Edit Task" : "Add Task"}</h2>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} margin="normal" />
        <TextField fullWidth label="Description" value={description} onChange={(e) => setDescription(e.target.value)} margin="normal" multiline />
        <Button type="submit" variant="contained" color="primary">{id ? "Update" : "Save"} Task</Button>
        <Button onClick={() => navigate("/")} color="secondary">Cancel</Button>
      </form>
    </Box>
  );
}

export default TaskForm;
