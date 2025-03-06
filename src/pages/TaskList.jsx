import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, toggleTaskCompletion } from "../redux/slices/taskSlice";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Typography, Checkbox, Stack, MenuItem, Select } from "@mui/material";

function TaskList() {
    const tasks = useSelector((state) => state.tasks.tasks); // ✅ Fix: Access the correct state structure
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filter, setFilter] = useState("All");

    const filteredTasks = tasks.filter((task) => {
        if (filter === "Completed") return task.completed;
        if (filter === "Incomplete") return !task.completed;
        return true;
    });

    return (
        <div style={{ padding: 20 }}>
            <h2>Task Manager</h2>
            <Button variant="contained" color="primary" onClick={() => navigate("/add")}>
                Add New Task
            </Button>

            <Select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ marginLeft: 10 }}>
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Incomplete">Incomplete</MenuItem>
            </Select>

            <Stack spacing={2} style={{ marginTop: 20 }}>
                {filteredTasks.map((task) => (
                    <Card key={task.id}>
                        <CardContent>
                            <Checkbox checked={task.completed} onChange={() => dispatch(toggleTaskCompletion(task.id))} />
                            <Typography variant="h6" style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                                {task.title}
                            </Typography>
                            <Button onClick={() => navigate(`/task/${task.id}`)}>View</Button>
                            <Button color="secondary" onClick={() => navigate(`/edit/${task.id}`)}>Edit</Button>
                            <Button color="error" onClick={() => dispatch(deleteTask(task.id))}>Delete</Button>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </div>
    );
}

export default TaskList;
