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

    formatTime(ms) {
        const seconds = Math.floor(ms / 1000);
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    render() {
        const songProgress = (this.props.progress / this.props.duration) * 100;

        return (
            <Card sx={{ backgroundColor: '#1e1e1e', color: 'white', width: '350px' }}>
            <img src={this.props.album_cover} width="100%" style={{ display: 'block' }}/>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
                <Typography variant="h6" sx={{ color: 'white', textAlign: 'center', fontFamily: 'Poppins, sans-serif !important' }}>
                    {this.props.title}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: 'grey', mb: 1, textAlign: 'center', fontFamily: 'Poppins, sans-serif !important' }}>
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
                    {this.props.votes} / {this.props.votes_required}
                    </Typography>
                </div>
                </div>
                <LinearProgress 
                    variant="determinate" 
                    value={songProgress} 
                    sx={{
                        '& .MuiLinearProgress-bar': {
                            transition: 'transform 1s linear',
                        },
                        backgroundColor: '#333',
                        '& .MuiLinearProgress-bar1Determinate': {
                            backgroundColor: '#e91e63',
                        }
                    }}/>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 8px 8px 8px' }}>
                    <Typography variant="caption" sx={{ color: 'grey', fontFamily: 'Poppins, sans-serif' }}>
                        {this.formatTime(this.props.progress)}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'grey', fontFamily: 'Poppins, sans-serif' }}>
                        {this.formatTime(this.props.duration)}
                    </Typography>
                </div>
                {this.props.queue && this.props.queue.length > 0 && (
                <Grid item xs={12} sx={{ textAlign: 'center', color: 'white', width: '350px' }}>
                    <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', mb: 1 }}>
                        Up Next
                    </Typography>
                    {this.props.queue.map((song, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                            <img src={song.album_cover} width="40px" height="40px" style={{ borderRadius: '4px' }} />
                            <div style={{ textAlign: 'left' }}>
                                <Typography variant="body2" sx={{ color: 'white', fontFamily: 'Poppins, sans-serif' }}>
                                    {song.title}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'grey', fontFamily: 'Poppins, sans-serif' }}>
                                    {song.artists}
                                </Typography>
                            </div>
                        </div>
                    ))}
                </Grid>
            )}
        </Card>
        );
    }
}

export default MusicPlayer;