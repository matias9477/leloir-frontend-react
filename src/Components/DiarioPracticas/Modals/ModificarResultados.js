import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SyncLoader from 'react-spinners/SyncLoader';

import { Button, Divider, Table, Input } from 'semantic-ui-react';
import { Modal } from './ModalAnalysisInput';
import { cargarResultadosAction, getAnalisisByIdAction } from '../../../Redux/analisisDuck';
import { validateOnlyNumbers } from '../../../Services/MetodosDeValidacion';

class ModificarResultados extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            currentAnalisis: null,
            cambios: false,
            error: [],
        };
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
        const {callback} = this.props;
        if (callback !== undefined) {
            callback()
        }
    }

    changeResultado = e => {

        let analisisCopy = JSON.parse(JSON.stringify(this.state.currentAnalisis))

        analisisCopy.determinaciones[e.target.name].resultado = e.target.value
     
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
                                </Table.Row>
                            </Table.Header> 

                            <Table.Body>
                                {this.props.analisis.determinaciones.map((det, index) => {
                                    return( 
                                        <Table.Row  key={index} value={det}>
                                            <Table.Cell>{det.determinacion.codigoPractica}</Table.Cell>
                                            <Table.Cell>{det.determinacion.descripcionPractica}</Table.Cell>
                                            <Table.Cell>
                                                {det.estadoDetalleAnalisis.nombre==="APROBADO" ? 
                                                    <Input name={index} maxLength={5} id='disabled'
                                                    value={this.state.currentAnalisis.determinaciones[index].resultado} 
                                                    placeholder='Ingrese resultado...' onChange={this.changeResultado}/> 
                                                :
                                                    <Input name={index} maxLength={5}
                                                    value={this.state.currentAnalisis.determinaciones[index].resultado} 
                                                    placeholder='Ingrese resultado...' onChange={this.changeResultado}/> 
                                                }
                                                
                                                {det.determinacion.unidadMedida===null ? '' : ' ' +
                                                    det.determinacion.unidadMedida.unidad}
                                                </Table.Cell>
                                        </Table.Row>
                                    )
                                })}
                            </Table.Body>
                        </Table>
                    </div>
                    <Button
                        color='green'
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
            return (temp[index] = { "idDeterminacion": det.determinacion.codigoPractica, "resultado": det.resultado })
        })

        this.props.cargarResultadosAction(this.props.idAnalisis, temp)
    
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
                            Ingrese los resultados de las determinaciones
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

ModificarResultados.propTypes = {
    idAnalisis: PropTypes.number,
};

const mapStateToProps = state => ({
    analisis: state.analisis.analisisById,
    fetching: state.analisis.fetchingAnalisisById,
})

export default connect(mapStateToProps, { cargarResultadosAction, getAnalisisByIdAction })(ModificarResultados)
