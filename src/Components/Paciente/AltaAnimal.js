import React, { Component } from 'react'
import {withRouter, Redirect} from 'react-router-dom'
import { Button, Header, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css'
import Select from 'react-select';

import { getCurrentDate, getIdTipoAnimal } from '../../Services/MetodosPaciente'
import { emptyToNull, titleCase, validateNombre, validateOnlyNumbers, validateMail, validateRequiredCombos } from './../../Services/MetodosDeValidacion'
import { addPatientAction } from '../../Redux/patientsDuck'
import { getTiposAnimalesAction } from '../../Redux/combosDuck'
import './patientsStyle.css'

class AltaAnimal extends Component {
  constructor(props) {
    super(props)
    this.state = ({
        nombre: '',
        telefono:'',
        mail:'',
        propietario: '',
        tipo: '',

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
  }

  handleUpdateClick = () => {
    var data = {
        "type": "com.leloir.backend.domain.Animal",
        "bitAlta": true,
        "fechaAlta": getCurrentDate(),
        "historial": null,
        "mail": emptyToNull(this.state.mail),
        "nombre": titleCase(this.state.nombre),
        "propietario": titleCase(this.state.propietario),
        "telefono": emptyToNull(this.state.telefono),
        "tipoAnimal": {
            "nombre": this.state.tipo.nombre,
            "tipoAnimalId": this.state.tipo.tipoAnimalId,
        }
    }

    this.props.addPatientAction(data)
  }

  getPaciente = (e) => {
    e.preventDefault()
    
    const { nombre, tipo, propietario, mail, telefono } = this.state

    const errorNombre = validateNombre(nombre)
    const errorTipo = validateRequiredCombos(tipo)
    const errorPropietario = validateNombre(propietario)
    const errorMail = validateMail(mail)
    const errorTelefono = validateOnlyNumbers(telefono)

    if ( errorNombre && errorTipo && errorPropietario && errorMail && errorTelefono ) {
      this.handleUpdateClick()
    } else {
      alert("Verifique los datos ingresados.")
      this.setState({
        errorNombre,
        errorTipo,
        errorPropietario,
        errorMail,
        errorTelefono,
      })
    }    
  }
 
  cambioNombre = (e) => {
    this.setState( {
      nombre: e.target.value
    })
  }

  cambioTipo = (e) => {
    this.setState( {
      tipo: e
    })
  }  

  cambioPropietario = (e) => {
    this.setState( {
        propietario: e.target.value
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

  render(){
    if (!this.props.upToDateAllPatients) {
      return <Redirect to={{pathname: (this.props.location.state.prevPath
        ), state: { prevPath: window.location.pathname }}}/>
    }
    return (
      <div className='altasPacientes'>
        <Header as='h3' dividing>Registrar nuevo Animal</Header>

        {this.props.fetching ? '' : 
          <Form onSubmit={this.getPaciente}>
            <Form.Group widths='equal'>
              <Form.Field required label='Nombre' control='input' 
              placeholder='Nombre' 
              value={this.state.nombre} 
              onChange={this.cambioNombre} 
              className= {this.state.errorNombre === true ? null : 'error'} 
              />

              <Form.Field required label='Propietario' control='input' placeholder='Propietario' 
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
              <Form.Field label='Telefono' control='input' 
              placeholder='Teléfono' 
              value={this.state.telefono} 
              onChange={this.cambioTelefono} 
              className= {this.state.errorTelefono === true ? null : 'error' } 
              />

              <Form.Field label='E-Mail' control='input' 
              placeholder='E-Mail' value={this.state.mail} 
              onChange={this.cambioMail} 
              className= {this.state.errorMail === true ? null : 'error'} 
              />    
            </Form.Group>  

            <br/>
          
            <Button primary type="submit" onClick={this.getPaciente} className="boton"> Registrar Animal</Button >       

          </Form>  
        }
      </div>

    )
  }

  getOptionLabelTipos = option => option.nombre;
  getOptionValueTipos = option => option.tipoAnimalId;
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
  tiposAnimales: state.combos.tiposAnimales,
})


export default withRouter(connect(mapStateToProps,{ addPatientAction, getTiposAnimalesAction })(AltaAnimal))
