import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Button, Box, Card, CardContent } from "@mui/material";
import Navbar from "../components/Navbar";

function TaskDetails() {
  const { id } = useParams();
  const task = useSelector((state) => state.tasks.tasks.find((t) => t.id === Number(id)));
  const navigate = useNavigate();

  if (!task) return (
    <div className='flex flex-col gap-4 justify-center items-center mt-10'>
      <h1 className='text-3xl'>Task Not Found</h1>
      <Button variant="contained" color="primary" onClick  ={() => navigate("/")}>Back to Home</Button>
    </div>
  );

  return (
    <Box>
      {/* Navbar Component */}
      <Navbar />

      {/* Task Details in Card */}
      <Box display="flex" justifyContent="center" mt={10}>
        <Card sx={{ width: 500, p: 3, boxShadow: 3 }}>
          <CardContent>
            <h2 className="text-2xl text-center mb-5">Task Details</h2>
            <Typography variant="h6" gutterBottom>
              <strong>Title:</strong> {task.title}
            </Typography>
            <Typography variant="h6">
              <strong>Description:</strong> {task.description}
            </Typography>
            <div className="mt-6">
              <Button variant="contained" color="primary" onClick={() => navigate("/")}>Back</Button>
            </div>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default TaskDetails;
