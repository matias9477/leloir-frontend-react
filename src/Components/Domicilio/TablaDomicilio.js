import React from 'react';
import { connect } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

import NavBar from '../NavBar/NavBar';
import { getDomiciliosAction } from '../../Redux/domiciliosDuck';
import { urlAddDomicilio, urlConsultaDomicilio } from '../../Constants/NavUrl';
import Tabla from '../Reusables/Tabla/Tabla';
import './../styles.css';

const columns = [
    {
        dataField: 'fecha',
        text: 'Fecha',
        type: 'Date'
    },
    {
        dataField: 'direccion',
        text: 'Dirección',
    },
    {
        dataField: 'descripcion',
        text: 'Descripción',
    },
    {
        dataField: 'nombrePaciente',
        text: 'Paciente',
    }
];

class TablaDomicilio extends React.Component {

    componentDidMount(){
        this.props.getDomiciliosAction()
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
                            data={this.props.domicilios}
                            param='idDomicilio'
                            urlAdd={urlAddDomicilio}
                            buttonTitleAdd='Nuevo Domicilio'
                            columns={columns}
                            title='Domicilios'
                            path={urlConsultaDomicilio}
                            options={true}
                            switchAlta={true}
                        />
                    </div>
                }

            </div>
        )
    }
}

const mapStateToProps = state =>({
    fetching: state.domicilios.fetching,
    domicilios: state.domicilios.domicilios
})


export default connect(mapStateToProps,{getDomiciliosAction})(TablaDomicilio)


