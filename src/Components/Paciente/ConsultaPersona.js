import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios'
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';
import { Button, Form } from 'semantic-ui-react'
import CircularProgress from '@material-ui/core/CircularProgress';

import './../styles.css';
import { getFechaNacimientoConsulta, verificarExistenciaObraSocial, getHumanDate } from './../../Services/MetodosPaciente';
import { getIdTipoDoc, getFechaNacimiento, getSexoId, getIdPais, getIso, getNombrePais, getIso3, getCodigoTelefono, getIdObraSocial, getCuitObraSocial, getDomicilioObraSocial, getTelefonoObraSocial, getEmailObraSocial, fechaAltaDateStamp  } from './../../Services/MetodosPaciente';
import { urlDocs, urlObrasSoc, urlPaises, urlSexos } from '../../Constants/URLs';
import { emptyToNull, titleCase,  validateNombre, validateOnlyNumbers, validateMail, validateRequiredCombos, validateNroDocumento, validateFechaNacimiento } from './../../Services/MetodosDeValidacion';

class ConsultaPersona extends Component {
  constructor(props) {
    super(props);
    this.state = ({        

        isRadioSelected: true,
        isbottonPressed:true,
        modificacion: true,
        cancelar: true,
        valor:true,

        cambios: false,

        id:'',
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
        bitAlta: '',
        estado: '',

        errorNombre: true,
        errorApellido: true,
        errorTipoDoc: true,
        errorNroDoc: true,
        errorSexo: true,
        errorNac: true,
        errorFechaNac: true,
        errorTelefono: true,
        errorMail: true,
        errorObraSocial: true,
      
        documentos:[],
        paises: [],
        obrasSociales:[],
        sexos:[],
        
      })
    this.cambioId = this.cambioId.bind(this);
    this.cambioNombre = this.cambioNombre.bind(this);
    this.cambioApellido = this.cambioApellido.bind(this);    
    this.cambioTipoDoc = this.cambioTipoDoc.bind(this);
    this.cambioNroDoc = this.cambioNroDoc.bind(this);
    this.cambioFechaNacimiento = this.cambioFechaNacimiento.bind(this);
    this.cambioFechaAlta = this.cambioFechaAlta.bind(this);
    this.cambioSexo = this.cambioSexo.bind(this);
    this.cambioNacionalidad = this.cambioNacionalidad.bind(this);
    this.cambioTelefono = this.cambioTelefono.bind(this);
    this.cambioMail = this.cambioMail.bind(this);
    this.cambioObraSocial = this.cambioObraSocial.bind(this);
    this.cambioBitAlta = this.cambioBitAlta.bind(this);
  }

  fillCombos = () =>{
    this.comboObrasSociales();
    this.comboTiposDocs();
    this.comboSexos();
    this.comboPaises();
  }  
  
  comboSexos = () =>{
    axios.get(urlSexos).then(resolve => {
      this.setState({
          sexos: resolve.data,
      });
    }, (error) => {
        console.log('Error combo sexo', error.message);
    })

  }

  comboPaises = () =>{
    axios.get(urlPaises).then(resolve => {
      this.setState({
          paises: resolve.data,
      });
    }, (error) => {
        console.log('Error combo paises', error.message);
    })

  }

  comboObrasSociales = () =>{
    axios.get(urlObrasSoc).then(resolve => {
      this.setState({
          obrasSociales: resolve.data,
      });
    }, (error) => {
        console.log('Error combo obras sociales: ', error.message);
    })

  }

  comboTiposDocs = () =>{
    axios.get(urlDocs).then(resolve => {
      this.setState({
          documentos: resolve.data,
      });
    }, (error) => {
        console.log('Error combo paises', error.message);
    })

  }

  componentDidMount() {
    this.fillCombos();
    const api = "/pacientes/id/" + this.props.id ;
    this.handleUpdateClick(api);
  }

  alta(e){
    axios.put(`/pacientes/switch-alta/${this.props.id}`).then(response => {
        alert("Se ha dado de alta al paciente con éxito.");
          this.setState({estado: true})
         
          const api = "/pacientes/id/" + this.props.id ;
          this.handleUpdateClick(api); 
    }, (error) => {
        if(this.state.bitAlta) {
            alert(`No se ha podido dar de alta al paciente ${this.state.nombre} ${this.state.apellido}. Intentelo nuevamente.`)
          }
    })

  }

  cancelar(e){
    e.preventDefault();
    this.setState({
      modificacion: true,
      cambios: false,
      errorNombre: true,
      errorApellido: true,
      errorTipoDoc: true,
      errorNroDoc: true,
      errorSexo: true,
      errorNac: true,
      errorFechaNac: true,
      errorTelefono: true,
      errorMail: true,
      errorObraSocial: true,
    })
    if (this.state.cambios){
      const api = "/pacientes/id/" + this.props.id ;
      this.handleUpdateClick(api);
    }
  }

  habilitarModificacion(e){
    e.preventDefault();
    this.setState ({
      modificacion: false,
      cancelar: false,
    })
  }
  
  modificarPaciente = (e) => {
    e.preventDefault();
    
    const { nombre, apellido, tipoDoc, nroDoc, fechaNacimiento, sexo, nacionalidad, mail, telefono } = this.state;

    const errorNombre = validateNombre(nombre);
    const errorApellido = validateNombre(apellido);
    const errorTipoDoc = validateRequiredCombos(tipoDoc);
    const errorNroDoc = validateNroDocumento(nroDoc, tipoDoc);
    const errorFechaNac = validateFechaNacimiento(fechaNacimiento);
    const errorSexo = validateRequiredCombos(sexo);
    const errorNac = validateRequiredCombos(nacionalidad);
    const errorMail = validateMail(mail);
    const errorTelefono = validateOnlyNumbers(telefono);
   
    var data;
    if ( errorNombre && errorApellido && errorTipoDoc && errorNroDoc && errorFechaNac && errorSexo && errorNac && errorMail && errorTelefono ) {
      if (this.state.obraSocial === null || this.state.obraSocial === ''){
        data = {
          "type": 'com.leloir.backend.domain.Persona',
          "apellido": titleCase(this.state.apellido),
          "bitAlta": this.state.bitAlta,
          "fechaAlta": fechaAltaDateStamp(this.state.fechaAlta),
          "fechaNacimiento": typeof this.state.fechaNacimiento === "string" ? fechaAltaDateStamp(this.state.fechaNacimiento) : getFechaNacimiento(this.state.fechaNacimiento),
          "historial": null,
          "idPaciente": this.state.id,
          "mail": emptyToNull(this.state.mail),
          "nacionalidad": {
            "idPais": getIdPais(this.state.nacionalidad, this.state.paises),
            "iso": getIso(this.state.nacionalidad, this.state.paises),
            "nombre": getNombrePais(this.state.nacionalidad, this.state.paises),
            "nombreBonito": this.state.nacionalidad,
            "iso3": getIso3(this.state.nacionalidad, this.state.paises),
            "codigoTelefono": getCodigoTelefono(this.state.nacionalidad, this.state.paises),
          },
          "nombre": titleCase(this.state.nombre),
          "nroDocumento": this.state.nroDoc,
          "obraSocial": null,
          "sexo": {
            "sexoId": getSexoId(this.state.sexo, this.state.sexos),
            "nombre": this.state.sexo,
          },
          "telefono": emptyToNull(this.state.telefono),
          "tipoDocumento": {
            "idTipoDocumento": getIdTipoDoc(this.state.tipoDoc, this.state.documentos),
            "nombre": this.state.tipoDoc
          }
        }
      } else {
        data = {
            "type": 'com.leloir.backend.domain.Persona',
            "apellido": titleCase(this.state.apellido),
            "bitAlta": this.state.bitAlta,
            "fechaAlta": fechaAltaDateStamp(this.state.fechaAlta),
            "fechaNacimiento": typeof this.state.fechaNacimiento === "string" ? fechaAltaDateStamp(this.state.fechaNacimiento) : getFechaNacimiento(this.state.fechaNacimiento),
            "historial": null,
            "idPaciente": this.state.id,
            "mail": emptyToNull(this.state.mail),
            "nacionalidad": {
              "idPais": getIdPais(this.state.nacionalidad, this.state.paises),
              "iso": getIso(this.state.nacionalidad, this.state.paises),
              "nombre": getNombrePais(this.state.nacionalidad, this.state.paises),
              "nombreBonito": this.state.nacionalidad,
              "iso3": getIso3(this.state.nacionalidad, this.state.paises),
              "codigoTelefono": getCodigoTelefono(this.state.nacionalidad, this.state.paises),
            },
            "nombre": titleCase(this.state.nombre),
            "nroDocumento": this.state.nroDoc,
            "obraSocial": {
              "idObraSocial": getIdObraSocial(this.state.obraSocial, this.state.obrasSociales),
              "razonSocial": this.state.obraSocial,
              "cuit": getCuitObraSocial(this.state.obraSocial, this.state.obrasSociales),
              "domicilio": getDomicilioObraSocial(this.state.obraSocial, this.state.obrasSociales),
              "telefono": getTelefonoObraSocial(this.state.obraSocial, this.state.obrasSociales),
              "email": getEmailObraSocial(this.state.obraSocial, this.state.obrasSociales),
            },
            "sexo": {
              "sexoId": getSexoId(this.state.sexo, this.state.sexos),
              "nombre": this.state.sexo,
            },
            "telefono": emptyToNull(this.state.telefono),
            "tipoDocumento": {
              "idTipoDocumento": getIdTipoDoc(this.state.tipoDoc, this.state.documentos),
              "nombre": this.state.tipoDoc
            }
      };
      }

      const api = '/pacientes/modificar/' + this.props.id;

        axios.put(api, data).then(response => {
            alert('Se ha modificado el paciente con éxito.');
        }, (error) => {
            alert('No se ha podido modificar el paciente.');
            const api = "/pacientes/id/" + this.state.id ;
            this.handleUpdateClick(api);
        })
  
        this.setState({
          modificacion: true,
          cancelar: true,
          cambios: false,
          errorNombre,
          errorApellido,
          errorTipoDoc,
          errorNroDoc, 
          errorFechaNac,
          errorSexo, 
          errorNac,
          errorMail,
          errorTelefono,
        })
      
    } else {
      alert("Revise los datos ingresados.");
      this.setState({
        errorNombre,
        errorApellido,
        errorTipoDoc,
        errorNroDoc, 
        errorFechaNac,
        errorSexo, 
        errorNac,
        errorMail,
        errorTelefono,
      })
    }    

  }
    
  handleUpdateClick = (api) => {
    axios.get(api).then(paciente => {
      this.setState({
        id: paciente.data.idPaciente,
        nombre: paciente.data.nombre,
        apellido: paciente.data.apellido,
        tipoDoc: paciente.data.tipoDocumento.nombre,
        nroDoc: paciente.data.nroDocumento,
        fechaNacimiento: getFechaNacimientoConsulta(paciente.data.fechaNacimiento),
        fechaAlta: getHumanDate(paciente.data.fechaAlta),
        sexo: paciente.data.sexo.nombre,
        nacionalidad: paciente.data.nacionalidad.nombreBonito,
        telefono: paciente.data.telefono,
        mail: paciente.data.mail,
        obraSocial: verificarExistenciaObraSocial(paciente.data.obraSocial),
        bitAlta: paciente.data.bitAlta,    
        isbottonPressed: false,
        estado: paciente.data.bitAlta,
        errorNombre: true,
        errorApellido: true,
        errorTipoDoc: true,
        errorNroDoc: true,
        errorSexo: true,
        errorNac: true,
        errorFechaNac: true,
        errorTelefono: true,
        errorMail: true,
        errorObraSocial: true,
      });
    }, (error) => {
        console.log('Error fetch paciente: ', error.message);
    })

  }

  cambioId(e) {
    this.setState( {
      id: e.target.value,
      valor:false,
    })
  }

  cambioNombre(e) {
    this.setState( {
      nombre: e.target.value,
      cambios: true,
    })
  }

  cambioApellido(e) {
    this.setState( {
      apellido: e.target.value,
      valor:false,
      cambios: true,
    })
  }  

  cambioTipoDoc(e){
    this.setState( {
        tipoDoc: e.target.value,
        cambios: true,
    })
  }

  cambioNroDoc(e) {
    this.setState( {
      nroDoc: e.target.value,
      valor:false,
      cambios: true,
    })
  }

  cambioFechaNacimiento(e){
    this.setState( {
        fechaNacimiento: e,
        cambios: true,
    })
  }

  cambioFechaAlta(e){
      this.setState( {
          fechaAlta: e.target.value
      })
  }

  cambioSexo(e){
    this.setState( {
        sexo: e.target.value,
        cambios: true,
    })
  }

  cambioNacionalidad(e){
    this.setState( {
        nacionalidad: e.target.value,
        cambios: true,
    })
  }

  cambioTelefono(e){
    this.setState( {
        telefono: e.target.value,
        cambios: true,
    })
  }

  cambioMail(e){
      this.setState( {
          mail: e.target.value,
          cambios: true,
      })
  }

  cambioObraSocial(e){
      this.setState( {
          obraSocial: e.target.value,
          cambios: true,
      })
  }

  cambioBitAlta(e){
    this.setState({
      bitAlta: e.target.value,
    })
  }

  
  render() {
    return (
      <div className='Formularios'>
      {this.state.estado === '' ? <CircularProgress size={50}/> : 
      <Form>
          
          <Form.Field required label='Número de Paciente' control='input' 
          disabled={true}  
          value={this.state.id} 
          onChange={this.cambioId} />

          <Form.Field required label='Nombre' control='input' 
          disabled={this.state.modificacion}  
          value={this.state.nombre} 
          onChange={this.cambioNombre}
          className= {this.state.errorNombre === true ? null : 'error'} 
          />

          <Form.Field required label='Apellido' control='input' 
          disabled={this.state.modificacion}  
          value={this.state.apellido} 
          onChange={this.cambioApellido} 
          className= {this.state.errorApellido === true ? null : 'error'} 
          />
          
          <Form.Group widths='equal'>
            <Form.Field required label='Tipo documento' control='select' 
            disabled={this.state.modificacion}  
            value={this.state.tipoDoc} 
            onChange={this.cambioTipoDoc} 
            className= {this.state.errorTipoDoc === true ? null : 'error'} 
            >
              <option value={null}> </option>
              {this.state.documentos.map(item => (
              <option key={item.idTipoDocumento}>{item.nombre}</option>))}
            </Form.Field>

            <Form.Field required label='Número de documento' control='input'  disabled={this.state.modificacion}  
            value={this.state.nroDoc} 
            onChange={this.cambioNroDoc} 
            className= {this.state.errorNroDoc === true ? null : 'error'}
            />
          </Form.Group>

          <Form.Field required label='Fecha alta' control='input' 
          disabled={true} 
          value={this.state.fechaAlta} 
          onChange={this.cambioFechaAlta} 
          />

          <Form.Field required label='Sexo' control='select' 
          disabled={this.state.modificacion} 
          value={this.state.sexo} 
          onChange={this.cambioSexo} 
          className= {this.state.errorSexo === true ? null : 'error'} 
          >
            <option value={null}>  </option>
            {this.state.sexos.map(item => (
            <option key={item.sexoId}>{item.nombre}</option>))}
          </Form.Field>

          <Form.Field required label='Nacionalidad' control='select' 
          disabled={this.state.modificacion} 
          value={this.state.nacionalidad} 
          onChange={this.cambioNacionalidad} 
          className= {this.state.errorNac === true ? null : 'error'}
          >
            <option value={null}>  </option>
            {this.state.paises.map(item => (
            <option key={item.idPais}>{item.nombreBonito}</option>))}
          </Form.Field> 
          
          <Form.Field required 
          disabled={this.state.modificacion} 
          className= {this.state.errorFechaNac === true ? null : 'error'} 
          >
            <label>Fecha de Nacimiento</label>
              <DatePicker selected={Date.parse(this.state.fechaNacimiento)} onChange= {this.cambioFechaNacimiento} 
              peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" 
              maxDate={addDays(new Date(), 0)} 
              dateFormat="yyyy-MM-dd">
              </DatePicker> 
          </Form.Field>

          <Form.Field  label='Telefono' control='input' 
          disabled={this.state.modificacion} 
          value={this.state.telefono || ''} 
          className= {this.state.errorTelefono === true ? null : 'error'} 
          onChange={this.cambioTelefono} 
          />

          <Form.Field  label='Mail' control='input' 
          disabled={this.state.modificacion} 
          value={this.state.mail || ''} 
          className= {this.state.errorMail === true ? null : 'error'} 
          onChange={this.cambioMail} 
          />

          <Form.Field  label='Obra Social' control='select' 
          disabled={this.state.modificacion} 
          value={this.state.obraSocial} 
          onChange={this.cambioObraSocial} 
          className= {this.state.errorObraSocial === true ? null : 'error'} 
          >
            <option value={null}>  </option>
            {this.state.obrasSociales.map(item => (
            <option key={item.idObraSocial}>{item.razonSocial}</option>))}
          </Form.Field> 

          {( !this.state.isbottonPressed && this.state.modificacion && this.state.estado) ? <Button disabled={this.state.isbottonPressed} onClick={(e) => { 
              this.habilitarModificacion(e)} }>Modificar</Button>  : null}

          {(!this.state.estado) ? <Button onClick={(e) => { 
            if (window.confirm('¿Esta seguro que quiere dar de alta al paciente ' + this.state.nombre + ' ' + this.state.apellido + '?')) {  
              this.alta(e)
              } else {e.preventDefault()}} }>Dar de Alta</Button> : null}
            
          {(!this.state.modificacion) ? <Button disabled={this.state.isbottonPressed}  onClick={(e) => { 
            if (window.confirm('¿Esta seguro que quiere modificar al paciente ' + this.state.nombre + ' ' + this.state.apellido + '?')) {  
              this.modificarPaciente(e)
              } else {e.preventDefault()} } }>
            Aceptar
          </Button> : null}           

          {(!this.state.modificacion) ? <Button disabled={this.state.cancelar} onClick={(e) => { 
            this.cancelar(e)} }> X </Button> : null }     
                   
      </Form>  
      }
    </div>
    );
  }

}

export default ConsultaPersona;