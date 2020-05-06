import React from 'react'
import { Header, Segment } from 'semantic-ui-react'

import { checkAtributo, titleCase } from '../../Services/MetodosDeValidacion'


const SelectedPaciente = props => {
    return (
        <div>
            {(props.selected === '' || props.selected === null) ? null : 
            <Segment secondary className='infoSelectedPaciente'>
                <Header as='h4' dividing>PACIENTE SELECCIONADO</Header>
                <p> Número de paciente: {props.selected.id} <br/>
                    Tipo Paciente: {titleCase(props.selected.tipoPaciente)} <br/>
                    Nombre: {props.selected.nombre} {checkAtributo(props.selected.apellido)} <br/>
                    {checkAtributo(props.selected.nroDocumento) ? `${props.selected.tipoDocumento}: ${props.selected.nroDocumento}`: null}
                    {checkAtributo(props.selected.tipoAnimal) ? `Tipo de Animal: ${titleCase(props.selected.tipoAnimal)}` : null} <br/>
                    {checkAtributo(props.selected.propietario) ? `Propietario: ${props.selected.propietario}`: null}
                    {checkAtributo(props.selected.obraSocial) ? `Obra social: ${props.selected.obraSocial}`: null}
                </p>
            
            </Segment>
        
        }
    </div>    
    );
};


const HeaderStyle = {
    textDecorationLine: 'underline'
}

export default SelectedPaciente;