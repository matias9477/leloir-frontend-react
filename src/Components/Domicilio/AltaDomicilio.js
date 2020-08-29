import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Header, Form, Icon, Container,Grid  } from 'semantic-ui-react'
import Select from 'react-select';
import { addDomicilioAction } from '../../Redux/domiciliosDuck';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import './../styles.css';
import {urlAltaDomicilio, urlDomiciliosTable,urlPacientesEnAlta} from '../../Constants/URLs';


class AltaDomicilio extends Component {
  constructor(props) {
    super(props);
    this.state = ({
        direccion: '',
        descripcion:'',
        pacientes: [],

        selectedPaciente: '',

        errorDireccion: true,
        errorDescripcion: true,
        errorPaciente: true,

      });

  }
  

  componentDidMount(){
    this.getAllPacientes();
  }

  getAllPacientes = () => {
    axios.get(urlPacientesEnAlta).then(resolve => {
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

  renderForm(){
    return (
      <div className='Formularios'>
        <Container className='btnHeader'>
          <Button className='boton' as= {Link} to={urlDomiciliosTable} exact='true' floated='left' icon labelPosition='left' primary size='small'>
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
          className= {this.state.errorDescripcion === true ? null : 'error'}
          />

          <Header as={'h5'}>Paciente:</Header>
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

          <br/>

          <Button as= {Link} to={urlDomiciliosTable} primary type="submit" onClick={this.nuevoDomicilio} className="boton"> Registrar Domicilio</Button >

        </Form>  
      </div>

    );
  }
  
  handleUpdateClick = (api) => {
    var data = {
      "direccion": this.state.direccion,
      "descripcion": this.state.descripcion,
      "idPaciente": this.state.selectedPaciente.id,
      "bitActivo": true
    };

      this.props.addDomicilioAction(data)
      this.vaciadoCampos()
  };

  nuevoDomicilio = (e) => {
    e.preventDefault();

      this.handleUpdateClick(urlAltaDomicilio);
     
  }

  vaciadoCampos(){
    this.setState( {
      direccion: '',
      descripcion: '',
      paciente: '',
      errorDireccion: true,
      errorDescripcion: true,
      errorPaciente: true,
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


  render() {
    return (
      <div className='union'>
        <NavBar/>
        <div className="FormAlta">
          {this.renderForm()}
        </div>
      </div>
    );
  }

}

const mapStateToProps = state =>({
  fetching: state.domicilios.fetching,
})


export default connect(mapStateToProps,{addDomicilioAction})(AltaDomicilio);