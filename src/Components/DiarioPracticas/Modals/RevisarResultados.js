import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import {urlAprobarResultados, urlGetAnalisis} from "../../../Constants/URLs";
import {Button, Divider, Form } from "semantic-ui-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Modal} from "./ModalAnalysisInput";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import Container from "semantic-ui-react/dist/commonjs/elements/Container";

class RevisarResultados extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            currentAnalisisID: null,
            currentAnalisis: null,
            resultados: [],
        };
    }

    componentDidMount() {
        this.showModal()
    }

    showModal = () => {
        this.setState({
            show: true,
        });
        this.getAnalisis(this.props.idAnalisis)
    };

    hideModal = () => {
        const {callback} = this.props;
        if (callback !== undefined) {
            callback()
        }
    };

    getAnalisis = (idAnalisis) => {
        if (idAnalisis != null) {
            axios.get((urlGetAnalisis + idAnalisis)).then(resolve => {
                resolve.data.determinaciones.map(detalleanalisis => {
                    let repetir = null;
                    if (detalleanalisis.estadoDetalleAnalisis.nombre === 'APROBADO') repetir = false;
                    else {
                        if (detalleanalisis.estadoDetalleAnalisis.nombre === 'REPETIR') repetir = true;
                    }
                    this.addResultado(detalleanalisis.determinacion.codigoPractica, detalleanalisis.determinacion.descripcionPractica, detalleanalisis.resultado, repetir);
                    return true;
                });
                this.setState({currentAnalisis: resolve.data});
            }, (error) => {
                console.log('Error get tipo', error.message);
                return (<div><h1> Error!</h1></div>)
            });
        }
    };

    addResultado = (codigopractica, descripcionpractica, resultado, repetir) => {
        this.setState(prevState => ({
                resultados: [
                    ...prevState.resultados,
                    {
                        codigoPracticaDeterminaciones: codigopractica,
                        descripcionPractica: descripcionpractica,
                        resultado: resultado,
                        repetir: repetir
                    }
                ]

            }
        ))
    };

    handleButtons = (idx, state) => {
        if (this.state.resultados[idx].repetir === state) {
            let resultados = [...this.state.resultados];
            resultados[idx].repetir = null;
            this.setState({resultados: resultados})
        } else {
            let resultados = [...this.state.resultados];
            resultados[idx].repetir = state;
            this.setState({resultados: resultados})
        }
    };


    renderModificacionResultadosModal = () => {
        if (this.state.currentAnalisis != null) {
            return (
                <Form>
                    <Grid columns={4} textAlign='left'>
                        <Grid.Row>
                            <Grid.Column width={10}>
                                <Container text>
                                    Determinacion
                                </Container>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Container text>
                                    Resultado
                                </Container>
                            </Grid.Column>
                        </Grid.Row>
                        {this.state.resultados.map((detalleAnalisis, idx) => {

                                return (
                                    <Grid.Row verticalAlign='middle'>

                                        <Grid.Column width={10}>

                                            <Container text>
                                                {detalleAnalisis.descripcionPractica}
                                            </Container>
                                        </Grid.Column>
                                        <Grid.Column width={3}>

                                            <Container text>
                                                <b>{this.state.resultados[idx].resultado}</b>
                                            </Container>
                                        </Grid.Column>
                                        <Grid.Column width={3}>
                                            <Button.Group>
                                                <Button
                                                    active={this.state.resultados[idx].repetir}
                                                    color={this.state.resultados[idx].repetir ? 'red' : null}
                                                    onClick={() => this.handleButtons(idx, true)}>
                                                    Repetir
                                                </Button>
                                                <Button.Or text='o'/>
                                                <Button
                                                    active={this.state.resultados[idx].repetir === false}
                                                    color={this.state.resultados[idx].repetir === false ? 'green' : null}
                                                    onClick={() => this.handleButtons(idx, false)}>
                                                    Aprobar
                                                </Button>
                                            </Button.Group>
                                        </Grid.Column>

                                    </Grid.Row>

                                )
                            }
                        )}
                    </Grid>
                    <br/>
                    <br/>
                    <Button color='green'
                            type='submit'
                            onClick={this.handleSubmit}>Guardar</Button>
                </Form>
            )
        }
    };

    handleSubmit = (e) => {
        let data = this.state.resultados;
        let filteredData = data.filter(function (repetir) {
            if (repetir != null) {
                return repetir;
            }
        });

        data.map(resultado => delete resultado.descripcionPractica);
        data.map(resultado => delete resultado.resultado);

        console.log(data);

        axios.post(urlAprobarResultados + this.props.idAnalisis, filteredData).then(resolve => {
            return true
        }, (error) => {
            console.log('Error submit', error.message);
        });
        this.hideModal();
    };

    render() {
        return (
            <div>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    <div>
                        <h2>Revise los resultados de las siguientes determinaciones</h2>

                        <Divider section/>

                        <br/>
                        {this.state.currentAnalisis != null ? this.renderModificacionResultadosModal() :
                            <CircularProgress className={'centeredPosition'} size={50}/>}
                    </div>
                </Modal>
            </div>
        );
    }
}

RevisarResultados.propTypes = {
    idAnalisis: PropTypes.number,
};

export default RevisarResultados;
