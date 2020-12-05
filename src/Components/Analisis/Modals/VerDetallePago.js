import React, { Component } from 'react';
import { Form, Table } from 'semantic-ui-react';

import { Modal } from '../../DiarioPracticas/Modals/ModalAnalysisInput'

import '../analisisStyle.css';

class ModalDetallePago extends Component {
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
            <Form style={{padding: '0 5rem'}} compact className='tablaDetallePago'>
                <Table basic='very'>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Código</Table.HeaderCell>
                        <Table.HeaderCell>Nombre</Table.HeaderCell>
                        <Table.HeaderCell>Cobertura</Table.HeaderCell>
                        <Table.HeaderCell>Coseguro</Table.HeaderCell>
                        <Table.HeaderCell>Precio Final</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    {this.props.analisis.determinaciones!==undefined ? this.props.analisis.determinaciones.map((det, index) => (
                        <Table.Row key={index} textAlign='right'>
                            <Table.Cell>{det.determinacion.codigoPractica}</Table.Cell>
                            <Table.Cell>{det.determinacion.descripcionPractica}</Table.Cell>
                            <Table.Cell>{det.cobertura}</Table.Cell>
                            <Table.Cell>{det.coseguro}</Table.Cell>
                            <Table.Cell>{det.costoDeterminacion}</Table.Cell>
                        </Table.Row>
                      
                    )) : null}
                        <Table.Row>
                            <Table.Cell>Total</Table.Cell>
                            <Table.Cell/>
                            <Table.Cell textAlign='right'>{this.props.analisis.cobertura}</Table.Cell>
                            <Table.Cell textAlign='right'>{this.props.analisis.coseguro}</Table.Cell>
                            <Table.Cell textAlign='right'>{this.props.analisis.costoAnalisis}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </Form>
        ) 
    }


    render() {
        return (
            <div className='modalVerDetalle'>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    
                    <h2>Detalle de Pago</h2>

                    {this.detalle() }

                </Modal>
            </div>
        )
    }
}


export default ModalDetallePago