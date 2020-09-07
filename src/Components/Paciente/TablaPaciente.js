import React from 'react';
import { connect } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

import NavBar from '../NavBar/NavBar';
import { urlAddPaciente } from '../../Constants/NavUrl';
import Tabla from '../Reusables/Tabla/Tabla'
import { urlConsultaPacientes } from '../../Constants/NavUrl';
import { getPatientsAction } from '../../Redux/patientsDuck';
import './patientsStyle.css';

const columns = [
    {
        dataField: 'id',
        text: 'Número',
    },
    {
        dataField: 'fechaAlta',
        text: 'Fecha Alta',
    },
    {
        dataField: 'tipoPaciente',
        text: 'Tipo',
        type: 'icon',
    },
    {
        dataField: 'nombre',
        text: 'Paciente',
    },
    {
        dataField: 'nroDocumento',
        text: 'Documento',
    }
];


class TablaPacientes extends React.Component {

    componentDidMount(){
        this.props.getPatientsAction()
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
                            data={this.props.patients}
                            param='id'
                            urlAdd={urlAddPaciente}
                            buttonTitleAdd='Nuevo Paciente'
                            columns={columns}
                            title='Pacientes'
                            options={true}
                            path={urlConsultaPacientes}
                            dataConsulta={"tipoPaciente"}
                        />
                    </div>
                }

            </div>
        )
    }

}
const mapStateToProps = state => ({
    fetching: state.patients.fetching,
    patients: state.patients.patients,
})

export default connect(mapStateToProps, { getPatientsAction })(TablaPacientes)