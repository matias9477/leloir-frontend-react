import React, { Component } from 'react';
import { Button, Icon, Form, Grid } from 'semantic-ui-react';

import Cola from './Cola';
import Atencion from './Atencion';
import { titleCase } from '../../../Services/MetodosDeValidacion';
import './LPSecretaria.css';


class Afluencia extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            patients: [],
            next: '',
        });
        this.addPatient = this.addPatient.bind(this);
        this.deletePatient = this.deletePatient.bind(this);
        this.next = this.next.bind(this);
    }

    addPatient(e){
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

        e.preventDefault();
    }

    deletePatient(key){
        var filteredPatients = this.state.patients.filter(
            function (patient) {
            return (patient.key !== key)
        });     

        this.setState({
            patients: filteredPatients
        });

    }

    next(){
        this.setState({ next: this.state.patients[0] })
        this.deletePatient(this.state.patients[0].key)        
    }

    render() {
        return (
            <div className="afluenciaMain">
                <Grid width='equal'>
                    <Grid.Column width={5}>
                        <h2>Cola de Espera</h2>
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

                    <Grid.Column width={11}>
                        <Atencion next={this.state.next}/>

                    </Grid.Column>
                </Grid>

            </div>
        );
    }
}

export default Afluencia;