import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";

function TaskDetails() {
  const { id } = useParams();
  const task = useSelector((state) => state.tasks.tasks.find((t) => t.id === Number(id)));
  const navigate = useNavigate();

  if (!task) return <p>Task not found.</p>;

  return (
    <Box p={2}>
      <Typography variant="h4">{task.title}</Typography>
      <Typography>{task.description}</Typography>
      <Button onClick={() => navigate("/")}>Back</Button>
    </Box>
  );
}

export default TaskDetails;
