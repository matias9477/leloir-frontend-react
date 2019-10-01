import React, { Component } from 'react';
import axios from 'axios'
import { Button, Header, Form, Icon, Dropdown, TextArea } from 'semantic-ui-react'
import {Link} from 'react-router-dom';

import MenuOpciones from '../MenuOpciones';
import { emptyToNull, titleCase } from '../../Services/MetodosDeValidacion';
import { urlDeterminaciones } from '../../Constants/URLs';
import './../styles.css';

class FormNuevoAnalisis extends Component {
  constructor(props) {
    super(props);
    this.state = ({
        paciente: '',
        muestra: '',
        determinaciones: [],
        pacientes:[],
        pacientesFiltrados:[],
      })
      this.nuevoAnalisis = this.nuevoAnalisis.bind(this);
      this.cambioPaciente = this.cambioPaciente.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
    }

  componentDidMount(){
    this.getDeteminaciones();
    this.getAllPacientes();
  }

  getDeteminaciones = () => {
    axios.get(urlDeterminaciones).then((response) => {
        this.setState({
          determinaciones: Object.values(response.data).flat(),
        });
    }, (error) => {
        console.log('Error en carga de deteminaciones: ', error.message);
    })
  };

  getAllPacientes = () => {
    const urlPacientes = "/pacientes/all";
    axios.get(urlPacientes).then(resolve => {
        this.setState({
            pacientes: Object.values(resolve.data).flat(),
            pacientesFiltrados: Object.values(resolve.data).flat(),
        });
    }, (error) => {
        console.log('Error en carga de pacientes: ', error.message);
    })
  };

  handleSearch(valor) {
    this.setState({
        paciente: valor.target.value,
    });

    const pac = this.state.pacientes.filter(function (paciente) {
        return ((paciente.nombre === undefined ? null : titleCase(paciente.nombre).includes(titleCase(valor.target.value))) || 
            (paciente.apellido === undefined ? null : titleCase(paciente.apellido).includes(titleCase(valor.target.value))) ||
            (paciente.id === undefined ? null : paciente.id.toString().includes(valor.target.value)) ||
            ((paciente.nroDocumento === undefined || paciente.nroDocumento === '-') ? null : paciente.nroDocumento.toString().includes(valor.target.value)));
    });

    this.setState({
        pacientesFiltrados: pac,
    })
  }
  
  handleUpdateClick = (api) => {
    this.handleBlurRazonSocial(); 
    this.handleBlurCuit(); 
    this.handleBlurTelefono(); 
    this.handleBlurMail(); 

    const { errorRazonSocial, errorCuit, errorTelefono, errorMail } = this.state;

    if( errorRazonSocial && errorCuit && errorTelefono && errorMail) {
      var data = {
        "razonSocial": titleCase(this.state.razonSocial),
        "cuit": this.state.cuit,
        "telefono": emptyToNull(this.state.telefono),
        "email": emptyToNull(this.state.mail.toLowerCase()),
        "bitActivo": true
      };

    axios.post(api, data).then((response) => {
        alert('Se registro la obra social ' + titleCase(this.state.razonSocial) + ' con éxito.'); 
        this.vaciadoCampos();
      }, (error) => {
          alert('No se ha podido registrar la obra social.');
        })
    } else{
      alert ('Revise los datos ingresados.')
    }
    
  }

  nuevoAnalisis(e){
    e.preventDefault();
    const { errorRazonSocial, errorCuit, errorMail, errorTelefono  } = this.state;
    
    this.handleBlurRazonSocial()
    this.handleBlurCuit()
    this.handleBlurMail()
    this.handleBlurTelefono()

    if ( errorRazonSocial && errorCuit && errorMail && errorTelefono  ) {
      const api = '/obras_sociales/add';
      this.handleUpdateClick(api);
    } else {
      alert("Revise los datos ingresados.")
    }    
  }

  vaciadoCampos(){
    this.setState( {
        paciente: '',
        determinaciones: [],
        muestra: '',
    })
  }
 
  cambioPaciente(e) {
    this.setState( {
      paciente: e.target.value
    })
  }

  checkApellido(apellido){
    if(apellido !== undefined){
        return apellido;
    } 
    else{
        return '';
    }
  }

  
  renderFormNuevoAnalisis(){
    return (
      <div>
        <Header>Registrar nuevo Análisis</Header>
        <br/>
        <Form>
          <div className='union'>
            <div className='inputBusquedaPacientes'>
              <Form.Field required control='select' search placeholder = 'Busque un paciente' value={this.state.paciente} onChange={this.cambioPaciente}>
                <option value={null}>  </option>
                {this.state.pacientes.map(item => (
                <option key={item.idPaciente}>{item.nombre}{' '}{this.checkApellido(item.apellido)}</option>))}
              </Form.Field>
            </div>

            <Button as= {Link} to='/pacientes/add' exact='true' floated='right' icon labelPosition='left' primary size='small'>
              <Icon name='user' /> Nuevo Paciente
            </Button>
          </div>

          <Header as={'h5'}>Determinaciones a realizar:</Header>
          <Dropdown placeholder='Seleccione determinaciones' fluid multiple selection search options={this.state.determinaciones.map(item => (
              item.descripcionPractica))} 
          />

          <Header as={'h5'}>Muestra:</Header>
          <TextArea placeholder='Ingrese muestra' style={{ minHeight: 100 }} />

          <br/> <br/> <br/>
          <Button floated='right' primary size='small'> 
            Registrar Análisis
          </Button>
          
        </Form>
      </div>
    );
  }


  render() {
    return (
      <div className='union'>
        <MenuOpciones/>
        <div className="Formularios">
          {this.renderFormNuevoAnalisis()}
        </div>
      </div>
    );
  }

}


export default FormNuevoAnalisis;