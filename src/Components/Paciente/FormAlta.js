import React, { Component } from 'react';
import { Button, Form, Icon, Container } from 'semantic-ui-react'
import NavBar from '../NavBar/NavBar'
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
    if(this.state.tipo === 'Persona'){
      return <AltaPersona/>
    } else if ( this.state.tipo === 'Animal') {
      return <AltaAnimal/>
    } else if ( this.state.tipo === 'Institución') {
      return <AltaInstitucion/>
    }
  }

  cambioTipo = (e) => {
    this.setState( {
        tipo: e.target.value
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

          <Form style={{width: '80%', marginLeft: 'auto', marginRight: 'auto'}}>
            <Form.Field required label='Tipo de paciente a registrar' control='select' placeholder = 'Tipo de paciene' value={this.state.tipo} onChange={this.cambioTipo}>
              <option value={null}>  </option>
              {this.state.opciones.map(item => (
                <option key={item.key}>{item.value}</option>))}
            </Form.Field>
          </Form>  

          {this.getForm()}
          
        </div> 

      </div>
    );
  }

}


export default FormAlta;