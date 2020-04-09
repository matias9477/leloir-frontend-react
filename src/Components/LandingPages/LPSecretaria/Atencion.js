import React, { Component } from 'react';
import axios from 'axios';
import { Form, Header, Icon, Button, Grid, Divider, List, Container } from 'semantic-ui-react';
import Select from 'react-select';
import { Link } from 'react-router-dom';

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
        this.getAllPacientes()
    }

    componentWillReceiveProps(nextProps) {
        this.saveStorage('current', nextProps.currentPatient.pacientes)
    }

    getAllPacientes = () => { //TODO: redux
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
        this.saveStorage('current', selectedPaciente)
    }

    saveStorage(name, data){
        if (data != null){
             localStorage.setItem(name, JSON.stringify(data))
        }
    }

    getAnalisisPendientes = () =>{
        let paciente = JSON.parse(localStorage.current)[0] || JSON.parse(localStorage.current)
        if(paciente!==false && this.state.analisisPendientes.length === 0){
                axios.get(urlAnalisisPendientes+"/"+paciente.id).then(resolve =>{
                    this.setState({
                        analisisPendientes : Object.values(resolve.data).flat(),
                    })
                }, (error) => {
                    console.log('Error en la búsqueda de analisis pendientes: ',error.message);
                })
        }
    }

    getOptionLabelPatient = option => `${option.nombre} ${checkAtributo(option.apellido)}`;

    getOptionValuePatient = option => option.id;

    vaciadoAnalisisPendientes(){
        if(this.state.analisisPendientes.length !== 0){
        this.setState({
            analisisPendientes:[],
        })
    }
    }

    name(){
        let name
        if(JSON.parse(localStorage.current).apellido !== undefined){
            name = JSON.parse(localStorage.current).nombre + ' ' + JSON.parse(localStorage.current).apellido
        }
        else {
            name = JSON.parse(localStorage.current).nombre
        }
        return(
            JSON.parse(localStorage.current).text || name
        )
    }

    clearCurrent(){
        localStorage.removeItem('current')
        window.location.reload(true)
    }
    
    patientNotFound(){
        if(localStorage.current !== "" || localStorage.current != null){ 
            this.vaciadoAnalisisPendientes();
            return (
                <div className='patientNotFound'> 
                    <subtitle  className='patientNotFoundMessage'> Paciente no encontrado </subtitle>
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
        let patient = JSON.parse(localStorage.current)[0] || JSON.parse(localStorage.current)
        this.getAnalisisPendientes()
        return(
            <div> 
                <SelectedPaciente selected={patient} />
            
                {this.state.analisisPendientes.length>0 ?
                            <div>
                                <AnalisisPendientes pendientes={this.state.analisisPendientes}/>
                            </div>
                : null}
            </div>
        )
    }

    moreThan1Patient(){
        return <Container className='moreThanOnePatient'>
            <h4 style={{marginBottom: '30px'}}>Para la búsqueda ingresada se encontraron {JSON.parse(localStorage.current).length} opciones:</h4>

            <div className='moreThanOnePatientScroll'>
            {JSON.parse(localStorage.current).map((patient, index) => (
            <List divided verticalAlign="middle">
                <List.Item >
                    <List.Content floated='right'>
                        <Button style={{marginRight: '20px'}} onClick={() => this.handleOnClickMoreThan1Patient(patient)}>Elegir</Button>
                    </List.Content>
          
                    <List.Content>{this.checkName(patient)}</List.Content>
                </List.Item>
                <hr style={{margin: '0'}}/>
            </List>
            ))}
            </div>
        </Container>
    }

    handleOnClickMoreThan1Patient(patient){
        let aux = []
        aux.push(patient)
        this.saveStorage('current', aux)
        this.setState({
            selected: patient
        })
    }

    checkName = (patient) => {
        let name = patient.nombre
        if(patient.apellido !== undefined){
            name = name + ' ' + patient.apellido
        } 
        return name
    } 
         

    render() {
        return (
            <div className="DatosDelPaciente">
                <Header as='h2'>Atención</Header>
                
                {(localStorage.current !== undefined) ? 
             
                    <Form className='formAtencion'>
                        <Grid columns='equal'>
                           
                            {/* { localStorage.afluence === undefined ?
                             <Grid.Column>
                             <Button onClick={() => this.clearCurrent()}>Finalizar atención</Button>
                            </Grid.Column> : null
                            } */}
                           
                        </Grid>

                        {JSON.parse(localStorage.current) !== undefined ? 
                        (JSON.parse(localStorage.current).length > 1) ? this.moreThan1Patient() : 
                        JSON.parse(localStorage.current).length === 0 ? this.patientNotFound() : this.patientFound() : null}

                        
                        
                    </Form>
                    
                : <div> {'Agrega pacientes a la cola y pulsa el botón siguiente para comenzar a atender' }</div>
                }
               
            </div>
        );
    }
}


export default (Atencion)