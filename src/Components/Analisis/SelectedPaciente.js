import React from 'react';
import { Header, Container } from 'semantic-ui-react';

import { checkAtributo, titleCase } from '../../Services/MetodosDeValidacion'; 

const SelectedPaciente = props => {
    console.log(props.selected)
    return (
        <div>
            {(props.selected === '' || props.selected === null) ? null : 
            <Container style={Style} text>
                <Header as='h4' style={HeaderStyle}>Información del paciente seleccionado </Header>
                <p> Número de paciente: {props.selected.id} <br/>
                    Tipo Paciente: {titleCase(props.selected.tipoPaciente)} <br/>
                    Nombre: {props.selected.nombre} {checkAtributo(props.selected.apellido)} <br/>
                    {checkAtributo(props.selected.nroDocumento) ? `${props.selected.tipoDocumento}: ${props.selected.nroDocumento}`: null}
                    {checkAtributo(props.selected.tipoAnimal) ? `TipoAnimal: ${titleCase(props.selected.tipoAnimal)}` : null} <br/>
                    {checkAtributo(props.selected.propietario) ? `Propietario: ${props.selected.propietario}`: null}
                </p>
            
            </Container>
        
        }
    </div>    
    );
};

const Style = {
    marginTop: '15px',
    backgroundColor: '#E9F3F7',
    padding: '8px',
    fontSize: 'small',
};

const HeaderStyle = {
    textDecorationLine: 'underline'
}

export default SelectedPaciente;