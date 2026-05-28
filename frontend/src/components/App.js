import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './HomePage';
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div className="center-container">
            <HomePage />
            </div>
        );
    }
}

const appDiv = document.getElementById('app');
createRoot(appDiv).render(<App />);