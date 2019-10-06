import React, {Component} from 'react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import {Button, Container, Form, Header, Icon} from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import { validateOnlyNumbersRequired, validateRequiredStringNum } from './../../Services/MetodosDeValidacion';
import { convertStyleString } from '../../Services/MetodosDeterminacion';
import MenuOpciones from '../MenuOpciones';
import './../styles.css';

class FormAlta extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            codigoPractica: '',
            descripcionPractica: '',
            unidadBioquimica: '',
            unidadMedida: '',

            errorCodigoPractica: true,
            errorDescripcionPractica: true,
            errorUnidadBioquimica: true,
        });
        this.fetchDeterminacion = this.fetchDeterminacion.bind(this);
        this.cambioCodigoPractica = this.cambioCodigoPractica.bind(this);
        this.cambioDescripcionPractica = this.cambioDescripcionPractica.bind(this);
        this.cambioUnidadBioquimica = this.cambioUnidadBioquimica.bind(this);
        this.cambioUnidadMedida = this.cambioUnidadMedida.bind(this);
    }

    renderForm() {
        return (
            <div className='Formularios'>
                <Container className='btnHeader'>
                    <Button className='boton' as={Link} to='/determinaciones' exact='true' floated='left' icon
                            labelPosition='left' primary size='small'>
                        <Icon name='arrow alternate circle left'/> Volver
                    </Button>

                    <Header as='h3' dividing>Registrar nueva Determinación</Header>
                </Container>

                <Form onSubmit={this.fetchDeterminacion} className='altasYConsultas'>

                    <Form.Group widths='equal'>
                        <Form.Field required label='Código Práctica' control='input' placeholder='Código Práctica' width={5}
                        value={this.state.codigoPractica} 
                        onChange={this.cambioCodigoPractica}
                        className={this.state.errorCodigoPractica ? null : 'error'}
                        />

                        <Form.Field required label='Descripción Práctica' control='input' 
                        placeholder='Descripción Práctica'
                        value={this.state.descripcionPractica} 
                        onChange={this.cambioDescripcionPractica}
                        className={this.state.errorDescripcionPractica ? null : 'error'}/>
                    </Form.Group>

                    <Form.Field required label='Unidad Bioquímica' control='input' placeholder='Unidad Bioquímica'
                    value={this.state.unidadBioquimica} 
                    onChange={this.cambioUnidadBioquimica}
                    className={this.state.errorUnidadBioquimica ? null : 'error'}
                    />

                    <Form.Field label='Unidad Medida' control='input' placeholder='Unidad Medida'
                    value={this.state.unidadMedida} 
                    onChange={this.cambioUnidadMedida}/>

                    <br/>

                    <Button primary type="submit" onClick={this.fetchDeterminacion} className="boton"> Registrar Determinacion</Button>

                </Form>
            </div>

        );
    }

    handleUpdateClick = (api) => {
        var data = {
            "bitAlta": true,
            "codigoPractica": this.state.codigoPractica,
            "descripcionPractica": convertStyleString(this.state.descripcionPractica),
            "unidadBioquimica": this.state.unidadBioquimica,
            "unidadMedida": this.state.unidadMedida
        };

        axios.post(api, data
        ).then((response) => {
            alert('Se registro la determinación ' + this.state.descripcionPractica + ' con éxito.');
            this.vaciadoCampos();
        }, (error) => {
            alert('No se ha podido registrar la determinación.');
        });
    };

    fetchDeterminacion(e) {
        e.preventDefault();

        const {codigoPractica, unidadBioquimica, descripcionPractica} = this.state;

        const errorCodigoPractica= validateOnlyNumbersRequired(codigoPractica);
        const errorUnidadBioquimica = validateOnlyNumbersRequired(unidadBioquimica);
        const errorDescripcionPractica = validateRequiredStringNum(descripcionPractica);

        if (errorCodigoPractica && errorUnidadBioquimica && errorDescripcionPractica) {
            const api = '/determinaciones/add';
            this.handleUpdateClick(api);
        } else {
            alert('Verificar datos ingresados.')
            this.setState({
                errorCodigoPractica, 
                errorUnidadBioquimica,
                errorDescripcionPractica,
            })
        }
    }

    vaciadoCampos() {
        this.setState({
            codigoPractica: '',
            descripcionPractica: '',
            unidadBioquimica: '',
            unidadMedida: '',
            errorCodigoPractica: true,
            errorUnidadBioquimica: true,
            errorUnidadMedida: true,
        })
    }

    cambioCodigoPractica(e) {
        this.setState({
            codigoPractica: e.target.value
        })
    }

    cambioDescripcionPractica(e) {
        this.setState({
            descripcionPractica: e.target.value
        })
    }

    cambioUnidadBioquimica(e) {
        this.setState({
            unidadBioquimica: e.target.value
        })
    }

    cambioUnidadMedida(e) {
        this.setState({
            unidadMedida: e.target.value
        })
    }


    render() {
        return (
            <div className='union'>
                <MenuOpciones/>
                <div className="FormAlta">
                    {this.renderForm()}
                </div>
            </div>
        );
    }

}


export default FormAlta;