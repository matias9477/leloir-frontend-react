import React, { Component } from 'react';
import axios from 'axios';
import { Form, Header, Icon, Button } from 'semantic-ui-react';
import Select from 'react-select';
import {Link} from 'react-router-dom';

import { urlPacientes } from '../../../Constants/URLs';
import { checkAtributo } from '../../../Services/MetodosDeValidacion';
import './LPSecretaria.css';

class Atencion extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            patients: [],
            selectedPaciente: '',
            foundPatient: '',
        });
        this.find = this.find.bind(this);
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

    searchPacientes(){
        const nodess = this.state.patients.map(({nombre, apellido, nroDocumento, id}) => ({value:`${nombre} ${checkAtributo(apellido)}`, label: `${nombre} ${checkAtributo(apellido)} ${' '} ${checkAtributo(nroDocumento)}`, key: id}));
        return nodess;
    }
  
    handleChangeListPacientes = selectedPaciente => {
      this.setState({ selectedPaciente })
    }

    find(){
        const next = this.props.next.text ;
        const next2 = this.props.next.text + ' ' ;

        if(this.props.next !== undefined || this.props.next !== ''){
          
            function isPatient(element, index, array) {
                return (element.value === next || element.value === next2);
            }

            if (this.searchPacientes().find(isPatient) !== undefined){
                const a = this.searchPacientes().find(isPatient)
                return a;
            }
        else {
            return '';
        }
            
        }
    }

    patientNotFound(){
        if(this.props.next !== ""){ 
            return (
            <div>Paciente no encontrado
                <br/>
            <Header as='h5'>Busquelo</Header>
            <Select
                value={this.state.selectedPaciente}
                options={this.searchPacientes()}
                onChange={this.handleChangeListPacientes}
                placeholder= "Busque un paciente..."
                isClearable={true}
            />
            <Button as= {Link} to={{pathname: '/pacientes/add', state: { prevPath: window.location.pathname }}} exact='true' floated='right' icon labelPosition='left' color='twitter' size='small'>
                <Icon name='user' /> Nuevo Paciente
            </Button>
            </div>
            )
        }
        
    }


    render() {
        return (
            <div>
                <Header as='h2'>Atención</Header>
                <Form className='formAtencion'>
                    <Form.Field label='Paciente' value={this.props.next.text} control='input' />
                </Form>

                {this.find() === '' ? this.patientNotFound() : "Paciente encontrado"}

            </div>
        );
    }
}

export default Atencion;