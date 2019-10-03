import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {Button, Icon,Input, Form} from 'semantic-ui-react';
import './LPSecretaria.css';
import Cola from './Cola';


class Afluencia extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            patients: []
        });
        this.addPatient = this.addPatient.bind(this);
        this.deletePatient = this.deletePatient.bind(this);
    }

    addPatient(e){
        if(this._inputElement.value !== "") {
            var newPacient = {
                text: this._inputElement.value,
                key: Date.now()
            };

            this.setState((prevState) =>{
                return {
                    patients: prevState.patients.concat(newPacient)
                };
            });
            this._inputElement.value = "";
        }

        
        console.log(this.state.patients);

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
    // cambioNombre(e) {
    //     this.setState( {
    //       nombre: e.target.value
    //     })
    //   }

    // handleAdd=()=>{
    //     console.log(this.state.nombre)
    // }


    render() {
        return (
            <div className="afluenciaMain">
                <div className="afluenciaHeader">
                <Form onSubmit={this.addPatient} >
                    <Button primary icon type="submit">
                        <Icon name='add user'/>
                    </Button>
                {/* &nbsp;  significa non blank space y se usa como recurso html para agregar espacios*/}
                    &nbsp;&nbsp;&nbsp;<label>Nombre</label>&nbsp;&nbsp;&nbsp;
                    {/* <Input ref={(a) => this._inputElement = a} placeholder="Ingrese nombre..." ></Input> */}
                    <input ref={(a) => this._inputElement = a} 
                  placeholder="Ingrese nombre..."/>

                  
                         
                </Form>
                </div>
                <Cola entries={this.state.patients}
                    delete={this.deletePatient}
                />
            </div>
            

        );
    }
}

// Afluencia.propTypes = {

// };

export default Afluencia;