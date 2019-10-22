import React, {Component} from 'react';
import MenuLateral from "../MenuOpciones";
import {Button, Card, Form, List} from 'semantic-ui-react';
import axios from "axios";
import {Modal} from './ModalAnalysisInput';
import {urlAnalisisPendientes, urlCargarResultados, urlGetAnalisis} from "../../Constants/URLs";
import CircularProgress from "@material-ui/core/CircularProgress";


class DiarioPracticas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pendientes: [],
            show: false,
            currentAnalisisID: null,
            currentAnalisis: null,
            resultados: [],
        };
    }

    showModal = (idAnalisis) => {
        this.setState({
            show: true,
            currentAnalisisID: idAnalisis
        });
        this.getAnalisis(idAnalisis)
    };

    hideModal = () => {
        this.setState({
            show: false,
            currentAnalisisID: null,
            currentAnalisis: null,
            resultados: [],

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

    getAnalisis = (idAnalisis) => {
        if (idAnalisis != null) {
            axios.get(urlGetAnalisis + idAnalisis).then(resolve => {
                resolve.data.determinaciones.map(detalleanalisis => {
                    this.addResultado(detalleanalisis.determinacion.codigoPractica, detalleanalisis.determinacion.descripcionPractica, detalleanalisis.resultado);
                    return true; //para sacar el warning
                });
                this.setState({currentAnalisis: resolve.data});
            }, (error) => {
                console.log('Error get tipo', error.message);
                return (<div><h1> Error!</h1></div>)
            });
        }
    };

    addResultado = (codigopractica, descripcionpractica, resultado) => {
        this.setState(prevState => ({
                resultados: [
                    ...prevState.resultados,
                    {idDeterminacion: codigopractica, descripcionPractica: descripcionpractica, resultado: resultado}
                ]

            }
        ))
    };

    handleCambioResultado = (e) => {
        if (["idDeterminacion", "descripcionPractica", "resultado"].includes(e.target.className)) {
            let resultados = [...this.state.resultados];
            resultados[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase();
            this.setState({resultados}, () => console.log(this.state.resultados))
        } else {
            this.setState({[e.target.name]: e.target.value.toUpperCase()})
        }
    };


    renderAnalysisInputModal = () => { //Este es el metodo que al parecer se ejecuta en un ciclo mientras este abierto el modal
        if (this.state.currentAnalisis != null) {
            return (
            <Form onSubmit={this.handleSubmit} onChange={this.handleCambioResultado} >
                {this.state.resultados.map((detalleAnalisis, idx) => {
                        let determinacionId = `det-${idx}`;
                        return (
                            <div key={idx}>
                                <label htmlFor={determinacionId}>{detalleAnalisis.descripcionPractica}</label>
                                 <input
                                    type="text"
                                    name={determinacionId}
                                    data-id={idx}
                                    id={determinacionId}
                                    value={this.state.resultados[idx].resultado}
                                    placeholder="Ingrese resultado..."
                                    className="resultado"
                                />
                            </div>
                        )
                    }
                )}
                <br/>
                <br/>
                <Button color='green' type='submit'>Guardar</Button>
            </Form>)
        }
    };

    handleSubmit = (e) => {
        let data = this.state.resultados;
        let filteredData = data.filter(function(resultado) {
            if(resultado!=null){
                return resultado;
            }
        })

        data.map(resultado => delete resultado.descripcionPractica);
        console.log(filteredData);
        axios.post(urlCargarResultados + this.state.currentAnalisisID,filteredData).then(resolve => {


        }, (error) => {
            console.log('Error submit', error.message);
        });
        this.hideModal();
        this.getAllPendientes();
    };

    render() {
        return (
            <div className='union'>
                <MenuLateral/>
                <div className='tablaListadoHistorico'>
                    {this.renderCards()}
                </div>

                <Modal show={this.state.show} handleClose={this.hideModal}>
                    <div>
                        <br/>
                        {this.state.currentAnalisis ? this.renderAnalysisInputModal() :
                            <CircularProgress className={'centeredPosition'} size={50}/>}
                    </div>
                </Modal>
            </div>
        );
    }
}

export default DiarioPracticas;