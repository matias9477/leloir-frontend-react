import React, { Component } from 'react';
import axios from 'axios'
import { Button, Header, Form, Icon, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import MenuOpciones from '../MenuOpciones';
import { emptyToNull, titleCase, validateNombre, validateOnlyNumbers, validateMail, validateOnlyNumbersRequired } from './../../Services/MetodosDeValidacion';
import './../styles.css';

class AltaObraSocial extends Component {
  constructor(props) {
    super(props);
    this.state = ({
        razonSocial: '',
        telefono:'',
        mail:'',
        cuit: '',

        errorRazonSocial: true,
        errorCuit: true,
        errorTelefono: true,
        errorMail: true,

      })
      this.nuevaObraSocial = this.nuevaObraSocial.bind(this);
      this.cambioRazonSocial = this.cambioRazonSocial.bind(this);
      this.cambioTelefono = this.cambioTelefono.bind(this);
      this.cambioMail = this.cambioMail.bind(this);
      this.cambioCuit = this.cambioCuit.bind(this);
  }
  

  renderForm(){
    return (
      <div className='Formularios'>
        <Container className='btnHeader'>
          <Button className='boton' as= {Link} to='/obras_sociales' exact='true' floated='left' icon labelPosition='left' primary size='small'>
            <Icon name='arrow alternate circle left' /> Volver
          </Button>

          <Header as='h3' dividing>Registrar nueva Obra Social</Header>
        </Container>

        <Form onSubmit={this.nuevaObraSocial} className='altasYConsultas'>

          <Form.Field required label='Razón Social' control='input' 
          placeholder='Razón Social' 
          value={this.state.razonSocial} 
          onChange={this.cambioRazonSocial} 
          className= {this.state.errorRazonSocial === true ? null : 'error'} 
          />
          
          <Form.Field required label='Cuit' maxLength={11} control='input'
          placeholder='Cuit' 
          value={this.state.cuit} 
          onChange={this.cambioCuit} 
          className= {this.state.errorCuit === true ? null : 'error'} 
          />

          <Form.Group widths='equal'>
            <Form.Field label='Telefono' control='input' 
            placeholder='Teléfono' 
            value={this.state.telefono} 
            onChange={this.cambioTelefono} 
            className= {this.state.errorTelefono === true ? null : 'error'} 
            />

            <Form.Field label='E-Mail' control='input' 
            placeholder='E-Mail' 
            value={this.state.mail} 
            onChange={this.cambioMail} 
            className= {this.state.errorMail === true ? null : 'error'} 
            /> 
          </Form.Group>     

          <br/>
          
          <Button primary type="submit" onClick={this.nuevaObraSocial} className="boton"> Registrar Obra Social</Button >       

        </Form>  
      </div>

    );
  }
  
  handleUpdateClick = (api) => {
    var data = {
      "razonSocial": titleCase(this.state.razonSocial),
      "cuit": this.state.cuit,
      "telefono": emptyToNull(this.state.telefono),
      "email": emptyToNull(this.state.mail.toLowerCase()),
      "bitActivo": true
    };

    axios.post(api, data).then((response) => {
      alert('Se registro la obra social ' + titleCase(this.state.razonSocial) + ' con éxito.'); 
      this.vaciadoCampos();
      }, (error) => {
        alert('No se ha podido registrar la obra social.');
      })
    
  }

  nuevaObraSocial(e){
    e.preventDefault();
    
    const { razonSocial, cuit, telefono, mail } = this.state;

    const errorRazonSocial = validateNombre(razonSocial);
    const errorCuit = validateOnlyNumbersRequired(cuit);
    const errorTelefono = validateOnlyNumbers(telefono);
    const errorMail = validateMail(mail);

    if ( errorRazonSocial && errorCuit && errorMail && errorTelefono  ) {
      const api = '/obras_sociales/add';
      this.handleUpdateClick(api);
    } else {
      alert("Revise los datos ingresados.");
      this.setState({
        errorRazonSocial,
        errorCuit,
        errorTelefono,
        errorMail,
      })
    }    
  }

  vaciadoCampos(){
    this.setState( {
      razonSocial: '',
      cuit: '',
      telefono:'',
      mail:'',
      errorRazonSocial: true,
      errorCuit: true,
      errorTelefono: true,
      errorMail: true,
    })
  }
 
  cambioRazonSocial(e) {
    this.setState( {
      razonSocial: e.target.value
    })
  }

  cambioCuit(e) {
    this.setState( {
      cuit: e.target.value
    })
  }  

  cambioTelefono(e){
    this.setState( {
        telefono: e.target.value
    })
  }

  cambioMail(e){
    this.setState( {
        mail: e.target.value
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


export default AltaObraSocial;