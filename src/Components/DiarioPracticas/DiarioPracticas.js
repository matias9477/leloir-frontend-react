import React, { Component } from 'react';
import MenuLateral from "../MenuOpciones";
import { Button, Card, List, Form} from 'semantic-ui-react';
import axios from "axios";
import { Modal } from './ModalAnalysisInput';
import CircularProgress from '@material-ui/core/CircularProgress';



class DiarioPracticas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pendientes: [],
            show: false,
            currentAnalysis: null,
        };
    }

    showModal = (id) => {
        this.setState({ show: true,
                        currentAnalysis: id 
                    });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    componentDidMount() {
        this.getAllPendientes()
        //uncomment this to use API
    }

    getAllPendientes = () => {
        axios.get("https://matiasturra.free.beeceptor.com/analisis/pendientes").then((response) => {
            this.setState({
                pendientes: Object.values(response.data).flat(),
            });
        }, (error) => {
            console.log('Error', error.message);
        })
    };

    renderCards = (pendientes) => (
        <Card.Group itemsPerRow={2}>

            {pendientes.map((analisis) => (
                <Card fluid>
                    <Card.Content>
                        <Card.Header>{analisis.paciente}</Card.Header>
                        <Card.Meta>{analisis.diasPendiente === 0 ? 'Hoy' : analisis.diasPendiente === 1 ? 'Ayer' :
                            <div>Hace {analisis.diasPendiente} dias</div>}</Card.Meta>
                        <Card.Description>
                            Determinacion
                        <List bulleted>
                                {analisis.determinaciones.map(nombre => <List.Item><strong>{nombre}</strong></List.Item>)}
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
                                        onClick={() => this.showModal(analisis)}>
                                        Modificar Resultados
                                </Button>
                                </div>
                            ) : (
                                    <div className='ui two buttons'>
                                        <Button basic color='blue'
                                            onClick={() => this.showModal(analisis)}>
                                            Cargar Resultados
                                </Button>
                                    </div>
                                )

                        }
                    </Card.Content>
                </Card>
            ))}
        </Card.Group>
    )

    renderAnalysisInputModal = (currentAnalysis) =>{

        return (<Form>       
         {currentAnalysis.determinaciones.map(nombre => 
        <Form.Field required label={nombre} control='input'
            placeholder='Ingrese resultado...' 
            />
        )}
        </Form>)
    };


    render() {
        return (
            <div className='union'>
                <MenuLateral />
                <div className='tablaListadoHistorico'>
                    {this.renderCards(this.state.pendientes)}
                </div>

                <Modal show={this.state.show} handleClose={this.hideModal}>
                        <div>
                            {this.state.currentAnalysis ? this.renderAnalysisInputModal(this.state.currentAnalysis) 
                                : <CircularProgress size={50}/>}
                        </div>
                    <Button>Guardar</Button>
                </Modal>

            </div>
        );
    }
}

export default DiarioPracticas;