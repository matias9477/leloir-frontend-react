import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {addDays} from 'date-fns';
import {Button, Form} from 'semantic-ui-react'
import axios from "axios";
import Select from 'react-select';

import {urlDocs, urlPaises, urlSexos} from "../../Constants/URLs";
import {getCurrentDate} from "../../Services/MetodosPaciente";
import { validateNombre, validateRequiredCombos, validateNroDocumento, validateFechaNacimiento, validateContraseña } from './../../Services/MetodosDeValidacion';
import { validateRequiredUser, validateRequiredMail } from '../../Services/MetodosUsuarios';

const roles = [
    { key: 'Secretaria', value: 'SECRETARIA', text: 'Secretaria' },
]

class NuevoUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            signUpRequest: {
                username: '',
                email: '',
                password: '',
                nombreRol: '',
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

            rol: '', //necesario para q ande el select

            pass2: '',

            documentos: [],
            paises: [],
            sexos: [],

            disponibilidadUs: true,

            errorNombre: true,
            errorApellido: true,
            errorTipoDoc: true,
            errorNroDoc: true,
            errorSexo: true,
            errorNacionalidad: true,
            errorFechaNac: true,
            errorUsuario: true,
            errorMail: true,
            errorContraseña: true,
            errorRol: true,
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

        this.setState(prevState => ({
            ...prevState,
            signUpRequest: {
                ...prevState.signUpRequest,
                empleado: {
                    ...prevState.signUpRequest.empleado,
                    mail: nuevoEmail,
                }
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

    cambioPass2 = (e) => {
        this.setState({ pass2: e.target.value })
    }
    
    cambioRol = (e) => {
        let nuevoRol = e;
        if (nuevoRol === null){
            nuevoRol = '';
        }
        this.setState(prevState => ({
            ...prevState,
            signUpRequest: {
                ...prevState.signUpRequest,
                nombreRol: nuevoRol.value
            }
        }))

        this.setState({rol: e})
    };

    getUserAvailability(user){
        axios.get('/user/checkUsernameAvailability', { params: { username: user } }).then(resolve => {
            this.setState({
                disponibilidadUs: resolve.data.available
            })
    
        }, (error) => {
            console.log('Error validacion user', error.message);
        })
    };

    handleNuevoUsuarioClick = () => {
        const errorNombre = validateNombre(this.state.signUpRequest.empleado.nombre);
        const errorApellido = validateNombre(this.state.signUpRequest.empleado.apellido);
        const errorTipoDoc = validateRequiredCombos(this.state.signUpRequest.empleado.tipoDocumento.nombre);
        const errorNroDoc = validateNroDocumento(this.state.signUpRequest.empleado.nroDocumento, this.state.signUpRequest.empleado.tipoDocumento.nombre);
        const errorFechaNac = validateFechaNacimiento(this.state.signUpRequest.empleado.fechaNacimiento);
        const errorSexo = validateRequiredCombos(this.state.signUpRequest.empleado.sexo.nombre);
        const errorNacionalidad = validateRequiredCombos(this.state.signUpRequest.empleado.nacionalidad.nombre);
        const errorMail = validateRequiredMail(this.state.signUpRequest.email);
        const errorRol = validateRequiredCombos(this.state.signUpRequest.nombreRol);
        
        const errorUsuario = validateRequiredUser(this.state.signUpRequest.username);
        var errorDisponibilidad = this.getUserAvailability(this.state.signUpRequest.username);
        const errorContraseña = validateContraseña(this.state.signUpRequest.password, this.state.pass2)

        if ( errorNombre && errorApellido && errorTipoDoc && errorNroDoc && errorFechaNac && errorSexo && errorNacionalidad && errorMail && errorUsuario && errorContraseña && errorRol) {

            let data = this.state.signUpRequest;
            axios.post('/auth/signup', data
            ).then((response) => {
                alert(`Se creo el usuario ${this.state.signUpRequest.username} correctamente.`);
            }, (error) => {
                alert('No se ha podido registrar el usuario.');
            });

            this.setState(prevState => ({
                ...prevState,
                signUpRequest: {
                    ...prevState.signUpRequest,
                    username: '',
                    email: '',
                    password: '',
                    nombreRol: '',
                    empleado: {
                        ...prevState.signUpRequest.empleado,
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

                rol: '', 
    
                pass2: '',
    
                documentos: [],
                paises: [],
                sexos: [],
    
                disponibilidadUs: true,
    
                errorNombre: true,
                errorApellido: true,
                errorTipoDoc: true,
                errorNroDoc: true,
                errorSexo: true,
                errorNacionalidad: true,
                errorFechaNac: true,
                errorUsuario: true,
                errorMail: true,
                errorContraseña: true,

            }))        

        } else {
            alert('Verifique los datos ingresados.');
            this.setState({
              errorNombre,
              errorApellido,
              errorTipoDoc,
              errorNroDoc, 
              errorFechaNac,
              errorSexo, 
              errorNacionalidad,
              errorMail,
              errorUsuario,
              errorContraseña,
              errorRol,
            })
          } 
    };

    getOptionLabelRol = option => option.text;

    getOptionRol = option => option.value;

    render() {
        return (
            <div>
                <h1>Nuevo Usuario</h1>

                <Form>
                    <Form.Group widths='equal'>
                        <Form.Field required label='Nombre' control='input'
                            placeholder='Nombre'
                            className= {this.state.errorNombre === true ? null : 'error'}
                            value={this.state.signUpRequest.empleado.nombre}
                            onChange={this.cambioNombre}
                        />
                        <Form.Field required label='Apellido' control='input'
                            placeholder='Apellido'
                            className= {this.state.errorApellido === true ? null : 'error'}
                            value={this.state.signUpRequest.empleado.apellido}
                            onChange={this.cambioApellido}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Field required label='Tipo documento' control='select' placeholder='Tipo documento'
                            width={5}
                            className= {this.state.errorTipoDoc === true ? null : 'error'}
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
                            className= {this.state.errorNroDoc === true ? null : 'error'}
                            value={this.state.signUpRequest.empleado.nroDoc}
                            onChange={this.cambioNroDocumento}
                        />
                    </Form.Group>

                    <Form.Field required label='Sexo' control='select'
                        placeholder='Sexo'
                        className= {this.state.errorSexo === true ? null : 'error'}
                        value={this.state.signUpRequest.empleado.sexo.nombre}
                        onChange={this.cambioSexo}
                    >
                        <option value={null}></option>
                        {this.state.sexos.map(item => (
                            <option key={item.key}>{item.display}</option>))}
                    </Form.Field>

                    <Form.Field required label='Nacionalidad' control='select'
                        placeholder='Nacionalidad'
                        className= {this.state.errorNacionalidad === true ? null : 'error'}
                        value={this.state.signUpRequest.empleado.nacionalidad.nombreBonito}
                        onChange={this.cambioNacionalidad}
                    >
                        <option value={null}></option>
                        {this.state.paises.map(item => (
                            <option key={item.key}>{item.display}</option>))}
                    </Form.Field>


                    <Form.Field required className= {this.state.errorFechaNac === true ? null : 'error'}>
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
                            className= {(this.state.errorUsuario === true) ? null : 'error'}
                            placeholder='No debe contener espacios'
                            value={this.state.signUpRequest.username}
                            onChange={this.cambioNombreUsuario}
                        />
                        <Form.Field required label='Email' control='input'
                            width={10}
                            className= {(this.state.errorMail === true) ? null : 'error'}
                            placeholder='ejemplo@leloir.com'
                            value={this.state.signUpRequest.email}
                            onChange={this.cambioEmail}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Field type='password' required label='Contraseña' control='input'
                            width={8}
                            placeholder='8 caracteres minimo'
                            className= {this.state.errorContraseña === true ? null : 'error'}
                            value={this.state.password}
                            onChange={this.cambioPassword}
                        />

                        <Form.Field type='password' required label='Repita Contraseña' control='input'
                            width={8}
                            className= {this.state.errorContraseña === true ? null : 'error'}
                            value={this.state.pass2}
                            onChange={this.cambioPass2}
                        />
                    </Form.Group>
                    
                    <Form.Field required label='Rol' className= {this.state.errorRol === true ? null : 'error'}/>
                
                    <Select
                        name='roles'
                        styles={{ 
                            // singleValue: base => ({ ...base, color: '#F0A7A7' }),

                            indicatorsContainer: base => ({
                            ...base,
                            background: '#FDF1F1',
                            }),

                            valueContainer: base => ({
                              ...base,
                              background: '#FDF1F1',
                              borderStyle: '#FBEBEB',
                              margin: 0,
                              width: '100%',
                            }),

                        }}

                        value={this.state.rol}
                        onChange={this.cambioRol}
                        placeholder= "Seleccione un rol..."
                        isClearable={true}
                        options={roles}
                        getOptionValue={this.getOptionValueRol}
                        getOptionLabel={this.getOptionLabelRol}
                    />

                    <br/><br/>

                    <Button primary type="submit" onClick={this.handleNuevoUsuarioClick} className="boton"> Crear
                        Usuario</Button>

                </Form>
            </div>
        );
    }
}
  

export default NuevoUsuario;