import React from 'react';
import { Header, Container, List, Divider } from 'semantic-ui-react';

const AnalisisPendientes = ({pendientes}) => {
    console.log("los pendientes son:")
    console.log(pendientes);
    return (
            <div>
                {pendientes!==null && pendientes!==undefined ? 
                
                <Container style={Style} text>                    
                    <Header as='h4' style={HeaderStyle}>Analisis pendientes del paciente: 
                        <Divider/>
                    </Header>
                                          
                            {pendientes.map(pendiente =>{
                                return <List> 
                                            <List.Item>
                                                <List.Content>ID Analisis: {pendiente.idAnalisis}</List.Content>
                                            </List.Item>

                                            <List.Item>
                                                <List.Content>Estado: {pendiente.estadoAnalisis}</List.Content>
                                            </List.Item>

                                            <List.Item>
                                                <List.Content>{pendiente.diasPendiente}</List.Content>
                                            </List.Item>

                                            <List.Item>
                                                <Divider/>
                                            </List.Item>

                                       </List>
                            })}                   
                </Container>
                    : null}
                
            </div>
        );
    }

    const Style = {
        marginTop: '15px',
        backgroundColor: '#e8f6ff',
        padding: '8px',
        fontSize: 'small',
    };
    
    const HeaderStyle = {
        textDecorationLine: 'underline'
    }

export default AnalisisPendientes;