import React, { Component } from 'react'
import axios from 'axios'
import { Button, Header, Icon, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import MenuOpciones from '../MenuOpciones'
import ConsultaPersona from './ConsultaPersona'
import ConsultaAnimal from './ConsultaAnimal'
import ConsultaInstitucion from './ConsultaInstitucion'
import { getPatientByIdAction } from '../../Redux/patientsDuck'
import './../styles.css'

class FormConsulta extends Component {
  constructor(props) {
    super(props)
    this.state = ({        
        id: this.props.match.params.id,
        tipo: '',        
      })
  }

  componentWillMount() {
    this.getTipo()
    this.props.getPatientByIdAction(this.props.match.params.id)
  }

  getTipo(){
    axios.get("/pacientes/id/" + this.props.match.params.id).then(resolve => {
      this.setState({
          tipo: resolve.data.type,
      });
    }, (error) => {
        console.log('Error get tipo', error.message);
    })

  }

  getInfo(){
    if(typeof(this.props.patient === 'object')){
      if (this.state.tipo === 'com.leloir.backend.domain.Animal'){
      // return <ConsultaAnimal id={this.props.match.params.id}/>
        return <ConsultaAnimal patient={this.props.patient}/>

      } else if (this.state.tipo === 'com.leloir.backend.domain.Persona'){
        return <ConsultaPersona id={this.props.match.params.id}/>
      } else if (this.state.tipo === 'com.leloir.backend.domain.Institucion'){
        return <ConsultaInstitucion id={this.props.match.params.id}/>
      }
    }
    
  }

  
  render() {
    var prevURL = this.props.location.state.prevPath || '/pacientes'
    return (
      <div className='union'>
        <MenuOpciones/>
        <div className="FormAlta">
            <Container className='btnHeader'>
              <Button className='boton' as= {Link} to={prevURL} floated='left' icon labelPosition='left' primary size='small'>
                <Icon name='arrow alternate circle left' /> Volver
              </Button>
              <br></br>
              <Header as='h3' dividing>Búsqueda y modificación</Header>
            </Container>
          {this.getInfo()}
        </div>
      
      
      </div>
    );
  }

}

const mapStateToProps = (state, props) =>({
  patient: state.patients.patient,
})


export default connect(mapStateToProps,{getPatientByIdAction})(FormConsulta)

