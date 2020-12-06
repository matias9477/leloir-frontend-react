import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Form, Label } from 'semantic-ui-react';
import Select from 'react-select';

import { Modal } from '../../DiarioPracticas/Modals/ModalAnalysisInput';
import { validateRequiredCombos, validateMenorA } from './../../../Services/MetodosDeValidacion';
import { addTransaccionAction, getFormasDePagoAction } from '../../../Redux/cajaDuck';
import '../analisisStyle.css';

class ModalDetallePago extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,

            formaPago: '',
            importe: '',

            errorFormaPago: true,
            errorImporte: true,
        }
    }

    componentDidMount() {
        this.showModal()
        this.props.getFormasDePagoAction()
    }

    showModal = () => {
        this.setState({
            show: true,
        })
    }

    hideModal = () => {
        const {callback} = this.props
        if (callback !== undefined) {
            callback()
        }
    }

    handleUpdateClick = () => {
        var data = {
                "concepto": "AnÃ¡lisis", //TODO: tener en cuenta si cambia, capaz con id seria mejor
                "descripcion": "Pago Análisis",
                "formaPago": this.state.formaPago.nombre,
                "idAnalisis": this.props.analisis.analisisId,
                "importe": this.state.importe,
                "ingreso": true
        }
        
        this.props.addTransaccionAction(data)
    }

    postTransaccion = (e) => {
        e.preventDefault();

        const { formaPago, importe } = this.state;

        const errorFormaPago = validateRequiredCombos(formaPago);
        const errorImporte = validateMenorA(importe, this.props.analisis.faltantePago);

        if ( errorFormaPago && errorImporte && this.state.importe<=this.props.analisis.faltantePago) {
            this.handleUpdateClick()
            this.vaciadoCampos()
            setTimeout(() => {  this.hideModal(); }, 1000);
        } else {
            alert('Verificar datos ingresados.')
            this.setState({
                errorFormaPago,
                errorImporte
            })
        }
    }

    vaciadoCampos() {
        this.setState({
            formaPago: '',
            importe: '',

            errorFormaPago: true,
            errorImporte: true,
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

    detalle = () => {
        return <div>
            <Form onSubmit={this.postTransaccion} style={{margin: '0 3rem'}}>

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
                <Label as='a' basic color='red' pointing className='labelFaltantePago'>
                    Falta pagar ${this.props.analisis.faltantePago}
                </Label>
                <br/>
                <Button style={{marginTop: '2rem'}} primary type="submit" onClick={this.postTransaccion}> Registrar Transacción</Button>

            </Form>
        </div> 
    }


    getOptionLabelFormaDePago = option => option.nombre

    getOptionValueFormaDePago = option => option.fomaPagoId


    render() {
        return (
            <div className='modalVerDetalle'>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    
                    <h2>Detalle de Pago</h2>

                    {this.detalle() }

                </Modal>
            </div>
        )
    }
}



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
})


export default connect(mapStateToProps,{ addTransaccionAction, getFormasDePagoAction })(ModalDetallePago);