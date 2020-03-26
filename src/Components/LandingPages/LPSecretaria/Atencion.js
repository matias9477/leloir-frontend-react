import React, { Component } from 'react';
import axios from 'axios';
import { Form, Header, Icon, Button, Grid, Divider } from 'semantic-ui-react';
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
        this.saveStorage('Current', selectedPaciente)
    }

    saveStorage(name, data){
        if (data != null){
             localStorage.setItem(name, JSON.stringify(data))
        }
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
        const next = JSON.parse(localStorage.Current).text || this.name()

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
        if(localStorage.Current !== "" || localStorage.Current != null){ 
            this.vaciadoAnalisisPendientes();
            return (
                <div> 
                <subtitle className='PatientNotFound'> Paciente no encontrado </subtitle>
                <Divider />
                <h4>Búsque el paciente o regístrelo a continuación</h4>
               
                <Grid columns='equal'>
                    <Grid.Column>
                        <br></br>
                        <Select
                            name='pacientes'
                            onChange={this.handleChangeListPacientes}
                            placeholder= "Busque un paciente..."
                            isClearable={false}
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

    patientFound(){
        return(
            <div>
                <SelectedPaciente selected={this.find()} />
                {this.getAnalisisPendientes()}

                {this.state.analisisPendientes.length>0 ?
                            <div>
                                <AnalisisPendientes pendientes={this.state.analisisPendientes}/>
                            </div>
                : null}
            </div>
        )
    }

    vaciadoAnalisisPendientes(){
        if(this.state.analisisPendientes.length !== 0){
        this.setState({
            analisisPendientes:[],
        })
    }
    }

    name(){
        let name
        if(JSON.parse(localStorage.Current).apellido !== undefined){
            name = JSON.parse(localStorage.Current).nombre + ' ' + JSON.parse(localStorage.Current).apellido
        }
        else {
            name = JSON.parse(localStorage.Current).nombre
        }
        return(
            JSON.parse(localStorage.Current).text || name
        )
    }

    clearCurrent(){
        localStorage.removeItem('Current')
    }

    render() {
        return (
            <div className="DatosDelPaciente">
                <Header as='h2'>Atención</Header>
                
                {(localStorage.Current !== undefined) ? 
             
                    <Form className='formAtencion'>
                        <h4>Paciente</h4>
                        <Form.Field value={this.name()} control='input' />

                        <Button onClick={this.clearCurrent}>X</Button>
                        
                        {this.find() === false ? this.patientNotFound() : this.patientFound()
                        }
                    </Form>
                : <div> {'Agrega pacientes a la cola y pulsa el botón siguiente para comenzar a atender' }</div>
                }
               
            </div>
        );
    }
}

export default Atencion;