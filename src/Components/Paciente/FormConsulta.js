import React, { Component } from 'react';
import { Button, Icon, Container, Divider, Form, Grid, Tab } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";

import NavBar from '../NavBar/NavBar';
import ConsultaPersona from './ConsultaPersona';
import ConsultaAnimal from './ConsultaAnimal';
import ConsultaInstitucion from './ConsultaInstitucion';
import Historial from './Historial';
import './../styles.css';
import './patientsStyle.css';

class FormConsulta extends Component {
  
  renderConsulta(){
    if (this.props.location.state.type === 'ANIMAL'){
      return <ConsultaAnimal patientId={this.props.match.params.id}/>
    } else if (this.props.location.state.type === 'PERSONA'){
      return <ConsultaPersona patientId={this.props.match.params.id}/>
    } else if (this.props.location.state.type === 'INSTITUCION'){
      return <ConsultaInstitucion patientId={this.props.match.params.id}/>
    }
  }

  tabs(){
    const panes = [
      {
        menuItem: 'Datos Paciente', render: () => 
          <Tab.Pane loading={this.props.fetching}>
            <Form size='huge'>                
              <Form.Field control='input' 
                value={this.props.patient.apellido === undefined ? this.props.patient.nombre : this.props.patient.nombre + ' ' + this.props.patient.apellido} 
                id = {'headerConsulta'}
              />
              <Divider id={'divider'}/>
              
            </Form> 
            {this.renderConsulta()}
          </Tab.Pane>,
      },
      { 
        menuItem: 'Historial', render: () => 
          <Tab.Pane>
            <Historial match={this.props.match}/>
          </Tab.Pane> 
      },
    ]

    return panes
  }
  
  render() {
    var prevURL = this.props.location.state.prevPath || '/pacientes'
    
    return (
      <div>
        <NavBar/>
        
        <div className="avoidMenu">
          <Container className='btnHeader'>
            <Button as= {Link} to={prevURL} floated='left' icon labelPosition='left' primary size='small'>
              <Icon name='arrow alternate circle left' /> Volver
            </Button>
            <br></br>
          </Container>
          
          <Tab panes={this.tabs()} />

        </div>

      </div>
    )
  }

}

const mapStateToProps = (state) =>({
  patient: state.patients.patient,
  fetching: state.patients.fetching,
})


export default connect(mapStateToProps,{ })(FormConsulta)
