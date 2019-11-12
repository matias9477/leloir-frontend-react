import React from 'react';
import { Header, Container, List } from 'semantic-ui-react';
import { checkAtributo, titleCase } from '../../../Services/MetodosDeValidacion';

const SelectedPaciente = ({selected}) => {
    return (
        <div>
            {(selected === '' || selected === null) ? null : 
            <Container style={Style} text>
                <Header as='h4' style={HeaderStyle}>Información del paciente en atención </Header>
  
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

                
            </Container>
        }

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