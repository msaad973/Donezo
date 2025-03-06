import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    TextField,
    Button,
    Checkbox,
    Card,
    CardContent,
    Typography,
    IconButton,
    Stack,
    Container,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Task({ }) {
    const [taskData, setTaskData] = useState({ name: "", description: "", dueDate: "", priority: "" });
    const [filter, setFilter] = useState("All");
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);

    // Add Task
    const addTask = () => {
        if (!taskData.name.trim()) return;
        setTasks([...tasks, { ...taskData, completed: false }]);
        setTaskData({ name: "", description: "", dueDate: "", priority: "" });
    };

    // Toggle Task Completion
    const toggleTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    };

    // Delete Task
    const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    // Navigate to Edit Page
    const editTask = (index) => {
        navigate(`/edit/${index}`);
    };

    // Filter Tasks
    const filteredTasks = tasks.filter((task) => {
        if (filter === "Completed Tasks") return task.completed;
        if (filter === "Incomplete Tasks") return !task.completed;

        return true;
    });

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" textAlign="center" gutterBottom>
                Add Task
            </Typography>

            {/* Task Input */}
            <Stack spacing={2} mb={2}>
                <TextField label="Task Name" variant="outlined" fullWidth value={taskData.name} onChange={(e) => setTaskData({ ...taskData, name: e.target.value })} />
                <TextField label="Description" variant="outlined" fullWidth value={taskData.description} onChange={(e) => setTaskData({ ...taskData, description: e.target.value })} />
                <TextField label="Due Date" type="date" variant="outlined" fullWidth InputLabelProps={{ shrink: true }} value={taskData.dueDate} onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })} />
                <TextField label="Priority" variant="outlined" fullWidth value={taskData.priority} onChange={(e) => setTaskData({ ...taskData, priority: e.target.value })} />
                <Button variant="contained" color="primary" onClick={addTask}>Add</Button>
            </Stack>

            {/* Filter Buttons */}
            <Stack direction="row" spacing={2} justifyContent="center" mb={2}>
                {["All", "Completed", "Incomplete"].map((status) => (
                    <Button key={status} variant={filter === status ? "contained" : "outlined"} onClick={() => setFilter(status)}>
                        {status}
                    </Button>
                ))}
            </Stack>

            {/* Task List */}
            <Stack spacing={2}>
                {filteredTasks.map((task, index) => (
                    <Card key={index} sx={{ display: "flex", alignItems: "center", p: 1 }}>
                        <Checkbox checked={task.completed} onChange={() => toggleTask(index)} />
                        <CardContent sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ textDecoration: task.completed ? "line-through" : "none" }}>{task.name}</Typography>
                            <Typography variant="body2">{task.description}</Typography>
                            <Typography variant="body2">Due: {task.dueDate}</Typography>
                            <Typography variant="body2">Priority: {task.priority}</Typography>
                        </CardContent>
                        <IconButton color="primary" onClick={() => editTask(index)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => deleteTask(index)}>
                            <DeleteIcon />
                        </IconButton>
                    </Card>
                ))}
            </Stack>
        </Container>
    );
}
