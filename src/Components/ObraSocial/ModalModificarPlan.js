import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Form } from 'semantic-ui-react';
import Select from 'react-select';

import { Modal } from '../DiarioPracticas/Modals/ModalAnalysisInput';
import { getTiposPlanesAction, switchAltaPlanAction, alterPlanAction } from '../../Redux/obrasSocialesDuck';
import { validateRequiredCombos, validateRequiredString } from '../../Services/MetodosDeValidacion';
import './obraSocial.css';

class ModalDetallePago extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,

            nombre: '',
            planId: '',
            tipoPlan: '',
            bitActivo: '',

            cambios: false,

            errorNombre: true,
            errorTipoPlan: true,
        }
    }

    componentDidMount() {
        this.showModal()
        this.props.getTiposPlanesAction()
    }

    componentWillReceiveProps(nextProps){
        this.setState({
          nombre: nextProps.plan.nombre,
          planId: nextProps.plan.planId,
          tipoPlan: nextProps.plan.tipoPlan,
          bitActivo: nextProps.plan.bitActivo,
        })
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
            planId: '',
            tipoPlan: [],
            bitActivo: '',

            errorNombre: true,
            errorTipoPlan: true,

            cambios: false,
        })
    }

    cambioNombre = (e) => {
        this.setState({
            nombre: e.target.value,
            cambios: true,
        })
    } 

    cambioTipoPlan = tipo => {
        this.setState({
            tipoPlan: tipo,
            cambios: true,
        })
    }

    alta(e){
        this.props.switchAltaPlanAction(this.state.planId, this.props.idObraSocial)
    }

    modificarPlan = (e) => {
        e.preventDefault()
    
        const { nombre, tipoPlan } = this.state;

        const errorNombre = validateRequiredString(nombre);
        const errorTipoPlan = validateRequiredCombos(tipoPlan);
    
  
        if ( errorNombre && errorTipoPlan ) {
            var data = {
                "nombre": this.state.nombre,
                "tipo_plan": this.state.tipoPlan.tipoPlanId
            }
            
            this.props.alterPlanAction(this.state.planId, data, this.props.idObraSocial)
   
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
                <Form.Group>
                    <Form.Field required label='Id' control='input'
                    id='disabled'
                    value={this.state.planId} 
                    width={3}
                    />

                    <Form.Field required label='Nombre' control='input'
                    value={this.state.nombre}
                    onChange={this.cambioNombre}
                    width={13}
                    className={this.state.errorNombre ? '' : 'error'}
                    />
                </Form.Group>

                <label width='250px' className={this.state.errorTipoPlan ? 'labelsSelect' : 'labelsSelectError'}>Tipo Plan <span>*</span></label>
                <Select
                    name='Tipos de planes'
                    value={this.state.tipoPlan}
                    onChange={this.cambioTipoPlan}
                    placeholder= "Seleccione tipo de plan..."
                    options={this.props.tiposPlanes}
                    getOptionValue={this.getOptionValueTipoPlan}
                    getOptionLabel={this.getOptionLabelTipoPlan}
                    styles={this.state.errorTipoPlan === true ? '' : styleErrorSelect}
                />

                <Button color={this.state.bitActivo ? 'red' : 'green'}
                    onClick={(e) => {
                    if (window.confirm('¿Esta seguro que quiere cambiar el estado del plan ' + this.state.nombre + '?')) {
                        this.alta(e);
                        this.hideModal();
                    } else { e.preventDefault()} }}
                    >{this.mensajeBtnSwitchAlta()}</Button>

                {(this.state.cambios && this.state.bitActivo) ? <Button primary onClick={(e) => {
                    if (window.confirm('¿Esta seguro que quiere modificar el plan ' + this.state.nombre + '?')) {
                        this.modificarPlan(e)
                    } else { window.location.reload(true) }
                }}>
                    Modificar Plan
                </Button> : null}

            </Form>
        </div> 
    }

    mensajeBtnSwitchAlta(){
        if (this.state.bitActivo) {
          return 'Dar de Baja'
        }
        else {
          return 'Dar de Alta'
        }
    }

    getOptionLabelTipoPlan = option => option.nombre

    getOptionValueTipoPlan = option => option.tipoPlanId


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


export default connect(mapStateToProps,{ getTiposPlanesAction, switchAltaPlanAction, alterPlanAction })(ModalDetallePago);