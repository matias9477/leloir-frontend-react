import React, { Component } from 'react';
import { Button, Icon, Form, Grid } from 'semantic-ui-react';
import {connect} from 'react-redux'

import Cola from './Cola';
import Atencion from './Atencion';
import { titleCase } from '../../../Services/MetodosDeValidacion';
import { getPatientByNombreAction } from '../../../Redux/patientsDuck'
import Extraction from '../LPSecretaria/Extraction'

import './LPSecretaria.css';

let array = JSON.parse(localStorage.getItem('afluence')) || []

class Afluencia extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            patients: JSON.parse(localStorage.getItem('afluence')) || [],
        });
    }

    addPatient = (e) =>{
        if(this._inputElement.value !== "") {
            var newPacient = {
                text: titleCase(this._inputElement.value),
                key: Date.now()
            };
            
            this.setState((prevState) =>{
                return {
                    patients: prevState.patients.concat(newPacient)
                };
            });
            this._inputElement.value = "";
        }

        array.push(newPacient) 
        this.saveStorage('afluence', array)

        e.preventDefault();
    }

    deletePatient = (key) =>{
        var filteredPatients = this.state.patients.filter(
            function (patient) {
            return (patient.key !== key)
        });     

        this.setState({
            patients: filteredPatients
        });

    }

    next = () =>{
        array.shift()
        if (array === [] || array.length === 0){
            localStorage.removeItem('afluence')
        } else {
            this.saveStorage('afluence', array)
        }
        this.props.getPatientByNombreAction(this.state.patients[0].text)
        this.saveStorage('nombreCurrent', this.state.patients[0].text)
        this.deletePatient(this.state.patients[0].key)        
    }

    saveStorage(name, data){
        if (data != null){
             localStorage.setItem(name, JSON.stringify(data))
        }
    }

    render() {
        return (
            <div style={{display: 'flex', flexDirection:'row', width:'100%'}}>

            <div className="afluenciaMain">
                <Grid stackable divided columns={2}>
                    <Grid.Column>
                        <div className="afluenciaHeader">
                            <Form onSubmit={this.addPatient} >
                                <label>Nombre Paciente</label>
                                
                                <div className='union'>

                                    <input ref={(a) => this._inputElement = a} placeholder="Ingrese nombre..."/>
                                    <Button primary icon type="submit">
                                        <Icon name='add user'/>
                                    </Button>

                                </div>  
                            </Form>
                        </div>

                        <Cola entries={this.state.patients}
                            delete={this.deletePatient}
                        />

                        {this.state.patients.length > 0 ? <Button icon labelPosition='right' size='small' onClick={() => this.next()}>
                            <Icon name='arrow alternate circle right outline' color='blue' />Siguiente
                            </Button> : null}

                    </Grid.Column>

                    <Grid.Column>
                        <Atencion currentPatient={this.props.patientLanding} fetching={this.props.fetching}/>

                    </Grid.Column>
                    <Grid.Column>

                    </Grid.Column>
                </Grid>

            </div>
                        <Extraction flag={this.props.fetching}/>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        fetching: state.patients.fetching,
        patientLanding: state.patients.patientLanding
    }
}


export default connect(mapStateToProps, {getPatientByNombreAction})(Afluencia)