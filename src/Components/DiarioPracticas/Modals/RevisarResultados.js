import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import {urlCargarResultados, urlGetAnalisis} from "../../../Constants/URLs";
import {Button, Divider, Form, Segment} from "semantic-ui-react";
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
                    this.addResultado(detalleanalisis.determinacion.codigoPractica, detalleanalisis.determinacion.descripcionPractica, detalleanalisis.resultado);
                    return true;
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
            this.setState({resultados: resultados})
        } else {
            this.setState({[e.target.name]: e.target.value.toUpperCase()})
        }
    };


    renderModificacionResultadosModal = () => {
        if (this.state.currentAnalisis != null) {
            return (
                <Form onSubmit={this.handleSubmit} onChange={this.handleCambioResultado}>
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
                                let determinacionId = `det-${idx}`;
                                let texto = [detalleAnalisis.descripcionPractica, ":", this.state.resultados[idx].resultado].join(" ");

                                return (
                                    <Grid.Row verticalAlign='middle'>
                                        {/*<div key={idx}>*/}
                                        <Grid.Column width={10}>
                                            {/*<label htmlFor={determinacionId}/>*/}
                                            <Container text>
                                                {detalleAnalisis.descripcionPractica}
                                            </Container>
                                        </Grid.Column>
                                        <Grid.Column width={3}>
                                            {/*<label htmlFor={determinacionId}/>*/}
                                            <Container text>
                                                <b>{this.state.resultados[idx].resultado}</b>
                                            </Container>
                                        </Grid.Column>
                                        <Grid.Column width={3}>
                                            <Button.Group>
                                                <Button
                                                        active={false}
                                                        color={false ? 'red' : null}>
                                                    Repetir
                                                </Button>
                                                <Button.Or text='o'/>
                                                <Button
                                                        active={false}
                                                        color={false ? 'green' : null}>
                                                    Aprobar
                                                </Button>
                                            </Button.Group>
                                        </Grid.Column>

                                        {/*</div>*/}
                                    </Grid.Row>

                                )
                            }
                        )}
                    </Grid>
                    <br/>
                    <br/>
                    <Button color='green' type='submit'>Guardar</Button>
                </Form>)
        }
    };

    handleSubmit = (e) => {
        let data = this.state.resultados;
        let filteredData = data.filter(function (resultado) {
            if (resultado != null) {
                return resultado;
            }
        });

        data.map(resultado => delete resultado.descripcionPractica);
        axios.post(urlCargarResultados + this.props.idAnalisis, filteredData).then(resolve => {


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
