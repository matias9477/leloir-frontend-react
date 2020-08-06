import React, {Component} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {Button, Form} from 'semantic-ui-react'
import axios from "axios";
import Select from 'react-select';
import { urlSignUp } from "../../Constants/URLs";
import { validateRequiredCombos, validateContraseña } from './../../Services/MetodosDeValidacion';
import { validateRequiredUser, validateRequiredMail } from '../../Services/MetodosUsuarios';

const roles = [
    { key: 'Secretaria', value: 'ROLE_SECRETARIA', text: 'Secretaria' },
    { key: 'Técnico', value: 'ROLE_TECNICO_LABORATORIO', text: 'Técnico de laboratorio' },
    { key: 'Bioquímico', value: 'ROLE_BIOQUIMICO', text:'Bioquímico' },
    { key: 'Admin', value: 'ROLE_ADMIN', text: 'Admin' },
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
            },
            rol: '', //necesario para q ande el select
            pass2: '',

            errorUsuario: true,
            errorMail: true,
            errorContraseña: true,
            errorRol: true,
        });
    }



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

    handleNuevoUsuarioClick = () => {
        const errorMail = validateRequiredMail(this.state.signUpRequest.email);
        const errorRol = validateRequiredCombos(this.state.signUpRequest.nombreRol);
        
        const errorUsuario = validateRequiredUser(this.state.signUpRequest.username);
        
        const errorContraseña = validateContraseña(this.state.signUpRequest.password, this.state.pass2)

        if (errorMail && errorUsuario && errorContraseña && errorRol) {

            let data = this.state.signUpRequest;
            axios.post(urlSignUp, data
            ).then((response) => {
                alert(`Se creo el usuario correctamente.`);
            }, (error) => {
                alert('No se ha podido registrar el usuario.');
            });

            this.setState(prevState => ({
                ...prevState,
                signUpRequest: {
                    ...prevState.signUpRequest,
                    // username: '',
                    // email: '',
                    password: '',
                    nombreRol: '',                
                },

                rol: '', 
                password: '',
                pass2: '',
    
                errorUsuario: true,
                errorMail: true,
                errorContraseña: true,
                errorRol: true,
            }))        

        } else {
            alert('Verifique los datos ingresados.');
            this.setState({
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
                <div className="ui divider"/>

                <Form>
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
                        styles={this.state.errorRol === true ? '' : styleErrorSelect}
                        value={this.state.rol}
                        onChange={this.cambioRol}
                        placeholder= "Seleccione un rol..."
                        isClearable={true}
                        options={roles}
                        getOptionValue={this.getOptionValueRol}
                        getOptionLabel={this.getOptionLabelRol}
                    />

                    <br/><br/>

                    <Button primary type="submit" onClick={this.handleNuevoUsuarioClick} className="boton"> Crear Usuario</Button>

                </Form>
            </div>
        );
    }
}

const styleErrorSelect = { 
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

}
  

export default NuevoUsuario;