import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import {urlCargarResultados, urlGetAnalisis} from "../../../Constants/URLs";
import {Button, Divider, Form, Segment} from "semantic-ui-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Modal} from "./ModalAnalysisInput";

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
                    {this.state.resultados.map((detalleAnalisis, idx) => {
                            let determinacionId = `det-${idx}`;
                            return (
                                <div key={idx} class="block">
                                    <label htmlFor={determinacionId}></label>
                                    {detalleAnalisis.descripcionPractica} : <b>{this.state.resultados[idx].resultado}</b>
                                    <input
                                        align="left"
                                        type="checkbox"
                                        name={determinacionId}
                                        data-id={idx}
                                        id={determinacionId}
                                        value={this.state.resultados[idx].resultado}
                                        className="resultado"
                                    /> <br/>
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
