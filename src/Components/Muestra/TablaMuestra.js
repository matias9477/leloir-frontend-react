import React from 'react';
import { connect } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

import NavBar from '../NavBar/NavBar';
import Tabla from '../Reusables/Tabla/Tabla';
import { getMuestrasAction } from '../../Redux/muestrasDuck';
import { urlConsultaMuestras } from '../../Constants/NavUrl';


const columns = [
    {
        dataField: 'paciente',
        text: 'Paciente',
    },
    {
        dataField: 'analisisId',
        text: 'Análisis ID',
    },
    {
        dataField: 'tipoMuestra',
        text: 'Tipo',
    },
    {
        dataField: 'estado',
        text: 'Estado',
    }
];


class TablaMuestras extends React.Component {

    componentDidMount(){
        this.props.getMuestrasAction()
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
                            data={this.props.muestras}
                            param={'idMuestra'}
                            columns={columns}
                            title='Muestras'
                            options={true}
                            path={urlConsultaMuestras}
                        />
                    </div>
                }

            </div>
        )
    }

}
const mapStateToProps = state => ({
    fetching: state.muestras.fetching,
    muestras: state.muestras.muestras
})

export default connect(mapStateToProps, { getMuestrasAction })(TablaMuestras)
