import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';
import { Button, Header, Form, Icon, Container } from 'semantic-ui-react'
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuLateral from '../MenuLateral';
import {Link} from 'react-router-dom';
import { getCurrentDate, emptyToNull,  validateName, convertStyleString} from '../../Services/MetodosPaciente';
import './../styles.css';

class AltaAnimal extends Component {
  constructor(props) {
    super(props);
    this.state = ({
        nombre: '',
        fechaAlta:'',
        telefono:'',
        mail:'',
        propietario: '',
        tipo: '',
        idTipo: '',

        errorNombre: true,
      })
    this.fetchPaciente = this.fetchPaciente.bind(this);
    this.cambioNombre = this.cambioNombre.bind(this);
    this.cambioTipo = this.cambioTipo.bind(this); 
    this.cambioPropietario = this.cambioPropietario.bind(this);
    this.cambioTelefono = this.cambioTelefono.bind(this);
    this.cambioMail = this.cambioMail.bind(this);
  } 


  renderForm(){
    return (
      <div className='Formularios'>
        <Container className='btnHeader'>
          <Button className='boton' as= {Link} to='/pacientes' exact='true' floated='left' icon labelPosition='left' primary size='small'>
            <Icon name='arrow alternate circle left' /> Volver
          </Button>

          <Header as='h3' dividing>Registrar nuevo animal</Header>
        </Container>

        <Form onSubmit={this.fetchPaciente}>

          <Form.Field required label='Nombre' control='input' 
          placeholder='Nombre' value={this.state.nombre} onChange={this.cambioNombre} className= {this.state.errorNombre ? null : 'error'} />
        
          <Form.Field required label='Tipo Animal' control='input'
          placeholder='Tipo Animal' value={this.state.tipo} onChange={this.cambioTipo} />

          <Form.Field required label='Propietario' control='input' placeholder='Propietario' value={this.state.propietario} onChange={this.cambioPropietario}>
          </Form.Field>

          <Form.Field label='Telefono' control='input' placeholder='Teléfono' value={this.state.telefono} onChange={this.cambioTelefono}/>

          <Form.Field label='E-Mail' control='input' placeholder='E-Mail' value={this.state.mail} onChange={this.cambioMail}/>      
          
          <Button primary type="submit" onClick={this.fetchPaciente} className="boton"> Registrar Paciente</Button >       

        </Form>  
      </div>

    );
  }

  handleUpdateClick = (api) => {
    var data = {
        "type": "com.leloir.backend.domain.Animal",
        "bitAlta": true,
        "fechaAlta": getCurrentDate(),
        "historial": null,
        "mail": emptyToNull(this.state.mail.toLowerCase()),
        "nombre": convertStyleString(this.state.nombre),
        "propietario": convertStyleString(this.state.propietario),
        "telefono": emptyToNull(this.state.telefono),
        "tipoAnimal": {
            "nombre": this.state.tipo,
            "tipoAnimalId": 1
        }
    };
   

    fetch(api, {
      method: 'POST', 
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
      }).then(response => {
        if (response.ok) {
          alert('Se registro el paciente ' + convertStyleString(this.state.nombre)  + ' con éxito.'); 
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
      id: '',
      nombre: '',
      tipo: '',
      propietario: '',
      telefono:'',
      mail:'',
      paciente: [],
      errorNombre: true,
    })
  }
 
  cambioNombre(e) {
    this.setState( {
      nombre: e.target.value
    })
  }

  cambioTipo(e) {
    this.setState( {
      tipo: e.target.value
    })
  }  

  cambioPropietario(e){
    this.setState( {
        propietario: e.target.value
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


export default AltaAnimal;