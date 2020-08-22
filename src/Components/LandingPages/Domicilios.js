import React, { Component } from 'react';
import { Table, Header } from 'semantic-ui-react'
import { getDomiciliosAction } from '../../Redux/domiciliosDuck'
import { connect } from 'react-redux';
import './domicilios.css';


const domicilios = [
    { idDomicilio: 1, direccion: "1472 Mcguire Point", descripcion: 'la casa del viejo puto', paciente: 'alberto fernandez', fecha: "mañana culia" },
    { idDomicilio: 2, direccion: "calle falsa 123", descripcion: 'la casa del homerillo', paciente: 'null', fecha: "mañana culia" },
    { idDomicilio: 3, direccion: "calle falsa 1234", descripcion: 'la casa de nisman', paciente: null, fecha: "mañana culia" },
    { idDomicilio: 3, direccion: "calle falsa 1234", descripcion: 'la casa de nisman', paciente: null, fecha: "mañana culia" },
    { idDomicilio: 3, direccion: "calle falsa 1234", descripcion: null, paciente: null, fecha: "mañana culia" },
    { idDomicilio: 3, direccion: "calle falsa 1234", descripcion: null, paciente: null, fecha: "mañana culia" },
    { idDomicilio: 3, direccion: "calle falsa 1234", descripcion: null, paciente: null, fecha: "mañana culia" },
    { idDomicilio: 3, direccion: "calle falsa 1234", descripcion: null, paciente: null, fecha: "mañana culia" },
    { idDomicilio: 3, direccion: "calle falsa 1234", descripcion: null, paciente: null, fecha: "mañana culia" },
    { idDomicilio: 3, direccion: "calle falsa 1234", descripcion: null, paciente: null, fecha: "mañana culia" },
    { idDomicilio: 3, direccion: "calle falsa 1234", descripcion: null, paciente: null, fecha: "mañana culia" },
    { idDomicilio: 3, direccion: "calle falsa 1234", descripcion: null, paciente: null, fecha: "mañana culia" },
    { idDomicilio: 3, direccion: "calle falsa 1234", descripcion: null, paciente: null, fecha: "mañana culia" },
]

class Domicilios extends Component {

    componentDidMount() {
        this.props.getDomiciliosAction()
    }

    getDomiciliosDeManana = (domicilios) =>{
        return domicilios
    }

    createDomicilio = (domicilio) =>{
        return <Table.Row>
                    <Table.Cell>{domicilio.direccion}}</Table.Cell>
                    <Table.Cell>{domicilio.descripcion ? domicilio.descripcion : 'No disponible'}</Table.Cell>
                    <Table.Cell>{domicilio.paciente ? domicilio.paciente : 'No registrado'}</Table.Cell>
                </Table.Row>
    }



    render() {
        const { fetching } = this.props
        var listDomicilios = domicilios.map(this.createDomicilio)
        return (
            <div className='Domicilios'>
                <Header as='h3'>Domicilios del día</Header>
                <Table color="blue" key="blue">
                    <Table.Header>
                        <Table.Row>
                        <Table.HeaderCell>Dirección</Table.HeaderCell>
                        <Table.HeaderCell>Descripción</Table.HeaderCell>
                        <Table.HeaderCell>Paciente</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {listDomicilios}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = state =>({
    fetching: state.domicilios.fetching,
    domicilios: state.domicilios.domicilios
})

export default connect(mapStateToProps, { getDomiciliosAction })(Domicilios)



