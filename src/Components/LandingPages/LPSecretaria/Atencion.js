import React, { Component } from 'react';
import axios from 'axios';
import { Form, Header, Icon, Button, Grid } from 'semantic-ui-react';
import Select from 'react-select';
import {Link} from 'react-router-dom';

import { urlPacientes, urlAnalisisPendientes } from '../../../Constants/URLs';
import { checkAtributo } from '../../../Services/MetodosDeValidacion';
import SelectedPaciente from './PacienteEnAtencion';
import AnalisisPendientes from './AnalisisPendientesAtencion';
import './LPSecretaria.css';

class Atencion extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            patients: [],
            selectedPaciente: '',
            analisisPendientes:[],
        });
    }

    componentDidMount(){
        this.getAllPacientes();
    }


    getAllPacientes = () => {
        axios.get(urlPacientes).then(resolve => {
            this.setState({
                patients: Object.values(resolve.data).flat(),
            });
        }, (error) => {
            console.log('Error en carga de pacientes: ', error.message);
        })
    };
  
    handleChangeListPacientes = selectedPaciente => {
      this.setState({ selectedPaciente })
    }

    getAnalisisPendientes = () =>{
        const paciente = this.find();
        if(paciente!==false && this.state.analisisPendientes.length === 0){
                axios.get(urlAnalisisPendientes+"/"+paciente.id).then(resolve =>{
                    this.setState({
                        analisisPendientes : Object.values(resolve.data).flat(),
                    })
                }, (error) => {
                    console.log('Error en la búsqueda de analisis pendientes: ',error.message);
                })
        }
    };

    find = () => {
        const next = this.props.nextPaciente.text;

        if (next !== undefined || next !== ''){
          
            function isPatient(element, index, array) {
                return (element.nombre === next || (element.nombre + ' ' + element.apellido) === next);
            }

            if (this.state.patients.find(isPatient) !== undefined){
                return this.state.patients.find(isPatient);
            }
            else {
                return false;
            }
            
        }
    }

    getOptionLabelPatient = option => `${option.nombre} ${checkAtributo(option.apellido)}`;

    getOptionValuePatient = option => option.id;

    patientNotFound(){
        if(this.props.nextPaciente !== ""){ 
            this.vaciadoAnalisisPendientes();
            return (
                <div>Paciente no encontrado 
                <br/><br/><br/>
                <Grid columns='equal'>
                    <Grid.Column>
                        <Header as='h5'>Busque el paciente o Registrelo</Header>
                        <Select
                            name='pacientes'
                            value={this.state.selectedPaciente}
                            onChange={this.handleChangeListPacientes}
                            placeholder= "Busque un paciente..."
                            isClearable={true}
                            options={this.state.patients}
                            getOptionValue={this.getOptionValuePatient}
                            getOptionLabel={this.getOptionLabelPatient}
                        />

                    </Grid.Column>
                    <Grid.Column width={5}>
                        <br/>
                        <Button as= {Link} to={{pathname: '/pacientes/add', state: { prevPath: window.location.pathname }}} exact='true' floated='right' icon labelPosition='left' color='twitter' size='small'>
                            <Icon name='user' /> Nuevo Paciente
                        </Button>
                    </Grid.Column>
                </Grid>
                </div>
            )
        }
        
    }

    vaciadoAnalisisPendientes(){
        if(this.state.analisisPendientes.length !== 0){
        this.setState({
            analisisPendientes:[],
        })
    }
    }

    render() {
        console.log(this.state.analisisPendientes);
        return (
            <div>
                <Header as='h2'>Atención</Header>
                <div className="DatosDelPaciente">
                <Form className='formAtencion'>
                    <Form.Field label='Paciente' value={this.props.nextPaciente.text} control='input' />
                    {this.find() === false ? this.patientNotFound() : 
                        <div>
                            
                            <SelectedPaciente selected={this.find()} />
                            {this.getAnalisisPendientes()}

                        </div>
                        }
                    {this.state.analisisPendientes.length>0 ?
                        <div>
                            <AnalisisPendientes pendientes={this.state.analisisPendientes}/>
                        </div>
                    :   null}    
                </Form>
               </div>
            </div>
        );
    }
}

export default Atencion;