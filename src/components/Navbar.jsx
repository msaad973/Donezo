import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
export default function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }} >
                    Donezo
                </Typography>
                <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
            </Toolbar>
        </AppBar>
    )
}
