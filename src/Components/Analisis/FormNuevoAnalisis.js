import React, { Component } from 'react';
import axios from 'axios'
import { Button, Header, Form, Icon, TextArea } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import Select from 'react-select'

import MenuOpciones from '../MenuOpciones';
import { urlDeterminaciones } from '../../Constants/URLs';
import './../styles.css';

class FormNuevoAnalisis extends Component {
  constructor(props) {
    super(props);
    this.state = ({
        muestra: '',
        determinaciones: [],
        pacientes:[],

        selectedPaciente: '',

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
      const nodess = this.state.pacientes.map(({nombre, apellido, id}) => ({value:`${nombre} ${this.checkApellido(apellido)}`, label: `${nombre} ${this.checkApellido(apellido)}`, key: id}));
      return nodess;
  }

  handleChangeListPacientes = selectedPaciente => {
    this.setState({ selectedPaciente })
  }

  handleUpdateClick = (api) => {
    var data = {
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
    const { errorPaciente, errorDeterminaciones } = this.state;
    
    if ( errorPaciente && errorDeterminaciones ) {
      const api = '/analisis/add';
      this.handleUpdateClick(api);
    } else {
      alert("Revise los datos ingresados.")
    }    
  }

  checkApellido(apellido){
    if(apellido !== undefined){
        return apellido;
    } 
    else{
        return '';
    }
  }


  render() {
    return (
      <div className='union'>
        <MenuOpciones/>
        <div className="btnHeader">
          <Header as='h2'>Registrar nuevo Análisis</Header>
          <br/>
          <Form>
            
            <Header as={'h5'}>Paciente:</Header>
            <div className='union'>
              <Select
                className='inputBusquedaPacientes'
                value={this.state.selectedPaciente}
                options={this.searchPacientes()}
                onChange={this.handleChangeListPacientes}
                placeholder= "Busque un paciente..."
                openMenuOnClick={false}
                isClearable={true}
              />
              <Button as= {Link} to='/pacientes/add' exact='true' floated='right' icon labelPosition='left' primary size='small'>
                <Icon name='user' /> Nuevo Paciente
              </Button>
            </div>

            <Header as={'h5'}>Determinaciones a realizar:</Header>
            <Select
              isMulti
              name="colors"
              options={this.state.determinaciones}
              placeholder= 'Seleccione determinaciones...'
              className="basic-multi-select"
              classNamePrefix="select"
            />

            <Header as={'h5'}>Muestra:</Header>
            <TextArea placeholder='Ingrese muestra...' style={{ minHeight: 100 }} />

            <br/> <br/> <br/>
            <Button floated='right' primary size='small'> 
              Registrar Análisis
            </Button>
            
          </Form>
        </div>
      </div>
    );
  }

}


export default FormNuevoAnalisis;