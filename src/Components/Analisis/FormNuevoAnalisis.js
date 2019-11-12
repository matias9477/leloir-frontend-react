import React, { Component } from 'react';
import axios from 'axios';
import { Button, Header, Form, Icon, Grid } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import Select from 'react-select';
import CircularProgress from '@material-ui/core/CircularProgress';
import {getIdObraSocial, getIdPlan} from '../../Services/MetodosPaciente'
import MenuOpciones from '../MenuOpciones';
import { urlDeterminaciones, urlPacientesEnAlta } from '../../Constants/URLs';
import { checkAtributo, validateRequiredCombos } from '../../Services/MetodosDeValidacion';
import SelectedPaciente from './SelectedPaciente';
import './../styles.css';

class FormNuevoAnalisis extends Component {
  constructor(props) {
    super(props);
    this.state = ({
        determinaciones: [],
        pacientes: [],
        obrasSociales: [],
        planes: [],
        precio:'',

        loading: true,

        selectedPaciente: '',
        selectedDeterminaciones: [],

        errorPaciente: true,
        errorDeterminaciones: true,
      })
      this.nuevoAnalisis = this.nuevoAnalisis.bind(this);
      this.getPrecioAnalisis = this.getPrecioAnalisis.bind(this);
    }

  componentDidMount(){
    this.getDeteminaciones();
    this.getAllPacientes();
    this.getAllObrasSociales();
  }

  getAllObrasSociales(){
    axios.get("/obras_sociales/all").then(resolve => {
      this.setState({
        obrasSociales: Object.values(resolve.data).flat(),
      });
    }, (error) => {
      console.log('Error en la carga de obras sociales: ',error.message);
    })
  }

  getAllPlanes(){
    if(this.state.planes.length === 0 && this.state.selectedDeterminaciones.length !==0){
    axios.get("/obras_sociales/planes/"+getIdObraSocial(this.state.selectedPaciente.obraSocial,this.state.obrasSociales)).then(resolve => {
      this.setState({
        obrasSociales: Object.values(resolve.data).flat(),
      });
    }, (error) => {
      console.log('Error en la carga de obras sociales: ',error.message);
    })
  } 
  }
  
  componentDidUpdate(){
    this.getAllPlanes();
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

  handleChangeListDeterminaciones = selectedDeterminaciones => {
    this.setState({ selectedDeterminaciones })
  }
  
  handleUpdateClick = (api) => {
    var data = {
      "idPaciente": this.state.selectedPaciente.id,
      "codigoPracticaDeterminaciones": this.listIdDets(this.state.selectedDeterminaciones),
    };

    axios.post(api, data).then((response) => {
        alert('Se registro el análisis con éxito.'); 
        this.props.history.push("/analisis");
        
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

  getPrecioAnalisis(){
    window.confirm(`El precio del análisis es 215`);
}

  getOptionLabelPatient = option => `${option.nombre} ${checkAtributo(option.apellido)}`;

  getOptionValuePatient = option => option.id;

  getOptionLabelDeterminaciones = option => `${option.codigoPractica} ${option.descripcionPractica}`;

  getOptionValueDeterminaciones = option => option.codigoPractica;

  listIdDets(dets) {
    let list = [];
    for (let i=0; i<dets.length; i+=1) {
     list.push(dets[i].codigoPractica);
    }
    return list;
  }


  render() {
    return (
      <div className='union'>
        <MenuOpciones/>
        {this.state.loading ? <CircularProgress className={'centeredPosition'} size={50}/> : 
        <Form  className="btnHeader">
          <Button className='boton' as= {Link} to='/analisis' exact='true' floated='left' icon labelPosition='left' primary size='small'>
            <Icon name='arrow alternate circle left' /> Volver
          </Button>
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
          <Button primary size='small' onClick={this.getPrecioAnalisis}>Consultar Precio</Button>
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