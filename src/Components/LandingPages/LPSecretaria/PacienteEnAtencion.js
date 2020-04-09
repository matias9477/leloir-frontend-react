import React from 'react'
import { Header, Container, List, Button, Grid } from 'semantic-ui-react'
import { checkAtributo, titleCase } from '../../../Services/MetodosDeValidacion'
import axios from 'axios'
import {Link} from 'react-router-dom';
import './LPSecretaria.css'

const SelectedPaciente = ({selected}) => {
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
                        <h4 className='PatientNotFound'>ESTE PACIENTE SE ENCUENTRA DADO DE BAJA</h4>
                    : null}

                    {(!selected.bitAlta) ? <Button onClick={(e) => { 
                    if (window.confirm('¿Esta seguro que quiere dar de alta al paciente ' + nombre(selected) + '?')) {  
                    alta(selected)
                    } else {e.preventDefault()}} }>Dar de Alta</Button> : null}

                
            </Container>
        }

    </div>    
    );
};

function nombre(selected){
    let nombre = selected.nombre
    if (!(selected.apellido === undefined)){
        nombre = selected.nombre + ' ' + selected.apellido
    }
    return(
        nombre
    )
}

function alta(selected){
    axios.put(`/pacientes/switch-alta/${selected.id}`).then(response => {
        alert("Se ha dado de alta al paciente con éxito.");
        // f5
    }, (error) => {
        // if(this.state.bitAlta) {
        //     alert(`No se ha podido dar de alta al paciente ${this.state.nombre} ${this.state.apellido}. Intentelo nuevamente.`)
        //   }
        alert(`No se ha podido dar de alta al paciente ${selected.nombre} ${selected.apellido}. Intentelo nuevamente.`)
    })

}


export default SelectedPaciente;