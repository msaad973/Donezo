import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, toggleTaskCompletion } from "../redux/slices/taskSlice";
import { useNavigate } from "react-router-dom";
import {
    Button, Card, CardContent, Typography, Checkbox, Stack,
    MenuItem, Select, Container,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from "@mui/material";
import Navbar from "../components/Navbar";


function TaskList() {
    const tasks = useSelector((state) => state.tasks.tasks);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filter, setFilter] = useState("All");
    const [deleteTaskId, setDeleteTaskId] = useState(null);

    const filteredTasks = tasks.filter((task) => {
        if (filter === "Completed") return task.completed;
        if (filter === "Incomplete") return !task.completed;
        return true;
    });

    // Function to handle delete confirmation
    const handleDelete = (id) => {
        setDeleteTaskId(id);
    };

    // Function to confirm deletion
    const handleConfirmDelete = () => {
        if (deleteTaskId !== null) {
            dispatch(deleteTask(deleteTaskId));
            setDeleteTaskId(null); // Close dialog after deleting
        }
    };

    return (
        <>
            {/* Navbar */}
            <Navbar />

            <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
                {/* Add Task Button & Filter */}
                <Stack direction="row" justifyContent="center" spacing={2} sx={{ mb: 2 }}>
                    <Button variant="contained" color="primary" onClick={() => navigate("/add")}>
                        Add New Task
                    </Button>

                    <Select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        variant="outlined"
                        sx={{ minWidth: 150, bgcolor: "white" }}
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Incomplete">Incomplete</MenuItem>
                    </Select>
                </Stack>

                {filteredTasks.length === 0 && (
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        No tasks found!
                    </Typography>
                )}


                {/* Task List */}
                <Stack spacing={2} sx={{ mt: 2 }}>
                    {filteredTasks.map((task) => (
                        <Card key={task.id} sx={{ p: 2 }}>
                            <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <Checkbox
                                    checked={task.completed}
                                    onChange={() => dispatch(toggleTaskCompletion(task.id))}
                                />
                                <Typography variant="h6" sx={{ textDecoration: task.completed ? "line-through" : "none" }}>
                                    {task.title}
                                </Typography>
                                <Stack direction="row" spacing={1}>
                                    <Button variant="outlined" onClick={() => navigate(`/task/${task.id}`)}>
                                        View
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={() => navigate(`/edit/${task.id}`)}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(task.id)}>
                                        Delete
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            </Container>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteTaskId !== null} onClose={() => setDeleteTaskId(null)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this task?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteTaskId(null)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default TaskList;
