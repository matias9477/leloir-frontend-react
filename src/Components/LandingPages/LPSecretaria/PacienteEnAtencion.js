import React from 'react'
import { Header, Container, List, Button, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';

import { checkAtributo, titleCase } from '../../../Services/MetodosDeValidacion'
import { switchAltaAction } from './../../../Redux/patientsDuck'
import './LPSecretaria.css'

const SelectedPaciente = ({selected, switchAltaAction}) => {
    return (
        <div>
            {(selected === '' || selected === null) ? null : 
            <Container className='dataPacienteEnAtencion' text>
                <Header as='h4' className= 'hStyle'>PACIENTE EN ATENCIÓN</Header>

                <Grid width='equal'>
                        <Grid.Column width={11}>
                    
                            <List>
                                <List.Item>
                                    <List.Content>Número de paciente: {selected.id}</List.Content>
                                </List.Item>

                                <List.Item>
                                    <List.Content>Tipo Paciente: {titleCase(selected.tipoPaciente)}</List.Content>
                                </List.Item>

                                <List.Item>
                                    <List.Content>Nombre: {selected.nombre} {checkAtributo(selected.apellido)}</List.Content>
                                </List.Item>

                                {checkAtributo(selected.nroDocumento) ? 
                                        <List.Item>
                                                <List.Content>{selected.tipoDocumento}: {selected.nroDocumento}</List.Content>
                                        </List.Item>
                                    : null}

                                {checkAtributo(selected.tipoAnimal) ?
                                        <List.Item>
                                                    <List.Content>Tipo de Animal: {titleCase(selected.tipoAnimal)}</List.Content>
                                        </List.Item>
                                    : null} 
                                

                                {checkAtributo(selected.propietario) ?
                                        <List.Item>
                                                    <List.Content>Propietario: {selected.propietario}</List.Content>
                                        </List.Item>
                                    : null}

                                {checkAtributo(selected.obraSocial) ?
                                        <List.Item>
                                                    <List.Content>Obra social: {selected.obraSocial}</List.Content>
                                        </List.Item>
                                    : null}
                            </List>
                        </Grid.Column>
                        <Grid.Column >
                            <Button as= {Link} to={{pathname: `/pacientes/consulta/${selected.id}`, state: { prevPath: window.location.pathname }}} primary >Ver Paciente</Button>
                        </Grid.Column>

                    </Grid>
                    
                    {!selected.bitAlta ?
                        <h4 className='patientNotFoundMessage'>ESTE PACIENTE SE ENCUENTRA DADO DE BAJA</h4> 
                    : null}

                    {(!selected.bitAlta) ? <Button onClick={(e) => { 
                    if (window.confirm('¿Esta seguro que quiere dar de alta al paciente ' + nombre(selected) + '?')) {  
                        switchAltaAction(selected.id)
                    } else {e.preventDefault()}} }>Dar de Alta</Button> : null}

                
            </Container>
        }

    </div>    
    )
}

function nombre(selected){
    let nombre = selected.nombre
    if (!(selected.apellido === undefined)){
        nombre = selected.nombre + ' ' + selected.apellido
    }
    return(
        nombre
    )
}


function mapStateToProps(state){
    return{
        fetching: state.patients.fetching,
    }
}

export default connect(mapStateToProps, {switchAltaAction})(SelectedPaciente)