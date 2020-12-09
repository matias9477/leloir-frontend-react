import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import { addDays } from 'date-fns'
import { withRouter, Redirect } from 'react-router-dom'
import { Button, Form, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css'
import Select from 'react-select';

import { getFechaNacimiento, getCurrentDate } from '../../Services/MetodosPaciente'
import { emptyToNull, titleCase, validateNombre, validateOnlyNumbers, validateMail, validateRequiredCombos, validateNroDocumento, validateFechaNacimiento } from './../../Services/MetodosDeValidacion'
import { addPatientAction } from '../../Redux/patientsDuck'
import { getObrasSocialesAction } from '../../Redux/obrasSocialesDuck'
import { getDocumentosAction, getSexosAction, getPaisesAction, getPlanesAction } from '../../Redux/combosDuck'
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
        errorPlan: true,
        errorObraSocial: true,

      })
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      obrasSociales: nextProps.obrasSociales,
      documentos: nextProps.documentos,
      sexos: nextProps.sexos,
      paises: nextProps.paises,
      planes: nextProps.planes,
      nacionalidad: nextProps.paises[9]
    })
  }

  componentDidMount() {
    this.props.getDocumentosAction() 
    this.props.getSexosAction() 
    this.props.getPaisesAction() 
    this.props.getObrasSocialesAction()

  }

  handleUpdateClick = () => {
    var data
    if (this.state.obraSocial === null || this.state.obraSocial === ''){
      data = {
        "type": "com.leloir.backend.domain.Persona",
        "nombre": titleCase(this.state.nombre),
        "apellido": titleCase(this.state.apellido),
        "nroDocumento": this.state.nroDoc,
        "tipoDocumento": {
          "idTipoDocumento": this.state.tipoDoc.idTipoDocumento,
          "nombre": this.state.tipoDoc.nombre
        },
        "fechaNacimiento": getFechaNacimiento(this.state.fechaNacimiento),
        "fechaAlta": getCurrentDate(),
        "sexo": {
          "sexoId": this.state.sexo.sexoId,
          "nombre": this.state.sexo.nombre,
        },
        "nacionalidad": {
          "idPais": this.state.nacionalidad.idPais,
          "iso": this.state.nacionalidad.iso,
          "nombre": this.state.nacionalidad.nombre,
          "nombreBonito": this.state.nacionalidad.nombreBonito,
          "iso3": this.state.nacionalidad.iso3,
          "codigoTelefono": this.state.nacionalidad.codigoTelefono,
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
          "idTipoDocumento": this.state.tipoDoc.idTipoDocumento,
          "nombre": this.state.tipoDoc.nombre
        },
        "fechaNacimiento": getFechaNacimiento(this.state.fechaNacimiento),
        "fechaAlta": getCurrentDate(),
        "sexo": {
          "sexoId": this.state.sexo.sexoId,
          "nombre": this.state.sexo.nombre,
        },
        "nacionalidad": {
          "idPais": this.state.nacionalidad.idPais,
          "iso": this.state.nacionalidad.iso,
          "nombre": this.state.nacionalidad.nombre,
          "nombreBonito": this.state.nacionalidad.nombreBonito,
          "iso3": this.state.nacionalidad.iso3,
          "codigoTelefono": this.state.nacionalidad.codigoTelefono,
        },
        "telefono": emptyToNull(this.state.telefono),
        "mail": emptyToNull(this.state.mail),
        "obraSocial": {
          "idObraSocial": this.state.obraSocial.idObraSocial,
          "razonSocial": this.state.obraSocial.razonSocial,
          "domicilio": '',
          "telefono": this.state.obraSocial.telefono,
          "email": '', //TODO: VER
        },
        "plan":{
            "planId": this.state.plan.planId,
            "nombre":this.state.plan.nombre,
            "bitActivo": true,
        },
        "historial": null,
        "bitAlta": true
    }
    }
       this.props.addPatientAction(data)
  }

  getPaciente = (e) => {
    e.preventDefault()
    
    const { nombre, apellido, tipoDoc, nroDoc, fechaNacimiento, sexo, nacionalidad, mail, telefono, obraSocial, plan } = this.state

    const errorNombre = validateNombre(nombre)
    const errorApellido = validateNombre(apellido)
    const errorTipoDoc = validateRequiredCombos(tipoDoc)
    const errorNroDoc = validateNroDocumento(nroDoc, tipoDoc.nombre)
    const errorFechaNac = validateFechaNacimiento(fechaNacimiento)
    const errorSexo = validateRequiredCombos(sexo)
    const errorNac = validateRequiredCombos(nacionalidad)
    const errorMail = validateMail(mail)
    const errorTelefono = validateOnlyNumbers(telefono)
    const errorObraSocial = validateRequiredCombos(obraSocial)
    const errorPlan = validateRequiredCombos(plan)

    if ( errorNombre && errorApellido && errorTipoDoc && errorNroDoc && errorFechaNac && errorSexo && errorNac && errorMail && errorTelefono && errorObraSocial && errorPlan ) {
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
        errorObraSocial,
        errorPlan,
      })
    }    
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
        tipoDoc: e
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
        sexo: e
    })
  }

  cambioNacionalidad = (e) => {
    this.setState( {
        nacionalidad: e
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
        obraSocial: e,
        plan: '',
    })

    this.props.getPlanesAction(e.idObraSocial)
  }  
  
  cambioPlan = (e) => {
    this.setState({
      plan: e
    })
  }

  render(){
    if (!this.props.upToDateAllPatients) {
      return <Redirect to={{pathname: (this.props.location.state.prevPath
        ), state: { prevPath: window.location.pathname }}} />
    }
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
        </Form>

        <label className={this.state.errorTipoDoc ? 'labelsSelect' : 'labelsSelectError'}>Tipo Documento <span>*</span></label>
        <Select
          name='Tipo Documento'
          styles={this.state.errorTipoDoc === true ? '' : styleErrorSelect}
          value={this.state.tipoDoc}
          onChange={this.cambioTipoDoc}
          placeholder= "Seleccione tipo de documento"
          options={this.state.documentos}
          getOptionValue={this.getOptionValueTipoDoc}
          getOptionLabel={this.getOptionLabelTipoDoc}
        />
        
        <Form>
          <Form.Field required label='Número de Documento' control='input'
          maxLength={this.state.tipoDoc.nombre === "Documento Nacional de Identidad" ? "8" : '11'}
          placeholder='Ingrese el número sin puntos' 
          value={this.state.nroDoc} 
          onChange={this.cambioNroDoc} 
          className= {this.state.errorNroDoc === true ? null : 'error'} 
          />
        </Form>

        <label className={this.state.errorSexo ? 'labelsSelect' : 'labelsSelectError'}>Sexo <span>*</span></label>
        <Select
          name='Sexo'
          styles={this.state.errorSexo === true ? '' : styleErrorSelect}
          value={this.state.sexo}
          onChange={this.cambioSexo}
          placeholder= "Seleccione el sexo"
          options={this.state.sexos}
          getOptionValue={this.getOptionValueSexos}
          getOptionLabel={this.getOptionLabelSexos}
        /> 
        
        <label className={this.state.errorNac ? 'labelsSelect' : 'labelsSelectError'}>Nacionalidad <span>*</span></label>
        <Select
          name='Nacionalidad'
          styles={this.state.errorNac === true ? '' : styleErrorSelect}
          value={this.state.nacionalidad}
          onChange={this.cambioNacionalidad}
          placeholder= "Seleccione nacionalidad"
          options={this.state.paises}
          getOptionValue={this.getOptionValuePaises}
          getOptionLabel={this.getOptionLabelPaises}
        /> 

        <Form>
          <Form.Field required className= {this.state.errorFechaNac === true ? null : 'error'}>
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

        </Form>

          <label className={this.state.errorObraSocial ? 'labelsSelect' : 'labelsSelectError'}>Obra Social <span>*</span></label>
          <Select
            name='Obras Sociales'
            styles={this.state.errorObraSocial === true ? '' : styleErrorSelect}
            value={this.state.obraSocial}
            onChange={this.cambioObraSocial}
            placeholder= "Seleccione obra social"
            options={this.state.obrasSociales}
            getOptionValue={this.getOptionValueOS}
            getOptionLabel={this.getOptionLabelOS}
          />

          <label className={this.state.errorPlan ? 'labelsSelect' : 'labelsSelectError'}>Plan <span>*</span></label>
          <Select
            name='Planes'
            styles={this.state.errorPlan === true ? '' : styleErrorSelect}
            value={this.state.plan}
            onChange={this.cambioPlan}
            placeholder= "Seleccione plan"
            options={this.state.planes}
            getOptionValue={this.getOptionValuePlanes}
            getOptionLabel={this.getOptionLabelPlanes}
          />
          
          <br/>

          <Button primary onClick={this.getPaciente} className="boton" > Registrar Paciente</Button >

      </div>

    )
  }

  getOptionLabelTipoDoc = option => option.nombre;
  getOptionValueTipoDoc= option => option.idTipoDocumento;

  getOptionLabelSexos = option => option.nombre;
  getOptionValueSexos= option => option.sexoId;

  getOptionLabelPaises = option => option.nombre;
  getOptionValuePaises = option => option.idPais;

  getOptionLabelOS = option => option.razonSocial;
  getOptionValueOS = option => option.idObraSocial;

  getOptionLabelPlanes = option => option.nombre;
  getOptionValuePlanes = option => option.planId;

}

const styleErrorSelect = { 

  indicatorsContainer: base => ({
  ...base,
  background: '#FDF1F1',
  }),

  valueContainer: base => ({
    ...base,
    background: '#FDF1F1',
    borderStyle: '#FBEBEB',
    margin: 0,
    width: '100%',
  }),
}


const mapStateToProps = state =>({
  fetching: state.combos.fetching,
  upToDateAllPatients: state.patients.upToDateAllPatients,
  obrasSociales: state.obrasSociales.obrasSociales,
  documentos: state.combos.documentos,
  sexos: state.combos.sexos,
  paises: state.combos.paises,
  planes: state.combos.planes,
})

export default withRouter(connect(mapStateToProps,{ addPatientAction, getDocumentosAction, getSexosAction, getPaisesAction, getPlanesAction, getObrasSocialesAction })(AltaPersona))