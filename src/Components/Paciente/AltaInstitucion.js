import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';
import { Button, Header, Form, Icon, Container } from 'semantic-ui-react'
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuLateral from '../MenuLateral';
import {Link} from 'react-router-dom';

import {urlDocs, urlObrasSoc,urlPaises,urlSexos} from '../../Constants/URLs';
import { getIdTipoDoc, getFechaNacimiento, getCurrentDate, getSexoId, getIdPais, getIso, getNombrePais, getIso3, getCodigoTelefono, emptyToNull, getIdObraSocial, getCuitObraSocial, getDomicilioObraSocial, getTelefonoObraSocial, getEmailObraSocial, validateName, validateApellido, validateTipoDoc, validateNroDoc, validateSexo, validateNacionalidad, validateNacimiento, convertStyleString} from '../../Services/MetodosPaciente';
import './../styles.css';

class AltaInstitucion extends Component {
  constructor(props) {
    super(props);
    this.state = ({
        nombre: '',
        fechaAlta:'',
        telefono:'',
        mail:'',
        direccion: '',
        fax: '',
        historial: [],
        
        errorNombre: true,
        
      })
    this.fetchPaciente = this.fetchPaciente.bind(this);
    this.cambioNombre = this.cambioNombre.bind(this);
    this.cambioTelefono = this.cambioTelefono.bind(this);
    this.cambioMail = this.cambioMail.bind(this);
    this.cambioFax = this.cambioFax.bind(this);

  }
  
  renderForm(){
    return (
      <div className='Formularios'>
        <Container className='btnHeader'>
          <Button className='boton' as= {Link} to='/pacientes' exact='true' floated='left' icon labelPosition='left' primary size='small'>
            <Icon name='arrow alternate circle left' /> Volver
          </Button>

          <Header as='h3' dividing>Registrar nueva Institución</Header>
        </Container>

        <Form onSubmit={this.fetchPaciente}>

          <Form.Field required label='Nombre' control='input' 
          placeholder='Nombre' value={this.state.nombre} onChange={this.cambioNombre} className= {this.state.errorNombre ? null : 'error'} />
          

          <Form.Field label='Telefono' control='input' placeholder='Teléfono' value={this.state.telefono} onChange={this.cambioTelefono}/>


          <Form.Field label='E-Mail' control='input' placeholder='E-Mail' value={this.state.mail} onChange={this.cambioMail}/>   

          <Form.Field required label='Fax' control='input' 
          placeholder='Fax' value={this.state.fax} onChange={this.cambioFax} />    
          
          <Button primary type="submit" onClick={this.fetchPaciente} className="boton"> Registrar Institución</Button >       

        </Form>  
      </div>

    );
  }

  
  handleUpdateClick = (api) => {
    var data = {
        "type": "com.leloir.backend.domain.Institucion",
        "fechaAlta": getCurrentDate(),
        "telefono": emptyToNull(this.state.telefono),
        "mail": emptyToNull(this.state.mail.toLowerCase()),
        "historial": null,
        "bitAlta": true,
        "nombre": convertStyleString(this.state.nombre),
        "direccion": null,
        "fax": null
    };
    

    fetch(api, {
      method: 'POST', 
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
      }).then(response => {
        if (response.ok) {
          alert('Se registro el paciente ' + convertStyleString(this.state.nombre) + ' con éxito.'); 
          this.vaciadoCampos();
          return response.text();
        } else {
          alert('No se ha podido registrar el paciente.');
          return Promise.reject({status: response.status, statusText: response.statusText});
        }
      });
  }

  fetchPaciente(e){
    e.preventDefault();
    const { nombre } = this.state;
    const errorNombre = validateName(nombre);

    if ( errorNombre ) {
      const api = '/pacientes/add';
      this.handleUpdateClick(api);
      
    } else {
      this.setState ({ 
        errorNombre
      })
    }    
  }

  vaciadoCampos(){
    this.setState( {
      nombre: '',
      telefono:'',
      mail:'',
      fax: '',
      paciente: [],
      errorNombre: true,
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


export default AltaInstitucion;