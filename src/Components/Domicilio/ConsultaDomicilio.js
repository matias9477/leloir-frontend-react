import React, { Component } from 'react';
import { Button, Form, Icon, Container, Divider, Header } from 'semantic-ui-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import { titleCase, checkAtributo } from '../../Services/MetodosDeValidacion';

import { getFechaDomicilio } from './../../Services/MetodosPaciente';
import NavBar from '../NavBar/NavBar';
import { getPatientsAction } from '../../Redux/patientsDuck';
import { getDomicilioByIdAction, alterDomicilioAction } from '../../Redux/domiciliosDuck';
import { validateRequiredStringNum, validateFechaNacimiento } from './../../Services/MetodosDeValidacion';
import './domicilioStyles.css';

class ConsultaDomicilio extends Component {
  constructor(props) {
    super(props)
    this.state = ({
        cambios: false,

        id:'',
        direccion: '',
        descripcion:'',
        paciente:'',
        fecha: '',

        errorDireccion: true,
        errorDescripcion: true,
        errorPaciente: true,

    })
  }

  componentDidMount() {
    this.props.getDomicilioByIdAction(this.props.match.params.id)
    this.props.getPatientsAction()
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      id: nextProps.domicilio.idDomicilio,
      direccion: nextProps.domicilio.direccion,
      descripcion: nextProps.domicilio.descripcion,
      paciente: nextProps.domicilio.paciente,
      fecha: nextProps.domicilio.fecha,
    })
  }


  modificarDomicilio = (e) => {
    e.preventDefault()

    const { direccion, fecha } = this.state;

    const errorDireccion= validateRequiredStringNum(direccion);
    const errorFecha = validateFechaNacimiento(fecha);

    if (errorDireccion && errorFecha) {
      this.datosModificacion()
    } else {
        alert('Verificar datos ingresados.')
        this.setState({
          errorDireccion,
          errorFecha,
        })
    }
  }

  datosModificacion(){ 
    var data = {
      "idPaciente": this.state.paciente.id || this.state.paciente.idPaciente,
      "direccion": titleCase(this.state.direccion),
      "descripcion": this.state.descripcion,
      "fechaVisita": getFechaDomicilio(this.state.fecha),
    }

    this.props.alterDomicilioAction(this.state.id, data)

    this.setState({
        cambios: false,
    })
  }  

  cambioDireccion = (e) => {
    this.setState( {
      direccion: e.target.value,
      cambios: true,
    })
  }

  cambioDescripcion = (e) => {
    this.setState( {
        descripcion: e.target.value,
        cambios: true,
    })
  }

  cambioPaciente = (e) => {
    this.setState( {
        paciente: e,
        cambios: true,
    })
  }

  cambioFecha = (e) => {
    this.setState( {
      fecha: e,
      cambios: true,
    })
  }

  
  render() {
    return (
      <div>
        <NavBar/>
        <div className='avoidMenu'>

          <Container className='btnHeader'>
            <Button className='boton' as= {Link} to='/domicilios' floated='left' icon labelPosition='left' primary size='small'>
              <Icon name='arrow alternate circle left' /> Volver
            </Button>
          </Container>

          {this.props.fetching ? <CircularProgress size={50}/> :

            <Container>
              <Form size='huge'>                
                <Form.Field control='input' 
                value={this.state.direccion} 
                id = 'headerConsulta'
                className= {this.state.errorDireccion === true ? null : 'error'} 
                />
                <Divider id='divider'/>
                
              </Form>

              <Form className='consulta'>

                <Form.Field required label='Dirección' control='input'
                value={this.state.direccion}
                onChange={this.cambioDireccion}
                className= {this.state.errorDireccion === true ? null : 'error'}
                />

                <Form.Field  label='Descripción' control='input'
                value={this.state.descripcion || ''}
                onChange={this.cambioDescripcion}
                className= {this.state.errorDescripcion === true ? null : 'error'}
                />

              <Form.Field required>
                <label>Fecha a realizarse</label>
                  <DatePicker placeholderText="Fecha"
                  selected={Date.parse(this.state.fecha)}
                  onChange= {this.cambioFecha} 
                  showTimeSelect
                  timeIntervals={15}
                  peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" 
                  minDate={new Date()}
                  dateFormat="dd/MM/yyyy hh:mm aa">
                  </DatePicker>
              </Form.Field>

              <Header as={'h5'} style={{margin: '0'}}>Paciente</Header>
              <Select
                name='pacientes'
                value={this.state.paciente}
                onChange={this.cambioPaciente}
                placeholder= "Busque un paciente..."
                isClearable={false}
                options={this.props.patients}
                getOptionValue={this.getOptionValuePatient}
                getOptionLabel={this.getOptionLabelPatient}
              />

              <br/>

              {(this.state.cambios) ? <Button primary onClick={(e) => {
                if (window.confirm('¿Esta seguro que quiere modificar el domicilio ' + this.state.direccion + '?')) {
                  this.modificarDomicilio(e)
                  } else {window.location.reload(true)} } }>
                Modificar Domicilio
              </Button> : null}

            </Form>
            </Container>
          }
        </div>

    </div>
    )
  }

  getOptionLabelPatient = option => `${option.nombre} ${checkAtributo(option.apellido)}`

  getOptionValuePatient = option => option.id

}

const mapStateToProps = (state, props) => ({
  domicilio: state.domicilios.domicilioById,
  fetching: state.domicilios.fetching,
  patients: state.patients.patients,

})

export default connect(mapStateToProps, { getDomicilioByIdAction, alterDomicilioAction, getPatientsAction })(ConsultaDomicilio)
