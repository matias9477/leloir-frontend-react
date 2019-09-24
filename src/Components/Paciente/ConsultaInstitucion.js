import React, { Component } from 'react';
import axios from 'axios'
import { Button,  Form } from 'semantic-ui-react'
import CircularProgress from '@material-ui/core/CircularProgress';

import { emptyToNull, titleCase, hasNumbers, validMail } from './../../Services/MetodosDeValidacion';
import { getHumanDate } from '../../Services/MetodosPaciente';

class ConsultaInstitucion extends Component {
    constructor(props) {
    super(props);
    this.state = ({        

        isRadioSelected: true,
        isbottonPressed:true,
        modificacion: true,
        cancelar: true,
        valor:true,

        cambios: false,

        id: '',
        nombre: '',
        telefono:'',
        mail:'',
        fax: '',
        fechaAlta: '',
            
        errorNombre: '',
        errorTelefono: true,
        errorMail: true,
        errorFax: true,
              
        })
        this.cambioId = this.cambioId.bind(this);
        this.cambioNombre = this.cambioNombre.bind(this);
        this.cambioTelefono = this.cambioTelefono.bind(this);
        this.cambioMail = this.cambioMail.bind(this);
        this.cambioFax = this.cambioFax.bind(this);

        this.handleBlurNombre = this.handleBlurNombre.bind(this);
        this.handleBlurTelefono = this.handleBlurTelefono.bind(this);
        this.handleBlurMail =  this.handleBlurMail.bind(this);
        this.handleBlurFax = this.handleBlurFax.bind(this);
    }

    componentWillMount() {
        const api = "/pacientes/id/" + this.props.id ;
        this.handleUpdateClick(api);
    }

    handleUpdateClick = (api) => {
        axios.get(api).then(paciente => {
          this.setState({
            id: paciente.data.idPaciente,
            nombre: paciente.data.nombre,
            fechaAlta: getHumanDate(paciente.data.fechaAlta),
            telefono: paciente.data.telefono,
            mail: paciente.data.mail,
            fax: paciente.data.fax,
            bitAlta: paciente.data.bitAlta,    
            isbottonPressed: false,
            estado: paciente.data.bitAlta,
          });
        }, (error) => {
            console.log('Error fetch paciente: ', error.message);
        })
    }
      

    cambioId(e) {
        this.setState( {
          id: e.target.value,
          valor:false,
        })
    }
    
    cambioNombre(e) {
        this.setState( {
            nombre: e.target.value,
            cambios: true,
        })
    }

    cambioFax(e) {
        this.setState( {
            fax: e.target.value,
            valor:false,
        })
    }  

    cambioTelefono(e){
        this.setState( {
            telefono: e.target.value,
            valor:false,
        })
    }

    cambioMail(e){
        this.setState( {
            mail: e.target.value,
            valor:false,
        })
    }

    cambioFechaAlta(e){
        this.setState( {
            fechaAlta: e.target.value
        })
    }


    handleBlurNombre = () => {
    if (this.state.nombre === ''  || this.state.nombre.length === 0 ||  hasNumbers(this.state.nombre)){
        this.setState({ errorNombre: false })
    } else {
        this.setState({errorNombre: true})
    }
    }

    handleBlurTelefono = () => {
    if (this.state.telefono === ''){
        this.setState({ errorTelefono: true })
    } else if (isFinite(String(this.state.telefono))){
        this.setState({ errorTelefono: true })
    } else {
        this.setState({
        errorTelefono: false
        })
    }
    }

    handleBlurMail = () => {
    if(this.state.mail === ''){
        this.setState({
        errorMail: true,
        })
    } else if ( validMail.test(this.state.mail) ) {
        this.setState({
            errorMail: true,
        })
    } else {
        this.setState({
        errorMail: false,
        })
    } 
    }

    handleBlurFax = () => {
    if (this.state.fax === ''){
        this.setState({ errorFax: true })
    } else if (isFinite(String(this.state.fax))){
        this.setState({ errorFax: true })
    } else {
        this.setState({
        errorFax: false
        })
    }
    }


    render(){
        return(
            <div className='Formularios'>
            {this.state.nombre === '' ? <CircularProgress size={50}/> : 
                
            <Form>
                <Form.Field required label='Número de Paciente' control='input' disabled={true}  value={this.state.id} onChange={this.cambioId} />

                <Form.Field required label='Nombre Institucón' control='input' disabled={this.state.modificacion}  value={this.state.nombre} onChange={this.cambioNombre} className= {(this.state.errorNombre=== '' || this.state.errorNombre === true) ? null : 'error'}/>

                <Form.Field required label='Fecha alta' control='input' disabled={true} value={this.state.fechaAlta} onChange={this.cambioFechaAlta}/>

                <Form.Field  label='Telefono' control='input' disabled={this.state.modificacion} value={this.state.telefono || ''} onChange={this.cambioTelefono}/>

                <Form.Field  label='Mail' control='input' disabled={this.state.modificacion} value={this.state.mail || ''} onChange={this.cambioMail}/>

                <Form.Field  label='Fax' control='input' disabled={this.state.modificacion} value={this.state.fax || ''} onChange={this.cambioFax}/>

                {( !this.state.isbottonPressed && this.state.modificacion && this.state.estado) ? <Button disabled={this.state.isbottonPressed} onClick={(e) => { 
                    this.habilitarModificacion(e)} }>Modificar</Button>  : null}

                {(!this.state.estado) ? <Button onClick={(e) => { 
                    if (window.confirm('¿Esta seguro que quiere dar de alta al paciente ' + this.state.nombre + ' ' + this.state.apellido + '?')) {  
                    this.alta(e)
                    } else {e.preventDefault()}} }>Dar de Alta</Button> : null}
                    
                {(!this.state.modificacion) ? <Button disabled={this.state.isbottonPressed}  onClick={(e) => { 
                    if (window.confirm('¿Esta seguro que quiere modificar al paciente ' + this.state.nombre + ' ' + this.state.apellido + '?')) {  
                    this.modificarPaciente(e)
                    } else {e.preventDefault()} } }>
                    Aceptar
                </Button> : null}           

                {(!this.state.modificacion) ? <Button disabled={this.state.cancelar} onClick={(e) => { 
                    this.cancelar(e)} }> X </Button> : null }     
                        
            </Form>  
            }
            </div>
        )
    }
}

export default ConsultaInstitucion;