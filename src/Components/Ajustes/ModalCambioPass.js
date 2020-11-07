import React, { Component } from 'react';

import { Modal } from '../Reusables/Tabla/ModalBase';

class ModalCambioPass extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
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
           <div>data aca</div>
        ) 
        
    }


    render() {
        return (
            <div className='modalVerDetalle'>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    
                    <h2>Detalle del análisis</h2>

                    {this.detalle() }
                    
                    
                </Modal>
            </div>
        )
    }
}


export default ModalCambioPass
