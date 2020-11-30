import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {withRouter, Redirect} from 'react-router-dom'
import { Button, Header, Form, Icon, Container,Grid  } from 'semantic-ui-react'
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { titleCase } from '../../Services/MetodosDeValidacion';
import { urlTablaDomicilio } from '../../Constants/NavUrl'
import { checkAtributo } from '../../Services/MetodosDeValidacion';
import { getPatientsAction } from '../../Redux/patientsDuck';
import { addDomicilioAction } from '../../Redux/domiciliosDuck';
import NavBar from '../NavBar/NavBar';
import { getFechaDomicilio } from '../../Services/MetodosPaciente';
import { validateRequiredStringNum, validateFechaNacimiento } from './../../Services/MetodosDeValidacion';
import './domicilioStyles.css';


class AltaDomicilio extends Component {
  constructor(props) {
    super(props);
    this.state = ({
        direccion: '',
        descripcion:'',
        fecha: '',

        selectedPaciente: '',

        errorDireccion: true,
        errorFecha: true,
      });
  }

  componentDidMount(){
    this.props.getPatientsAction()
  }


  handleChangeListPacientes = selectedPaciente => {
    this.setState({ selectedPaciente })
  }

  render(){
    if (!this.props.upToDateAllDomicilios) {
      return <Redirect to={urlTablaDomicilio} />
    }
    return (
      <div>
        <NavBar/>
        <div className='avoidMenu'>
          <Container className='btnHeader' style={{marginBottom: 'inherit'}}>
            <Button className='boton' as= {Link} to={urlTablaDomicilio} exact='true' floated='left' icon labelPosition='left' primary size='small'>
              <Icon name='arrow alternate circle left' /> Volver
            </Button>

            <Header as='h3' dividing>Registrar nuevo domicilio</Header>
          </Container>

          <Form onSubmit={this.nuevoDomicilio} className='altasYConsultas'>

          <Form.Field required label='Dirección' control='input' 
          placeholder='Dirección'
          value={this.state.direccion}
          onChange={this.cambioDireccion}
          className= {this.state.errorDireccion === true ? null : 'error'}
          />
          
          <Form.Field label='Descripción' control='input'
          placeholder='Descripción'
          value={this.state.descripcion}
          onChange={this.cambioDescripcion}
          />

          <Form.Field required className= {this.state.errorFecha === true ? null : 'error'}>
            <label>Fecha a realizarse</label>
              <DatePicker placeholderText="Fecha"
              selected={this.state.fecha} 
              onChange= {this.cambioFecha} 
              peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" 
              minDate={new Date()}
              dateFormat="dd/MM/yyyy">
              </DatePicker>
          </Form.Field>

          <Header as={'h5'} style={{margin: '0'}}>Paciente</Header>
          <Grid.Column width={12}>
            <Select
              name='pacientes'
              value={this.state.selectedPaciente}
              onChange={this.handleChangeListPacientes}
              placeholder= "Busque un paciente..."
              isClearable={false}
              options={this.props.patients}
              getOptionValue={this.getOptionValuePatient}
              getOptionLabel={this.getOptionLabelPatient}
            />
          </Grid.Column>

          <br/>

          <Button as= {Link} to={urlTablaDomicilio} primary type="submit" onClick={this.nuevoDomicilio} className="boton"> Registrar Domicilio</Button >

        </Form>  
          
        </div>
      </div>

    );
  }
  
  handleUpdateClick = (api) => {
    var data = {
      "direccion": titleCase(this.state.direccion),
      "descripcion": this.state.descripcion,
      "idPaciente": this.state.selectedPaciente.id,
      "fechaVisita": getFechaDomicilio(this.state.fecha),
    };

    this.props.addDomicilioAction(data)
    this.vaciadoCampos()
  }

  nuevoDomicilio = (e) => {
    e.preventDefault();

    const { direccion, fecha } = this.state;

    const errorDireccion= validateRequiredStringNum(direccion);
    const errorFecha = validateFechaNacimiento(fecha);

    if (errorDireccion && errorFecha) {
        this.handleUpdateClick()
        this.vaciadoCampos()
    } else {
        alert('Verificar datos ingresados.')
        this.setState({
          errorDireccion,
          errorFecha,
        })
    }
  }

  vaciadoCampos(){
    this.setState( {
      direccion: '',
      descripcion: '',
      selectedPaciente: '',
      fecha: '',
      errorDireccion: true,
      errorFecha: true,
    })
  }
 
  cambioDireccion = (e) => {
    this.setState( {
      direccion: e.target.value
    })
  }

  cambioDescripcion = (e) => {
    this.setState( {
      descripcion: e.target.value
    })
  }  

  cambioFecha = (e) => {
    this.setState( {
      fecha: e
    })
  }  

  getOptionLabelPatient = option => `${option.nombre} ${checkAtributo(option.apellido)}`

  getOptionValuePatient = option => option.id

}

const mapStateToProps = state =>({
  fetching: state.domicilios.fetching,
  patients: state.patients.patients,
  upToDateAllDomicilios: state.domicilios.upToDateAllDomicilios,
})


export default withRouter(connect(mapStateToProps, {getPatientsAction, addDomicilioAction})(AltaDomicilio));