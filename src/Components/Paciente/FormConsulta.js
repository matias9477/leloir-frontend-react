import React, { Component } from 'react';
import { Button, Icon, Container, Divider, Form, Tab } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import NavBar from '../NavBar/NavBar';
import { urlTablaPacientes } from '../../Constants/NavUrl'
import ConsultaPersona from './ConsultaPersona';
import ConsultaAnimal from './ConsultaAnimal';
import ConsultaInstitucion from './ConsultaInstitucion';
import Historial from './Historial';
import './../styles.css';
import './patientsStyle.css';

class FormConsulta extends Component {
  
  renderConsulta(){
    var type = JSON.parse(localStorage.getItem('patientType'))

    if (this.props.location.state!==undefined){
      type = this.props.location.state.type
    }

    if (type === 'ANIMAL' || this.props.patient.type==="com.leloir.backend.domain.Animal" || type==="com.leloir.backend.domain.Animal"){
      return <ConsultaAnimal patientId={this.props.match.params.id}/>
    } else if (type === 'PERSONA' || this.props.patient.type==="com.leloir.backend.domain.Persona" || type==="com.leloir.backend.domain.Persona"){
      return <ConsultaPersona patientId={this.props.match.params.id}/>
    } else if (type === 'INSTITUCION' || this.props.patient.type==="com.leloir.backend.domain.Institucion" || type==="com.leloir.backend.domain.Institucion"){
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
                readOnly={true}
              />
              <Divider id={'divider'}/>
              
            </Form> 
            {this.renderConsulta()}
          </Tab.Pane>,
      },
      { 
        menuItem: 'Historial', render: () => 
          <Tab.Pane loading={this.props.fetching}>
            <Historial match={this.props.match}/>
          </Tab.Pane> 
      },
    ]

    return panes
  }
  
  render() {
    var prevURL = urlTablaPacientes;

    if (this.props.location.state!==undefined) {
      prevURL = this.props.location.state.prevPath
    }
    
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
