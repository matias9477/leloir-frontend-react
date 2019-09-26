import React, { Component } from 'react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Header, Form } from 'semantic-ui-react';

import { getCurrentDate } from '../../Services/MetodosPaciente';
import { emptyToNull, titleCase, validateNombre, validateOnlyNumbers, validateMail } from './../../Services/MetodosDeValidacion';
import './../styles.css';

class AltaInstitucion extends Component {
  constructor(props) {
    super(props);
    this.state = ({
        nombre: '',
        telefono:'',
        mail:'',
        fax: '',

        direccion: '',
        historial: [],
        
        errorNombre: true,
        errorTelefono: true,
        errorMail: true,
        errorFax: true,
        
      })
    this.getPaciente = this.getPaciente.bind(this);
    this.cambioNombre = this.cambioNombre.bind(this);
    this.cambioTelefono = this.cambioTelefono.bind(this);
    this.cambioMail = this.cambioMail.bind(this);
    this.cambioFax = this.cambioFax.bind(this);
  }
  
  handleUpdateClick = (api) => {
    var data = {
        "type": "com.leloir.backend.domain.Institucion",
        "fechaAlta": getCurrentDate(),
        "telefono": emptyToNull(this.state.telefono),
        "mail": emptyToNull(this.state.mail),
        "historial": null,
        "bitAlta": true,
        "nombre": titleCase(this.state.nombre),
        "direccion": null,
        "fax": null
    };

    axios.post(api, data
      ).then((response) => {
        alert('Se registro el paciente ' + titleCase(this.state.nombre) + ' con éxito.'); 
        this.vaciadoCampos();
      }, (error) => {
        alert('No se ha podido registrar el paciente.');
    });
  }

  getPaciente(e){
    e.preventDefault();

    const { nombre, mail, telefono, fax } = this.state;
    
    const errorNombre = validateNombre(nombre);
    const errorTelefono = validateOnlyNumbers(telefono);
    const errorFax = validateOnlyNumbers(fax);
    const errorMail = validateMail(mail);

    if ( errorNombre && errorMail && errorTelefono && errorFax ) {
      const api = '/pacientes/add';
      this.handleUpdateClick(api);
    } else {
      alert("Verifique los datos ingresados.")
      this.setState({
        errorNombre,
        errorTelefono,
        errorMail,
        errorFax,
    })
    }    
  }

  vaciadoCampos(){
    this.setState( {
      nombre: '',
      telefono:'',
      mail:'',
      fax: '',
      errorNombre: true,
      errorTelefono: true,
      errorMail: true,
      errorFax: true,
    })
  }
 
  cambioNombre(e) {
    this.setState( {
      nombre: e.target.value
    })
  }

  cambioFax(e) {
    this.setState( {
      fax: e.target.value
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

   
  render(){
    return (
      <div className='altasPaciente'>
        <Header as='h3' dividing>Registrar nueva Institución</Header>
       
        <Form onSubmit={this.getPaciente}>

          <Form.Field required label='Nombre' control='input' 
          placeholder='Nombre' 
          value={this.state.nombre} 
          onChange={this.cambioNombre} 
          className= {this.state.errorNombre ? null : 'error'} 
          />
          
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

          <Form.Field label='Fax' control='input' 
          placeholder='Fax' 
          value={this.state.fax} 
          onChange={this.cambioFax} 
          className= {this.state.errorFax === true ? null : 'error'} 
          />    
          
          <Button primary type="submit" onClick={this.getPaciente} className="boton"> Registrar Institución</Button >       

        </Form>  
      </div>

    );
  }




}


export default AltaInstitucion;