import React, { Component } from 'react';
import { connect } from 'react-redux';
import SyncLoader from "react-spinners/SyncLoader"
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import { getPatientHistoryAction } from './../../Redux/patientsDuck'
import './../styles.css'
import MenuOpciones from '../MenuOpciones'


class Historial extends Component {


    componentDidMount() {
        this.props.getPatientHistoryAction(this.props.match.params.id)
    }

    renderComponent() {
        return <div>
            culo
        </div>

    }

    renderTable = (historial) =>(
        historial!==''  ?
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Pendiente</Table.HeaderCell>
                    <Table.HeaderCell>Determinaciones</Table.HeaderCell>
                    <Table.HeaderCell>Estado</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {historial.map((analisis, index) => (
                    <Table.Row key={index}>
                        <Table.Cell>
                            {analisis.idAnalisis}
                        </Table.Cell>
                        <Table.Cell>
                            {analisis.diasPendiente}
                        </Table.Cell>
                        <Table.Cell>
                            {analisis.determinaciones !== undefined ? analisis.determinaciones.map((deter)=>(
                                <li>{deter}</li>
                            )) : null}
                            {console.log(JSON.stringify(historial.determinaciones))}
                        </Table.Cell>
                        <Table.Cell>
                            {analisis.estadoAnalisis}
                        </Table.Cell>
                    </Table.Row>
                )

                )}
            </Table.Body>
        </Table>
        : <div> No se encontraron analisis para este paciente</div>
    )


    render() {
        const { fetching } = this.props
        return (
            <div className='union'>
                {/* <MenuOpciones /> */}
                <div className='historialPaciente'>
                    {fetching ?  <div className='tablaListadoHistorico'>
                        <SyncLoader
                        size={10}
                        margin={5}
                        color={"black"}
                        loading={fetching}
                        />
                        </div> : this.renderTable(this.props.history)}
                </div>
                
            </div>
        );
    }
}



function mapStateToProps(state) {
    return {
        fetching: state.patients.fetching,
        history: state.patients.history,

    };
}
export default connect(
    mapStateToProps,{ getPatientHistoryAction }
)(Historial);