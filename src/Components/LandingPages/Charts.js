import React, { Component } from 'react';
import { Header } from 'semantic-ui-react'
import { PieChart, Pie, Tooltip } from 'recharts';
import ClipLoader from 'react-spinners/ClipLoader';
import { connect } from 'react-redux';

import { getRankingAction } from '../../Redux/reportesDuck';
import './LandingPages.css';




    //name:descripcion_practica, value: count

class Charts extends Component {

    componentDidMount() {
        this.props.getRankingAction();
    }

    render(){
        const { fetching } = this.props;
        return (
            <div className="chart">

                <Header as='h3' dividing>Gráfico estadístico de determinaciones mas pedidas por semana</Header>
                    <div className="pie-charts">
                                <div>
                                {   fetching ? 
                                        <div className='spinner'>
                                            <ClipLoader
                                                size={60}
                                                color={'black'}/>
                                        </div>
                                        :
                                        
                                        <div>
                                            <PieChart width={400} height={400}>
                                                <Pie dataKey="value" isAnimationActive={true} data={this.props.ranking} cx={200} cy={200} outerRadius={80} fill="#067ebf" label />
                                                <Tooltip />
                                            </PieChart>
                                        </div>                
                                }
                                </div>      
                    </div>
            </div>
        )
}
}

const mapStateToProps = (state) => ({
    ranking: state.reportes.ranking,
    fetching: state.reportes.fetching,
})

export default connect(mapStateToProps, { getRankingAction })(Charts);