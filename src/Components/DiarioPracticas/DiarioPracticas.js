import React, {Component} from 'react';
import MenuLateral from "../MenuOpciones";
import {Button, Card, Form, List} from 'semantic-ui-react';
import axios from "axios";
import {Modal} from './ModalAnalysisInput';
import {urlAnalisisPendientes, urlCargarResultados, urlGetAnalisis} from "../../Constants/URLs";


class DiarioPracticas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pendientes: [],
            show: false,
            currentAnalisisID: null,
            currentAnalisis: null,
        };
    }

    showModal = (idAnalisis) => {
        this.setState({
            show: true,
            currentAnalisisID: idAnalisis
        });
    };

    hideModal = () => {
        this.setState({
            show: false,
            currentAnalisisID: null,
            currentAnalisis: null,

        });
    };

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


    renderAnalysisInputModal = () => { //Este es el metodo que al parecer se ejecuta en un ciclo mientras este abierto el modal
        if (this.state.currentAnalisisID != null) {
            axios.get(urlGetAnalisis + this.state.currentAnalisisID).then(resolve => {
                this.setState({currentAnalisis: resolve.data})
            }, (error) => {
                console.log('Error get tipo', error.message);
                return (<div><h1> Error!</h1></div>)
            });
        }
        if (this.state.currentAnalisis != null) {
            return (<Form onSubmit={() => this.handleSubmit(this.state.currentAnalisisID, this.state.currentAnalisis)}>
                {this.state.currentAnalisis.determinaciones.map(detalleAnalisis =>
                    <Form.Field inline required label={detalleAnalisis.determinacion.descripcionPractica}
                                control='input'
                                placeholder='Ingrese resultado...'
                    />
                )}
                <br/>
                <br/>
                <Button color='green' type='submit'>Guardar</Button>
            </Form>)
        }
    };

    handleSubmit(currentAnalisisID, e) { //No se como tomar los datos del form y pasarselos al metodo
        console.log(currentAnalisisID);
        console.log(e.target);
        let data = [
            {
                "idDeterminacion": 0,
                "resultado": 0
            }
        ]; //Tiene que ser de este formato la carga de resultados, es lo que se agrega en los form input
        axios.post(urlCargarResultados + currentAnalisisID,)
    }

    render() {
        return (
            <div className='union'>
                <MenuLateral/>
                <div className='tablaListadoHistorico'>
                    {this.renderCards()}
                </div>

                <Modal show={this.state.show} handleClose={this.hideModal}>
                    <div>
                        {this.renderAnalysisInputModal()}
                    </div>
                </Modal>
            </div>
        );
    }
}

export default DiarioPracticas;