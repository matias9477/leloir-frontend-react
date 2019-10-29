import React, {Component} from 'react';
import MenuLateral from "../MenuOpciones";
import {Button, Card, Form, List} from 'semantic-ui-react';
import axios from "axios";
import {Modal} from './Modals/ModalAnalysisInput';
import {urlAnalisisPendientes, urlCargarResultados, urlGetAnalisis} from "../../Constants/URLs";
import CircularProgress from "@material-ui/core/CircularProgress";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import ModificarResultados from "./Modals/ModificarResultados";


class DiarioPracticas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pendientes: [],
            show: false,
            currentAnalisisID: null,
            // currentAnalisis: null,
            currentModal: null,
            // resultados: [],
            toggle:true,
        };
    }

    showModal = (idAnalisis, modal) => {
        this.setState(prevState =>({
            show: true,
            currentAnalisisID: idAnalisis,
            currentModal: modal,
            toggle: !prevState.toggle

        }));
        // this.getAnalisis(idAnalisis)
    };
    //
    // hideModal = () => {
    //     this.setState({
    //         show: false,
    //         currentAnalisisID: null,
    //         currentAnalisis: null,
    //         currentModal: null,
    //         resultados: [],
    //
    //     });
    // };

    componentDidMount() {
        this.getAllPendientes()
    }

    getAllPendientes = () => {
        axios.get(urlAnalisisPendientes).then((response) => {
            this.setState({
                pendientes: Object.values(response.data).flat(),
            });
        }, (error) => {
            console.log('Error', error.message);
        })
    };

    renderButtons = (estado, idAnalisis) => {
        switch (estado) {
            case "EN_PROCESO":
                return (
                    <div className='ui two buttons'>
                        <Button basic color='green'
                                onClick={() => this.showModal(idAnalisis, "REVISAR")}>
                            Revisar Analisis
                        </Button>
                        <Button basic color='blue'
                                onClick={() => this.showModal(idAnalisis, "MODIFICAR")}>
                            Modificar Resultados
                        </Button>
                    </div>
                );
            case "PREPARADO":
                return (
                    <div className='ui two buttons'>
                        <Button basic color='green'
                                onClick={() => this.showModal(idAnalisis, "EMITIR")}>
                            Emitir Analisis
                        </Button>
                        <Button basic color='blue'
                                onClick={() => this.showModal(idAnalisis, "MODIFICAR")}>
                            Modificar Resultados
                        </Button>
                    </div>
                );
            case "NUEVO":
                return (
                    <div className='ui two buttons'>
                        <Button basic color='blue'
                                onClick={() => this.showModal(idAnalisis, "MODIFICAR")}>
                            Cargar Resultados
                        </Button>
                    </div>
                );
            default:
                return null
        }
    };

    renderCards = () => (
        <Card.Group stackable itemsPerRow={2}>
            {this.state.pendientes.map((analisis) => (
                <Card fluid>
                    <Card.Content>
                        <Card.Header>{analisis.paciente}</Card.Header>
                        <Card.Meta>{analisis.diasPendiente}</Card.Meta>
                        <Card.Description textAlign='left'>
                            Determinacion
                            <List>
                                {analisis.determinaciones.map(nombre =>
                                    <List.Item>
                                        <List.Icon name='lab'/>
                                        <List.Content><strong>{nombre}</strong></List.Content>
                                    </List.Item>)}
                            </List>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        {this.renderButtons(analisis.estadoAnalisis, analisis.idAnalisis)}
                    </Card.Content>
                </Card>
            ))}
        </Card.Group>
    );

    // getAnalisis = (idAnalisis) => {
    //     if (idAnalisis != null) {
    //         axios.get(urlGetAnalisis + idAnalisis).then(resolve => {
    //             resolve.data.determinaciones.map(detalleanalisis => {
    //                 this.addResultado(detalleanalisis.determinacion.codigoPractica, detalleanalisis.determinacion.descripcionPractica, detalleanalisis.resultado);
    //                 return true; //para sacar el warning
    //             });
    //             this.setState({currentAnalisis: resolve.data});
    //         }, (error) => {
    //             console.log('Error get tipo', error.message);
    //             return (<div><h1> Error!</h1></div>)
    //         });
    //     }
    // };
    //
    // addResultado = (codigopractica, descripcionpractica, resultado) => {
    //     this.setState(prevState => ({
    //             resultados: [
    //                 ...prevState.resultados,
    //                 {idDeterminacion: codigopractica, descripcionPractica: descripcionpractica, resultado: resultado}
    //             ]
    //
    //         }
    //     ))
    // };
    //
    // handleCambioResultado = (e) => {
    //     if (["idDeterminacion", "descripcionPractica", "resultado"].includes(e.target.className)) {
    //         let resultados = [...this.state.resultados];
    //         resultados[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase();
    //         this.setState({resultados: resultados})
    //     } else {
    //         this.setState({[e.target.name]: e.target.value.toUpperCase()})
    //     }
    // };
    //
    //
    // renderModificacionResultadosModal = () => {
    //     if (this.state.currentAnalisis != null) {
    //         return (
    //             <Form onSubmit={this.handleSubmit} onChange={this.handleCambioResultado}>
    //                 {this.state.resultados.map((detalleAnalisis, idx) => {
    //                         let determinacionId = `det-${idx}`;
    //                         return (
    //                             <div key={idx} class="block">
    //                                 <label htmlFor={determinacionId}>{detalleAnalisis.descripcionPractica}</label>
    //                                 <input
    //                                     type="text"
    //                                     name={determinacionId}
    //                                     data-id={idx}
    //                                     id={determinacionId}
    //                                     value={this.state.resultados[idx].resultado}
    //                                     placeholder="Ingrese resultado..."
    //                                     className="resultado"
    //                                 />
    //                             </div>
    //                         )
    //                     }
    //                 )}
    //                 <br/>
    //                 <br/>
    //                 <Button color='green' type='submit'>Guardar</Button>
    //             </Form>)
    //     }
    // };

    handleModalContent() {
        switch (this.state.currentModal) {
            case "MODIFICAR":
                return (
                    // this.renderModificacionResultadosModal()
                    <ModificarResultados show={this.state.show} toggle={this.state.toggle} idAnalisis={this.state.currentAnalisisID}/>
                );
            case "REVISAR":
                return (
                    <Segment>
                        <h1>woa REVISAR</h1>
                    </Segment>
                );
            case "EMITIR":
                return (
                    <Segment>
                        <h1>woa EMITIR</h1>
                    </Segment>
                );
            default:
                return null
        }
    };

    // handleSubmit = (e) => {
    //     let data = this.state.resultados;
    //     let filteredData = data.filter(function (resultado) {
    //         if (resultado != null) {
    //             return resultado;
    //         }
    //     });
    //
    //     data.map(resultado => delete resultado.descripcionPractica);
    //     axios.post(urlCargarResultados + this.state.currentAnalisisID, filteredData).then(resolve => {
    //
    //
    //     }, (error) => {
    //         console.log('Error submit', error.message);
    //     });
    //     this.hideModal();
    //     this.getAllPendientes();
    // };

    render() {
        return (
            <div className='union'>
                <MenuLateral/>
                <div className='tablaListadoHistorico'>
                    {this.state.pendientes.length === 0 ?
                        <CircularProgress className={'centeredPosition'} size={50}/> : this.renderCards()}
                </div>

                {/*<Modal show={this.state.show} handleClose={this.hideModal}>*/}
                {/*    <div>*/}
                {/*        <br/>*/}
                {/*        {this.state.currentAnalisis ? this.handleModalContent() :*/}
                {/*            <CircularProgress className={'centeredPosition'} size={50}/>}*/}
                {/*    </div>*/}
                {/*</Modal>*/}
                <div>
                    {this.handleModalContent()}
                </div>
            </div>
        );
    }
}

export default DiarioPracticas;