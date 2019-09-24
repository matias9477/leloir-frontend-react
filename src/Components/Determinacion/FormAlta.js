import React, {Component} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {Button, Container, Form, Header, Icon} from 'semantic-ui-react'
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuOpciones from '../MenuOpciones';
import {Link} from 'react-router-dom';

import {
  convertStyleString,
  validateCodigoPractica,
  validateDescripcionPractica
} from './../../Services/MetodosDeterminacion';
import './../styles.css';
import axios from 'axios';

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
            errorUnidadMedida: true,

            loading: true,
        });
        this.fetchDeterminacion = this.fetchDeterminacion.bind(this);
        this.cambioCodigoPractica = this.cambioCodigoPractica.bind(this);
        this.cambioDescripcionPractica = this.cambioDescripcionPractica.bind(this);
        this.cambioUnidadBioquimica = this.cambioUnidadBioquimica.bind(this);
        this.cambioUnidadMedida = this.cambioUnidadMedida.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.loading !== true) {
            // this.fillCombos();
        }
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

                <Form onSubmit={this.fetchDeterminacion}>

                    <Form.Field required label='Código Práctica' control='input' placeholder='Código Práctica'
                                value={this.state.codigoPractica} onChange={this.cambioCodigoPractica}
                                className={this.state.errorCodigoPractica ? null : 'error'}/>

                    <Form.Field label='Descripción Práctica' control='input' placeholder='Descripción Práctica'
                                value={this.state.descripcionPractica} onChange={this.cambioDescripcionPractica}
                                className={this.state.errorDescripcionPractica ? null : 'error'}/>

                    <Form.Field required label='Unidad Bioquímica' control='input' placeholder='Unidad Bioquímica'
                                value={this.state.unidadBioquimica} onChange={this.cambioUnidadBioquimica}/>

                    <Form.Field label='Unidad Medida' control='input' placeholder='Unidad Medida'
                                value={this.state.unidadMedida} onChange={this.cambioUnidadMedida}/>

                    <Button primary type="submit" onClick={this.fetchDeterminacion} className="boton"> Registrar
                        Determinacion</Button>

                </Form>
            </div>

        );
    }

    renderProgress() {
        return <CircularProgress size={50}/>;
    }

    handleUpdateClick = (api) => {
        var data;
        data = {
            "codigoPractica": convertStyleString(this.state.codigoPractica),
            "descripcionPractica": convertStyleString(this.state.descripcionPractica),
            "unidadBioquimica": convertStyleString(this.state.unidadBioquimica),
            "unidadMedida": convertStyleString(this.state.unidadMedida),
        };

        axios.post(api, data
        ).then((response) => {
                if (response.status === 200) {
                    alert('Se registro la determinación ' + convertStyleString(this.state.descripcionPractica) + ' con éxito.');
                    this.vaciadoCampos();
                    return response.statusText;
                } else {
                    alert('No se ha podido registrar la determinación.');
                    return Promise.reject({status: response.status, statusText: response.statusText});
                }
            });
    };

    fetchDeterminacion(e) {
        e.preventDefault();
        const {codigoPractica, descripcionPractica} = this.state;
        const errorCodigoPractica= validateCodigoPractica(codigoPractica);
        const errorDescripcionPractica = validateDescripcionPractica(descripcionPractica);

        if (errorCodigoPractica && errorDescripcionPractica) {
            const api = '/determinaciones/add';
            this.handleUpdateClick(api);

        } else {
            this.setState({
                errorCodigoPractica, errorDescripcionPractica
            })
        }
    }

    vaciadoCampos() {
        this.setState({
            codigoPractica: '',
            descripcionPractica: '',
            unidadBioquimica: '',
            unidadMedida: '',
            determinacion: [],
            errorCodigoPractica: true,
            errorDescripcionPractica: true,
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