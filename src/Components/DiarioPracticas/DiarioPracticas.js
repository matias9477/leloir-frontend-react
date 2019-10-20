import React, {Component} from 'react';
import MenuLateral from "../MenuOpciones";
import {Button, Card, Form, List} from 'semantic-ui-react';
import axios from "axios";
import {Modal} from './ModalAnalysisInput';
import CircularProgress from '@material-ui/core/CircularProgress';
import {urlAnalisisPendientes, urlGetAnalisis} from "../../Constants/URLs";


class DiarioPracticas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pendientes: [],
            show: false,
            currentAnalysis: null,
        };
    }

    showModal = (idAnalisis) => {
        this.setState({
            show: true,
            currentAnalisisID: idAnalisis
        });
    };

    hideModal = () => {
        this.setState({show: false});
    };

    componentDidMount() {
        this.getAllPendientes()
        //uncomment this to use API
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

    renderCards = (pendientes) => (
        <Card.Group stackable itemsPerRow={2}>

            {pendientes.map((analisis) => (
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
                        {
                            analisis.resultadosCargados ? (
                                <div className='ui two buttons'>
                                    <Button basic color='green'>
                                        Emitir Analisis
                                    </Button>
                                    <Button basic color='blue'
                                            onClick={() => this.showModal(analisis.idAnalisis)}>
                                        Modificar Resultados
                                    </Button>
                                </div>
                            ) : (
                                <div className='ui two buttons'>
                                    <Button basic color='blue'
                                            onClick={() => this.showModal(analisis.idAnalisis)}>
                                        Cargar Resultados
                                    </Button>
                                </div>
                            )

                        }
                    </Card.Content>
                </Card>
            ))}
        </Card.Group>
    );


    renderAnalysisInputModal = (currentAnalisisID) => {
        axios.get(urlGetAnalisis + currentAnalisisID).then(resolve => {
            this.setState({currentAnalysis:resolve.data.analisisId});
            return (<Form onSubmit={() => this.handleSubmit(currentAnalisisID, resolve)}>
                {resolve.data.determinaciones.map(detalleAnalisis =>
                    <Form.Field inline required label={detalleAnalisis.determinacion.descripcionPractica}
                                control='input'
                                placeholder='Ingrese resultado...'
                    />
                )}
                <br/>
                <br/>
                <Button color='green' type='submit'>Guardar</Button>
            </Form>)
        }, (error) => {
            console.log('Error get tipo', error.message);
            return (<div> Error!</div>)
        });


    };

    handleSubmit(currentAnalisisID, analisis) {
        console.log(currentAnalisisID)
    }

    render() {
        return (
            <div className='union'>
                <MenuLateral/>
                <div className='tablaListadoHistorico'>
                    {this.renderCards(this.state.pendientes)}
                </div>

                <Modal show={this.state.show} handleClose={this.hideModal}>
                    <div>
                        {this.state.currentAnalysis ? this.renderAnalysisInputModal(this.state.currentAnalysis)
                            : <CircularProgress size={50}/>}
                    </div>

                </Modal>

            </div>
        );
    }
}

export default DiarioPracticas;