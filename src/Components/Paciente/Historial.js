import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon, Table, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { getPatientHistoryAction } from './../../Redux/patientsDuck'
import './../styles.css'

class Historial extends Component {

    componentDidMount() {
        this.props.getPatientHistoryAction(this.props.match.params.id)
    }

    renderTable = (historial) =>(
        (historial==='' || historial===[] || historial.length===0)  ?
        <div> No se encontraron analisis para este paciente</div> :
        <Table celled>
            <Table.Header>
                <Table.Row>
                    
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Fecha</Table.HeaderCell>
                    <Table.HeaderCell>Determinaciones</Table.HeaderCell>
                    <Table.HeaderCell>Estado</Table.HeaderCell>
                    <Table.HeaderCell />
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {historial.map((analisis, index) => (
                    <Table.Row key={index}>
                        
                        <Table.Cell>
                            {analisis.idAnalisis}
                        </Table.Cell>
                        <Table.Cell>
                            {analisis.createdAt}
                        </Table.Cell>
                        <Table.Cell>
                            {analisis.determinaciones !== undefined ? analisis.determinaciones.map((deter)=>(
                                <li>{deter}</li>
                            )) : null}
                        </Table.Cell>
                        <Table.Cell>
                            {analisis.estadoAnalisis}
                        </Table.Cell>
                        <Table.Cell collapsing>
                            <Button
                                floated='right'
                                icon
                                labelPosition='left'
                                primary
                                size='tiny'
                                as= {Link} to={{pathname:`/analisis/consulta/${analisis.idAnalisis}`, state: {prevPath: window.location.pathname}}}
                              >
                                  <Icon name='info'/>
                                  Ver más
                            </Button>
                        </Table.Cell>
                        
                    </Table.Row>
                )

                )}
            </Table.Body>
        </Table>
        
    )


    render() {
        const { fetching } = this.props
        return (
            <div>
                <div className='historialPaciente'>
                    {fetching ?  null : this.renderTable(this.props.history)}
                </div>
                
            </div>
        )
    }
}



function mapStateToProps(state) {
    return {
        fetching: state.patients.fetching,
        history: state.patients.history.sort((a,b) => (a.idAnalisis > b.idAnalisis) ? -1 : 1),

    }
}
export default connect(mapStateToProps, { getPatientHistoryAction } )(Historial)