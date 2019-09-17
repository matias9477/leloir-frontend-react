import React, { Component } from 'react';
import { Button, Form, Icon, Container } from 'semantic-ui-react'
import MenuOpciones from '../MenuOpciones';
import {Link} from 'react-router-dom';
import AltaPersona from './AltaPersona';
import AltaAnimal from './AltaAnimal';
import AltaInstitucion from './AltaInstitucion';
import './../styles.css';

class FormAlta extends Component {
  constructor(props) {
    super(props);
    this.state = ({
        tipo: '',
        opciones: [],
      })
    this.cambioTipo = this.cambioTipo.bind(this);
  }

  componentWillMount() {
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
  
  renderForm(){
    return (
      <div className='Formularios'>
        
        <Container className='btnHeader'>
          <Button className='boton' as= {Link} to='/pacientes' exact='true' floated='left' icon labelPosition='left' primary size='small'>
            <Icon name='arrow alternate circle left' /> Volver
          </Button>
        </Container>


        <Form>
          <Form.Field required label='Tipo de paciente a registrar' control='select' placeholder = 'Tipo de paciene' value={this.state.tipo} onChange={this.cambioTipo}>
            <option value={null}>  </option>
            {this.state.opciones.map(item => (
            <option key={item.key}>{item.value}</option>))}
          </Form.Field>
        </Form>  

        {this.getForm()}
        
      </div>

    );
  }

  cambioTipo(e){
    this.setState( {
        tipo: e.target.value
    })
  }


  render() {
    
    return (
      <div className='union'>
        <MenuOpciones/>
        <div className="FormAlta">
          {this.renderForm()}
        </div>      
      </div>
    );
  }

}


export default FormAlta;