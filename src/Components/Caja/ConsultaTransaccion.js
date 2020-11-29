import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Form, Divider, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import NavBar from '../NavBar/NavBar';
import { urlTablaCaja } from '../../Constants/NavUrl';
import { getTransaccionByIdAction, getFormasDePagoAction, getConceptosAction } from '../../Redux/cajaDuck';
import { getHumanDate } from '../../Services/MetodosPaciente';


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

class ConsultaTransaccion extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            createdAt: '',
            descripcionTransaccion: '',
            concepto: [],
            tipoTransaccion: [],
            formaPago: [],
            importe: '',
            ingreso: '',
            analsis: '',
        })
      }

    componentDidMount(){
        this.props.getTransaccionByIdAction(this.props.match.params.id) 
        this.props.getFormasDePagoAction() 
        this.props.getConceptosAction()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            createdAt: nextProps.transaction.createdAt,
            descripcionTransaccion: nextProps.transaction.descripcion,
            concepto: nextProps.transaction.concepto,
            tipoTransaccion: nextProps.transaction.tipoTransaccion,
            formaPago: nextProps.transaction.formaPago,
            importe: nextProps.transaction.importe,
            ingreso: nextProps.transaction.ingreso,
            analisis: nextProps.transaction.analisis
        })
    }

    cambioCreatedAt = (e) => {
        this.setState({
            createdAt: e.target.value
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

    cambioIngreso = (e) => {
        this.setState({
            ingreso: e.target.value
        })
    }

    cambioAnalisis = (e) => {
        this.setState({
            analisis: e.target.value
        })
    }

    ingresoOEgreso = (bool) => {
        if(bool){
            return "Ingreso"
        } else {
            return "Egreso"
        }
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
                        value='Consulta Transacción'
                        id = 'headerConsulta'
                        readOnly
                        />
                        <Divider id='divider'/>

                    </Form>

                    <Form style={{margin: '0 3rem'}}>

                        <Form.Group widths='equal'>
                            <Form.Field label='Fecha' control='input'
                            value={getHumanDate(this.state.createdAt)}
                            onChange={this.cambioCreatedAt}
                            // className={this.state.errorDescripcionTransaccion ? null : 'error'}
                            />

                            <Form.Field label='Tipo' control='input' 
                            value={this.ingresoOEgreso(this.state.ingreso)}
                            onChange={this.cambioIngreso}
                            // className={this.state.errorImporte ? null : 'error'}
                            />
                        </Form.Group>

                        <Form.Field label='Descripción Transacción' control='input' 
                        value={this.state.descripcionTransaccion}
                        onChange={this.cambioDescripcionTransaccion}
                        // className={this.state.errorDescripcionTransaccion ? null : 'error'}
                        />

                        <label width='250px' 
                        // className={this.state.errorConcepto ? 'labelsSelect' : 'labelsSelectError'}
                        >Concepto</label>
                        <Select
                            name='Conceptos'
                            value={this.state.concepto}
                            onChange={this.cambioConceptoTransaccion}
                            placeholder= "Seleccione un concepto..."
                            options={this.props.conceptos}
                            getOptionValue={this.getOptionValueConcepto}
                            getOptionLabel={this.getOptionLabelConcepto}
                            // styles={this.state.errorConcepto === true ? '' : styleErrorSelect}
                        />

                        <label 
                        // className={this.state.errorTipoTransaccion ? 'labelsSelect' : 'labelsSelectError'}
                        >Tipo Transacción </label>
                        <Select
                            name='Tipo Transacción'
                            value={this.state.tipoTransaccion}
                            onChange={this.cambioTipoTransaccion}
                            placeholder= "Seleccione tipo de transacción..."
                            options={tipoTransaccion}
                            getOptionValue={this.getOptionValueTipoTransaccionYPago}
                            getOptionLabel={this.getOptionLabelTipoTransaccionYPago}
                            // styles={this.state.errorTipoTransaccion === true ? '' : styleErrorSelect}
                        /> 

                            <label 
                            // className={this.state.errorFormaPago ? 'labelsSelect' : 'labelsSelectError'}
                            >Forma de Pago</label>
                            <Select
                                name='Forma de Pago'
                                value={this.state.formaPago.nombre}
                                onChange={this.cambioFormaDePago}
                                placeholder= "Selecciones forma de pago..."
                                options={this.props.formasDePago}
                                getOptionValue={this.getOptionValueFormaDePago}
                                getOptionLabel={this.getOptionLabelFormaDePago}
                                // styles={this.state.errorFormaPago === true ? '' : styleErrorSelect}
                            />

                            <Form.Field label='Importe' control='input' 
                            value={this.state.importe}
                            onChange={this.cambioImporte}
                            // className={this.state.errorImporte ? null : 'error'}
                            />

                            
                            {
                                this.state.analsis==='' 
                                ?
                                null
                                :
                                <Form.Field label='Analisis Id' control='input' 
                                value={this.state.analisis}
                                onChange={this.cambioAnalisis}
                                />
                            }


                        {/* <Button style={{marginTop: '2rem'}} primary type="submit" onClick={this.postTransaccion}> Registrar Transacción</Button> */}

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

// const styleErrorSelect = { 

//     indicatorsContainer: base => ({
//     ...base,
//     background: '#FDF1F1',
//     }),

//     valueContainer: base => ({
//     ...base,
//     background: '#FDF1F1',
//     borderStyle: '#FBEBEB',
//     margin: 0,
//     width: '100%',
//     }),
// }
    
    


const mapStateToProps = (state) => ({
    transaction: state.caja.transaction,
    formasDePago: state.caja.formasDePago,
    conceptos: state.caja.conceptos,
})


export default connect(mapStateToProps,{ getTransaccionByIdAction, getFormasDePagoAction, getConceptosAction })(ConsultaTransaccion);



