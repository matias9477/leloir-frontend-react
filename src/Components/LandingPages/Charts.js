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
        // const data =[
        //     {"name":"PROTEINAS TOTALES","value":33},
        //     {"name":"URGENCIAS","value":3},
        //     {"name":"ESPERMOGRAMA  STRES TEST","value":3},
        //     {"name":"ANTIGENO PROSTATICO ESPECIFICO TOTAL   -   PSA-T","value":3},
        //     {"name":"CHLAMYDIA PSITACCI  AC. IGG   ANTI-","value":5},
        //     {"name":"ERITROBLASTOS  PORCENTAJE DE","value":3},
        //     {"name":"CHOLERAE VIBRIO  CULTIVO","value":7}
        // ]

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
                                                {/* TODO: acá donde está data={data} debería ir la data que llega desde el store, sería this.props.ranking */}
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