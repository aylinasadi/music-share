import React, { Component } from "react";
import { Grid, Typography, Card, IconButton, LinearProgress } from "@mui/material";
import { PlayArrow, Pause, SkipNext } from "@mui/icons-material";



class MusicPlayer extends Component {
    constructor(props) {
        super(props);

        this.pauseSong = this.pauseSong.bind(this);
        this.playSong = this.playSong.bind(this);
        this.skipSong = this.skipSong.bind(this);
    }

    pauseSong() {
        const requestOptions = {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
        };
        fetch("/spotify/pause", requestOptions);
    }

    playSong() {
        const requestOptions = {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
        };
        fetch("/spotify/play", requestOptions);
    }

    skipSong() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json"},
        };
        fetch('/spotify/skip', requestOptions);
    }

    render() {
        const songProgress = (this.props.progress / this.props.duration) * 100;

        return (
            <Card sx={{ backgroundColor: '#1e1e1e', color: 'white', width: '400px' }}>
            <img src={this.props.album_cover} width="100%" style={{ display: 'block' }}/>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
                <Typography variant="h6" sx={{ color: 'white', textAlign: 'center' }}>
                    {this.props.title}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: 'grey', mb: 1, textAlign: 'center' }}>
                    {this.props.artists}
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconButton sx={{ color: 'white' }} onClick={this.props.is_playing ? this.pauseSong : this.playSong}>
                        {this.props.is_playing ? <Pause /> : <PlayArrow />}
                    </IconButton>
                    <IconButton sx={{ color: 'white' }} onClick={this.skipSong}>
                        <SkipNext />
                    </IconButton>
                    <Typography variant="subtitle1" component="span" sx={{ color: 'white' }}>
                        {this.props.votes} / {this.props.votesToSkip}
                    </Typography>
                </div>
            </div>
            <LinearProgress variant="determinate" value={songProgress} />
        </Card>
        );
    }
}

export default MusicPlayer;