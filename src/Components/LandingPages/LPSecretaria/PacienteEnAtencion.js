import React from 'react';
import { Header, Container, List } from 'semantic-ui-react';
import { checkAtributo, titleCase } from '../../../Services/MetodosDeValidacion';

const SelectedPaciente = props => {
    return (
        <div>
            {(props.selected === '' || props.selected === null) ? null : 
            <Container style={Style} text>
                <Header as='h4' style={HeaderStyle}>Información del paciente en atención </Header>
  
                    <List>
                        <List.Item>
                            <List.Content>Número de paciente: {props.selected.id}</List.Content>
                        </List.Item>

                        <List.Item>
                            <List.Content>Tipo Paciente: {titleCase(props.selected.tipoPaciente)}</List.Content>
                        </List.Item>

                        <List.Item>
                            <List.Content>Nombre: {props.selected.nombre} {checkAtributo(props.selected.apellido)}</List.Content>
                        </List.Item>

                        {checkAtributo(props.selected.nroDocumento) ? 
                                <List.Item>
                                        <List.Content>{props.selected.tipoDocumento}: {props.selected.nroDocumento}</List.Content>
                                </List.Item>
                            : null}

                        {checkAtributo(props.selected.tipoAnimal) ?
                                <List.Item>
                                            <List.Content>Tipo de Animal: {titleCase(props.selected.tipoAnimal)}</List.Content>
                                </List.Item>
                            : null} 
                        

                        {checkAtributo(props.selected.propietario) ?
                                <List.Item>
                                            <List.Content>Propietario: {props.selected.propietario}</List.Content>
                                </List.Item>
                            : null}

                        {checkAtributo(props.selected.obraSocial) ?
                                <List.Item>
                                            <List.Content>Obra social: {props.selected.obraSocial}</List.Content>
                                </List.Item>
                            : null}

                    </List>

                
            </Container>
        }

                
                <Header as='h4' style={HeaderStyle}>Analisis pendientes del paciente: </Header>
                {props.pendientes ? 
                    props.pendientes[0].paciente
                    : null}
    </div>    
    );
};

const Style = {
    marginTop: '15px',
    backgroundColor: '#e8f6ff',
    padding: '8px',
    fontSize: 'small',
};

const HeaderStyle = {
    textDecorationLine: 'underline'
}

export default SelectedPaciente;