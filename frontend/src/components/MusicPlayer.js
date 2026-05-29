import React, { Component } from "react";
import { Grid, Typography, Card, IconButton, LinearProgress } from "@mui/material";
import { PlayArrow, Pause, SkipNext } from "@mui/icons-material";



class MusicPlayer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const songProgress = (this.props.progress / this.props.duration) * 100;

        return (
        <Card>
            <Grid container spacing={1} direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={4} sx={{ textAlign: 'center', color: 'white' }}>
                <img src={this.props.album_cover} height="100%" width="100%" />
            </Grid>
            <Grid item xs={8} sx={{ textAlign: 'center', color: 'white' }}>
                <Typography variant="h5" component="h5">
                    {this.props.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    {this.props.artists}
                </Typography>
                <div>
                    <IconButton onClick={this.props.is_playing ? this.props.pauseSong : this.props.playSong}>
                        {this.props.is_playing ? <Pause /> : <PlayArrow />}
                    </IconButton>
                    <IconButton onClick={this.props.skipSong}>
                        <SkipNext />
                        <Typography variant="subtitle1" component="span">
                            {this.props.votes} / {this.props.votes_required}
                        </Typography>
                    </IconButton>
                </div>
            </Grid>
            </Grid>
            <LinearProgress variant="determinate" value={songProgress} />
        </Card>
        );
    }
}

export default MusicPlayer;