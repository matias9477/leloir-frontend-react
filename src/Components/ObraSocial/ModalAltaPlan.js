import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Form } from 'semantic-ui-react';
import Select from 'react-select';

import { Modal } from '../DiarioPracticas/Modals/ModalAnalysisInput';
import { addPlanAction, getTiposPlanesAction } from '../../Redux/obrasSocialesDuck';
import { validateRequiredCombos, validateRequiredString, titleCase } from '../../Services/MetodosDeValidacion';
import './obraSocial.css';

class ModalDetallePago extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,

            nombre: '',
            tipoPlan: '',
            bitActivo: '',

            errorNombre: true,
            errorTipoPlan: true,
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

    vaciadoCampos() {
        this.setState({
            nombre: '',
            tipoPlan: [],
            bitActivo: '',

            errorNombre: true,
            errorTipoPlan: true,
        })
    }

    cambioNombre = (e) => {
        this.setState({
            nombre: e.target.value,
        })
    } 

    cambioTipoPlan = tipo => {
        this.setState({
            tipoPlan: tipo,
        })
    }


    addPlan = (e) => {
        e.preventDefault()
    
        const { nombre, tipoPlan } = this.state;

        const errorNombre = validateRequiredString(nombre);
        const errorTipoPlan = validateRequiredCombos(tipoPlan);
    
  
        if ( errorNombre && errorTipoPlan ) {
            var data = {
                "nombre": titleCase(this.state.nombre),
                "tipo_plan": this.state.tipoPlan.tipoPlanId
            }
            
            this.props.addPlanAction(data, this.props.idObraSocial)
   
            this.vaciadoCampos()
            setTimeout(() => {  this.hideModal(); }, 1000);
        } else {

            alert("Verificar los datos ingresados.")
            this.setState({
                errorNombre,
                errorTipoPlan
            })
        }
    }


    detalle = () => {
        return <div>
            <Form>
                <Form.Field required label='Nombre' control='input'
                placeholder='Ingrese nombre del plan.'
                value={this.state.nombre}
                onChange={this.cambioNombre}
                className={this.state.errorNombre ? '' : 'error'}
                />

                <label width='250px' className={this.state.errorTipoPlan ? 'labelsSelect' : 'labelsSelectError'}>Tipo Plan <span>*</span></label>
                <Select
                    name='Tipos de planes'
                    value={this.state.tipoPlan}
                    onChange={this.cambioTipoPlan}
                    placeholder= "Seleccione tipo de plan."
                    options={this.props.tiposPlanes}
                    getOptionValue={this.getOptionValueTipoPlan}
                    getOptionLabel={this.getOptionLabelTipoPlan}
                    styles={this.state.errorTipoPlan === true ? '' : styleErrorSelect}
                />

                <Button primary onClick={(e) => {
                    if (window.confirm('¿Esta seguro que quiere registrar el plan ' + this.state.nombre + '?')) {
                        this.addPlan(e)
                    } else { window.location.reload(true) }
                }}>
                    Registrar Plan
                </Button> 

            </Form>
        </div> 
    }


    getOptionLabelTipoPlan = option => option.nombre

    getOptionValueTipoPlan = option => option.tipoPlanId


    render() {
        return (
            <div className='modalVerDetalle'>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    
                    <h2>Registrar Plan</h2>

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


export default connect(mapStateToProps,{ getTiposPlanesAction, addPlanAction })(ModalDetallePago);