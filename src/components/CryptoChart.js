import React, { PureComponent } from 'react';
import {
    BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar,
} from 'recharts';


export default class Example extends PureComponent {
    props;
    constructor(props) {
        super(props);
        this.props = props;

    }



    render() {
        const {chartData} = this.props
        return (
            <BarChart
                width={350}
                height={250}
                data={chartData}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
<Legend/>
                <Bar dataKey="low" fill="#FFA400" background={{ fill: '#eee' }} />
                <Bar dataKey="high" fill="#00068A" />
            </BarChart>
        );
    }
}
