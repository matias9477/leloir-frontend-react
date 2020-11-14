import React from 'react'
import { PieChart, Pie, Legend, Tooltip,  } from 'recharts';
import './LandingPages.css';
import { Header } from 'semantic-ui-react'


const Charts = () => {

    const data =[
        {name: "Analisis de meo", value: 200},
        {name: "analisis de merca", value:100},
        {name: "analisis de meo de perro", value:52},

        {name: "analisis de meo de gato", value:12},
    ]

    return (
        <div className="pie-charts">
        <Header as='h3' dividing>Grafiquinho du pie</Header>
            <PieChart width={400} height={400}>
            <Pie dataKey="value" isAnimationActive={true} data={data} cx={200} cy={200} outerRadius={80} fill="#067ebf" label />
            <Tooltip />
            </PieChart>
        </div>
    )
}

export default Charts;