import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Stack, Typography } from "@mui/material";

export default function EditTask({ tasks, setTasks }) {
    const { index } = useParams(); // Get task index from URL
    const navigate = useNavigate();
    const taskIndex = parseInt(index); // Convert index to number

    // State for editing task
    const [taskData, setTaskData] = useState({
        name: "",
        description: "",
        dueDate: "",
        priority: "",
    });

    // Load task data when component mounts
    useEffect(() => {
        if (tasks && tasks[taskIndex]) {
            setTaskData(tasks[taskIndex]); // Load task data
        }
    }, [taskIndex, tasks]);

    // Handle input changes
    const handleChange = (e) => {
        setTaskData({ ...taskData, [e.target.name]: e.target.value });
    };

    // Save updated task
    const saveTask = () => {
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex] = taskData; // Update task at specific index
        setTasks(updatedTasks);
        navigate("/"); // Redirect back to home
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" textAlign="center" gutterBottom>
                Edit Task
            </Typography>

            <Stack spacing={2}>
                <TextField
                    label="Task Name"
                    name="name"
                    variant="outlined"
                    fullWidth
                    value={taskData.name}
                    onChange={handleChange}
                />
                <TextField
                    label="Description"
                    name="description"
                    variant="outlined"
                    fullWidth
                    value={taskData.description}
                    onChange={handleChange}
                />
                <TextField
                    label="Due Date"
                    type="date"
                    name="dueDate"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={taskData.dueDate}
                    onChange={handleChange}
                />
                <TextField
                    label="Priority"
                    name="priority"
                    variant="outlined"
                    fullWidth
                    value={taskData.priority}
                    onChange={handleChange}
                />
                <Button variant="contained" color="primary" onClick={saveTask}>
                    Save Changes
                </Button>
            </Stack>
        </Container>
    );
}
