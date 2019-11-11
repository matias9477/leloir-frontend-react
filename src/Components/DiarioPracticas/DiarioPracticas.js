import React, {Component} from 'react';
import MenuLateral from "../MenuOpciones";
import {Button, Card, List} from 'semantic-ui-react';
import axios from "axios";
import {urlAnalisisPendientes, urlEmitirAnalisis} from "../../Constants/URLs";
import CircularProgress from "@material-ui/core/CircularProgress";
import ModificarResultados from "./Modals/ModificarResultados";
import RevisarResultados from "./Modals/RevisarResultados";
import Label from "semantic-ui-react/dist/commonjs/elements/Label";


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
        };
    }

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

    emitirAnalisis = (idAnalisis) => {
        axios.get(urlEmitirAnalisis + idAnalisis, {responseType: 'blob',}).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            const index1 = response.headers['content-disposition'].indexOf("name=\"") + 6;
            const index2 = response.headers['content-disposition'].indexOf("\"", 18);
            link.href = url;
            link.setAttribute('download', response.headers['content-disposition'].substring(index1, index2)); //or any other extension
            document.body.appendChild(link);
            link.click();
            this.getAllPendientes()
        }, (error) => {
            console.log('Error', error.message);
        })
    };

    showModal = (idAnalisis, modal) => {
        this.setState({
            show: true,
            currentAnalisisID: idAnalisis,
            currentModal: modal

        });
    };

    hideModalCallback = () => {
        this.setState({
            currentAnalisisID: null,
            show: false,
            currentModal: null,
        });
        this.getAllPendientes()
    };

    renderButtons = (estado, idAnalisis) => {
        switch (estado) {
            case "EN_PROCESO":
                return (
                    <Card.Content extra>
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
                    </Card.Content>
                );
            case "PREPARADO":
                return (
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button color='green'
                                    onClick={() => this.emitirAnalisis(idAnalisis)}>
                                Emitir Analisis
                            </Button>
                            <Button basic color='blue'
                                    onClick={() => this.showModal(idAnalisis, "MODIFICAR")}>
                                Modificar Resultados
                            </Button>
                        </div>
                    </Card.Content>

                );
            case "NUEVO":
                return (
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color='blue'
                                    onClick={() => this.showModal(idAnalisis, "MODIFICAR")}>
                                Cargar Resultados
                            </Button>
                        </div>
                    </Card.Content>
                );
            default:
                return (
                    <Label as='a' attached='bottom'>
                        {estado}
                    </Label>
                )
        }
    };

    renderCards = () => (
        <Card.Group stackable itemsPerRow={2}>
            {this.state.pendientes.map((analisis) => (
                <Card fluid raised centered>
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

                    {this.renderButtons(analisis.estadoAnalisis, analisis.idAnalisis)}

                </Card>
            ))}
        </Card.Group>
    );

    handleModalContent() {
        switch (this.state.currentModal) {
            case "MODIFICAR":
                return (
                    <ModificarResultados show={this.state.show}
                                         callback={this.hideModalCallback}
                                         idAnalisis={this.state.currentAnalisisID}/>
                );
            case "REVISAR":
                return (
                    <RevisarResultados show={this.state.show}
                                       callback={this.hideModalCallback}
                                       idAnalisis={this.state.currentAnalisisID}/>
                );
            default:
                return null
        }
    };

    render() {
        return (
            <div className='union'>
                <MenuLateral/>
                <div className='tablaListadoHistorico'>
                    {this.state.pendientes.length === 0 ?
                        <CircularProgress className={'centeredPosition'} size={50}/> : this.renderCards()}
                </div>
                <div>
                    {this.handleModalContent()}
                </div>
            </div>
        );
    }
}

export default DiarioPracticas;