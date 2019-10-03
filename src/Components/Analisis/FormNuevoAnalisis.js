import React, { Component } from 'react';
import axios from 'axios';
import { Button, Header, Form, Icon, TextArea, Grid } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import Select from 'react-select';
import CircularProgress from '@material-ui/core/CircularProgress';

import MenuOpciones from '../MenuOpciones';
import { urlDeterminaciones } from '../../Constants/URLs';
import { getCurrentDate } from '../../Services/MetodosPaciente';
import { checkAtributo, validateRequiredCombos } from '../../Services/MetodosDeValidacion';
import './../styles.css';

class FormNuevoAnalisis extends Component {
  constructor(props) {
    super(props);
    this.state = ({
        determinaciones: [],
        pacientes: [],
        muestra: [],

        loading: true,

        selectedPaciente: '',
        selectedDeterminaciones: [],

        pacienteFinal: [],
        determinacionesFinales: [],

        errorPaciente: true,
        errorDeterminaciones: true,
      })
      this.nuevoAnalisis = this.nuevoAnalisis.bind(this);
      this.generarMuestra = this.generarMuestra.bind(this);
      this.getPaciente = this.getPaciente.bind(this);
      this.getDeterminaciones = this.getDeterminaciones.bind(this);
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

  searchPacientes(){
      const nodess = this.state.pacientes.map(({nombre, apellido, nroDocumento, id}) => ({value:`${nombre} ${checkAtributo(apellido)}`, label: `${nombre} ${checkAtributo(apellido)} ${' '} ${checkAtributo(nroDocumento)}`, key: id}));
      return nodess;
  }

  handleChangeListPacientes = selectedPaciente => {
    this.setState({ selectedPaciente })
  }

  searchDeterminaciones(){
    const nodess = this.state.determinaciones.map(({descripcionPractica, codigoPractica}) => ({value: descripcionPractica, label: descripcionPractica, key: codigoPractica}));
    return nodess;
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

  generarMuestra(){
    this.setState({ muestra: [...this.state.muestra, Math.floor(Math.random() * 100)] })
  }

  getPaciente(){
    const url = `/pacientes/id/${this.state.selectedPaciente.key}`;
    axios.get(url).then(resolve => {
      this.setState({
          pacienteFinal: resolve.data,
      });
    }, (error) => {
        console.log('Error get tipo', error.message);
    }) 
  }

  getDeterminaciones(){
    console.log('hol')
    for (var i = 0; i < this.state.selectedDeterminaciones.length; i++) { 
      const url = `/determinaciones/id/${this.state.selectedDeterminaciones[i].key}`;
      axios.get(url).then(resolve => {
        this.setState({ determinacionesFinales: [...this.state.determinacionesFinales, resolve.data] });
      }, (error) => {
          console.log('Error get tipo', error.message);
      }) 
    }
    console.log(this.state.determinacionesFinales)
  }
  
  handleUpdateClick = (api) => {
    var data = {
      "fecha": getCurrentDate(),
      "costo": 0,
      "estado": {
        "estadoId": 3,
        "nombre": "EN PREPARACION",
        "descripcion": null
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
                value={this.state.selectedPaciente}
                options={this.searchPacientes()}
                onChange={this.handleChangeListPacientes}
                placeholder= "Busque un paciente..."
                isClearable={true}
              />
            </Grid.Column>
            <Grid.Column>
              <Button as= {Link} to={{pathname: '/pacientes/add', state: { prevPath: window.location.pathname }}} exact='true' floated='right' icon labelPosition='left' color='twitter' size='small'>
                <Icon name='user' /> Nuevo Paciente
              </Button>
            </Grid.Column>
          </Grid>

          <Header as={'h5'}>Determinaciones a realizar:</Header>
          <Select
            isMulti
            options={this.searchDeterminaciones()}
            onChange={this.handleChangeListDeterminaciones}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder='Seleccione determinaciones...'
            closeMenuOnSelect={false}
          />

          <Header as={'h5'}>Muestra:</Header>
          <Grid columns='equal' >
            <Grid.Column>
              <Button onClick={this.generarMuestra} >Generar Muestra</Button>       
            </Grid.Column>
            <Grid.Column width={13}>
              <TextArea value={this.state.muestra} placeholder='Genere muestra...' style={{ minHeight: 100 }}/>
            </Grid.Column>
          </Grid>

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