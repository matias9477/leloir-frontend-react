import React from 'react';
import { connect } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

import NavBar from '../NavBar/NavBar';
import Tabla from '../Reusables/Tabla/Tabla';
import { getMuestrasAction } from '../../Redux/muestrasDuck';


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

                        {/* <Button as= {Link} to='/muestras/add' style={{marginRight: '6em'}}  exact='true' floated='right' icon labelPosition='left' primary size='small'>
                            <Icon name='syringe' /> Nueva Mustra
                        </Button> */}

                        <Tabla
                            data={this.props.muestras}
                            param={'muestraId'}
                            columns={columns}
                            title='Muestras'
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
