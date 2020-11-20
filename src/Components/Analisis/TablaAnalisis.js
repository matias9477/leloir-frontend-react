import React from 'react';
import { connect } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

import NavBar from '../NavBar/NavBar';
import Tabla from '../Reusables/Tabla/Tabla'
import { urlConsultaAnalisis , urlAddAnalisis} from '../../Constants/NavUrl';
import { getAnalisisAction } from '../../Redux/analisisDuck';
import './analisisStyle.css';

const columns = [
    {
        dataField: 'idAnalisis',
        text: 'Núm'
    },
    {
        dataField: 'createdAt',
        text: 'Fecha',
    },
    {
        dataField: 'paciente',
        text: 'Paciente',
    },
    {
        dataField: 'estadoAnalisis',
        text: 'Estado',
    }
];


class TablaAnalisis extends React.Component {

    componentDidMount(){
        this.props.getAnalisisAction()
    }

    render(){
        const { fetching } = this.props

        return(
            <div>
                <NavBar/>

                {fetching ? <div className='spinner'>
                        <ClipLoader
                            size={60}
                            color={'black'}
                        />
                    </div> :

                    <div>

                        <Tabla
                            data={this.props.analisis}
                            param='idAnalisis'
                            urlAdd={urlAddAnalisis}
                            buttonTitleAdd='Nuevo Análisis'
                            columns={columns}
                            title='Analisis'
                            options={true}
                            path={urlConsultaAnalisis}
                        />
                    </div>
                }

            </div>
        )
    }

}
const mapStateToProps = state => ({
    fetching: state.analisis.fetchingAnalisis,
    analisis: state.analisis.analisisAll
})

export default connect(mapStateToProps, { getAnalisisAction })(TablaAnalisis)