import React, { useState } from "react";
import { Grid, Button, Typography, IconButton } from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";



const pages = {
    JOIN: "pages.join",
    CREATE: "pages.create"
};

export default function Info() {
    const [page, setPage] = useState(pages.JOIN);

    function joinInfo() {
        return (
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}>
                <div style={{ textAlign: 'center', maxWidth: '400px' }}>
                    <Typography variant="h6" sx={{ color: 'white', fontFamily: 'Poppins, sans-serif', mb: 1 }}>
                        Joining a Room
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'white', fontFamily: 'Poppins, sans-serif' }}>
                        To join a room, you need a room code from the host. Enter the code on the Join page and you'll be taken straight to the room. Once inside, you can see what's playing and vote to skip songs!
                    </Typography>
                </div>
            </motion.div>
        );
    }

    function createInfo() {
        return (
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}>
                <div style={{ textAlign: 'center', maxWidth: '400px' }}>
                    <Typography variant="h6" sx={{ color: 'white', fontFamily: 'Poppins, sans-serif', mb: 1 }}>
                        Creating a Room
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'white', fontFamily: 'Poppins, sans-serif' }}>
                        As a host, you create a room and share the code with friends. You can choose how many votes are needed to skip a song, and whether guests can pause and play. Your Spotify will control what everyone hears!
                    </Typography>
                </div>
            </motion.div>
        );
    }

    return ( 
        <div className="center-container">
        <Grid container spacing={1} direction="column" justifyContent="center" alignItems="center">
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Typography component="h4" variant="h4" sx={{fontFamily: 'Bangers, cursive'}}>
                    How does Music Share work?
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    {page === pages.JOIN ? joinInfo() : createInfo()}
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <IconButton sx={{ color: 'white' }} onClick={() => {page === pages.CREATE ? setPage(pages.JOIN) : setPage(pages.CREATE)}}>
                {page === pages.CREATE ? (<NavigateBefore/>) : (<NavigateNext/>)}
                </IconButton>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Button variant="contained" to="/" component={Link} sx={{
                    backgroundColor: '#263238',
                    '&:hover': { backgroundColor: '#37474f' },}}>
                        Back
                </Button>
            </Grid>
        </Grid>
        </div>
    );
}