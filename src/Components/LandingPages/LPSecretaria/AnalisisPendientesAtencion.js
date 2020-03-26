import React from 'react';
import { Header, Container, List, Divider, Button, Grid } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

const AnalisisPendientes = ({pendientes}) => {
    return (
        <div>
            {pendientes!==null && pendientes!==undefined ? 
            
            <Container style={Style} text>                    
                <Header as='h4' style={HeaderStyle}>Analisis pendientes del paciente: 
                    <Divider/>
                </Header>
                                        
                    {pendientes.map(pendiente =>{
                        return <div>
                            <Grid width='equal'>
                                <Grid.Column width={11}>
                                    <List> 
                                        <List.Item width>
                                            <List.Content>ID Analisis: {pendiente.idAnalisis}</List.Content>
                                        </List.Item>

                                        <List.Item>
                                            <List.Content>Estado: {pendiente.estadoAnalisis}</List.Content>
                                        </List.Item>

                                        <List.Item>
                                            <List.Content>{pendiente.diasPendiente}</List.Content>
                                        </List.Item>
                                    </List>
                                </Grid.Column>
                                <Grid.Column >
                                        
                                    <Button as= {Link} to={{pathname: `/analisis/consulta/${pendiente.idAnalisis}`, state: { prevPath: window.location.pathname }}} >Ver análisis</Button>
                                </Grid.Column>
                                        
                            </Grid>
                            <Divider/>
                        </div>
                                
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