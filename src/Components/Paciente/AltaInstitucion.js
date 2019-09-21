import React, { Component } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Header, Form } from 'semantic-ui-react'
import { getCurrentDate } from '../../Services/MetodosPaciente';
import { emptyToNull, titleCase, hasNumbers, validMail } from './../../Services/MetodosDeValidacion';
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
        
        errorNombre: '',
        errorTelefono: true,
        errorMail: true,
        errorFax: true,
        
      })
    this.fetchPaciente = this.fetchPaciente.bind(this);
    this.cambioNombre = this.cambioNombre.bind(this);
    this.cambioTelefono = this.cambioTelefono.bind(this);
    this.cambioMail = this.cambioMail.bind(this);
    this.cambioFax = this.cambioFax.bind(this);

    this.handleBlurNombre = this.handleBlurNombre.bind(this);
    this.handleBlurTelefono = this.handleBlurTelefono.bind(this);
    this.handleBlurMail =  this.handleBlurMail.bind(this);
    this.handleBlurFax = this.handleBlurFax.bind(this);

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
    

    fetch(api, {
      method: 'POST', 
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
      }).then(response => {
        if (response.ok) {
          alert('Se registro el paciente ' + titleCase(this.state.nombre) + ' con éxito.'); 
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
    
    this.handleBlurNombre()
    this.handleBlurMail()
    this.handleBlurTelefono()
    this.handleBlurFax()

    const { errorNombre, errorMail, errorTelefono, errorFax } = this.state;

    if ( errorNombre && errorMail && errorTelefono && errorFax ) {
      const api = '/pacientes/add';
      this.handleUpdateClick(api);
    } else {
      alert("Verifique los datos ingresados.")
    }    
  }

  vaciadoCampos(){
    this.setState( {
      nombre: '',
      telefono:'',
      mail:'',
      fax: '',
      errorNombre: '',
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

  handleBlurNombre = () => {
    if (this.state.nombre === ''  || this.state.nombre.length === 0 ||  hasNumbers(this.state.nombre)){
      this.setState({ errorNombre: false })
    } else {
      this.setState({errorNombre: true})
    }
  }

  handleBlurTelefono = () => {
    if (this.state.telefono === ''){
      this.setState({ errorTelefono: true })
    } else if (isFinite(String(this.state.telefono))){
      this.setState({ errorTelefono: true })
    } else {
      this.setState({
        errorTelefono: false
      })
    }
  }

  handleBlurMail = () => {
    if(this.state.mail === ''){
      this.setState({
        errorMail: true,
      })
    } else if ( validMail.test(this.state.mail) ) {
        this.setState({
          errorMail: true,
        })
    } else {
      this.setState({
        errorMail: false,
      })
    } 
  }

  handleBlurFax = () => {
    if (this.state.fax === ''){
      this.setState({ errorFax: true })
    } else if (isFinite(String(this.state.fax))){
      this.setState({ errorFax: true })
    } else {
      this.setState({
        errorFax: false
      })
    }
  }

   
  render(){
    return (
      <div className='altasPaciente'>
        <Header as='h3' dividing>Registrar nueva Institución</Header>
       
        <Form onSubmit={this.fetchPaciente}>

          <Form.Field required label='Nombre' control='input' 
          placeholder='Nombre' value={this.state.nombre} onChange={this.cambioNombre} className= {(this.state.errorNombre=== '' || this.state.errorNombre === true) ? null : 'error'} onBlur={this.handleBlurNombre} />
          
          <Form.Field label='Telefono' control='input' placeholder='Teléfono' value={this.state.telefono} onChange={this.cambioTelefono} className= {(this.state.errorTelefono === '' || this.state.errorTelefono === true) ? null : 'error'} onBlur={this.handleBlurTelefono}/>

          <Form.Field label='E-Mail' control='input' placeholder='E-Mail' value={this.state.mail} onChange={this.cambioMail} className= {(this.state.errorMail === '' || this.state.errorMail === true) ? null : 'error'} onBlur={this.handleBlurMail}/>   

          <Form.Field label='Fax' control='input' 
          placeholder='Fax' value={this.state.fax} onChange={this.cambioFax} className= {(this.state.errorFax=== '' || this.state.errorFax === true) ? null : 'error'} onBlur={this.handleBlurFax}/>    
          
          <Button primary type="submit" onClick={this.fetchPaciente} className="boton"> Registrar Institución</Button >       

        </Form>  
      </div>

    );
  }




}


export default AltaInstitucion;