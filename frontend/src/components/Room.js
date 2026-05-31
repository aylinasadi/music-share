import React, { Component } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Button, Typography, CircularProgress } from "@mui/material";
import CreateRoomPageWrapper from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";
import { motion } from "framer-motion";



class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
            showSettings: false,
            spotifyAuthenticated: false, 
            song: {},
            loading: true,
            queue: [],
            guestCount: 0,
        };
        this.roomCode = this.props.roomCode;
        this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
        this.updateShowSettings = this.updateShowSettings.bind(this);
        this.renderSettingsButton = this.renderSettingsButton.bind(this);
        this.renderSettings = this.renderSettings.bind(this);
        this.getRoomDetails = this.getRoomDetails.bind(this);
        this.authenticateSpotify = this.authenticateSpotify.bind(this);
        this.getCurrentSong = this.getCurrentSong.bind(this);
        this.getQueue = this.getQueue.bind(this);
    }

    componentDidMount() {
        this.getRoomDetails();
        this.interval = setInterval(this.getCurrentSong, 1000);
        this.getQueue();
        this.queueInterval = setInterval(this.getQueue, 10000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
        clearInterval(this.queueInterval);
    }

    getRoomDetails() {
        fetch('/api/get-room' + '?code=' + this.props.roomCode)
            .then((response) => {
                if (!response.ok) {
                    this.props.navigate('/');
                    return null;
                }
                return response.json();
            })
            .then((data) => {
                if (!data) return;
                this.setState({
                    votesToSkip: data.votes_to_skip,
                    guestCanPause: data.guest_can_pause,
                    isHost: data.is_host,
                    loading: false,
                    guestCount: data.guest_count,
                }, () => {
                    if (this.state.isHost) {
                        this.authenticateSpotify();
                    }
                });
            });
    }

    authenticateSpotify(){
        fetch('/spotify/is-authenticated')
        .then((response) => response.json())
        .then((data) => {
            this.setState({ spotifyAuthenticated: data.status });
            if (!data.status) {
                fetch('/spotify/get-auth-url')
                .then((response) => response.json())
                .then((data) => {
                    window.location.replace(data.url);
                });
            }
        });
    }

    getQueue() {
        console.log('fetching queue...');
        fetch('/spotify/queue')
            .then((response) => {
                if (!response.ok) return null;
                return response.json();
            })
            .then((data) => {
                if (!data) return;
                this.setState({ queue: data });
            });
    }

    getCurrentSong() {
        fetch('/spotify/current-song')
            .then((response) => {
                if (!response.ok) {
                    return null;
                }
                return response.json();
            })
            .then((data) => {
                if (!data) return;
                this.setState({ song: data });
            });
    }

    leaveButtonPressed() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('/api/leave-room', requestOptions).then((_response) => {
            this.props.leaveRoomCallback();
            this.props.navigate('/');
        });
    }

    updateShowSettings(value) {
        this.setState({
            showSettings: value
        });
    }

    renderSettings() {
        return (
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}>
                <div className="center-container">
                <CreateRoomPageWrapper
                    update={true}
                    votesToSkip={this.state.votesToSkip}
                    guestCanPause={this.state.guestCanPause}
                    roomCode={this.roomCode}
                    updateCallback={this.getRoomDetails}
                />
                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <Button variant="contained" onClick={() => this.updateShowSettings(false)} sx={{
                        backgroundColor: '#424242',
                        '&:hover': { backgroundColor: '#212121' },}}>
                        Close
                    </Button>
                </div>
                </div>
            </motion.div>
        )
    }

    renderSettingsButton() {
        return (
            <Grid container spacing={1} direction="column" justifyContent="center" alignItems="center">
            <Grid item xs={12} sx={{ textAlign: 'center', color: 'white' }}>
                <Button variant="contained" onClick={() => this.updateShowSettings(true)} sx={{
                    backgroundColor: '#263238',
                    '&:hover': { backgroundColor: '#37474f' },}}>
                    Settings
                </Button>
            </Grid>
            </Grid>
        );
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="center-container">
                    <CircularProgress sx={{ color: 'white' }} />
                </div>
            );
        }

        if (this.state.showSettings) {
            return this.renderSettings();
        }

        const { roomCode } = this.props;
        const { votesToSkip, guestCanPause, isHost } = this.state;

        return (
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}>
                <Grid container spacing={1} direction="column" justifyContent="center" alignItems="center">
                    <Grid item xs={12} sx={{ textAlign: 'center', color: 'white' }}>
                        <Typography variant="h4" component="h4" sx={{ fontFamily: 'Poppins, sans-serif',
                            textShadow: '0 0 8px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.4)' }}>
                            Room Code: <span className="glow-text">{roomCode}</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: 'center', color: 'white' }}>
                        <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                            Guests: {this.state.guestCount}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: 'center', color: 'white' }}>
                    <Typography variant="h6" component="h6" sx={{ fontFamily: 'Poppins, sans-serif'}}>
                            Votes To Skip: {votesToSkip}
                        </Typography>
                    </Grid>
                    {Object.keys(this.state.song).length > 0 ?
                        <MusicPlayer 
                        {...this.state.song}
                        votesToSkip={this.state.votesToSkip}
                        queue={this.state.queue}
                        /> :
                        <MusicPlayer 
                        title="No Song Playing"
                        artists="Open Spotify and play something!"
                        album_cover="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                        progress={0}
                        duration={1}
                        is_playing={false}
                        votes={0}
                        votesToSkip={this.state.votesToSkip}
                        />}
                    {this.state.isHost ? this.renderSettingsButton() : null}
                    <Grid item xs={12} sx={{ textAlign: 'center', color: 'white' }}>
                        <Button variant="contained" onClick={ this.leaveButtonPressed } sx={{
                            backgroundColor: '#8e0000',
                            '&:hover': { backgroundColor: '#c62828' },}}>
                            Leave Room
                        </Button>
                    </Grid>
                </Grid>
            </motion.div>
        );
    }
}

export default function RoomWrapper({leaveRoomCallback}) {
    const { roomCode } = useParams();
    const navigate = useNavigate();
    return (<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
    <Room roomCode={roomCode} navigate={navigate} leaveRoomCallback={leaveRoomCallback} />
    </div>);
}