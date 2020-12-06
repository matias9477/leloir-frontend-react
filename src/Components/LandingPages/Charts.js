import React, { Component } from 'react';
import { Header } from 'semantic-ui-react'
import { PieChart, Pie, Tooltip } from 'recharts';
import ClipLoader from 'react-spinners/ClipLoader';
import { connect } from 'react-redux';

import { getRankingAction } from '../../Redux/reportesDuck';
import './LandingPages.css';


    const data =[
        {name: "Analisis de orina", value: 200},
        {name: "Glucemia", value:100},
        {name: "analisis genérico", value:52},

        {name: "analisis generico 2", value:12},
    ]

class Charts extends Component {

    componentDidMount() {
        this.props.getRankingAction();
    }

    render(){
        const { fetching } = this.props;
        return (
        <div className="pie-charts">
            <Header as='h3' dividing>Gráficos estadísticos de determinaciones mas pedidas</Header>
            {   fetching ? 
                    <div className='spinner'>
                        <ClipLoader
                            size={60}
                            color={'black'}/>
                    </div>
                    :
                    
                    <div>
                        <PieChart width={400} height={400}>
                            <Pie dataKey="value" isAnimationActive={true} data={data} cx={200} cy={200} outerRadius={80} fill="#067ebf" label />
                            <Tooltip />
                        </PieChart>
                    </div>                
            }
            
        </div>
        )
}
}

const mapStateToProps = (state) => ({
    ranking: state.reportes.ranking,
    fetching: state.reportes.fetching,
})

export default connect(mapStateToProps, { getRankingAction })(Charts);