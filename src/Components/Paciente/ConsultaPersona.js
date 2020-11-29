import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';
import { Button, Form, Container, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { urlPlanes } from '../../Constants/URLs'
import { verificarExistenciaPlan,getFechaNacimientoConsulta, verificarExistenciaObraSocial, getHumanDate, getIdPlan} from './../../Services/MetodosPaciente';
import { getIdTipoDoc, getFechaNacimiento, getSexoId, getIdPais, getIso, getNombrePais, getIso3, getCodigoTelefono, getIdObraSocial, getCuitObraSocial, getDomicilioObraSocial, getTelefonoObraSocial, getEmailObraSocial, fechaAltaDateStamp, getAge  } from './../../Services/MetodosPaciente';
import { urlDocs, urlObrasSoc, urlPaises, urlSexos } from '../../Constants/URLs';
import { emptyToNull, titleCase,  validateNombre, validateOnlyNumbers, validateMail, validateRequiredCombos, validateNroDocumento, validateFechaNacimiento } from './../../Services/MetodosDeValidacion';
import { switchAltaAction, alterPatientAction, getPatientByIdAction } from '../../Redux/patientsDuck';
import './patientsStyle.css';

class ConsultaPersona extends Component {
  constructor(props) {
    super(props)
    this.state = ({        
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
        plan:'',
        bitAlta: '',

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
        errorPlan:true,

        documentos:[],
        paises: [],
        obrasSociales:[],
        sexos:[],
        planes:[],
        
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
    if(this.state.planes.length === 0){
    axios.get(urlPlanes + getIdObraSocial(this.state.obraSocial,this.state.obrasSociales)).then(resolve => {
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
        console.log('Error combo paises', error.message)
    })

  }

  componentDidUpdate(){
    this.comboPlanes()
  }

  componentDidMount() {
    this.fillCombos()
    this.props.getPatientByIdAction(this.props.patientId)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      id: nextProps.patient.idPaciente,
      nombre: nextProps.patient.nombre,
      apellido:  nextProps.patient.apellido,
      tipoDoc: nextProps.patient.tipoDocumento.nombre,
      nroDoc: nextProps.patient.nroDocumento,
      fechaNacimiento: getFechaNacimientoConsulta(nextProps.patient.fechaNacimiento),
      sexo: nextProps.patient.sexo.nombre,
      nacionalidad: nextProps.patient.nacionalidad.nombreBonito,
      obraSocial: verificarExistenciaObraSocial(nextProps.patient.obraSocial),
      plan: verificarExistenciaPlan(nextProps.patient.plan),
      telefono: nextProps.patient.telefono,
      mail: nextProps.patient.mail,
      bitAlta: nextProps.patient.bitAlta,
      fechaAlta: getHumanDate( nextProps.patient.fechaAlta),

      cambios: false,
    })
 }

  alta(e){
    this.props.switchAltaAction(this.state.id) 
  }

  modificarPaciente = (e) => {
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
   
    var data
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
          "plan":null,
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
            "plan":{
              "planId":getIdPlan(this.state.plan,this.state.planes),
              "nombre":this.state.plan,
              "bitActivo": true,
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
      }
      }

      this.props.alterPatientAction(this.state.id, data)
  
      this.setState({
        cambios: false,
      })
      
    } else {
      alert("Revise los datos ingresados.")
    }    

  }
  
  cambioNombre = (e) => {
    this.setState( {
      nombre: e.target.value,
      cambios: true,
    })
  }

  cambioApellido = (e) => {
    this.setState( {
      apellido: e.target.value,
      cambios: true,
    })
  }  

  cambioTipoDoc = (e) => {
    this.setState( {
        tipoDoc: e.target.value,
        cambios: true,
    })
  }

  cambioNroDoc = (e) => {
    this.setState( {
      nroDoc: e.target.value,
      cambios: true,
    })
  }

  cambioFechaNacimiento = (e) => {
    this.setState( {
        fechaNacimiento: e,
        cambios: true,
    })
  }

  cambioSexo = (e) =>{
    this.setState( {
        sexo: e.target.value,
        cambios: true,
    })
  }

  cambioNacionalidad = (e) => {
    this.setState( {
        nacionalidad: e.target.value,
        cambios: true,
    })
  }

  cambioTelefono = (e) => {
    this.setState( {
        telefono: e.target.value,
        cambios: true,
    })
  }

  cambioMail = (e) => {
      this.setState( {
          mail: e.target.value,
          cambios: true,
      })
  }

  cambioObraSocial = (e) => {
    this.setState( {
        obraSocial: e.target.value,
        planes: [],
        cambios: true,
      })
  }  

  cambioPlan = (e) => {
    this.setState({
      plan: e.target.value
    })
  }

  cambioBitAlta = (e) => {
    this.setState({
      bitAlta: e.target.value,
    })
  }

  
  render() { 

    return (
      <div>
        <Container>  
          <Form>
              <Form.Group widths='equal'>
                <Form.Field readOnly={true} required id='disabled' label='Número' control='input' width={5}
                value={this.state.id}/>
                
                <Form.Field readOnly={true} required id='disabled' label='Fecha alta' control='input' 
                value={this.state.fechaAlta} />
              </Form.Group>

              <Form.Group widths='equal'>
                <Form.Field required label='Nombre' control='input' 
                value={this.state.nombre} 
                onChange={this.cambioNombre}
                className= {this.state.errorNombre === true ? null : 'error'} 
                />

                <Form.Field required label='Apellido' control='input' 
                value={this.state.apellido} 
                onChange={this.cambioApellido} 
                className= {this.state.errorApellido === true ? null : 'error'} 
                />
              </Form.Group>
              
              <Form.Group>
                <Form.Field required label='Tipo documento' control='select' width={5}
                value={this.state.tipoDoc} 
                onChange={this.cambioTipoDoc} 
                className= {this.state.errorTipoDoc === true ? null : 'error'} 
                >
                  <option value={null}> </option>
                  {this.state.documentos.map(item => (
                  <option key={item.idTipoDocumento}>{item.nombre}</option>))}
                </Form.Field>

                <Form.Field required label='Número de documento' control='input' width={11}
                maxLength={this.state.tipoDoc === "Documento Nacional de Identidad" ? "8" : '11'} 
                value={this.state.nroDoc} 
                onChange={this.cambioNroDoc} 
                className= {this.state.errorNroDoc === true ? null : 'error'}
                />
              </Form.Group>

              <Form.Field required label='Sexo' control='select' 
              value={this.state.sexo} 
              onChange={this.cambioSexo} 
              className= {this.state.errorSexo === true ? null : 'error'} 
              >
                <option value={null}>  </option>
                {this.state.sexos.map(item => (
                <option key={item.sexoId}>{item.nombre}</option>))}
              </Form.Field>

              <Form.Field required label='Nacionalidad' control='select' 
              value={this.state.nacionalidad} 
              onChange={this.cambioNacionalidad} 
              className= {this.state.errorNac === true ? null : 'error'}
              >
                <option value={null}>  </option>
                {this.state.paises.map(item => (
                <option key={item.idPais}>{item.nombreBonito}</option>))}
              </Form.Field> 
              
              <Grid columns={2}>
                <Grid.Column>
                  <Form.Field required 
                  className= {this.state.errorFechaNac === true ? null : 'error'} 
                  >
                    <label>Fecha de Nacimiento</label>
                      <DatePicker selected={Date.parse(this.state.fechaNacimiento)} onChange= {this.cambioFechaNacimiento} 
                      peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" 
                      maxDate={addDays(new Date(), 0)} 
                      dateFormat="yyyy-MM-dd">
                      </DatePicker> 
                  </Form.Field>
                </Grid.Column>
                <Grid.Column>
                  <Form.Field readOnly={true} label='Edad' value={getAge(this.state.fechaNacimiento).toString()} control='input' id='disabled'/>
                </Grid.Column>
              </Grid>

              <Form.Group widths='equal'>
                <Form.Field  label='Telefono' control='input'
                value={this.state.telefono || ''} 
                className= {this.state.errorTelefono === true ? null : 'error'} 
                onChange={this.cambioTelefono} 
                />

                <Form.Field  label='Mail' control='input' 
                value={this.state.mail || ''} 
                className= {this.state.errorMail === true ? null : 'error'} 
                onChange={this.cambioMail} 
                />
              </Form.Group>

              <Form.Group widths='equal'> 
                <Form.Field  label='Obra Social' control='select' 
                value={this.state.obraSocial} 
                onChange={this.cambioObraSocial} 
                className= {this.state.errorObraSocial === true ? null : 'error'} 
                >
                  <option value={null}>  </option>
                  {this.state.obrasSociales.map(item => (
                  <option key={item.idObraSocial}>{item.razonSocial}</option>))}
                </Form.Field>

                <Form.Field  label='Plan' control='select' 
                value={this.state.plan} 
                onChange={this.cambioPlan}  
                >
                  <option value={null}>  </option>
                  {this.state.planes.map(item => (
                  <option key={item.planId}>{item.nombre}</option>))}
                </Form.Field> 
              </Form.Group>
              <br/>

              <Button color={this.state.bitAlta ? 'red' : 'green'}
                onClick={(e) => {
                if (window.confirm('¿Esta seguro que quiere cambiar el estado del paciente ' + this.state.nombre + ' ' + this.state.apellido + '?')) {
                    this.alta(e) }
                else {e.preventDefault()}} }
                >{this.mensajeBtnSwitchAlta()}</Button>
                
              {(this.state.cambios && this.state.bitAlta) ? <Button onClick={(e) => { 
                if (window.confirm('¿Esta seguro que quiere modificar al paciente ' + this.state.nombre + ' ' + this.state.apellido + '?')) {  
                  this.modificarPaciente(e)
                  } else {e.preventDefault()} } } primary>
                Modificar Paciente
              </Button> : null}            
                      
          </Form> 
        </Container>  
    </div>
    )
  }

  mensajeBtnSwitchAlta(){
    if (this.state.bitAlta) {
      return 'Dar de Baja'
    }
    else {
      return 'Dar de Alta'
    }
  }

}

const mapStateToProps = (state, props) =>({
  patient: state.patients.patient,
})
  
export default connect(mapStateToProps,{switchAltaAction, alterPatientAction, getPatientByIdAction})(ConsultaPersona)
  