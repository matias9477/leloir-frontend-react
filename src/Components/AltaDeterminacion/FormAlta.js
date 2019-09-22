import React, {Component} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {Button, Container, Form, Header, Icon} from 'semantic-ui-react'
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuOpciones from '../MenuOpciones';
import {Link} from 'react-router-dom';

import {
  convertStyleString,
  validateDescripcion,
  validateMetodologia,
  validateName,
  validateProtocoloId,
  validateValor
} from './../../Services/MetodosDeterminacion';
import './../styles.css';
import axios from 'axios';

class FormAlta extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            nombre: '',
            metodologia: '',
            descripcion: '',
            valor: '',
            protocoloId: '',


            errorNombre: true,
            errorMetodologia: true,
            errorDescripcion: true,
            errorValor: true,
            errorProtocoloId: true,

            loading: true,
        });
        this.fetchDeterminacion = this.fetchDeterminacion.bind(this);
        this.cambioNombre = this.cambioNombre.bind(this);
        this.cambioMetodologia = this.cambioMetodologia.bind(this);
        this.cambioDescripcion = this.cambioDescripcion.bind(this);
        this.cambioValor = this.cambioValor.bind(this);
        this.cambioProtocoloId = this.cambioProtocoloId.bind(this);

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

                    <Form.Field required label='Nombre' control='input'
                                placeholder='Nombre' value={this.state.nombre} onChange={this.cambioNombre}
                                className={this.state.errorNombre ? null : 'error'}/>

                    <Form.Field label='Metodologia' control='input' placeholder='Metodologia'
                                value={this.state.metodologia} onChange={this.cambioMetodologia}/>

                    <Form.Field required label='Descripcion' control='input'
                                placeholder='Descripción' value={this.state.descripcion}
                                onChange={this.cambioDescripcion}
                                className={this.state.errorDescripcion ? null : 'error'}/>

                    <Form.Field label='Valor' control='input' placeholder='Valor' value={this.state.valor}
                                onChange={this.cambioValor}/>

                    <Form.Field label='ProtocoloId' control='input' placeholder='ProtocoloId'
                                value={this.state.protocoloId} onChange={this.cambioProtocoloId}/>

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
            "nombre": convertStyleString(this.state.nombre),
            "metodologia": convertStyleString(this.state.metodologia),
            "descripcion": convertStyleString(this.state.descripcion),
            "valor": convertStyleString(this.state.valor),
            "protocoloId": convertStyleString(this.state.protocoloId),
        };

        axios.post(api, data
        )
            .then((response) => {
                if (response.ok) {
                    alert('Se registro la determinación ' + convertStyleString(this.state.nombre) + ' con éxito.');
                    this.vaciadoCampos();
                    return response.text();
                } else {
                    alert('No se ha podido registrar la determinación.');
                    return Promise.reject({status: response.status, statusText: response.statusText});
                }
            });
    };

    fetchDeterminacion(e) {
        e.preventDefault();
        const {nombre, metodologia, descripcion, valor, protocoloId} = this.state;
        const errorNombre = validateName(nombre);
        const errorDescripcion = validateDescripcion(descripcion);
        const errorMetodologia = validateMetodologia(metodologia);
        const errorValor = validateValor(valor);
        const errorProtocoloId = validateProtocoloId(protocoloId);

        if (errorNombre && errorDescripcion && errorMetodologia && errorValor && errorProtocoloId) {
            const api = '/determinaciones/add';
            this.handleUpdateClick(api);

        } else {
            this.setState({
                errorNombre, errorDescripcion, errorMetodologia, errorValor, errorProtocoloId,
            })
        }
    }

    vaciadoCampos() {
        this.setState({
            id: '',
            nombre: '',
            descripcion: '',
            metodologia: '',
            valor: '',
            protocoloId: '',
            determinacion: [],
            errorNombre: true,
            errorDescripcion: true,
            errorMetodologia: true,
            errorValor: true,
            errorProtocoloId: true,
        })
    }

    cambioNombre(e) {
        this.setState({
            nombre: e.target.value
        })
    }

    cambioDescripcion(e) {
        this.setState({
            descripcion: e.target.value
        })
    }

    cambioMetodologia(e) {
        this.setState({
            metodologia: e.target.value
        })
    }

    cambioValor(e) {
        this.setState({
            valor: e.target.value
        })
    }

    cambioProtocoloId(e) {
        this.setState({
            protocoloId: e.target.value
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