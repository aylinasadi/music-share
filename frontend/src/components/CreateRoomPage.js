import React, { Component } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { Link, useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Collapse } from "@mui/material";
import Alert from "@mui/material/Alert";
import { motion } from "framer-motion";



class CreateRoomPage extends Component {
    static defaultProps = {
        votesToSkip: 2,
        guestCanPause: true,
        update: false,
        roomCode: null,
        updateCallback: () => {}
    };

    constructor(props) {
        super(props);
        this.state = {
            guestCanPause: this.props.guestCanPause,
            votesToSkip: this.props.votesToSkip,
            errorMsg: "",
            successMsg: "" 
        };

        this.handleVotesChange = this.handleVotesChange.bind(this);
        this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
        this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
        this.handleUpdateButtonPressed = this.handleUpdateButtonPressed.bind(this);
    }

    handleVotesChange(e) {
        this.setState({
            votesToSkip: e.target.value
        });
    }

    handleGuestCanPauseChange(e) { 
        this.setState({
            guestCanPause: e.target.value === "true" ? true : false
        });
    }

    handleRoomButtonPressed() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause
            }),
        };
        fetch("/api/create-room", requestOptions)
            .then((response) => response.json())
            .then((data) => this.props.navigate("/room/" + data.code));
    }

    handleUpdateButtonPressed() {
        const requestOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause,
                code: this.props.roomCode
            }),
        };
        fetch("/api/update-room", requestOptions)
        .then((response) => {
            if (response.ok) {
                this.setState({ successMsg: "Room updated successfully!" });
                setTimeout(() => {
                    this.setState({ successMsg: "" });
                }, 5000);
            } else {
                this.setState({ errorMsg: "Error updating room..." });
                setTimeout(() => {
                    this.setState({ errorMsg: "" });
                }, 5000);
            }

            this.props.updateCallback();
        });
    }


    renderCreateButton() {
        return (
                <React.Fragment>
                <Grid item xs={12} sx={{ textAlign: 'center', color: 'white' }}>
                    <Button variant="contained" onClick={this.handleRoomButtonPressed} sx={{
                        backgroundColor: '#e91e63',
                        '&:hover': { backgroundColor: '#c2185b' },
                        animation: 'buttonGlow 5s linear infinite',}}>
                        Create A Room
                    </Button>
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: 'center', color: 'white' }}>
                    <Button variant="contained" component={Link} to="/" sx={{
                        backgroundColor: '#424242',
                        '&:hover': { backgroundColor: '#212121' },}}>
                        Back
                    </Button>
                </Grid>
                </React.Fragment>
        );
    }

    renderUpdateButton() {
        return (
                <Grid item xs={12} sx={{ textAlign: 'center', color: 'white' }}>
                    <Button variant="contained" onClick={this.handleUpdateButtonPressed} sx={{
                        backgroundColor: '#8e24aa',
                        '&:hover': { backgroundColor: '#6a1b9a' } }}>
                        Update Room
                    </Button>
                </Grid>
        );
    }


    render() {
        const title= this.props.update ? "Update Room" : "Create a Room";
        const content = (
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}>
                <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center">
                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                            <div>
                            <Collapse in={this.state.errorMsg != "" || this.state.successMsg != ""}>
                                {this.state.successMsg != "" ? (
                                <Alert
                                    severity="success"
                                    sx={{ backgroundColor: '#1b5e20', color: 'white', '& .MuiAlert-icon': { color: 'white' } }}
                                    onClose={() => this.setState({ successMsg: "" })}
                                >
                                    {this.state.successMsg}
                                </Alert>
                                ) : (
                                <Alert
                                    severity="error"
                                    sx={{ backgroundColor: '#b71c1c', color: 'white', '& .MuiAlert-icon': { color: 'white' } }}
                                    onClose={() => this.setState({ errorMsg: "" })}
                                >
                                    {this.state.errorMsg}
                                </Alert>
                                )}
                            </Collapse>
                            </div>
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                            <Typography component='h4' variant='h4' sx={{fontFamily: 'Poppins, sans-serif',
                                textShadow: '0 0 8px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.4)'}}>
                                {title}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: 'center', color: 'white' }}>
                            <FormControl component="fieldset">
                                <FormHelperText sx={{ textAlign: 'center', color: 'white', fontFamily: 'Poppins, sans-serif' }}>
                                    Guest Control of Playback State
                                </FormHelperText>
                                <RadioGroup
                                row
                                defaultValue={this.props.guestCanPause.toString()}
                                onChange={this.handleGuestCanPauseChange}
                                >
                                    <FormControlLabel value="true" control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }} />}
                                        label="Play/Pause"
                                        labelPlacement="bottom"
                                        sx={{ color: 'white' }}
                                        componentsProps={{ typography: { sx: { fontFamily: 'Poppins, sans-serif', color: 'white' } } }}
                                    />
                                    <FormControlLabel value="false" control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }} />}
                                        label="No Control"
                                        labelPlacement="bottom"
                                        sx={{ color: 'white' }}
                                        componentsProps={{ typography: { sx: { fontFamily: 'Poppins, sans-serif', color: 'white' } } }}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: 'center', color: 'white' }}>
                            <FormControl>
                                <TextField
                                    required={true}
                                    type="number"
                                    onChange={this.handleVotesChange}
                                    defaultValue={this.state.votesToSkip}
                                    inputProps={{ min: 1,
                                    style: { textAlign: 'center', color: 'white' } }}
                                    sx={{'& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: 'white' },
                                        '&:hover fieldset': { borderColor: 'white' },},
                                    input: { color: 'white' }}}
                                    />
                                <FormHelperText sx={{ textAlign: 'center', color: 'white', fontFamily: 'Poppins, sans-serif' }}>
                                    Votes Required To Skip Song
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        {this.props.update
                        ? this.renderUpdateButton()
                        : this.renderCreateButton()}
                    </Grid>
                </motion.div>
        )

        return this.props.update ? content : <div className="center-container">{content}</div>;
    }
}

export default function CreateRoomPageWrapper(props) {
    const navigate = useNavigate();
    return <CreateRoomPage {...props} navigate={navigate} />;
}