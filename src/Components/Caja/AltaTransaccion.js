import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Container, Form, Divider, Icon } from 'semantic-ui-react'
import { Link, withRouter, Redirect } from 'react-router-dom';
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
            formaPago: '',
            importe: '',

            errorDescripcionTransaccion: true,
            errorConcepto: true,
            errorTipoTransaccion: true,
            errorFormaPago: true,
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
                "formaPago": this.state.formaPago.nombre,
                "importe": this.state.importe,
                "ingreso": this.state.tipoTransaccion.value
        }
        
        this.props.addTransaccionAction(data)
    }

    postTransaccion = (e) => {
        e.preventDefault();

        const {descripcionTransaccion, concepto, tipoTransaccion, formaPago, importe} = this.state;

        const errorDescripcionTransaccion= validateRequiredStringNum(descripcionTransaccion);
        const errorConcepto = validateRequiredCombos(concepto);
        const errorTipoTransaccion = validateRequiredCombos(tipoTransaccion);
        const errorFormaPago = validateRequiredCombos(formaPago);
        const errorImporte = validateOnlyNumbersRequired(importe);

        if (errorDescripcionTransaccion && errorConcepto && errorTipoTransaccion && errorFormaPago && errorImporte) {
            this.handleUpdateClick()
            this.vaciadoCampos()
        } else {
            alert('Verificar datos ingresados.')
            this.setState({
                errorDescripcionTransaccion, 
                errorConcepto,
                errorTipoTransaccion,
                errorFormaPago,
                errorImporte
            })
        }
    }

    vaciadoCampos() {
        this.setState({
            descripcionTransaccion: '',
            concepto: '',
            tipoTransaccion: '',
            formaPago: '',
            importe: '',

            errorDescripcionTransaccion: true,
            errorConcepto: true,
            errorTipoTransaccion: true,
            errorFormaPago: true,
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


    render() {
        if (!this.props.upToDateAllTransacciones) {
            return <Redirect to={{pathname: (this.props.location.state.prevPath
                ), state: { prevPath: window.location.pathname }}} />
          }
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

                        <Form.Field required label='Descripción Transacción' control='input' placeholder='Ingrese una descripción de la transacción'
                        value={this.state.descripcionTransaccion}
                        onChange={this.cambioDescripcionTransaccion}
                        className={this.state.errorDescripcionTransaccion ? null : 'error'}
                        />

                        <label width='250px' className={this.state.errorConcepto ? 'labelsSelect' : 'labelsSelectError'}>Concepto <span>*</span></label>
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
                            placeholder= "Seleccione tipo de transacción..."
                            options={tipoTransaccion}
                            getOptionValue={this.getOptionValueTipoTransaccionYPago}
                            getOptionLabel={this.getOptionLabelTipoTransaccionYPago}
                            styles={this.state.errorTipoTransaccion === true ? '' : styleErrorSelect}
                        /> 

                            <label className={this.state.errorFormaPago ? 'labelsSelect' : 'labelsSelectError'}>Forma de Pago <span>*</span></label>
                            <Select
                                name='Forma de Pago'
                                value={this.state.formaPago}
                                onChange={this.cambioFormaDePago}
                                placeholder= "Selecciones forma de pago..."
                                options={this.props.formasDePago}
                                getOptionValue={this.getOptionValueFormaDePago}
                                getOptionLabel={this.getOptionLabelFormaDePago}
                                styles={this.state.errorFormaPago === true ? '' : styleErrorSelect}
                            />

                            <Form.Field required label='Importe' control='input' placeholder='Ingrese importe' 
                            value={this.state.importe}
                            onChange={this.cambioImporte}
                            className={this.state.errorImporte ? null : 'error'}
                            />

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
}

const mapStateToProps = state =>({
    fetching: state.caja.fetching,
    upToDateAllTransacciones: state.caja.upToDateAllTransacciones,
    formasDePago: state.caja.formasDePago,
    conceptos: state.caja.conceptos,
})


export default withRouter(connect(mapStateToProps,{ addTransaccionAction, getFormasDePagoAction, getConceptosAction })(FormAlta));