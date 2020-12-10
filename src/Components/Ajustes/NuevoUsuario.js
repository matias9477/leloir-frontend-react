import React, {Component} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {Button, Form} from 'semantic-ui-react'
import Select from 'react-select';
import { connect } from 'react-redux';

import { validateRequiredCombos, validateContraseña } from './../../Services/MetodosDeValidacion';
import { validateRequiredUser, validateRequiredMail } from '../../Services/MetodosUsuarios';
import { addUserAction } from '../../Redux/userDuck';

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
                roleName: '',
            },
            rol: '', 
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
                roleName: nuevoRol.value
            }
        }))

        this.setState({rol: e})
    };

    handleNuevoUsuarioClick = () => {
        const errorMail = validateRequiredMail(this.state.signUpRequest.email);
        const errorRol = validateRequiredCombos(this.state.signUpRequest.roleName);
        
        const errorUsuario = validateRequiredUser(this.state.signUpRequest.username);
        
        const errorContraseña = validateContraseña(this.state.signUpRequest.password, this.state.pass2)

        if (errorMail && errorUsuario && errorContraseña && errorRol) {

            let data = this.state.signUpRequest;

            this.props.addUserAction(data)

            this.setState(prevState => ({
                ...prevState,
                signUpRequest: {
                    ...prevState.signUpRequest,
                    username: '',
                    email: '',
                    password: '',
                    roleName: '',              
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

    getOptionValueRol = option => option.value;

    render() {
        return (
            <div>
                <h1>Nuevo Usuario</h1>
                <div className="ui divider"/>

                <Form>
                    <Form.Group>
                        <Form.Field  label='Nombre Usuario' control='input'
                            width={6}
                            className= {(this.state.errorUsuario === true) ? null : 'error'}
                            placeholder='No debe contener espacios'
                            value={this.state.signUpRequest.username}
                            onChange={this.cambioNombreUsuario}
                        />
                        <Form.Field  label='Email' control='input'
                            width={10}
                            className= {(this.state.errorMail === true) ? null : 'error'}
                            placeholder='ejemplo@leloir.com'
                            value={this.state.signUpRequest.email}
                            onChange={this.cambioEmail}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Field type='password'  label='Contraseña' control='input'
                            width={8}
                            placeholder='6 caracteres minimo, 20 máximo'
                            className= {this.state.errorContraseña === true ? null : 'error'}
                            value={this.state.password}
                            onChange={this.cambioPassword}
                        />

                        <Form.Field type='password'  label='Repita Contraseña' control='input'
                            width={8}
                            className= {this.state.errorContraseña === true ? null : 'error'}
                            value={this.state.pass2}
                            onChange={this.cambioPass2}
                        />
                    </Form.Group>
                    
                    <Form.Field label='Rol' className= {this.state.errorRol === true ? null : 'error'}/>
                
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
  

const mapStateToProps = state => ({  
    fetching: state.user.fetching,
})

export default connect(mapStateToProps, { addUserAction })(NuevoUsuario)