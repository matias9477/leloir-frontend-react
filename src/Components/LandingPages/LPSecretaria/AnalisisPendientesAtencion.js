import React from 'react';
import { Header, Container, List, Divider, Button, Grid, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getAnalisisPendientesByIdAction } from '../../../Redux/analisisDuck';
import './LPSecretaria.css'


class AnalisisPendientes extends React.Component {

    componentDidMount(){
        this.props.getAnalisisPendientesByIdAction(this.props.id)
    }

    render() {
        let { pendientes } = this.props;
        return (
            <div>
                {pendientes!==null && pendientes!==undefined && pendientes.length>0 ? 
            
                    <Container className='dataPacienteEnAtencion' text>                    
                        <Header as='h4' className= 'hStyle'>ANÁLISIS PENDIENTE DEL PACIENTE</Header>
                                                
                            {pendientes.map((pendiente, index) =>{
                                return <div key={index}> 
                                    <Grid width='equal' >
                                        <Grid.Column width={11}>
                                            <List> 
                                                <List.Item>
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
                                                
                                            <Button as= {Link} to={{pathname: `/analisis/consulta/${pendiente.idAnalisis}`, state: { prevPath: window.location.pathname }}} icon circular inverted color='blue'>
                                               <Icon name='arrow right'/>
                                            </Button>
                                        </Grid.Column>
                                    </Grid>
                                    <Divider/>
                                </div>
                                        
                            })}                   
                    </Container>
                :   <div>
                    {this.props.alta ?
                        <Header as='h4' textAlign='center'>El paciente no posee análisis pendientes.</Header>
                        : null}
                    </div>}
            </div>
        );
    }
}


function mapStateToProps(state){
    return {
        pendientes: state.analisis.analisisPendientesById,
    }
}


export default connect(mapStateToProps, {getAnalisisPendientesByIdAction})(AnalisisPendientes);