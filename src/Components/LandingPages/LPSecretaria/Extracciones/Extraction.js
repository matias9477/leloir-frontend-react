import React, { Component } from 'react';
import { Button, Icon, Form, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux'

import Queue from './Queue';
import Current from './Current'
import { titleCase } from '../../../../Services/MetodosDeValidacion';
import './../LPSecretaria.css';

let array = JSON.parse(localStorage.getItem('extraction')) || []

class Extraction extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            queuers: JSON.parse(localStorage.getItem('extraction')) || [],
        });
    }

    addQueuer = (e) =>{
        if(this._inputElement.value !== "") {
            var newPacient = {
                text: titleCase(this._inputElement.value),
                key: Date.now()
            };
            
            this.setState((prevState) =>{
                return {
                    queuers: prevState.queuers.concat(newPacient)
                };
            });
            this._inputElement.value = "";
        }

        array.push(newPacient) 
        this.saveStorage('extraction', array)

        e.preventDefault();
    }

    deletePatient = (key) =>{
        var filteredqueuers = this.state.queuers.filter(
            function (patient) {
            return (patient.key !== key)
        });     

        this.setState({
            queuers: filteredqueuers
        });

    }

    next = () =>{
        array.shift()
        if (array === [] || array.length === 0){
            localStorage.removeItem('extraction')
        } else {
            this.saveStorage('extraction', array)
        }
        this.saveStorage('nombreCurrentExtraction', this.state.queuers[0].text)
        this.deletePatient(this.state.queuers[0].key)        
    }

    saveStorage(name, data){
        localStorage.setItem(name, JSON.stringify(data))
    }

    render() {
        return (
            <div className="afluenciaMain">
                <Grid stackable divided columns={2}>
                    <Grid.Column>
                        <div className="afluenciaHeader">
                            <Form onSubmit={this.addQueuer} >
                                <label>Nombre Paciente</label>
                                
                                <div className='union'>

                                    <input ref={(a) => this._inputElement = a} placeholder="Ingrese nombre..."/>
                                    <Button primary icon type="submit">
                                        <Icon name='add user'/>
                                    </Button>

                                </div>  
                            </Form>
                        </div>

                        <Queue entries={this.state.queuers}
                            delete={this.deletePatient}
                        />

                        {this.state.queuers.length > 0 ? <Button icon labelPosition='right' size='small' onClick={() => this.next()}>
                            <Icon name='arrow alternate circle right outline' color='blue' />Siguiente
                            </Button> : null}

                    </Grid.Column>

                    <Grid.Column>
                        <Current currentQueuer={this.props.patientLanding}/>

                    </Grid.Column>
                </Grid>

            </div>
        );
    }
}




export default Extraction