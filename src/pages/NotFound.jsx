import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate();

    return (
        <div className='flex flex-col gap-4 justify-center items-center mt-10'>
            <h1 className='text-3xl'>404 - Page Not Found</h1>
            <Button variant="contained" color="primary" onClick={() => navigate("/")}>Back to Home</Button>
        </div>
    )
}

export default NotFound
