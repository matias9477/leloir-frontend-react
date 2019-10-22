import React, { Component } from 'react';
import axios from 'axios';
import { Button, Header, Form, Icon, Input } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import MenuOpciones from '../MenuOpciones';
import { getHumanDate } from '../../Services/MetodosPaciente';
import { checkAtributo, nullTo } from '../../Services/MetodosDeValidacion';
import './../styles.css';

class ConsultaAnalisis extends Component {
    constructor(props) {
        super(props);
        this.state = ({        
            analisis: '',
          })
    }

    componentDidMount() {
        const api = "/analisis/id/" + this.props.match.params.id ;
        this.handleUpdateClick(api);
    }

    handleUpdateClick = (api) => {
        axios.get(api).then(resolve => {
          this.setState({
            analisis: resolve.data,
          });
        }, (error) => {
            console.log('Error fetch paciente: ', error.message);
        })
    
    }

    getIconTipo(tipo){
        if (tipo === 'com.leloir.backend.domain.Animal'){
            return 'paw'
        } else if(tipo === 'com.leloir.backend.domain.Persona'){
            return 'user'
        } else if(tipo === 'com.leloir.backend.domain.Institucion'){
            return 'building'
        }
    }


    render() {
        console.log(this.props.match.params.id)
        console.log(this.state.analisis)
        return (
          <div className='union'>
            <MenuOpciones/>

            {this.state.analisis ?
            
            <Form  className="btnHeader">
                <Button className='boton' as= {Link} to='/analisis' exact='true' floated='left' icon labelPosition='left' primary size='small'>
                    <Icon name='arrow alternate circle left' /> Volver
                </Button>

                <Header as='h2'>Análisis</Header>

                <Form.Group widths='equal'>
                    <Form.Field label='Id análisis' value={this.state.analisis.analisisId} control='input' />
                    <Form.Field label='Fecha creación' value={this.state.analisis ? getHumanDate(this.state.analisis.createdAt) : ''} control='input' />
                </Form.Group>

                <Form.Field label='Estado' value={this.state.analisis ? this.state.analisis.estado.nombre : ''} control='input' />

                <Form.Group widths='equal'>
                    <Form.Input label='Nombre' iconPosition='left' value={this.state.analisis ? this.state.analisis.paciente.nombre + ' ' + checkAtributo(this.state.analisis.paciente.apellido) : ''}>
                        <Icon name={this.getIconTipo(this.state.analisis ? this.state.analisis.paciente.type : '')}/>
                        <input/>
                    </Form.Input>
                    <Form.Field label='Número de documento' value={this.state.analisis ? nullTo(this.state.analisis.paciente.nroDocumento) : ''} control='input' /> 
                </Form.Group> 

                <Header>Determinaciones</Header>
                {this.state.analisis.determinaciones.map(determinacion => (
                    <Form.Field label={determinacion.determinacion.descripcionPractica + ' ' + determinacion.determinacion.codigoPractica} value={determinacion.resultado} control='input' placeholder='Ingrese resultado...'/>
                ))}

                <Header>Muestras</Header>
                
        
                <br/> <br/>
                <Button primary size='small' >
                    Añadir muestra
                </Button>  
                
            </Form>
            : null }
            }
    
            
          </div>
        );
      }
}

export default ConsultaAnalisis;