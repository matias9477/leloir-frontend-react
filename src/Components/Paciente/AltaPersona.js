import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';
import { Button, Form, Header } from 'semantic-ui-react'
import {urlDocs, urlObrasSoc,urlPaises,urlSexos} from '../../Constants/URLs';
import { getIdTipoDoc, getFechaNacimiento, getCurrentDate, getSexoId, getIdPais, getIso, getNombrePais, getIso3, getCodigoTelefono, emptyToNull, getIdObraSocial, getCuitObraSocial, getDomicilioObraSocial, getTelefonoObraSocial, getEmailObraSocial,  convertStyleString} from '../../Services/MetodosPaciente';
import './../styles.css';

class AltaPersona extends Component {
  constructor(props) {
    super(props);
    this.state = ({
        nombre: '',
        apellido:'',
        tipoDoc:'',
        nroDoc:'',
        fechaNacimiento: '',
        fechaAlta:'',
        sexo:'',
        nacionalidad:'',
        telefono:'',
        mail:'',
        obraSocial: '',

        documentos:[],
        paises: [],
        obrasSociales:[],
        sexos:[],

        errorNombre: '',
        errorApellido: '',
        errorTipoDoc: '',
        errorNroDoc: '',
        errorSexo: '',
        errorNac: '',
        errorFechaNac: '',
        errorMail: '',
        errorTelefono: '',

      })
    this.fetchPaciente = this.fetchPaciente.bind(this);
    this.cambioNombre = this.cambioNombre.bind(this);
    this.cambioApellido = this.cambioApellido.bind(this);    
    this.cambioTipoDoc = this.cambioTipoDoc.bind(this);
    this.cambioNroDoc = this.cambioNroDoc.bind(this);
    this.cambioFechaNacimiento = this.cambioFechaNacimiento.bind(this);
    this.cambioSexo = this.cambioSexo.bind(this);
    this.cambioNacionalidad = this.cambioNacionalidad.bind(this);
    this.cambioTelefono = this.cambioTelefono.bind(this);
    this.cambioMail = this.cambioMail.bind(this);
    this.cambioObraSocial = this.cambioObraSocial.bind(this);

    this.handleBlurNombre = this.handleBlurNombre.bind(this);
    this.handleBlurApellido = this.handleBlurApellido.bind(this);
    this.handleBlurTipoDoc = this.handleBlurTipoDoc.bind(this);
    this.handleBlurNroDoc = this.handleBlurNroDoc.bind(this);
    this.handleBlurSexo = this.handleBlurSexo.bind(this);
    this.handleBlurNacionalidad = this.handleBlurNacionalidad.bind(this);
    this.handleBlurFechaNacimiento = this.handleBlurFechaNacimiento.bind(this);
    this.handleBlurMail = this.handleBlurMail.bind(this);
    this.handleBlurTelefono = this.handleBlurTelefono.bind(this);

  }
  
  fillCombos = () =>{
    this.comboObrasSociales();
    this.comboTiposDocs();
    this.comboSexos();
    this.comboPaises();
  }  

  comboSexos = () =>{
    fetch(urlSexos).then ( resolve => {
        if(resolve.ok) { 
            return resolve.json();
        } else {
            throw Error(resolve.statusText);
        }
    }).then(sexo => {
       this.setState({sexos:sexo}) 
    })
  }

  comboPaises = () =>{
    fetch(urlPaises).then ( resolve => {
        if(resolve.ok) { 
            return resolve.json();
        } else {
            throw Error(resolve.statusText);
        }
    }).then(pais => {
        this.setState({paises:pais})
    })    
  }

  comboObrasSociales = () =>{
    fetch(urlObrasSoc).then ( resolve => {
        if(resolve.ok) { 
            return resolve.json();
        } else {
            throw Error(resolve.statusText);
        }
    }).then(obrasSoc => {
        this.setState({obrasSociales:obrasSoc});
    })
  }

  comboTiposDocs = () =>{
  fetch(urlDocs).then ( resolve => {
      if(resolve.ok) { 
          return resolve.json();
      } else {
          throw Error(resolve.statusText);
      }
  }).then(tipos => {
      this.setState({documentos:tipos})
  })

  }

  componentWillMount() {
    this.fillCombos();

  }

  handleUpdateClick = (api) => {
    var data;
    if (this.state.obraSocial === null || this.state.obraSocial === ''){
      data = {
        "type": "com.leloir.backend.domain.Persona",
        "nombre": convertStyleString(this.state.nombre),
        "apellido": convertStyleString(this.state.apellido),
        "nroDocumento": this.state.nroDoc,
        "tipoDocumento": {
          "idTipoDocumento": getIdTipoDoc(this.state.tipoDoc, this.state.documentos),
          "nombre": this.state.tipoDoc
        },
        "fechaNacimiento": getFechaNacimiento(this.state.fechaNacimiento),
        "fechaAlta": getCurrentDate(),
        "sexo": {
          "sexoId": getSexoId(this.state.sexo, this.state.sexos),
          "nombre": this.state.sexo,
        },
        "nacionalidad": {
          "idPais": getIdPais(this.state.nacionalidad, this.state.paises),
          "iso": getIso(this.state.nacionalidad, this.state.paises),
          "nombre": getNombrePais(this.state.nacionalidad, this.state.paises),
          "nombreBonito": this.state.nacionalidad,
          "iso3": getIso3(this.state.nacionalidad, this.state.paises),
          "codigoTelefono": getCodigoTelefono(this.state.nacionalidad, this.state.paises),
        },
        "telefono": emptyToNull(this.state.telefono),
        "mail": emptyToNull(this.state.mail.toLowerCase()),
        "obraSocial": null,
        "historial": null,
        "bitAlta": true
    };
    } else {
      data = {
        "type": "com.leloir.backend.domain.Persona",
        "nombre": convertStyleString(this.state.nombre),
        "apellido": convertStyleString(this.state.apellido),
        "nroDocumento": this.state.nroDoc,
        "tipoDocumento": {
          "idTipoDocumento": getIdTipoDoc(this.state.tipoDoc, this.state.documentos),
          "nombre": this.state.tipoDoc
        },
        "fechaNacimiento": getFechaNacimiento(this.state.fechaNacimiento),
        "fechaAlta": getCurrentDate(),
        "sexo": {
          "sexoId": getSexoId(this.state.sexo, this.state.sexos),
          "nombre": this.state.sexo,
        },
        "nacionalidad": {
          "idPais": getIdPais(this.state.nacionalidad, this.state.paises),
          "iso": getIso(this.state.nacionalidad, this.state.paises),
          "nombre": getNombrePais(this.state.nacionalidad, this.state.paises),
          "nombreBonito": this.state.nacionalidad,
          "iso3": getIso3(this.state.nacionalidad, this.state.paises),
          "codigoTelefono": getCodigoTelefono(this.state.nacionalidad, this.state.paises),
        },
        "telefono": emptyToNull(this.state.telefono),
        "mail": emptyToNull(this.state.mail.toLowerCase()),
        "obraSocial": {
          "idObraSocial": getIdObraSocial(this.state.obraSocial, this.state.obrasSociales),
          "razonSocial": this.state.obraSocial,
          "cuit": getCuitObraSocial(this.state.obraSocial, this.state.obrasSociales),
          "domicilio": getDomicilioObraSocial(this.state.obraSocial, this.state.obrasSociales),
          "telefono": getTelefonoObraSocial(this.state.obraSocial, this.state.obrasSociales),
          "email": getEmailObraSocial(this.state.obraSocial, this.state.obrasSociales),
        },
        "historial": null,
        "bitAlta": true
    };
    }

    fetch(api, {
      method: 'POST', 
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
      }).then(response => {
        if (response.ok) {
          alert('Se registro el paciente ' + convertStyleString(this.state.nombre) +' ' + convertStyleString(this.state.apellido) + ' con éxito.'); 
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

    const { errorNombre, errorApellido, errorTipoDoc, errorNroDoc, errorFechaNac, errorSexo, errorNac, errorMail, errorTelefono } = this.state;

    this.handleBlurNombre()
    this.handleBlurApellido()
    this.handleBlurTipoDoc()
    this.handleBlurNroDoc()
    this.handleBlurFechaNacimiento()
    this.handleBlurSexo()
    this.handleBlurNacionalidad()
    this.handleBlurMail()
    this.handleBlurTelefono()

    console.log(`Error nombre: ${errorNombre}`)
    console.log(`Error apellido: ${errorApellido}`)
    console.log(`Error tipo doc: ${errorTipoDoc}`)
    console.log(`Error nro doc: ${errorNroDoc}`)
    console.log(`Error fecha nacimiento: ${errorFechaNac}`)
    console.log(`Error sexo: ${errorSexo}`)
    console.log(`Error nacionalidad: ${errorNac}`)
    console.log(`Error mail: ${errorMail}`)
    console.log(`Error telefono: ${errorTelefono}`)
    console.log('---------------------')

    if ( errorNombre && errorApellido && errorTipoDoc && errorNroDoc && errorFechaNac && errorSexo && errorNac && errorMail && errorTelefono ) {
      const api = '/pacientes/add';
      this.handleUpdateClick(api);
      
    } else {
      alert('Verifique los datos ingresados.');
    }    
  }

  vaciadoCampos(){
    this.setState( {
      id: '',
      nombre: '',
      apellido:'',
      tipoDoc:'',
      nroDoc:'',
      fechaNacimiento:'',
      fechaAlta:'',
      sexo:'',
      nacionalidad:'',
      telefono:'',
      mail:'',
      obraSocial:'',
      errorNombre: true,
      errorApellido: true,
      errorTipoDoc: true,
      errorNroDoc: true,
      errorSexo: true,
      errorNac: true,
      errorFechaNac: true,
      errorMail: true,
    })
  }
 
  cambioNombre(e) {
    this.setState( {
      nombre: e.target.value
    })
  }

  cambioApellido(e) {
    this.setState( {
      apellido: e.target.value
    })
  }  

  cambioTipoDoc(e){
    this.setState( {
        tipoDoc: e.target.value
    })
  } 

  cambioNroDoc(e) {
      this.setState( {
        nroDoc: e.target.value
      })
  }

  cambioFechaNacimiento(e){
    this.setState( {
        fechaNacimiento: e
    })
  }

  cambioSexo(e){
      this.setState( {
          sexo: e.target.value
      })
  }

  cambioNacionalidad(e){
      this.setState( {
          nacionalidad: e.target.value
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

  cambioObraSocial(e){
      this.setState( {
          obraSocial: e.target.value
      })
  }
  
  hasNumbers(t){
      return /\d/.test(t);
  }

  handleBlurNombre(){
    if (this.state.nombre === ''  || this.state.nombre.length === 0 ||  this.hasNumbers(this.state.nombre)){
      this.setState({ errorNombre: false })
    } else {
      this.setState({errorNombre: true})
    }
  }

  handleBlurApellido(){
    if (this.state.apellido === '' || this.state.apellido.length === 0 ||  this.hasNumbers(this.state.apellido)){
      this.setState({errorApellido: false})
    } else {
      this.setState({errorApellido: true})
    }
  }

  handleBlurTipoDoc = () => {
    if (this.state.tipoDoc.length === 0 || this.state.tipoDoc === ''){
      this.setState({errorTipoDoc: false})
    } else{
      this.setState({errorTipoDoc: true})
    }
  }

  handleBlurNroDoc = () => {
    if (this.state.nroDoc === ''){
      this.setState({errorNroDoc: false})
    } else if (this.state.tipoDoc === 'Documento Nacional de Identidad' && isFinite(String(this.state.nroDoc))){
      this.setState({errorNroDoc: true})
    } else if (this.state.tipoDoc === 'Documento Nacional de Identidad' && !isFinite(String(this.state.nroDoc))){
      this.setState({errorNroDoc: false})
    } else if (this.state.tipoDoc === 'Pasaporte' && this.hasNumbers(this.state.nroDoc)){
      this.setState({errorNroDoc: true})
    }
  }

  handleBlurSexo = () => {
    if (this.state.sexo.length === 0 || this.state.sexo === ''){
      this.setState({errorSexo: false})
    } else{
      this.setState({errorSexo: true})
    }
  }

  handleBlurNacionalidad = () => {
    if (this.state.nacionalidad.length === 0 || this.state.nacionalidad === ''){
      this.setState({errorNac: false})
    } else{
      this.setState({errorNac: true})
    }
  }

  handleBlurFechaNacimiento = () => {
    if (this.state.fechaNacimiento.length === 0 || this.state.fechaNacimiento === ''){
      this.setState({errorFechaNac: false})
    } else{
      this.setState({errorFechaNac: true})
    }
  }

  handleBlurMail = ( ) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(this.state.mail === ''){
      this.setState({
        errorMail: true,
      })
    } else if ( re.test(this.state.mail) ) {
        this.setState({
          errorMail: true,
        })
    } else {
      this.setState({
        errorMail: false,
      })
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

  

  render(){
    return (
      <div className='altasPaciente'>
        <Header as='h3' dividing>Registrar nuevo Paciente</Header>

        <Form>

          <Form.Field required label='Nombre' control='input'
          placeholder='Nombre' value={this.state.nombre} onChange={this.cambioNombre} className= {(this.state.errorNombre=== '' || this.state.errorNombre === true) ? null : 'error'} onBlur={this.handleBlurNombre} />

          <Form.Field required label='Apellido' control='input'
          placeholder='Apellido' value={this.state.apellido} onChange={this.cambioApellido} className= {(this.state.errorApellido=== '' || this.state.errorApellido === true)? null : 'error' } onBlur={this.handleBlurApellido}/>

          <Form.Group widths='equal'>
            <Form.Field required label='Tipo documento' control='select' placeholder ='Tipo documento' value={this.state.tipoDoc} onChange={this.cambioTipoDoc} className= {(this.state.errorTipoDoc=== '' || this.state.errorTipoDoc === true) ? null : 'error'} onBlur={this.handleBlurTipoDoc}>
                <option value={null}> </option>
                {this.state.documentos.map(item => (
                <option key={item.idTipoDocumento}>{item.nombre}</option>))}
            </Form.Field>
            <Form.Field required maxLength={this.state.tipoDoc === "Documento Nacional de Identidad" ? "8" : '11'} label='Número de Documento' control='input' placeholder='Número de documento' value={this.state.nroDoc} onChange={this.cambioNroDoc} className= {(this.state.errorNroDoc=== '' || this.state.errorNroDoc === true) ? null : 'error'} onBlur={this.handleBlurNroDoc}>
            </Form.Field>
           </Form.Group>

          <Form.Field required label='Sexo' control='select' placeholder = 'Sexo' value={this.state.sexo} onChange={this.cambioSexo} className= {(this.state.errorSexo=== '' || this.state.errorSexo === true) ? null : 'error'} onBlur={this.handleBlurSexo}>
            <option value={null}>  </option>
            {this.state.sexos.map(item => (
            <option key={item.sexoId}>{item.nombre}</option>))}
          </Form.Field>

          <Form.Field required label='Nacionalidad' control='select' placeholder = 'Nacionalidad' value={this.state.nacionalidad} onChange={this.cambioNacionalidad} className= {(this.state.errorNac=== '' || this.state.errorNac === true) ? null : 'error'} onBlur={this.handleBlurNacionalidad}>
            <option value={null}>  </option>
              {this.state.paises.map(item => (
            <option key={item.idPais}>{item.nombreBonito}</option>))}
          </Form.Field>

          <Form.Field required className= {(this.state.errorFechaNac=== '' || this.state.errorFechaNac === true) ? null : 'error'} onBlur={this.handleBlurFechaNacimiento}>
            <label>Fecha de Nacimiento</label>
              <DatePicker placeholderText="Fecha de Nacimiento"
              selected={this.state.fechaNacimiento} onChange= {this.cambioFechaNacimiento} peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" maxDate={addDays(new Date(), 0)} dateFormat="yyyy-MM-dd">
              </DatePicker>
          </Form.Field>

          <Form.Field label='Telefono' control='input' placeholder='Teléfono' value={this.state.telefono} onChange={this.cambioTelefono} className= {(this.state.errorTelefono === '' || this.state.errorTelefono === true) ? null : 'error' } onBlur={this.handleBlurTelefono}/>

          <Form.Field label='E-Mail' control='input' placeholder='E-Mail' value={this.state.mail} onChange={this.cambioMail} className= {(this.state.errorMail === '' || this.state.errorMail === true) ? null : 'error'} onBlur={this.handleBlurMail}/>

          <Form.Field label='Obra Social' control='select' placeholder = 'Obra Social' value={this.state.obraSocial} onChange={this.cambioObraSocial} >
            <option key={null}>  </option>
              {this.state.obrasSociales.map(item => (
            <option key={item.idObraSocial}>{item.razonSocial}</option>))}
          </Form.Field>

          <Button primary type="submit" onClick={this.fetchPaciente} className="boton"> Registrar Paciente</Button >

        </Form>
      </div>

    );
  }

}


export default AltaPersona;