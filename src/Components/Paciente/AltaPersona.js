import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import { addDays } from 'date-fns'
import {withRouter} from 'react-router-dom'
import { Button, Form, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css'

import {urlDocs, urlObrasSoc,urlPaises,urlSexos} from '../../Constants/URLs'
import { getIdPlan, getIdTipoDoc, getFechaNacimiento, getCurrentDate, getSexoId, getIdPais, getIso, getNombrePais, getIso3, getCodigoTelefono, getIdObraSocial, getCuitObraSocial, getDomicilioObraSocial, getTelefonoObraSocial, getEmailObraSocial } from '../../Services/MetodosPaciente'
import { emptyToNull, titleCase, validateNombre, validateOnlyNumbers, validateMail, validateRequiredCombos, validateNroDocumento, validateFechaNacimiento } from './../../Services/MetodosDeValidacion'
import { addPatientAction } from '../../Redux/patientsDuck'
import './patientsStyle.css'

class AltaPersona extends Component {
  constructor(props) {
    super(props)
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
        plan:'',

        documentos:[],
        paises: [],
        obrasSociales:[],
        planes:[],
        sexos:[],

        errorNombre: true,
        errorApellido: true,
        errorTipoDoc: true,
        errorNroDoc: true,
        errorSexo: true,
        errorNac: true,
        errorFechaNac: true,
        errorMail: true,
        errorTelefono: true,
        modObraSocial: true,

      })
  }
  
  fillCombos = () =>{
    this.comboObrasSociales()
    this.comboTiposDocs()
    this.comboSexos()
    this.comboPaises()
    this.comboPlanes()
  }  

  comboSexos = () =>{
    axios.get(urlSexos).then(resolve => {
      this.setState({
          sexos: Object.values(resolve.data).flat(),
      })
    }, (error) => {
        console.log('Error combo sexo', error.message)
    })

  }

  comboPaises = () =>{
    axios.get(urlPaises).then(resolve => {
      this.setState({
          paises: Object.values(resolve.data).flat(),
      })
    }, (error) => {
        console.log('Error combo paises', error.message)
    })

  }

  comboObrasSociales = () =>{
    axios.get(urlObrasSoc).then(resolve => {
      this.setState({
          obrasSociales: Object.values(resolve.data).flat(),
      })
    }, (error) => {
        console.log('Error combo obras sociales: ', error.message)
    })

  }

  comboPlanes = () =>{
    if(this.state.planes.length === 0 && this.state.obraSocial !== ''){
    axios.get('/obras_sociales/planes/' + getIdObraSocial(this.state.obraSocial,this.state.obrasSociales)).then(resolve => {
         this.setState({
           planes: Object.values(resolve.data).flat(),
         })
        }, (error) => {
            console.log('Error combo planes: ', error.message)
        })
      }
  }

  comboTiposDocs = () =>{
    axios.get(urlDocs).then(resolve => {
      this.setState({
          documentos: Object.values(resolve.data).flat(),
      })
    }, (error) => {
        console.log('Error combo tipo documentos', error.message)
    })

  }

  componentDidUpdate(){
    this.comboPlanes()
  }

  componentDidMount() {
    this.fillCombos()

  }

  handleUpdateClick = (api) => {
    // const url = this.props.location.state.prevPath
    var data
    if (this.state.obraSocial === null || this.state.obraSocial === ''){
      data = {
        "type": "com.leloir.backend.domain.Persona",
        "nombre": titleCase(this.state.nombre),
        "apellido": titleCase(this.state.apellido),
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
        "mail": emptyToNull(this.state.mail),
        "obraSocial": null,
        "plan": null,
        "historial": null,
        "bitAlta": true
    }
    } else {
      data = {
        "type": "com.leloir.backend.domain.Persona",
        "nombre": titleCase(this.state.nombre),
        "apellido": titleCase(this.state.apellido),
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
        "mail": emptyToNull(this.state.mail),
        "obraSocial": {
          "idObraSocial": getIdObraSocial(this.state.obraSocial, this.state.obrasSociales),
          "razonSocial": this.state.obraSocial,
          "cuit": getCuitObraSocial(this.state.obraSocial, this.state.obrasSociales),
          "domicilio": getDomicilioObraSocial(this.state.obraSocial, this.state.obrasSociales),
          "telefono": getTelefonoObraSocial(this.state.obraSocial, this.state.obrasSociales),
          "email": getEmailObraSocial(this.state.obraSocial, this.state.obrasSociales),
        },
        "plan":{
            "planId":getIdPlan(this.state.plan,this.state.planes),
            "nombre":this.state.plan,
            "bitActivo": true,
        },
        "historial": null,
        "bitAlta": true
    }
    }

    this.props.addPatientAction(data)
    this.vaciadoCampos()
    //TODO: implementar direccionamiento a prevpath after success
  }

  getPaciente = (e) => {
    e.preventDefault()
    
    const { nombre, apellido, tipoDoc, nroDoc, fechaNacimiento, sexo, nacionalidad, mail, telefono } = this.state

    const errorNombre = validateNombre(nombre)
    const errorApellido = validateNombre(apellido)
    const errorTipoDoc = validateRequiredCombos(tipoDoc)
    const errorNroDoc = validateNroDocumento(nroDoc, tipoDoc)
    const errorFechaNac = validateFechaNacimiento(fechaNacimiento)
    const errorSexo = validateRequiredCombos(sexo)
    const errorNac = validateRequiredCombos(nacionalidad)
    const errorMail = validateMail(mail)
    const errorTelefono = validateOnlyNumbers(telefono)

    if ( errorNombre && errorApellido && errorTipoDoc && errorNroDoc && errorFechaNac && errorSexo && errorNac && errorMail && errorTelefono ) {
      this.handleUpdateClick()
    } else {
      alert('Verifique los datos ingresados.')
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
      plan:'',
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
 
  cambioNombre = (e) => {
    this.setState( {
      nombre: e.target.value
    })
  }

  cambioApellido = (e) => {
    this.setState( {
      apellido: e.target.value
    })
  }  

  cambioTipoDoc = (e) => {
    this.setState( {
        tipoDoc: e.target.value
    })
  } 

  cambioNroDoc = (e) => {
      this.setState( {
        nroDoc: e.target.value
      })
  }

  cambioFechaNacimiento = (e) =>{
    this.setState( {
        fechaNacimiento: e
    })
  }

  cambioSexo = (e) =>{
      this.setState( {
          sexo: e.target.value
      })
  }

  cambioNacionalidad = (e) => {
      this.setState( {
          nacionalidad: e.target.value
      })
  }

  cambioTelefono = (e) => {
    this.setState( {
        telefono: e.target.value
    })
  }

  cambioMail = (e) => {
    this.setState( {
        mail: e.target.value
    })
  }

  cambioObraSocial = (e) => {
      this.setState( {
          obraSocial: e.target.value,
          planes: [],
          modObraSocial: false
        })
  }  
  
  cambioPlan = (e) => {
    this.setState({
      plan: e.target.value
    })
  }

  render(){
    return (
      <div className='altasPacientes'>
        <Header as='h3' dividing>Registrar nuevo Paciente</Header>

        <Form>
          <Form.Group widths='equal'>
            <Form.Field required label='Nombre' control='input'
            placeholder='Nombre' 
            value={this.state.nombre} 
            onChange={this.cambioNombre} 
            className= {this.state.errorNombre === true ? null : 'error'} 
            />

            <Form.Field required label='Apellido' control='input'
            placeholder='Apellido' 
            value={this.state.apellido} 
            onChange={this.cambioApellido} 
            className= {this.state.errorApellido === true ? null : 'error' } 
            />
          </Form.Group>

          <Form.Group>
            <Form.Field required label='Tipo documento' control='select' placeholder ='Tipo documento' width={5}
            value={this.state.tipoDoc} 
            onChange={this.cambioTipoDoc} 
            className= {this.state.errorTipoDoc === true ? null : 'error'} 
            >
                <option value={null}> </option>
                {this.state.documentos.map(item => (
                <option key={item.idTipoDocumento}>{item.nombre}</option>))}
            </Form.Field>

            <Form.Field required label='Número de Documento' control='input'
            maxLength={this.state.tipoDoc === "Documento Nacional de Identidad" ? "8" : '11'} width={11}
            placeholder='Número de documento' 
            value={this.state.nroDoc} 
            onChange={this.cambioNroDoc} 
            className= {this.state.errorNroDoc === true ? null : 'error'} 
            />
          </Form.Group>

            <Form.Field required label='Sexo' control='select' 
            placeholder = 'Sexo'
            value={this.state.sexo} 
            onChange={this.cambioSexo} 
            className= {this.state.errorSexo === true ? null : 'error'} 
            >
              <option value={null}>  </option>
              {this.state.sexos.map(item => (
              <option key={item.sexoId}>{item.nombre}</option>))}
            </Form.Field>

            <Form.Field required label='Nacionalidad' control='select' 
            placeholder = 'Nacionalidad' 
            value={this.state.nacionalidad} 
            onChange={this.cambioNacionalidad} 
            className= {this.state.errorNac === true ? null : 'error'} 
            >
              <option value={null}>  </option>
                {this.state.paises.map(item => (
              <option key={item.idPais}>{item.nombreBonito}</option>))}
            </Form.Field>
         

            <Form.Field required 
            className= {this.state.errorFechaNac === true ? null : 'error'}
            >
              <label>Fecha de Nacimiento</label>
                <DatePicker placeholderText="Fecha de Nacimiento"
                selected={this.state.fechaNacimiento} 
                onChange= {this.cambioFechaNacimiento} 
                peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" 
                maxDate={addDays(new Date(), 0)} 
                dateFormat="yyyy-MM-dd">
                </DatePicker>
            </Form.Field>

          <Form.Group widths='equal'>
            <Form.Field label='Telefono' control='input' 
            placeholder='Teléfono' 
            value={this.state.telefono} 
            onChange={this.cambioTelefono} 
            className= {this.state.errorTelefono === true ? null : 'error' }
            />

            <Form.Field label='E-Mail' control='input' 
            placeholder='E-Mail' 
            value={this.state.mail} 
            onChange={this.cambioMail} 
            className= {this.state.errorMail === true ? null : 'error'} 
            />
          </Form.Group>
          <Form.Group widths='equal'>
          <Form.Field label='Obra Social' control='select' 
          placeholder = 'Obra Social' 
          value={this.state.obraSocial} 
          onChange={this.cambioObraSocial} >
            <option key={null}>  </option>
              {this.state.obrasSociales.map(item => (
            <option key={item.idObraSocial}>{item.razonSocial}</option>))}
          </Form.Field>
          <Form.Field required label='Plan' control='select'
          disabled = {this.state.modObraSocial}
          placeholder = 'Plan' 
          value={this.state.plan} 
          onChange={this.cambioPlan} >
            <option key={null}>  </option>
              {this.state.planes.map(item => (
            <option key={item.planId}>{item.nombre}</option>))}
          </Form.Field>
          </Form.Group>
          <br/>

          <Button primary type="submit" onClick={this.getPaciente} className="boton" > Registrar Paciente</Button >

        </Form>
      </div>

    )
  }

}

const mapStateToProps = state =>({
  fetching: state.patients.fetching,
})

export default connect(mapStateToProps,{addPatientAction})(withRouter(AltaPersona))
