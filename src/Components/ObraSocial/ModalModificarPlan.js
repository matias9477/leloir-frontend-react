import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Form, Label } from 'semantic-ui-react';
import Select from 'react-select';

import { Modal } from '../../DiarioPracticas/Modals/ModalAnalysisInput';
import { getTiposPlanesAction } from '../../Redux/obrasSocialesDuck';

import '../analisisStyle.css';

class ModalDetallePago extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,

            
        }
    }

    componentDidMount() {
        this.showModal()
        this.props.getTiposPlanesAction()
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
            // "concepto": "AnÃ¡lisis", //TODO: tener en cuenta si cambia, capaz con id seria mejor
            // "descripcion": "Pago Análisis",
            // "formaPago": this.state.formaPago.nombre,
            // "idAnalisis": this.props.analisis.analisisId,
            // "importe": this.state.importe,
            // "ingreso": true
        }
        
        // this.props.addTransaccionAction(data)
    }

    postTransaccion = (e) => {
        e.preventDefault();

        // const { formaPago, importe } = this.state;

        // const errorFormaPago = validateRequiredCombos(formaPago);
        // const errorImporte = validateMenorA(importe, this.props.analisis.faltantePago);

        if ( errorFormaPago && errorImporte && this.state.importe<=this.props.analisis.faltantePago) {
            // this.handleUpdateClick()
            this.vaciadoCampos()
            setTimeout(() => {  this.hideModal(); }, 1000);
        } else {
            alert('Verificar datos ingresados.')
            this.setState({
                // errorFormaPago,
                // errorImporte
            })
        }
    }

    vaciadoCampos() {
        this.setState({
            // formaPago: '',
            // importe: '',

            // errorFormaPago: true,
            // errorImporte: true,
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
            <Form>

                <Form.Group>
                    <Form.Field required label='Id' control='input'
                    id='disabled'
                    value={this.props.plan.planId} 
                    width={3}
                    />

                    <Form.Field required label='Nombre' control='input'
                    value={this.props.plan.nombre}
                    // onChange={this.cambioNombre}
                    width={13}
                    />
                </Form.Group>

                <label width='250px' 
                // className={this.state.errorConcepto ? 'labelsSelect' : 'labelsSelectError'}
                >Tipo Plan <span>*</span></label>
                <Select
                    value={this.props.plan.tipoPlan.nombre}
                    // onChange={this.cambioConceptoTransaccion}
                    placeholder= "Seleccione tipo de plan..."
                    options={this.props.tiposPlanes}
                    getOptionValue={this.getOptionValueTipoPlan}
                    getOptionLabel={this.getOptionLabelTipoPlan}
                    // styles={this.state.errorConcepto === true ? '' : styleErrorSelect}
                />

                <Divider style={{margin: '3rem 0'}}/>
            </Form>
        </div> 
    }


    getOptionLabelTipoPlan = option => option.nombre

    getOptionValueTipoPlan = option => option.planId


    render() {
        return (
            <div className='modalVerDetalle'>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    
                    <h2>Detalle Plan {this.props.plan.nombre}</h2>

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
    fetching: state.obrasSociales.fetching,
    tiposPlanes: state.obrasSociales.tiposPlanes,
})


export default connect(mapStateToProps,{ getTiposPlanesAction })(ModalDetallePago);