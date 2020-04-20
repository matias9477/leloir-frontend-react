import React, { Component } from 'react'
import axios from 'axios'
import { Button,  Form, Container, Divider } from 'semantic-ui-react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { connect } from 'react-redux'

import { emptyToNull, titleCase, validateNombre, validateOnlyNumbers, validateMail, validateRequiredCombos  } from './../../Services/MetodosDeValidacion'
import { urlTiposAnimales } from './../../Constants/URLs'
import { getHumanDate } from '../../Services/MetodosPaciente'
import { getIdTipoAnimal } from '../../Services/MetodosPaciente'
import { fechaAltaDateStamp  } from './../../Services/MetodosPaciente'
import { switchAltaAction, alterPatientAction } from '../../Redux/patientsDuck'
import './../styles.css'
import './patientsStyle.css'

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

  comboTipos = () =>{ //TODO: pasa combos a redux
    axios.get(urlTiposAnimales).then(resolve => {
      this.setState({
        tipos: Object.values(resolve.data).flat(),
      })
    }, (error) => {
        console.log('Error combo animales', error.message)
    })

  }

  componentDidMount() {
    this.comboTipos()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      id: nextProps.patient.idPaciente,
      nombre: nextProps.patient.nombre,
      propietario: nextProps.patient.propietario,
      tipo: nextProps.patient.tipoAnimal.nombre,
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
                "nombre": this.state.tipo,
                "tipoAnimalId": getIdTipoAnimal(this.state.tipo, this.state.tipos)
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
      tipo: e.target.value,
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
      <div className='Formularios'>
      {(this.state.id === '') ? <CircularProgress size={50}/> : 
       <Container>
        <Form size='huge'>                
            <Form.Field control='input' 
            value={this.state.nombre} 
            id = 'headerConsulta'
            className= {this.state.errorNombre === true ? null : 'error'} 
            />
            <Divider id={'divider'}/>
            
        </Form>
        
        <Form>
          <Form.Group widths='equal'>
              <Form.Field required id='disabled' label='Número de Paciente' control='input' width={5}
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
               
              <Form.Field required label='Tipo Animal' control='select' 
              value={this.state.tipo} 
              onChange={this.cambioTipo} 
              className= {this.state.errorTipo === true ? null : 'error'} 
              >
                <option value={null}>  </option>
                {this.state.tipos.map(item => (
                <option key={item.tipoAnimalId}>{item.nombre}</option>))}
              </Form.Field>
              </Form.Group>
              <Form.Field required label='Propietario' control='input' 
              value={this.state.propietario} 
              onChange={this.cambioPropietario} 
              className= {this.state.errorPropietario === true ? null : 'error'} 
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

            {(!this.state.bitAlta) ? <Button onClick={(e) => { 
              if (window.confirm('¿Esta seguro que quiere dar de alta al paciente ' + this.state.nombre + '?')) {  
                this.alta(e)
              } else {e.preventDefault()}} }>Dar de Alta</Button> : null}
              
            {(this.state.cambios && this.state.bitAlta) ? <Button primary onClick={(e) => { 
              if (window.confirm('¿Esta seguro que quiere modificar al paciente ' + this.state.nombre + '?')) {  
                this.modificarPaciente(e)
              } else {window.location.reload(true)} } } > 
              Modificar Paciente
            </Button> : null}        

        </Form>  
      </Container>
      }
    </div>
    )
  }

}

const mapStateToProps = (state, props) =>({
})


export default connect(mapStateToProps,{switchAltaAction, alterPatientAction})(ConsultaAnimal)
