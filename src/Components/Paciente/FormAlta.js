import React, { Component } from 'react';
import { Button, Form, Icon, Container } from 'semantic-ui-react'
import NavBar from '../NavBar/NavBar'
import Select from 'react-select';
import { Link } from 'react-router-dom';

import AltaPersona from './AltaPersona';
import AltaAnimal from './AltaAnimal';
import AltaInstitucion from './AltaInstitucion';
import './patientsStyle.css';

class FormAlta extends Component {
  constructor(props) {
    super(props);
    this.state = ({
        tipo: '',
        opciones: [],
      })
  }

  componentDidMount() {
    this.setState({
      opciones: [
        {key: 1, value: "Persona"},
        {key: 2, value: "Animal"}, 
        {key: 3, value: "Institución"}]
    })
  }

  getForm(){
    if(this.state.tipo.value === 'Persona'){
      return <AltaPersona/>
    } else if ( this.state.tipo.value === 'Animal') {
      return <AltaAnimal/>
    } else if ( this.state.tipo.value === 'Institución') {
      return <AltaInstitucion/>
    }
  }

  cambioTipo = (e) => {
    this.setState( {
      tipo: e
    })
  }


  render() {

    return (
      <div>
        <NavBar/>

          <div className='avoidMenu'>
          
          <Container className='btnHeader'>
            <Button as= {Link} 
            to={{pathname: (this.props.location.state.prevPath
          ), state: { prevPath: window.location.pathname }}}
            exact='true' 
            floated='left' icon labelPosition='left' primary size='small'>
              <Icon name='arrow alternate circle left' /> Volver
            </Button>
          </Container>

          <label className='labelsSelect'>Tipo Paciente <span>*</span></label>

            <Select
              name='Tipo Paciente'
              value={this.state.tipo}
              onChange={this.cambioTipo}
              placeholder= "Seleccione tipo de paciente"
              options={this.state.opciones}
              getOptionValue={this.getOptionValueTipoPac}
              getOptionLabel={this.getOptionLabelTipoPac}
            />

          {this.getForm()}
          
        </div> 

      </div>
    );
  }

  getOptionLabelTipoPac = option => option.value;
  getOptionValueTipoPac = option => option.key;

}


export default FormAlta;