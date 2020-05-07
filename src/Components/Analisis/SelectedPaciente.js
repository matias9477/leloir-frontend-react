import React from 'react'
import { Header, Icon, Container } from 'semantic-ui-react'

import { checkAtributo, titleCase } from '../../Services/MetodosDeValidacion'
import './analisisStyle.css'


const SelectedPaciente = props => {
    return (
        <div className='infoSelectedPaciente'>
            {(props.selected === '' || props.selected === null) ? null : 
            <div>
                <Header size='large' icon textAlign='center'>
                    <Icon name={getIconTipo(props.selected.tipoPaciente)} circular />
                    <Header.Content>{props.selected.nombre} {checkAtributo(props.selected.apellido)}</Header.Content>
                </Header>

                <Container textAlign='center'>Paciente {props.selected.id}</Container>

                <Container textAlign='center'>{checkAtributo(props.selected.nroDocumento) ? `  ${props.selected.tipoDocumento}: ${props.selected.nroDocumento}`: null}</Container>

                <Container textAlign='center'>{checkAtributo(props.selected.tipoAnimal) ? `Tipo: (${titleCase(props.selected.tipoAnimal)}) ` : null}</Container>

                <Container textAlign='center'>{checkAtributo(props.selected.propietario) ? `Propietario: ${props.selected.propietario}`: null}</Container>

                <Container textAlign='center'>{checkAtributo(props.selected.obraSocial) ? `Obra social ${props.selected.obraSocial}`: 'No posee obra social'} {checkAtributo(props.selected.plan) ? `, Plan ${props.selected.plan}`: null}</Container>

            </div>
        }
        </div>    
    )
}

function getIconTipo(tipo){
    if (tipo === 'ANIMAL'){
        return 'paw'
    } else if(tipo === 'PERSONA'){
        return 'user'
    } else if(tipo === 'INSTITUCION'){
        return 'building'
    }
}

export default SelectedPaciente