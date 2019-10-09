import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {addDays} from 'date-fns';
import {Button, Form, Header} from 'semantic-ui-react'
import {signUpRequestType} from "../../Types";
import axios from "axios";
import {urlDocs, urlObrasSoc, urlPaises, urlSexos} from "../../Constants/URLs";

class NuevoUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            signUpRequest: signUpRequestType,

            documentos: [],
        });
    }

    componentDidMount() {
        this.fillCombos();
    }

    fillCombos = () => {
        this.comboTiposDocs();
        this.comboSexos();
        this.comboPaises();
    };

    comboSexos = () => {
        axios.get(urlSexos).then(resolve => {
            this.setState({
                sexos: Object.values(resolve.data).flat(),
            });
        }, (error) => {
            console.log('Error combo sexo', error.message);
        })

    };

    comboPaises = () => {
        axios.get(urlPaises).then(resolve => {
            this.setState({
                paises: Object.values(resolve.data).flat(),
            });
        }, (error) => {
            console.log('Error combo paises', error.message);
        })

    };

    comboTiposDocs = () => {
        axios.get(urlDocs).then(resolve => {
            let listaTiposDocumentos = resolve.data.map(item => {
                return {key: item.idTipoDocumento, value: item, display: item.nombre}
            });
            this.setState({
                documentos: listaTiposDocumentos,
            });
        }, (error) => {
            console.log('Error combo Tipos Documentos', error.message);
        })

    };

    cambioNombre = (e) => {
        let nuevoNombre = e.target.value;
        this.setState(prevState => ({
            ...prevState,
            signUpRequest: {
                ...prevState.signUpRequest,
                empleado: {
                    ...prevState.signUpRequest.empleado,
                    nombre: nuevoNombre,
                }
            }
        }))
    };

    cambioApellido = (e) => {
        let nuevoApellido = e.target.value;
        this.setState(prevState => ({
            ...prevState,
            signUpRequest: {
                ...prevState.signUpRequest,
                empleado: {
                    ...prevState.signUpRequest.empleado,
                    apellido: nuevoApellido,
                }
            }
        }))
    };

    cambioTipoDoc = (e) => {
        let value = e.target.value;
        let nuevoTipoDocumento = this.state.documentos.find(function (element) {
            return element.display === value;
        }).value;
        this.setState(prevState => ({
            ...prevState,
            signUpRequest: {
                ...prevState.signUpRequest,
                empleado: {
                    ...prevState.signUpRequest.empleado,
                    tipoDocumento: nuevoTipoDocumento,
                }
            }
        }))
    };

    cambioNroDocumento = (e) => {
        let nuevoNroDocumento = e.target.value;

        this.setState(prevState => ({
            ...prevState,
            signUpRequest: {
                ...prevState.signUpRequest,
                empleado: {
                    ...prevState.signUpRequest.empleado,
                    nroDocumento: nuevoNroDocumento,
                }
            }
        }))
    };

    render() {
        return (
            <div>
                <h1>Nuevo Usuario</h1>

                <Form>
                    <Form.Group widths='equal'>
                        <Form.Field required label='Nombre' control='input'
                                    placeholder='Nombre'
                                    value={typeof this.state.signUpRequest.empleado.nombre === 'string' ? this.state.signUpRequest.empleado.nombre : ''}
                                    onChange={this.cambioNombre}
                                    className={this.state.errorNombre === true ? null : 'error'}
                        />

                        <Form.Field required label='Apellido' control='input'
                                    placeholder='Apellido'
                                    value={typeof this.state.signUpRequest.empleado.apellido === 'string' ? this.state.signUpRequest.empleado.apellido : ''}
                                    onChange={this.cambioApellido}
                                    className={this.state.errorApellido === true ? null : 'error'}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Field required label='Tipo documento' control='select' placeholder ='Tipo documento' width={5}
                                    value={this.state.signUpRequest.empleado.tipoDocumento.nombre}
                                    onChange={this.cambioTipoDoc}
                                    className= {this.state.errorTipoDoc === true ? null : 'error'}
                        >
                            <option value={null}> </option>
                            {this.state.documentos.map(item => (
                                <option key={item.key} >{item.display}</option>))}
                        </Form.Field>
                        {/*<Form.Field required label='Tipo documento' control='select' placeholder='Tipo documento'*/}
                        {/*            width={5}*/}
                        {/*            value={this.state.signUpRequest.empleado.tipoDocumento.nombre}*/}
                        {/*            onChange={this.cambioTipoDoc}*/}
                        {/*            className={this.state.errorTipoDoc === true ? null : 'error'}*/}
                        {/*>*/}
                        {/*    <option value={null}/>*/}
                        {/*    {this.state.documentos.map(item => (*/}
                        {/*        <option key={item.key} value={item.key}>{item.display}</option>))}*/}
                        {/*</Form.Field>*/}

                        <Form.Field required label='Número de Documento' control='input'
                                    maxLength={this.state.tipoDocumento === "Documento Nacional de Identidad" ? "8" : '11'}
                                    width={11}
                                    placeholder='Número de documento'
                                    value={this.state.signUpRequest.empleado.nroDoc}
                                    onChange={this.cambioNroDocumento}
                                    className={this.state.errorNroDoc === true ? null : 'error'}
                        />
                    </Form.Group>


                </Form>
            </div>
        );
    }
}

NuevoUsuario.protoTypes = {
    signUpRequest: signUpRequestType
};

export default NuevoUsuario;