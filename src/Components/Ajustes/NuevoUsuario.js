import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {addDays} from 'date-fns';
import {Button, Form, Header} from 'semantic-ui-react'
import {empleadoTypes, signUpRequestType} from "../../Types";
import axios from "axios";
import {urlDocs, urlObrasSoc, urlPaises, urlSexos} from "../../Constants/URLs";
import {titleCase} from "../../Services/MetodosDeValidacion";
import {bool, number, oneOf, shape, string} from "prop-types";
import {getCurrentDate} from "../../Services/MetodosPaciente";

class NuevoUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            signUpRequest: {
                username: '',
                email: '',
                password: '',
                nombreRol: 'SECRETARIA',
                empleado: {
                    apellido: '',
                    bitAlta: true,
                    fechaAlta: getCurrentDate(),
                    fechaNacimiento: '',
                    mail: '',
                    nacionalidad: {
                        codigoTelefono: 0,
                        idPais: 0,
                        iso: '',
                        iso3: '',
                        nombre: '',
                        nombreBonito: ''
                    },
                    nombre: '',
                    nroDocumento: '',
                    rolId: 0,
                    sexo: {
                        nombre: '',
                        sexoId: 0
                    },
                    telefono: 0,
                    tipoDocumento: {
                        idTipoDocumento: 0,
                        nombre: ''
                    },
                    usuarioId: 0
                }
            },

            documentos: [],
            paises: [],
            sexos: [],
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
            let listaSexos = resolve.data.map(item => {
                return {key: item.sexoId, value: item, display: item.nombre}
            });
            this.setState({
                sexos: listaSexos,
            });
        }, (error) => {
            console.log('Error combo sexo', error.message);
        })

    };

    comboPaises = () => {
        axios.get(urlPaises).then(resolve => {
            let listaPaises = resolve.data.map(item => {
                return {key: item.idPais, value: item, display: item.nombreBonito}
            });
            this.setState({
                paises: listaPaises,
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

    cambioSexo = (e) => {
        let value = e.target.value;
        let nuevoSexo = this.state.sexos.find(function (element) {
            return element.display === value;
        }).value;
        this.setState(prevState => ({
            ...prevState,
            signUpRequest: {
                ...prevState.signUpRequest,
                empleado: {
                    ...prevState.signUpRequest.empleado,
                    sexo: nuevoSexo,
                }
            }
        }))
    };

    cambioNacionalidad = (e) => {
        let value = e.target.value;
        let nuevaNacionalidad = this.state.paises.find(function (element) {
            return element.display === value;
        }).value;
        this.setState(prevState => ({
            ...prevState,
            signUpRequest: {
                ...prevState.signUpRequest,
                empleado: {
                    ...prevState.signUpRequest.empleado,
                    nacionalidad: nuevaNacionalidad,
                }
            }
        }))
    };

    cambioFechaNacimiento = (e) => {
        let nuevaFechaNacimiento = e;
        this.setState(prevState => ({
            ...prevState,
            signUpRequest: {
                ...prevState.signUpRequest,
                empleado: {
                    ...prevState.signUpRequest.empleado,
                    fechaNacimiento: nuevaFechaNacimiento,
                }
            }
        }))
    };

    cambioNombreUsuario = (e) => {
        let nuevoNombreUsuario = e.target.value;
        this.setState(prevState => ({
            ...prevState,
            signUpRequest: {
                ...prevState.signUpRequest,
                username: nuevoNombreUsuario
            }
        }))
    };

    cambioEmail = (e) => {
        let nuevoEmail = e.target.value;
        this.setState(prevState => ({
            ...prevState,
            signUpRequest: {
                ...prevState.signUpRequest,
                email: nuevoEmail
            }
        }))
    };

    cambioPassword = (e) => {
        let nuevoPassword = e.target.value;
        this.setState(prevState => ({
            ...prevState,
            signUpRequest: {
                ...prevState.signUpRequest,
                password: nuevoPassword
            }
        }))
    };


    handleNuevoUsuarioClick = () => {
        let data = this.state.signUpRequest;
        axios.post('/auth/signup', data
        ).then((response) => {
            alert('Se creo usuario correctamente');
        }, (error) => {
            alert('No se ha podido registrar el usuario. Intente nuevamente.');
        });
    };

    render() {
        return (
            <div>
                <h1>Nuevo Usuario</h1>

                <Form>
                    <Form.Group widths='equal'>
                        <Form.Field required label='Nombre' control='input'
                                    placeholder='Nombre'
                                    value={this.state.signUpRequest.empleado.nombre}
                                    onChange={this.cambioNombre}

                        />

                        <Form.Field required label='Apellido' control='input'
                                    placeholder='Apellido'
                                    value={this.state.signUpRequest.empleado.apellido}
                                    onChange={this.cambioApellido}

                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Field required label='Tipo documento' control='select' placeholder='Tipo documento'
                                    width={5}
                                    value={this.state.signUpRequest.empleado.tipoDocumento.nombre}
                                    onChange={this.cambioTipoDoc}

                        >
                            <option value={null}></option>
                            {this.state.documentos.map(item => (
                                <option key={item.key}>{item.display}</option>))}
                        </Form.Field>

                        <Form.Field required label='Número de Documento' control='input'
                                    width={11}
                                    placeholder='Número de documento'
                                    value={this.state.signUpRequest.empleado.nroDoc}
                                    onChange={this.cambioNroDocumento}

                        />
                    </Form.Group>

                    <Form.Field required label='Sexo' control='select'
                                placeholder='Sexo'
                                value={this.state.signUpRequest.empleado.sexo.nombre}
                                onChange={this.cambioSexo}
                    >
                        <option value={null}></option>
                        {this.state.sexos.map(item => (
                            <option key={item.key}>{item.display}</option>))}
                    </Form.Field>

                    <Form.Field required label='Nacionalidad' control='select'
                                placeholder='Nacionalidad'
                                value={this.state.signUpRequest.empleado.nacionalidad.nombreBonito}
                                onChange={this.cambioNacionalidad}
                    >
                        <option value={null}></option>
                        {this.state.paises.map(item => (
                            <option key={item.key}>{item.display}</option>))}
                    </Form.Field>


                    <Form.Field required>
                        <label>Fecha de Nacimiento</label>
                        <DatePicker placeholderText="Fecha de Nacimiento"
                                    selected={this.state.signUpRequest.empleado.fechaNacimiento}
                                    onChange={this.cambioFechaNacimiento}
                                    peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select"
                                    maxDate={addDays(new Date(), 0)}
                                    dateFormat="yyyy-MM-dd">
                        </DatePicker>
                    </Form.Field>

                    <div className="ui divider"/>

                    <Form.Group>
                        <Form.Field required label='Nombre Usuario' control='input'
                                    width={6}
                                    placeholder='No debe contener espacios'
                                    value={this.state.signUpRequest.username}
                                    onChange={this.cambioNombreUsuario}

                        />
                        <Form.Field required label='Email' control='input'
                                    width={10}
                                    placeholder='ejemplo@leloir.com'
                                    value={this.state.signUpRequest.email}
                                    onChange={this.cambioEmail}

                        />

                    </Form.Group>

                    <Form.Group>
                        <Form.Field type='password' required label='Contraseña' control='input'
                                    width={8}
                                    placeholder='8 caracteres minimo'
                                    value={this.state.signUpRequest.empleado.nroDoc}
                                    onChange={this.cambioPassword}

                        />

                        <Form.Field type='password' required label='Repita Contraseña' control='input'
                                    width={8}
                                    value={this.state.signUpRequest.empleado.nroDoc}


                        />
                    </Form.Group>

                    <Button primary type="submit" onClick={this.handleNuevoUsuarioClick} className="boton"> Crear
                        Usuario</Button>

                </Form>
            </div>
        );
    }
}


export default NuevoUsuario;