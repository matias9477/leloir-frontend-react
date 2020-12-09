import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';
import { Button, Form, Container, Grid } from 'semantic-ui-react';
import Select from 'react-select';
import { connect } from 'react-redux';

import { getFechaNacimientoConsulta, getHumanDate } from './../../Services/MetodosPaciente';
import { getFechaNacimiento, fechaAltaDateStamp, getAge  } from './../../Services/MetodosPaciente';
import { emptyToNull, titleCase,  validateNombre, validateOnlyNumbers, validateMail, validateRequiredCombos, validateNroDocumento, validateFechaNacimiento } from './../../Services/MetodosDeValidacion';
import { switchAltaAction, alterPatientAction, getPatientByIdAction } from '../../Redux/patientsDuck';
import { getObrasSocialesAltaAction } from '../../Redux/obrasSocialesDuck'
import { getDocumentosAction, getSexosAction, getPaisesAction, getPlanesAction } from '../../Redux/combosDuck'
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


  componentDidMount() {
    this.props.getDocumentosAction() 
    this.props.getSexosAction() 
    this.props.getPaisesAction() 
    this.props.getObrasSocialesAltaAction()
    this.props.getPatientByIdAction(this.props.patientId)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      id: nextProps.patient.idPaciente,
      nombre: nextProps.patient.nombre,
      apellido:  nextProps.patient.apellido,
      tipoDoc: nextProps.patient.tipoDocumento,
      nroDoc: nextProps.patient.nroDocumento,
      fechaNacimiento: getFechaNacimientoConsulta(nextProps.patient.fechaNacimiento),
      sexo: nextProps.patient.sexo,
      nacionalidad: nextProps.patient.nacionalidad,
      obraSocial: nextProps.patient.obraSocial,
      plan: nextProps.patient.plan,
      telefono: nextProps.patient.telefono,
      mail: nextProps.patient.mail,
      bitAlta: nextProps.patient.bitAlta,
      fechaAlta: getHumanDate( nextProps.patient.fechaAlta),

      cambios: false,

      obrasSociales: nextProps.obrasSociales,
      documentos: nextProps.documentos,
      sexos: nextProps.sexos,
      paises: nextProps.paises,
      planes: nextProps.planes,
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
    const errorNroDoc = validateNroDocumento(nroDoc, tipoDoc.nombre)
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
            "idPais": this.state.nacionalidad.idPais,
            "iso": this.state.nacionalidad.iso,
            "nombre": this.state.nacionalidad.nombre,
            "nombreBonito": this.state.nacionalidad.nombreBonito,
            "iso3": this.state.nacionalidad.iso3,
            "codigoTelefono": this.state.nacionalidad.codigoTelefono,
          },
          "nombre": titleCase(this.state.nombre),
          "nroDocumento": this.state.nroDoc,
          "obraSocial": null,
          "plan":null,
          "sexo": {
            "sexoId": this.state.sexo.sexoId,
            "nombre": this.state.sexo.nombre,
          },
          "telefono": emptyToNull(this.state.telefono),
          "tipoDocumento": {
            "idTipoDocumento": this.state.tipoDoc.idTipoDocumento,
            "nombre": this.state.tipoDoc.nombre
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
              "idPais": this.state.nacionalidad.idPais,
              "iso": this.state.nacionalidad.iso,
              "nombre": this.state.nacionalidad.nombre,
              "nombreBonito": this.state.nacionalidad.nombreBonito,
              "iso3": this.state.nacionalidad.iso3,
              "codigoTelefono": this.state.nacionalidad.codigoTelefono,
            },
            "nombre": titleCase(this.state.nombre),
            "nroDocumento": this.state.nroDoc,
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
            "sexo": {
              "sexoId": this.state.sexo.sexoId,
              "nombre": this.state.sexo.nombre,
            },
            "telefono": emptyToNull(this.state.telefono),
            "tipoDocumento": {
              "idTipoDocumento": this.state.tipoDoc.idTipoDocumento,
              "nombre": this.state.tipoDoc.nombre
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
        tipoDoc: e,
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
        sexo: e,
        cambios: true,
    })
  }

  cambioNacionalidad = (e) => {
    this.setState( {
        nacionalidad: e,
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
        obraSocial: e,
        plan: '',
        cambios: true,
    })

    this.props.getPlanesAction(e.idObraSocial)
  }  

  cambioPlan = (e) => {
    this.setState({
        cambios: true,
        plan: e,
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

              <Form.Field required label='Número de Documento' control='input'
              maxLength={this.state.tipoDoc ? (this.state.tipoDoc.nombre === "Documento Nacional de Identidad" ? "8" : '11') : ''}
              placeholder='Ingrese el número sin puntos' 
              value={this.state.nroDoc} 
              onChange={this.cambioNroDoc} 
              className= {this.state.errorNroDoc === true ? null : 'error'} 
              />
 
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

              <br/>
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


  mensajeBtnSwitchAlta(){
    if (this.state.bitAlta) {
      return 'Dar de Baja'
    }
    else {
      return 'Dar de Alta'
    }
  }

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

const mapStateToProps = (state, props) =>({
  patient: state.patients.patient,

  fetching: state.combos.fetching,
  obrasSociales: state.obrasSociales.obrasSocialesAlta,
  documentos: state.combos.documentos,
  sexos: state.combos.sexos,
  paises: state.combos.paises,
  planes: state.combos.planes,
})
  
export default connect(mapStateToProps,{switchAltaAction, alterPatientAction, getPatientByIdAction, getDocumentosAction, getSexosAction, getPaisesAction, getPlanesAction, getObrasSocialesAltaAction})(ConsultaPersona)
  