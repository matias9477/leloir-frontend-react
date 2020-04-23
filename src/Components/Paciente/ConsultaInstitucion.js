import React, { Component } from 'react'
import { Button,  Form, Divider, Container } from 'semantic-ui-react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { connect } from 'react-redux'

import { emptyToNull, titleCase, validateNombre, validateOnlyNumbers, validateMail } from './../../Services/MetodosDeValidacion'
import { getHumanDate } from '../../Services/MetodosPaciente'
import { fechaAltaDateStamp  } from './../../Services/MetodosPaciente'
import { switchAltaAction, alterPatientAction } from '../../Redux/patientsDuck'
import './patientsStyle.css'


class ConsultaInstitucion extends Component {
    constructor(props) {
    super(props)
    this.state = ({        
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
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
          id: nextProps.patient.idPaciente,
          nombre: nextProps.patient.nombre,
          telefono: nextProps.patient.telefono,
          mail: nextProps.patient.mail,
          bitAlta: nextProps.patient.bitAlta,
          fechaAlta: getHumanDate( nextProps.patient.fechaAlta),
          fax: nextProps.patient.fax,
    
          cambios: false,
        })
     }

    alta(e){
        this.props.switchAltaAction(this.state.id)    
    }
      
    modificarPaciente = (e) => {
        e.preventDefault()
        
        const { nombre, mail, telefono, fax } = this.state

        const errorNombre = validateNombre(nombre)
        const errorTelefono = validateOnlyNumbers(telefono)
        const errorFax = validateOnlyNumbers(fax)
        const errorMail = validateMail(mail)

        this.setState({
            errorNombre,
            errorTelefono,
            errorMail,
            errorFax,
        })

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
            }

            this.props.alterPatientAction(this.state.id, data)

            this.setState({
                cambios: false,
            })
            
        } else {
            alert("Revise los datos ingresados.")
        }    

    }
    
    cambioNombre = (e) => {
        this.setState( {
            nombre: e.target.value,
            cambios: true,
        })
    }

    cambioFax = (e) => {
        this.setState( {
            fax: e.target.value,
            cambios: true,
        })
    }  

    cambioTelefono = (e) => {
        this.setState( {
            telefono: e.target.value,
            cambios: true,
        })
    }

    cambioMail = (e) => {
        this.setState( {
            mail: e.target.value,
            cambios: true,
        })
    }

    render(){
        return(
            <div className='Formularios'>
            {(this.state.id === '') ? <CircularProgress size={50}/> : 
            <Container>                   
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Field required id='disabled' label='Número de Paciente' control='input' width={5}
                        value={this.state.id} 
                        />

                        <Form.Field required id='disabled' label='Fecha alta' control='input' 
                        value={this.state.fechaAlta} 
                        />
                    </Form.Group>

                    <Form.Field required label='Nombre Institucón' control='input' disabled={this.state.modificacion}  
                    value={this.state.nombre} 
                    onChange={this.cambioNombre} 
                    className= {this.state.errorNombre === true ? null : 'error'} 
                    />

                    <Form.Group widths='equal'>
                        <Form.Field  label='Telefono' control='input' 
                        value={this.state.telefono || ''} 
                        onChange={this.cambioTelefono} 
                        className= {this.state.errorTelefono === true ? null : 'error'} 
                        />

                        <Form.Field  label='Mail' control='input' 
                        value={this.state.mail || ''} 
                        onChange={this.cambioMail} 
                        className= {this.state.errorMail === true ? null : 'error'} 
                        />
                    </Form.Group>

                    <Form.Field  label='Fax' control='input' 
                    value={this.state.fax || ''} 
                    onChange={this.cambioFax} 
                    className= {this.state.errorFax === true ? null : 'error'} 
                    />

                    <br/>

                    {(!this.state.bitAlta) ? <Button onClick={(e) => { 
                        if (window.confirm('¿Esta seguro que quiere dar de alta al paciente ' + this.state.nombre + '?')) {  
                        this.alta(e)
                        } else {e.preventDefault()}} }>Dar de Alta</Button> : null}
                        
                    {(this.state.cambios && this.state.bitAlta) ? <Button onClick={(e) => { 
                        if (window.confirm('¿Esta seguro que quiere modificar al paciente ' + this.state.nombre + '?')) {  
                        this.modificarPaciente(e)
                        } else {window.location.reload(true)} } } primary>
                        Modificar Paciente
                    </Button> : null}           
                            
                </Form>  
            </Container>
            }
            </div>
        )
    }
}

const mapStateToProps = (state, props) =>({
})
  
export default connect(mapStateToProps,{switchAltaAction, alterPatientAction})(ConsultaInstitucion)
  