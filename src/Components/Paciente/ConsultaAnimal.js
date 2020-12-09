import React, { Component } from 'react';
import axios from 'axios';
import { Button,  Form, Container } from 'semantic-ui-react';
import Select from 'react-select';
import { connect } from 'react-redux';

import { emptyToNull, titleCase, validateNombre, validateOnlyNumbers, validateMail, validateRequiredCombos  } from './../../Services/MetodosDeValidacion';
import { urlTiposAnimales } from './../../Constants/URLs';
import { getHumanDate } from '../../Services/MetodosPaciente';
import { getIdTipoAnimal } from '../../Services/MetodosPaciente';
import { fechaAltaDateStamp  } from './../../Services/MetodosPaciente';
import { switchAltaAction, alterPatientAction, getPatientByIdAction } from '../../Redux/patientsDuck';
import { getTiposAnimalesAction } from '../../Redux/combosDuck'
import './patientsStyle.css';

class ConsultaAnimal extends Component {
  constructor(props) {
    super(props)
    this.state = ({      
        cambios: false,

        id:'',
        nombre: '',
        propietario: '',
        tipo: '',
        telefono:'',
        mail:'',
        bitAlta: '',
        fechaAlta: '',

        tipos:[],
        
        errorNombre: true,
        errorTelefono: true,
        errorTipo: true,
        errorPropietario: true,
        errorMail: true,
    })
  }

  componentDidMount() {
    this.props.getTiposAnimalesAction()
    this.props.getPatientByIdAction(this.props.patientId)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      id: nextProps.patient.idPaciente,
      nombre: nextProps.patient.nombre,
      propietario: nextProps.patient.propietario,
      tipo: nextProps.patient.tipoAnimal,
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
    
    const { nombre, tipo, propietario, mail, telefono } = this.state

    const errorNombre = validateNombre(nombre)
    const errorTipo = validateRequiredCombos(tipo)
    const errorPropietario = validateNombre(propietario)
    const errorMail = validateMail(mail)
    const errorTelefono = validateOnlyNumbers(telefono)

    this.setState({
      errorNombre,
      errorTipo,
      errorPropietario,
      errorMail,
      errorTelefono,
    })

    if ( errorNombre && errorTipo && errorPropietario && errorMail && errorTelefono ) {
        var data = {
            "type": 'com.leloir.backend.domain.Animal',
            "idPaciente": this.state.id,
            "bitAlta": true,
            "historial": null,
            "mail": emptyToNull(this.state.mail),
            "nombre": titleCase(this.state.nombre),
            "propietario": titleCase(this.state.propietario),
            "telefono": emptyToNull(this.state.telefono),
            "fechaAlta": fechaAltaDateStamp(this.state.fechaAlta),
            "tipoAnimal": {
                "nombre": this.state.tipo.nombre,
                "tipoAnimalId": this.state.tipo.tipoAnimalId
            },
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

  cambioTipo = (e) => {
    this.setState( {
      tipo: e,
      cambios: true,
    })
  }  

  cambioPropietario = (e) => {
    this.setState( {
        propietario: e.target.value,
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

  cambioBitAlta = (e) =>{
    this.setState({
      bitAlta: e.target.value,
    })
  }

  render(){
    return(
      <div>
        <Container>        
          <Form>
            <Form.Group widths='equal'>
                <Form.Field required id='disabled' label='Número' control='input' width={5}
                value={this.state.id}  />

                <Form.Field required id='disabled' label='Fecha alta' control='input' 
                value={this.state.fechaAlta}/>
              </Form.Group>

              <Form.Group widths='equal'>
                <Form.Field required label='Nombre Animal' control='input' 
                value={this.state.nombre} 
                onChange={this.cambioNombre} 
                className= {this.state.errorNombre === true ? null : 'error'} 
                />
                  
                  <Form.Field required label='Propietario' control='input' 
                value={this.state.propietario} 
                onChange={this.cambioPropietario} 
                className= {this.state.errorPropietario === true ? null : 'error'} 
                />
              </Form.Group>

              <label className={this.state.errorTipo ? 'labelsSelect' : 'labelsSelectError'}>Tipo Animal <span>*</span></label>
              <Select
                name='Tipo Animal'
                styles={this.state.errorTipo === true ? '' : styleErrorSelect}
                value={this.state.tipo}
                onChange={this.cambioTipo}
                placeholder= "Seleccione tipo animal"
                options={this.props.tiposAnimales}
                getOptionValue={this.getOptionValueTipos}
                getOptionLabel={this.getOptionLabelTipos}
              />          

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

              <br/>
                <Button color={this.state.bitAlta ? 'red' : 'green'}
                onClick={(e) => {
                if (window.confirm('¿Esta seguro que quiere cambiar el estado del paciente ' + this.state.nombre + '?')) {
                    this.alta(e) }
                else {e.preventDefault()}} }
                >{this.mensajeBtnSwitchAlta()}</Button>
                
              {(this.state.cambios && this.state.bitAlta) ? <Button primary onClick={(e) => { 
                if (window.confirm('¿Esta seguro que quiere modificar al paciente ' + this.state.nombre + '?')) {  
                  this.modificarPaciente(e)
                } else {window.location.reload(true)} } } > 
                Modificar Paciente
              </Button> : null}        

          </Form>  
        </Container>
    </div>
    )
  }

  getOptionLabelTipos = option => option.nombre;
  getOptionValueTipos = option => option.tipoAnimalId;

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

const mapStateToProps = (state) =>({
  patient: state.patients.patient,
  tiposAnimales: state.combos.tiposAnimales,
  fetchingCombos: state.combos.fetching,
})


export default connect(mapStateToProps,{switchAltaAction, alterPatientAction, getPatientByIdAction, getTiposAnimalesAction})(ConsultaAnimal)
