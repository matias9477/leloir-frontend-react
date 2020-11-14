import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';

import { Modal } from '../Reusables/Tabla/ModalBase';
import { changePasswordAction } from '../../Redux/userDuck';
import { validateContraseña } from './../../Services/MetodosDeValidacion';

class ModalCambioPass extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            pass1: '',
            pass2: '',

            errorContraseña: true,
        }
    }

    componentDidMount() {
        this.showModal()
    }

    showModal = () => {
        this.setState({
            show: true,
        })
    }

    hideModal = () => {
        const {callback} = this.props
        if (callback !== undefined) {
            callback()
        }
    }

    detalle = () => {
        return(
            <Form>
                <Form.Field required label='Contraseña' control='input'
                    className= {(this.state.errorContraseña === true) ? null : 'error'}
                    placeholder='Ingrese la contraseña.'
                    value={this.state.pass1}
                    onChange={this.cambioPass1}
                />

                 <Form.Field required label='Repita la contraseña' control='input'
                    className= {(this.state.errorContraseña === true) ? null : 'error'}
                    placeholder='Ingrese la contraseña nuevamente.'
                    value={this.state.pass2}
                    onChange={this.cambioPass2}
                />
          
                <Button primary type="submit" onClick={this.handleSubmit} > Confirmar </Button>
            </Form>
        ) 
    }

    handleSubmit = (e) => {
        const errorContraseña = validateContraseña(this.state.pass1, this.state.pass2)
        if (errorContraseña) {
            var data = {
                "password": this.state.pass1,
                "username": this.props.user
            }

            this.props.changePasswordAction(data)

            this.setState({
                pass1: "",
                pass2: "",
    
                errorContraseña: true,
            })

            this.hideModal()
        } else {
            alert('Verifique los datos ingresados.');
            this.setState({
              errorContraseña,
            })
        } 
    }


    cambioPass1 = (e) => {
        this.setState({
            pass1: e.target.value
        })
    }

    cambioPass2 = (e) => {
        this.setState({
            pass2: e.target.value
        })
    }


    render() {

        return (
            <div className='modalVerDetalle'>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    
                    <h2>Cambio de contraseña para el usuario {this.props.user}</h2>

                    {this.detalle() }
                    
                </Modal>
            </div>
        )
    }
}


const mapStateToProps = state => ({  
    fetching: state.user.fetching,
})
  
export default connect(mapStateToProps, { changePasswordAction })(ModalCambioPass)