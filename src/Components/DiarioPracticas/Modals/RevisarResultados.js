import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Divider, Table } from 'semantic-ui-react'
import SyncLoader from 'react-spinners/SyncLoader'

import { Modal } from './ModalAnalysisInput'
import { getAnalisisByIdAction, revisarResultadosAction } from '../../../Redux/analisisDuck'

const estadosDeterminaciones = {
    APROBADO: 'APROBADO',
    REPETIR: 'REPETIR',
}

class RevisarResultados extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            currentAnalisis: null,
            cambios: false,
        }
    }

    componentDidMount() {
        this.props.getAnalisisByIdAction(this.props.idAnalisis)
        this.showModal()
    }

    componentWillReceiveProps = next => {
        this.setState({
            currentAnalisis: next.analisis
        })
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

    changeResult = (index, state, idState) => {
        let analisisCopy = JSON.parse(JSON.stringify(this.state.currentAnalisis))

        analisisCopy.determinaciones[index].estadoDetalleAnalisis.nombre = state
        analisisCopy.determinaciones[index].estadoDetalleAnalisis.estadoId = idState
     
        this.setState({
            currentAnalisis: analisisCopy,
            cambios: true 
        }) 
        
    }

    renderModificacionResultadosModal = () => {
        if (this.state.currentAnalisis!==null && this.state.currentAnalisis.determinaciones!==undefined && this.state.currentAnalisis.determinaciones.length>0) {
            return (
                <div>
                    <div className='tablaScrollModals'>
                        <Table basic='very' compact='very'>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Código</Table.HeaderCell>
                                    <Table.HeaderCell>Determinación</Table.HeaderCell>
                                    <Table.HeaderCell>Resultado</Table.HeaderCell>
                                    <Table.HeaderCell>Confirmación</Table.HeaderCell>
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
                                            <Table.Cell>
                                                <Button.Group>
                                                    <Button
                                                        active={this.state.currentAnalisis.determinaciones[index].estadoDetalleAnalisis.nombre === estadosDeterminaciones.REPETIR }
                                                        color={this.state.currentAnalisis.determinaciones[index].estadoDetalleAnalisis.nombre === estadosDeterminaciones.REPETIR ? 'red' : null}
                                                        onClick={() => this.changeResult(index, estadosDeterminaciones.REPETIR, 4)}>
                                                        Repetir
                                                    </Button>
                                                    <Button.Or text='o'/>
                                                    <Button
                                                        active={this.state.currentAnalisis.determinaciones[index].estadoDetalleAnalisis.nombre === estadosDeterminaciones.APROBADO }
                                                        color={this.state.currentAnalisis.determinaciones[index].estadoDetalleAnalisis.nombre === estadosDeterminaciones.APROBADO ? 'green' : null}
                                                        onClick={() => this.changeResult(index, estadosDeterminaciones.APROBADO, 3)}>
                                                        Aprobar
                                                    </Button>
                                                </Button.Group>
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                })}
                            </Table.Body>
                        </Table>
                    </div>
                    <Button
                        basic color='blue'
                        size='small'
                        disabled={!this.state.cambios}
                        onClick={this.handleSubmit}
                    > Guardar </Button>
                </div>
            ) 
        }
    }


    handleSubmit = (e) => {
        let temp = []

        this.state.currentAnalisis.determinaciones.map((det, index)=>{
            if(det.estadoDetalleAnalisis.nombre === estadosDeterminaciones.APROBADO ){
                return (temp[index] = { "codigoPracticaDeterminaciones": det.determinacion.codigoPractica, "repetir": false })
            } else if(det.estadoDetalleAnalisis.nombre === estadosDeterminaciones.REPETIR ){
                return (temp[index] = { "codigoPracticaDeterminaciones": det.determinacion.codigoPractica, "repetir": true })
            } 
            return true
        })

  	    this.props.revisarResultadosAction(this.props.idAnalisis, temp)

        this.hideModal()
    }

    checkNombre(){
        let nombre = this.props.analisis.paciente.nombre
        if(this.props.analisis.paciente.apellido !== undefined){
            nombre = this.props.analisis.paciente.nombre + ' ' + this.props.analisis.paciente.apellido
        }
        return nombre
    }

    render() {
        return (
            <div>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    {(this.props.analisis !== '' && !this.props.fetching) ? 
                        <div> 
                            <h3>{this.checkNombre()}</h3>
                            Revise los resultados de las determinaciones
                            <Divider section/>
                            {this.renderModificacionResultadosModal()} 
                        </div>

                    :  <div className='spinnerPosition'>
                            <SyncLoader
                                size={10}
                                margin={5}
                                color={"black"}
                            />
                        </div>  
                    }
                </Modal>
            </div>
        )
    }
}

RevisarResultados.propTypes = {
    idAnalisis: PropTypes.number,
}

const mapStateToProps = state => ({
    analisis: state.analisis.analisisById,
    fetching: state.analisis.fetchingAnalisisById,
})

export default connect(mapStateToProps, { getAnalisisByIdAction, revisarResultadosAction })(RevisarResultados)
