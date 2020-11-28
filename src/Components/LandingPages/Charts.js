import React from 'react'
import { PieChart, Pie, Tooltip } from 'recharts';
import './LandingPages.css';
import { Header } from 'semantic-ui-react'


const Charts = () => {

    const data =[
        {name: "Analisis de orina", value: 200},
        {name: "Glucemia", value:100},
        {name: "analisis genérico", value:52},

        {name: "analisis generico 2", value:12},
    ]

    return (
        <div className="pie-charts">
            <Header as='h3' dividing>Gráficos estadísticos de determinaciones mas pedidas</Header>
                <PieChart width={400} height={400}>
                    <Pie dataKey="value" isAnimationActive={true} data={data} cx={200} cy={200} outerRadius={80} fill="#067ebf" label />
                    <Tooltip />
                </PieChart>
        </div>
    )
}

export default Charts;