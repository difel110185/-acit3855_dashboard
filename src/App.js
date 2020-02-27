import React, {useEffect, useState} from 'react';
import ball from './ball.svg';
import './App.css';
import axios from 'axios';

function App() {
    const [firstGoalScored, setFirstGoalScored] = useState(undefined);
    const [stats, setStats] = useState(undefined);

    useEffect(() => {
        axios.get('http://localhost:8110/events/nth_goal_reported?position=0').then(response => {
            setFirstGoalScored(response.data);
        })
    }, []);

    const getStats = () => {
        axios.get('http://0.0.0.0:8100/events/stats').then(response => {
            setStats(response.data);
        })
    };

    useEffect(() => {
        setTimeout(getStats, 2000)
    }, [stats]);

    return (
        <div className="App">
            <header className="App-header"><img src={ball} className="App-logo" alt="logo" /></header>

            <h3>Number of goals scored</h3>
            {stats && stats.num_goals_scored}

            <h3>Number of cards received</h3>
            {stats && stats.num_cards_received}

            <h3>First goal scorer</h3>
            {firstGoalScored && firstGoalScored.player}

            <h3>Last updated</h3>
            {stats && stats.updated_timestamp}
        </div>
    );
}

export default App;
