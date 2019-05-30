import React from 'react';
import './App.css';
import axios from 'axios';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import moment from "moment";


function formatXAxis(tickItem) {
// If using moment.js
    return moment(tickItem).utcOffset(10).format('YYYY-MM-DD HH:mm')
}


class App extends React.Component {

    state = {
        data: []
    }

    componentDidMount() {
        axios.get("http://localhost:3000/api/recent")
            .then(res => {
                this.setState({
                    data: res.data
                });
            });
    }

    render() {
        console.log(this.state)
        return (
            <LineChart width={1000} height={500} data={this.state.data}
                       margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis type="number" dataKey="created" domain={['auto', 'auto']} tickFormatter={formatXAxis}/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="temperatureOutside" stroke="#8884d8" activeDot={{r: 8}}/>
                <Line type="monotone" dataKey="temperatureInside" stroke="#82ca9d"/>
            </LineChart>
        );
    }
}

export default App;
