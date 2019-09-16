import React, { Component } from 'react';
import { Button, Header, Form, Icon, Container } from 'semantic-ui-react'
import MenuLateral from '../MenuLateral';
import {Link} from 'react-router-dom';
import { validateRazonSocial, validateCuit, emptyToNull} from './../../Services/MetodosPaciente';
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

        <Form onSubmit={this.nuevaObraSocial}>

          <Form.Field required label='Razón Social' control='input' 
          placeholder='Razón Social' value={this.state.razonSocial} onChange={this.cambioRazonSocial} className= {this.state.errorRazonSocial ? null : 'error'} />
          
          <Form.Field required label='Cuit' control='input'
          placeholder='Cuit' value={this.state.cuit} onChange={this.cambioCuit} className= {this.state.errorCuit ? null : 'error'} />

          <Form.Field label='Telefono' control='input' placeholder='Teléfono' value={this.state.telefono} onChange={this.cambioTelefono}/>

          <Form.Field label='E-Mail' control='input' placeholder='E-Mail' value={this.state.mail} onChange={this.cambioMail}/>      
          
          <Button primary type="submit" onClick={this.nuevaObraSocial} className="boton"> Registrar Obra Social</Button >       

        </Form>  
      </div>

    );
  }
  
  handleUpdateClick = (api) => {
    var data = {
        "razonSocial": this.state.razonSocial,
        "cuit": this.state.cuit,
        "telefono": emptyToNull(this.state.telefono),
        "mail": emptyToNull(this.state.mail.toLowerCase()),
        "bitActivo": true
    };

    fetch(api, {
      method: 'POST', 
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
      }).then(response => {
        if (response.ok) {
          alert('Se registro la obra social ' + (this.state.razonSocial) + ' con éxito.'); 
          this.vaciadoCampos();
          return response.text();
        } else {
          alert('No se ha podido registrar la obra social.');
          return Promise.reject({status: response.status, statusText: response.statusText});
        }
      });
  }

  nuevaObraSocial(e){
    e.preventDefault();
    console.log(this.state.cuit)
    const { razonSocial, cuit } = this.state;
    const errorRazonSocial = validateRazonSocial(razonSocial);
    const errorCuit = validateCuit(cuit);
    
    if ( errorRazonSocial && errorCuit  ) {
      const api = '/obras_sociales/add';
      this.handleUpdateClick(api);
    } else {
      this.setState ({ 
        errorRazonSocial,
        errorCuit
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
        <MenuLateral/>
        <div className="FormAlta">
          {this.renderForm()}
        </div>
      </div>
    );
  }

}


export default AltaObraSocial;