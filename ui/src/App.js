import React from 'react';
import './App.css';
import axios from 'axios';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
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
        axios.get("/api/recent")
            .then(res => {
                this.setState({
                    data: res.data
                });
            });
    }

    render() {
        console.log(this.state)
        return (
            <ResponsiveContainer width="100%" height={500}>
            <LineChart width={1000} height={500} data={this.state.data}
                       margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis type="number" dataKey="created" domain={['dataMin - 30000', 'dataMax + 30000']} tickFormatter={formatXAxis}/>
                <YAxis type="number" domain={['dataMin - 3', 'dataMax + 3']} />
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip labelFormatter={formatXAxis}/>
                <Legend/>
                <Line type="monotone" dataKey="temperatureOutside" name="Outside C" stroke="#8884d8" activeDot={{r: 8}}/>
                <Line type="monotone" dataKey="temperatureInside" name="Inside C" stroke="#82ca9d"/>
            </LineChart>
            </ResponsiveContainer>
        );
    }
}

export default App;
