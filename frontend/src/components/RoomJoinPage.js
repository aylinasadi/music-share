import React, { Component } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";


class RoomJoinPage extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            roomCode: "",
            error: ""
        };

        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
        this.roomButtonPressed = this.roomButtonPressed.bind(this);
    }

    render() {
        return (
            <div className="center-container">
                <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center">
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Typography component='h4' variant='h4' sx={{fontFamily: 'Poppins, sans-serif',
                        textShadow: '0 0 8px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.4)'}}>
                            Join a Room
                    </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: 'center', color: 'white' }}>
                        <TextField
                            error={this.state.error}
                            label="Room Code"
                            placeholder="Enter a Room Code"
                            value={this.state.roomCode}
                            helperText={this.state.error}
                            variant="outlined"
                            onChange={this.handleTextFieldChange}
                            inputProps={{ style: { color: 'white', fontFamily: 'Poppins, sans-serif' } }}
                            sx={{'& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: 'white' },
                                '&:hover fieldset': { borderColor: 'white' },
                                '& .MuiInputLabel-root': { color: 'white' },
                                '& .MuiInputBase-input': { color: 'white' },
                                },
                                '& .MuiInputLabel-root': { color: 'white', fontFamily: 'Poppins, sans-serif' },
                                '& .MuiInputBase-input': { color: 'white', fontFamily: 'Poppins, sans-serif' },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: 'center', color: 'white' }}>
                            <Button variant="contained" onClick={ this.roomButtonPressed } sx={{
                                backgroundColor: '#8e24aa',
                                '&:hover': { backgroundColor: '#6a1b9a' },
                                animation: 'buttonGlow 5s linear infinite',}}>
                                Enter Room
                            </Button>
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: 'center', color: 'white' }}>
                            <Button  variant="contained" component={Link} to="/" sx={{
                                backgroundColor: '#424242',
                                '&:hover': { backgroundColor: '#212121' },}}>
                                Back
                            </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }

    handleTextFieldChange(e) {
        this.setState({
            roomCode: e.target.value
        });
    }

    roomButtonPressed() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                code: this.state.roomCode
            }),
        };

        fetch("/api/join-room", requestOptions).then((response) => {
            if (response.ok) {
                this.props.navigate("/room/" + this.state.roomCode);
            } else {
                this.setState({ error: "Room Not Found." });
            }
        }).catch((error) => {
            console.error("Error:", error);
            this.setState({ error: "An error occurred while trying to join the room." });
        });
    }
}

export default function RoomJoinPageWrapper() {
    const navigate = useNavigate();
    return <RoomJoinPage navigate={navigate} />;
}