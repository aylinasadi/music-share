import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import RoomWrapper from "./Room";
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";


class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: null
        };

        this.clearRoomCode = this.clearRoomCode.bind(this);
    }

    async componentDidMount() {
        fetch('/api/user-in-room')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    roomCode: data.code
                });
            });
    }

    renderHomePage() {
        return (
            <div className="center-container">
            <Grid container spacing={3} direction="column" justifyContent="center" alignItems="center">
                <Grid item xs={12} sx={{ textAlign: 'center', color: 'white' }}>
                    <Typography variant="h3" component="h3" sx={{
                        fontFamily: 'Bangers, cursive',
                        fontSize: '4rem',
                        textShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.6), 0 0 60px rgba(255,255,255,0.4)',
                        animation: 'hueShift 5s linear infinite'}}>
                        ⋆♪˚Music Share˚♬⋆
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontFamily: 'Poppins, sans-serif !important', color: 'white', mt: 1 }}>
                        Share your favorite music with friends and discover new tunes together!
                    </Typography>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'center'}}>
                    <ButtonGroup disableElevation variant="contained">
                        <Button to='/join' component={ Link } sx={{
                            backgroundColor: '#8e24aa',
                            '&:hover': { backgroundColor: '#6a1b9a' },
                            animation: 'buttonGlow 5s linear infinite',
                            fontFamily: 'Poppins, sans-serif'}}>
                            Join a Room
                        </Button>
                        <Button to='/create' component={ Link } sx={{
                            backgroundColor: '#e91e63',
                            '&:hover': { backgroundColor: '#c2185b' },
                            animation: 'buttonGlow 5s linear infinite',
                            fontFamily: 'Poppins, sans-serif'}}>
                            Create a Room
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
            </div>
        );
    }

    clearRoomCode() {
        this.setState({roomCode: null})
    }

    render() {
        const { roomCode } = this.props;
        const { votesToSkip, guestCanPause, isHost } = this.state;
        return (
            <Router>
            <div className="center-container">
                <Grid container spacing={1} direction="column" justifyContent="center" alignItems="center">
                    <Routes>
                        <Route path="/" element={this.state.roomCode ?
                            <Navigate to={"/room/" + this.state.roomCode} /> : this.renderHomePage() }/>
                        <Route path="/join" element={<RoomJoinPage />} />
                        <Route path="/create" element={<CreateRoomPage />} />
                        <Route
                            path="/room/:roomCode"
                            element={<RoomWrapper leaveRoomCallback={this.clearRoomCode} />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </Grid>
            </div>
            </Router>
        );
    }
}

export default HomePage;