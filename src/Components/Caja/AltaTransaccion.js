import React, { Component } from 'react';
import { connect } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Container, Form, Divider, Icon, Header, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import Select from 'react-select';

import { urlTablaCaja } from '../../Constants/NavUrl';
import { validateRequiredCombos, validateRequiredStringNum, validateOnlyNumbersRequired } from './../../Services/MetodosDeValidacion';
import { addTransaccionAction, getFormasDePagoAction, getConceptosAction } from '../../Redux/cajaDuck';
import NavBar from '../NavBar/NavBar';
import '../styles.css';

class FormAlta extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            descripcionTransaccion: '',
            concepto: '',
            tipoTransaccion: '',

            bitPagado: '',
            descripcionDetalle: '',
            idAnalisis: '',
            formaPago: '',
            importe: '',

            errorDescripcionTransaccion: true,
            errorConcepto: true,
            errorTipoTransaccion: true,
            errorDescripcionDetalle: true,
            errorFormaPago: true,
            errorBitPagado: true,
            errorImporte: true,
        });
    }

    componentDidMount(){
        this.props.getFormasDePagoAction()
        this.props.getConceptosAction()
    }

    handleUpdateClick = () => {
        var data = {
                "concepto": this.state.concepto.nombre,
                "descripcion": this.state.descripcionTransaccion,
                "detallesTransaccionRequest": [
                  {
                    "bitPagado": this.state.bitPagado.value,
                    "descripcion": this.state.descripcionDetalle,
                    "formaPago": this.state.formaPago.nombre,
                    "idAnalisis": null,
                    "importe": this.state.importe
                  }
                ],
                "ingreso": this.state.tipoTransaccion.value
        }
        
        this.props.addTransaccionAction(data)
    }

    postTransaccion = (e) => {
        e.preventDefault();

        const {descripcionTransaccion, concepto, tipoTransaccion, descripcionDetalle, formaPago, bitPagado, importe} = this.state;

        const errorDescripcionTransaccion= validateRequiredStringNum(descripcionTransaccion);
        const errorConcepto = validateRequiredCombos(concepto);
        const errorTipoTransaccion = validateRequiredCombos(tipoTransaccion);
        const errorDescripcionDetalle = validateRequiredStringNum(descripcionDetalle);
        const errorFormaPago = validateRequiredCombos(formaPago);
        const errorBitPagado = validateRequiredCombos(bitPagado);
        const errorImporte = validateOnlyNumbersRequired(importe);

        if (errorDescripcionTransaccion && errorConcepto && errorTipoTransaccion && errorDescripcionDetalle && errorFormaPago && errorBitPagado && errorImporte) {
            this.handleUpdateClick()
            this.vaciadoCampos()
        } else {
            alert('Verificar datos ingresados.')
            this.setState({
                errorDescripcionTransaccion, 
                errorConcepto,
                errorTipoTransaccion,
                errorDescripcionDetalle,
                errorFormaPago,
                errorBitPagado,
                errorImporte
            })
        }
    }

    vaciadoCampos() {
        this.setState({
            descripcionTransaccion: '',
            concepto: '',
            tipoTransaccion: '',

            bitPagado: '',
            descripcionDetalle: '',
            idAnalisis: '',
            formaPago: '',
            importe: '',

            errorDescripcionTransaccion: true,
            errorConcepto: true,
            errorTipoTransaccion: true,
            errorDescripcionDetalle: true,
            errorFormaPago: true,
            errorBitPagado: true,
            errorImporte: true,
        })
    }

    cambioDescripcionTransaccion = (e) => {
        this.setState({
          descripcionTransaccion: e.target.value
        })
    }

    cambioConceptoTransaccion = (e) => {
        this.setState({
            concepto: e
        })
    }

    cambioTipoTransaccion = (e) => {
        this.setState({
            tipoTransaccion: e
        })
    }

    cambioDescripcionDetalle = (e) => {
        this.setState({
            descripcionDetalle: e.target.value
        })
    }

    cambioFormaDePago = (e) => {
        this.setState({
            formaPago: e
        })
    } 

    cambioImporte = (e) => {
        this.setState({
            importe: e.target.value
        })
    }

    cambioBitPagado = (e) => {
        this.setState({
            bitPagado: e
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
                        readOnly
                        />
                        <Divider id='divider'/>

                    </Form>

                    <Form onSubmit={this.postTransaccion} style={{margin: '0 3rem'}}>

                        <Form.Field required label='Descripción Transacción' control='input' placeholder='Descripción Transacción'
                        value={this.state.descripcionTransaccion}
                        onChange={this.cambioDescripcionTransaccion}
                        className={this.state.errorDescripcionTransaccion ? null : 'error'}
                        />

                        <label className={this.state.errorConcepto ? 'labelsSelect' : 'labelsSelectError'}>Concepto <span>*</span></label>
                        <Select
                            name='Conceptos'
                            value={this.state.concepto}
                            onChange={this.cambioConceptoTransaccion}
                            placeholder= "Seleccione un concepto..."
                            options={this.props.conceptos}
                            getOptionValue={this.getOptionValueConcepto}
                            getOptionLabel={this.getOptionLabelConcepto}
                            styles={this.state.errorConcepto === true ? '' : styleErrorSelect}
                        />

                        <label className={this.state.errorTipoTransaccion ? 'labelsSelect' : 'labelsSelectError'}>Tipo Transacción <span>*</span></label>
                        <Select
                            name='Tipo Transacción'
                            value={this.state.tipoTransaccion}
                            onChange={this.cambioTipoTransaccion}
                            placeholder= "Tipo Transacción..."
                            options={tipoTransaccion}
                            getOptionValue={this.getOptionValueTipoTransaccionYPago}
                            getOptionLabel={this.getOptionLabelTipoTransaccionYPago}
                            styles={this.state.errorTipoTransaccion === true ? '' : styleErrorSelect}
                        /> 
        
                        <Header as='h3'>Detalles</Header>

                        <Segment>
                            <Form.Field required label='Descripción Detalle' control='input' placeholder='Descripción Detalle'
                            value={this.state.descripcionDetalle}
                            onChange={this.cambioDescripcionDetalle}
                            className={this.state.errorDescripcionDetalle ? null : 'error'}
                            />

                            <label className={this.state.errorFormaPago ? 'labelsSelect' : 'labelsSelectError'}>Forma de Pago <span>*</span></label>
                            <Select
                                name='Forma de Pago'
                                value={this.state.formaPago}
                                onChange={this.cambioFormaDePago}
                                placeholder= "Tipo Transacción..."
                                options={this.props.formasDePago}
                                getOptionValue={this.getOptionValueFormaDePago}
                                getOptionLabel={this.getOptionLabelFormaDePago}
                                styles={this.state.errorFormaPago === true ? '' : styleErrorSelect}
                            />

                            <Form.Field required label='Importe' control='input' placeholder='Importe' 
                            value={this.state.importe}
                            onChange={this.cambioImporte}
                            className={this.state.errorImporte ? null : 'error'}
                            />

                            <label className={this.state.errorBitPagado ? 'labelsSelect' : 'labelsSelectError'}>Estado de Pago <span>*</span></label>
                            <Select
                                name='Estado de Pago'
                                value={this.state.bitPagado}
                                onChange={this.cambioBitPagado}
                                placeholder= "Estado Pago..."
                                options={pagado}
                                getOptionValue={this.getOptionValueTipoTransaccionYPago}
                                getOptionLabel={this.getOptionLabelTipoTransaccionYPago}
                                styles={this.state.errorBitPagado === true ? '' : styleErrorSelect}
                            />
                        </Segment>

                        <Button style={{marginTop: '2rem'}} primary type="submit" onClick={this.postTransaccion}> Registrar Transacción</Button>

                    </Form>
                </div>

            </div>
        );
    }
    
    getOptionLabelConcepto = option => option.nombre

    getOptionValueConcepto = option => option.conceptoId

    getOptionLabelTipoTransaccionYPago = option => option.label

    getOptionValueTipoTransaccionYPago = option => option.value

    getOptionLabelFormaDePago = option => option.nombre

    getOptionValueFormaDePago = option => option.fomaPagoId

}

const tipoTransaccion = [
    {
        value: true,
        label: 'Ingreso'
    },
    {
        value: false,
        label: 'Egreso'
    }
    
]

const pagado = [
    {
        value: true,
        label: 'Pagado'
    },
    {
        value: false,
        label: 'No Pago'
    }
    
]

const styleErrorSelect = { 

    indicatorsContainer: base => ({
    ...base,
    background: '#FDF1F1',
    }),

    valueContainer: base => ({
      ...base,
      background: '#FDF1F1',
      borderStyle: '#FBEBEB',
      margin: 0,
      width: '100%',
    }),
    //TODO: border red
}

const mapStateToProps = state =>({
    fetching: state.caja.fetching,
    formasDePago: state.caja.formasDePago,
    conceptos: state.caja.conceptos,
})


export default connect(mapStateToProps,{ addTransaccionAction, getFormasDePagoAction, getConceptosAction })(FormAlta);