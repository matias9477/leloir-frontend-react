import React, { Component } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import { Table } from 'semantic-ui-react'

import { Modal } from '../../DiarioPracticas/Modals/ModalAnalysisInput'

class VerAnalisis extends Component {
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

    detalleDeterminaciones = () => {
        if (this.props.analisis != null) {
            return (
                <div className='tablaDetallePago'>
                    <Table basic='very' compact>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Código</Table.HeaderCell>
                                <Table.HeaderCell>Determinación</Table.HeaderCell>
                                <Table.HeaderCell>Resultado</Table.HeaderCell>
                                <Table.HeaderCell>Valor de Referencia</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header> 

                        <Table.Body>
                            {this.props.analisis.determinaciones.map((det, index) => {
                                return( 
                                    <Table.Row  key={index} value={det}>
                                        <Table.Cell>{det.determinacion.codigoPractica}</Table.Cell>
                                        <Table.Cell>{det.determinacion.descripcionPractica}</Table.Cell>
                                        {det.determinacion.unidadMedida===null ?
                                            <Table.Cell>{det.resultado}</Table.Cell> :
                                            <Table.Cell>{det.resultado + ' ' + det.determinacion.unidadMedida.unidad}</Table.Cell>
                                        }
                                        {det.determinacion.valorReferencia!==null ?
                                            <Table.Cell>{det.determinacion.valorReferencia}</Table.Cell> :
                                            <Table.Cell>Rango no especificado</Table.Cell>
                                        }
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                    </Table>
                </div>
            ) 
        }
    }


    render() {
        return (
            <div className='modalVerDetalle'>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    
                    <h2>Detalle del análisis</h2>

                    {this.props.analisis != null ? this.detalleDeterminaciones() :
                        <ClipLoader
                        size={150}
                        color={'#000000'}
                        />
                    }
                    
                </Modal>
            </div>
        )
    }
}


export default VerAnalisis
