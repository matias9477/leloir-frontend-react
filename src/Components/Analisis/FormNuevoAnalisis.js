import React, { Component } from 'react';
import axios from 'axios';
import { Button, Header, Form, Icon, Grid, Radio, Container } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import Select from 'react-select';
import CircularProgress from '@material-ui/core/CircularProgress';

import MenuOpciones from '../MenuOpciones';
import { urlDeterminaciones } from '../../Constants/URLs';
import { checkAtributo, validateRequiredCombos } from '../../Services/MetodosDeValidacion';
import SelectedPaciente from './SelectedPaciente';
import './../styles.css';

class FormNuevoAnalisis extends Component {
  constructor(props) {
    super(props);
    this.state = ({
        determinaciones: [],
        pacientes: [],

        loading: true,

        selectedPaciente: '',
        selectedDeterminaciones: [],

        checkOrdenMedica: false,
        doctorsName: '',
        ordenDate: '',

        errorPaciente: true,
        errorDeterminaciones: true,
      })
      this.nuevoAnalisis = this.nuevoAnalisis.bind(this);
    }

  componentDidMount(){
    this.getDeteminaciones();
    this.getAllPacientes();
  }

  getDeteminaciones = () => {
    axios.get(urlDeterminaciones).then((response) => {
        this.setState({
          determinaciones: Object.values(response.data).flat(),
          loading: false,
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
        });
    }, (error) => {
        console.log('Error en carga de pacientes: ', error.message);
    })
  };

  handleChangeListPacientes = selectedPaciente => {
    this.setState({ selectedPaciente })
  }

  handleChangeListDeterminaciones = selectedDeterminaciones => {
    this.setState({ selectedDeterminaciones })
  }

  getIconTipo(tipo){
    if (tipo === 'com.leloir.backend.domain.Animal'){
        return 'paw'
    } else if(tipo === 'com.leloir.backend.domain.Persona'){
        return 'user'
    } else if(tipo === 'com.leloir.backend.domain.Institucion'){
        return 'building'
    }
  }
  
  handleUpdateClick = (api) => {
    var data = {
      "costo": 0,
      "derivacion": null,
      "estado": {
        "estadoId": 3,
        "nombre": "EN PREPARACION",
        "descripcion": null
      },
      "determinaciones": [
        {
          "analisis_determinacion_id": 0,
          "determinacion": {
            "bitAlta": true,
            "codigoPractica": 0,
            "descripcionPractica": "string",
            "unidadBioquimica": 0,
            "unidadMedida": "string"
          },
          "resultado": 0
        }
      ],
      "ordenMedica": {
        "descripcion": "string",
        "fecha": "2019-10-13T21:25:51.159Z",
        "ordenMedicaId": 0
      },
      "paciente": {
        "bitAlta": this.state.selectedPaciente.bitAlta,
        "fechaAlta": this.state.selectedPaciente.fechaAlta,
        "historial": this.state.selectedPaciente.historial,
        "idPaciente": this.state.selectedPaciente.id,
        "mail": this.state.selectedPaciente.mail,
        "telefono": this.state.selectedPaciente.telefono
      },
      "secretaria": {
        "empleadoId": 1,
        "nombre": "Juan Carlos",
        "apellido": "Simes",
        "tipoDocumento": {
          "idTipoDocumento": 2,
          "nombre": "Pasaporte"
        },
        "nroDocumento": "89798",
        "fechaNacimiento": "2018-08-08T00:00:00",
        "fechaAlta": "2019-06-20T00:00:00",
        "nacionalidad": {
          "idPais": 10,
          "iso": "AR",
          "nombre": "ARGENTINA",
          "nombreBonito": "Argentina",
          "iso3": "ARG",
          "codigoTelefono": 54
        },
        "sexo": {
          "sexoId": 1,
          "nombre": "Masculino"
        },
        "telefono": null,
        "mail": null,
        "usuarioId": null,
        "rolId": null,
        "bitAlta": true
      },
      "tecnico": {
        "empleadoId": 1,
        "nombre": "Juan Carlos",
        "apellido": "Simes",
        "tipoDocumento": {
          "idTipoDocumento": 2,
          "nombre": "Pasaporte"
        },
        "nroDocumento": "89798",
        "fechaNacimiento": "2018-08-08T00:00:00",
        "fechaAlta": "2019-06-20T00:00:00",
        "nacionalidad": {
          "idPais": 10,
          "iso": "AR",
          "nombre": "ARGENTINA",
          "nombreBonito": "Argentina",
          "iso3": "ARG",
          "codigoTelefono": 54
        },
        "sexo": {
          "sexoId": 1,
          "nombre": "Masculino"
        },
        "telefono": null,
        "mail": null,
        "usuarioId": null,
        "rolId": null,
        "bitAlta": true
      },
    };

    axios.post(api, data).then((response) => {
        alert('Se registro el análisis con éxito.'); 
        //this.vaciadoCampos();
      }, (error) => {
          alert('No se ha podido registrar el análisis.');
      })
  } 

  nuevoAnalisis(e){
    e.preventDefault();
    const { selectedPaciente, selectedDeterminaciones } = this.state;

    const errorPaciente = validateRequiredCombos(selectedPaciente);
    const errorDeterminaciones = validateRequiredCombos(selectedDeterminaciones);
    
    if ( errorPaciente && errorDeterminaciones ) {
      const api = '/analisis/add';
      this.handleUpdateClick(api);
    } else {
      alert("Revise los datos ingresados.");
      this.setState({
        errorPaciente: false,
        errorDeterminaciones: false,
      })
    }    
  }

  getOptionLabelPatient = option => `${option.nombre} ${checkAtributo(option.apellido)}`;

  getOptionValuePatient = option => option.id;

  getOptionLabelDeterminaciones = option => option.descripcionPractica;

  getOptionValueDeterminaciones = option => option.codigoPractica;

  handleOrden = (e) => {
    this.setState({ checkOrdenMedica: !this.state.checkOrdenMedica })
  }

  handleOrdenDate = (e) => {
    this.setState({ ordenDate: e })
  }

  handleDoctorsName = (e) => {
    this.setState({ doctorsName: e.target.value })
  }

  render() {
    return (
      <div className='union'>
        <MenuOpciones/>
        {this.state.loading ? <CircularProgress className={'centeredPosition'} size={50}/> : 
        <Form  className="btnHeader">
          <Header as='h2'>Registrar nuevo Análisis</Header>
          
          <Header as={'h5'}>Paciente:</Header>
          <Grid columns='equal' >
            <Grid.Column width={12}>
              <Select
                name='pacientes'
                value={this.state.selectedPaciente}
                onChange={this.handleChangeListPacientes}
                placeholder= "Busque un paciente..."
                isClearable={true}
                options={this.state.pacientes}
                getOptionValue={this.getOptionValuePatient}
                getOptionLabel={this.getOptionLabelPatient}
              />
            </Grid.Column>
            <Grid.Column>
              <Button as= {Link} to={{pathname: '/pacientes/add', state: { prevPath: window.location.pathname }}} exact='true' floated='right' icon labelPosition='left' color='twitter' size='small'>
                <Icon name='user' /> Nuevo Paciente
              </Button>
            </Grid.Column>
          </Grid>

          <SelectedPaciente selected={this.state.selectedPaciente}/>

          <Header as={'h5'}>Determinaciones a realizar:</Header>
          <Select
            isMulti
            options={this.state.determinaciones}
            onChange={this.handleChangeListDeterminaciones}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder='Seleccione determinaciones...'
            closeMenuOnSelect={false}
            getOptionValue={this.getOptionValueDeterminaciones}
            getOptionLabel={this.getOptionLabelDeterminaciones}
          />

          <br/> <br/>
          <Button primary size='small' onClick={this.nuevoAnalisis}> 
            Registrar Análisis
          </Button>  
          
        </Form>
        }

        
      </div>
    );
  }

}


export default FormNuevoAnalisis;