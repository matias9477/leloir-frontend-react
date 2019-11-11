import React, { Component } from 'react';
import axios from 'axios';
import { Form, Header, Icon, Button, Grid } from 'semantic-ui-react';
import Select from 'react-select';
import {Link} from 'react-router-dom';

import { urlPacientes, urlAnalisisPendientes } from '../../../Constants/URLs';
import { checkAtributo } from '../../../Services/MetodosDeValidacion';
import SelectedPaciente from './PacienteEnAtencion';
import './LPSecretaria.css';

class Atencion extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            patients: [],
            selectedPaciente: '',
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
        if(paciente!==false){
                axios.get(urlAnalisisPendientes+"/"+paciente.id).then(resolve =>{
                    console.log(Object.values(resolve.data).flat())
                    return Object.values(resolve.data).flat();

                }, (error) => {
                    console.log('Error en la búsqueda de analisis pendientes: ',error.message);
                })
        }
        else return null;
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


    render() {
        return (
            <div>
                <Header as='h2'>Atención</Header>
                <div className="DatosDelPaciente">
                <Form className='formAtencion'>
                    <Form.Field label='Paciente' value={this.props.nextPaciente.text} control='input' />
                    {this.find() === false ? this.patientNotFound() : 
                        <div>
                            
                            <SelectedPaciente selected={this.find()} pendientes={this.getAnalisisPendientes()}/>

                        </div>
                        }
                </Form>
               </div>
            </div>
        );
    }
}

export default Atencion;