import React, { Component } from 'react';
import axios from 'axios'
import { Button,  Form } from 'semantic-ui-react'
import CircularProgress from '@material-ui/core/CircularProgress';

import { emptyToNull, titleCase, validateNombre, validateOnlyNumbers, validateMail } from './../../Services/MetodosDeValidacion';
import { getHumanDate } from '../../Services/MetodosPaciente';import { fechaAltaDateStamp  } from './../../Services/MetodosPaciente';


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
            
        errorNombre: true,
        errorTelefono: true,
        errorMail: true,
        errorFax: true,
              
        })
        this.cambioId = this.cambioId.bind(this);
        this.cambioNombre = this.cambioNombre.bind(this);
        this.cambioTelefono = this.cambioTelefono.bind(this);
        this.cambioMail = this.cambioMail.bind(this);
        this.cambioFax = this.cambioFax.bind(this);
    }

    componentDidMount() {
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

    cancelar(e){
        e.preventDefault();
        this.setState({
          modificacion: true,
          cambios: false,
          errorNombre: true,
          errorTelefono: true,
          errorMail: true,
          errorFax: true,
        })
        if (this.state.cambios){
          const api = "/pacientes/id/" + this.props.id ;
          this.handleUpdateClick(api);
        }
    }

    alta(e){
        axios.put(`/pacientes/switch-alta/${this.props.id}`).then(response => {
            alert("Se ha dado de alta al paciente con éxito.");
              this.setState({estado: true})
             
              const api = "/pacientes/id/" + this.props.id ;
              this.handleUpdateClick(api); 
        }, (error) => {
            if(this.state.bitAlta) {
                alert(`No se ha podido dar de alta al paciente ${this.state.nombre} ${this.state.apellido}. Intentelo nuevamente.`)
              }
        })
    
    }
    
    habilitarModificacion(e){
    e.preventDefault();
    this.setState ({
        modificacion: false,
        cancelar: false,
    })
    }
      
    modificarPaciente = (e) => {
    e.preventDefault();
    
    const { nombre, mail, telefono, fax } = this.state;

    const errorNombre = validateNombre(nombre);
    const errorTelefono = validateOnlyNumbers(telefono);
    const errorFax = validateOnlyNumbers(fax);
    const errorMail = validateMail(mail);

    if ( errorNombre && errorMail && errorTelefono && errorFax ) {
        var data = {
            "type": 'com.leloir.backend.domain.Institucion',
            "idPaciente": this.state.id,
            "bitAlta": true,
            "historial": null,
            "mail": emptyToNull(this.state.mail),
            "nombre": titleCase(this.state.nombre),
            "telefono": emptyToNull(this.state.telefono),
            "fechaAlta": fechaAltaDateStamp(this.state.fechaAlta),
            "fax": this.state.fax,
        };

        const api = '/pacientes/modificar/' + this.props.id;
        
        axios.put(api, data).then(response => {
        alert('Se ha modificado el paciente con éxito.');
        }, (error) => {
        alert('No se ha podido modificar el paciente.');
        const api = "/pacientes/id/" + this.state.id ;
        this.handleUpdateClick(api);
        })

        this.setState({
            modificacion: true,
            cancelar: true,
            cambios: false,
            errorNombre,
            errorTelefono,
            errorMail,
            errorFax,
        })
        
    } else {
        alert("Revise los datos ingresados.")
        this.setState({
            errorNombre,
            errorTelefono,
            errorMail,
            errorFax,
        })
    }    

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

    render(){
        return(
            <div className='Formularios'>
            {this.state.nombre === '' ? <CircularProgress size={50}/> : 
                
            <Form>
                <Form.Group widths='equal'>
                    <Form.Field required label='Número de Paciente' control='input' disabled={true} 
                    value={this.state.id} 
                    onChange={this.cambioId} 
                    />

                    <Form.Field required label='Fecha alta' control='input' 
                    disabled={true} 
                    value={this.state.fechaAlta} 
                    onChange={this.cambioFechaAlta}
                    />
                </Form.Group>

                <Form.Field required label='Nombre Institucón' control='input' disabled={this.state.modificacion}  
                value={this.state.nombre} 
                onChange={this.cambioNombre} 
                className= {this.state.errorNombre === true ? null : 'error'} 
                />

                <Form.Group widths='equal'>
                    <Form.Field  label='Telefono' control='input' 
                    disabled={this.state.modificacion} 
                    value={this.state.telefono || ''} 
                    onChange={this.cambioTelefono} 
                    className= {this.state.errorTelefono === true ? null : 'error'} 
                    />

                    <Form.Field  label='Mail' control='input' 
                    disabled={this.state.modificacion} 
                    value={this.state.mail || ''} 
                    onChange={this.cambioMail} 
                    className= {this.state.errorMail === true ? null : 'error'} 
                    />
                </Form.Group>

                <Form.Field  label='Fax' control='input' 
                disabled={this.state.modificacion} 
                value={this.state.fax || ''} 
                onChange={this.cambioFax} 
                className= {this.state.errorFax === true ? null : 'error'} 
                />

                <br/>

                {( !this.state.isbottonPressed && this.state.modificacion && this.state.estado) ? <Button disabled={this.state.isbottonPressed} onClick={(e) => { 
                    this.habilitarModificacion(e)} }>Modificar</Button>  : null}

                {(!this.state.estado) ? <Button onClick={(e) => { 
                    if (window.confirm('¿Esta seguro que quiere dar de alta al paciente ' + this.state.nombre + '?')) {  
                    this.alta(e)
                    } else {e.preventDefault()}} }>Dar de Alta</Button> : null}
                    
                {(!this.state.modificacion) ? <Button disabled={this.state.isbottonPressed}  onClick={(e) => { 
                    if (window.confirm('¿Esta seguro que quiere modificar al paciente ' + this.state.nombre + '?')) {  
                    this.modificarPaciente(e)
                    } else {e.preventDefault()} } } primary>
                    Aceptar
                </Button> : null}           

                {(!this.state.modificacion) ? <Button disabled={this.state.cancelar} onClick={(e) => { 
                    this.cancelar(e)} } color='red'> Cancelar </Button> : null }     
                        
            </Form>  
            }
            </div>
        )
    }
}

export default ConsultaInstitucion;