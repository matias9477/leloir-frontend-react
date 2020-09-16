import React, { Component } from 'react';
import { connect } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Container, Form, Divider, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import { urlTablaCaja } from '../../Constants/NavUrl';
import { addDeterminacionAction } from './../../Redux/determinacionesDuck';
import { validateOnlyNumbersRequired, validateRequiredStringNum } from './../../Services/MetodosDeValidacion';
import { convertStyleString } from '../../Services/MetodosDeterminacion';
import NavBar from '../NavBar/NavBar';
import '../styles.css';

class FormAlta extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            descripcionTransaccion: '',
            idConcepto: '',
            bitPagado: '',
            descripcionDetalle: '',
            idAnalisis: '',
            idFormaPago: '',
            importe: '',
            tipoTransaccion: '',

            // errorCodigoPractica: true,
            // errorDescripcionPractica: true,
            // errorUnidadBioquimica: true,
        });
    }

    handleUpdateClick = () => {
        var data = {
          "descripcion": this.state.descripcionTransaccion,
          "detallesTransaccionRequest": [
            {
              "bitPagado": true,
              "descripcion": this.state.descripcionDetalle,
              "idAnalisis": this.state.idAnalisis,
              "idDetalleConcepto": 1,
              "idFormaPago": this.state.idFormaPago, //1 efectivo, 2 credito
              "importe": this.state.importe
            }
          ],
          "idConcepto": this.state.idConcepto, // 1 analisis, 2 CoBico ?, 3 proveedores, 4 servicios publicos, 5 impuesto
          "tipoTransaccion": true //true creo q es una venta, false lo pone en negativo
        }

        this.props.addDeterminacionAction(data)
    };

    postTransaccion = (e) => {
        e.preventDefault();

        const {codigoPractica, unidadBioquimica, descripcionPractica} = this.state;

        const errorCodigoPractica= validateOnlyNumbersRequired(codigoPractica);
        const errorUnidadBioquimica = validateOnlyNumbersRequired(unidadBioquimica);
        const errorDescripcionPractica = validateRequiredStringNum(descripcionPractica);

        if (errorCodigoPractica && errorUnidadBioquimica && errorDescripcionPractica) {
            this.handleUpdateClick()
            this.vaciadoCampos()
        } else {
            alert('Verificar datos ingresados.')
            this.setState({
                errorCodigoPractica, 
                errorUnidadBioquimica,
                errorDescripcionPractica,
            })
        }
    }

    vaciadoCampos() {
        this.setState({
            descripcionTransaccion: '',
            bitPagado: '',
            descripcionDetalle: '',
            idAnalisis: '',
            idFormaPago: '',
            importe: '',
            idConcepto: '',
            tipoTransaccion: '',

            errorCodigoPractica: true,
            errorUnidadBioquimica: true,
            errorUnidadMedida: true,
        })
    }

    cambioDescripcionTransaccion = (e) => {
        this.setState({
          descripcionTransaccion: e.target.value
        })
    }

    cambioConceptoTransaccion = (e) => {
        this.setState({
            idConcepto: e.target.value
        })
    }

    cambioUnidadBioquimica = (e) => {
        this.setState({
            unidadBioquimica: e.target.value
        })
    }

    cambioUnidadMedida = (e) => {
        this.setState({
            unidadMedida: e.target.value
        })
    }


    render() {
        return (
            <div>
                <NavBar/>
                <div className='avoidMenu'>
                    <Container className='btnHeader'>
                        <Button as={Link} to={urlTablaCaja} exact='true' floated='left' icon
                                labelPosition='left' primary size='small'>
                            <Icon name='arrow alternate circle left'/> Volver
                        </Button>
                    </Container>

                    <Form size='huge'>
                        <Form.Field control='input'
                        value='Nueva Transacción'
                        id = 'headerConsulta'
                        />
                        <Divider id='divider'/>

                    </Form>

                    <Form onSubmit={this.postTransaccion}>

                        <Form.Group widths='equal'>
                            <Form.Field required label='Descripción Transacción' control='input' placeholder='Descripción Transacción' width={5}
                            value={this.state.descripcionTransaccion}
                            onChange={this.cambioDescripcionTransaccion}
                            // className={this.state.errorCodigoPractica ? null : 'error'}
                            />

                          {/* TODO: poner un select con los conceptos q vengan de BACKEND */}
                            <Form.Field required label='Concepto' control='input'
                            placeholder='Concepto'
                            value={this.state.idConcepto}
                            onChange={this.cambioConceptoTransaccion}
                            // className={this.state.errorDescripcionPractica ? null : 'error'}
                            />
                        </Form.Group>

                        {/* <Form.Field required label='Unidad Bioquímica' control='input' placeholder='Unidad Bioquímica'
                        value={this.state.unidadBioquimica}
                        onChange={this.cambioUnidadBioquimica}
                        className={this.state.errorUnidadBioquimica ? null : 'error'}
                        />

                        <Form.Field label='Unidad Medida' control='input' placeholder='Unidad Medida'
                        value={this.state.unidadMedida}
                        onChange={this.cambioUnidadMedida}/> */}

                        <Button style={{marginTop: '2rem'}} primary type="submit" onClick={this.postTransaccion}> Registrar Determinacion</Button>

                    </Form>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state =>({
    fetching: state.determinaciones.fetching,
})


export default connect(mapStateToProps,{ addDeterminacionAction })(FormAlta);