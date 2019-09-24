import React, { Component } from 'react';
import axios from 'axios'
import { Button,  Form } from 'semantic-ui-react'
import './../styles.css';
import CircularProgress from '@material-ui/core/CircularProgress';

import { emptyToNull, titleCase, hasNumbers, validMail } from './../../Services/MetodosDeValidacion';
import { urlTiposAnimales } from './../../Constants/URLs';
import { getHumanDate } from '../../Services/MetodosPaciente';
import { getIdTipoAnimal } from '../../Services/MetodosPaciente';

class ConsultaAnimal extends Component {
  constructor(props) {
    super(props);
    this.state = ({        
        isRadioSelected: true,
        isbottonPressed:true,
        modificacion: true,
        cancelar: true,
        valor:true,

        cambios: false,

        id:'',
        nombre: '',
        propietario: '',
        tipo: '',
        telefono:'',
        mail:'',
        bitAlta: '',
        fechaAlta: '',

        estado: '',
        
        errorNombre: true,
        errorTelefono: true,
        errorTipo: true,
        errorPropietario: true,
        errorMail: true,
      
        tipos:[],
        
      })
    this.cambioId = this.cambioId.bind(this);
    this.cambioNombre = this.cambioNombre.bind(this);
    this.cambioTipo = this.cambioTipo.bind(this); 
    this.cambioPropietario = this.cambioPropietario.bind(this);
    this.cambioTelefono = this.cambioTelefono.bind(this);
    this.cambioMail = this.cambioMail.bind(this);
    this.cambioFechaAlta = this.cambioFechaAlta.bind(this);
    this.cambioBitAlta = this.cambioBitAlta.bind(this);

    this.handleBlurNombre = this.handleBlurNombre.bind(this);
    this.handleBlurMail = this.handleBlurMail.bind(this);
    this.handleBlurTelefono = this.handleBlurTelefono.bind(this);
    this.handleBlurTipos = this.handleBlurTipos.bind(this);
    this.handleBlurPropietario = this.handleBlurPropietario.bind(this);
    }
  
  comboTipos = () =>{
    axios.get(urlTiposAnimales).then(tiposAnimales => {
      this.setState({tipos:tiposAnimales.data}) 
    }, (error) => {
        console.log('Error combo animales: ', error.message);
    })

  }

  componentWillMount() {
    this.comboTipos();
    const api = "/pacientes/id/" + this.props.id ;
    this.handleUpdateClick(api);
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

  handleBlurNombre(){
    if (this.state.nombre !== ''  && this.state.nombre.length !== 0 && !hasNumbers(this.state.nombre)){
      this.setState({ errorNombre: true })
    } else {
      this.setState({errorNombre: false})
    }
  }

  handleBlurTipos = () => {
    if (this.state.tipo.length === 0 || this.state.tipo === ''){
      this.setState({errorTipo: false})
    } else{
      this.setState({errorTipo: true})
    }
  }

  handleBlurMail = ( ) => {
    if(this.state.mail === '' || this.state.mail === null){
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

  handleBlurTelefono = () => {
    if (this.state.telefono === '' || this.state.telefono === null){
      this.setState({ errorTelefono: true })
    } else if (isFinite(String(this.state.telefono))){
      this.setState({ errorTelefono: true })
    } else {
      this.setState({
        errorTelefono: false
      })
    }
  }

  handleBlurPropietario(){
    if (this.state.propietario === ''  || this.state.propietario.length === 0 ||  hasNumbers(this.state.propietario) || this.state.propietario === null){
      this.setState({ errorPropietario: false })
    } else {
      this.setState({ errorPropietario: true })
    }
  }

  cancelar(e){
    e.preventDefault();
    this.setState({
      modificacion: true,
      cambios: false,
      errorNombre: '',
      errorTelefono: true,
      errorTipo: '',
      errorPropietario: '',
      errorMail: true,
    })
    if (this.state.cambios){
      const api = "/pacientes/id/" + this.props.id ;
      this.handleUpdateClick(api);
    }
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
    
    this.handleBlurNombre()
    this.handleBlurMail()
    this.handleBlurPropietario()
    this.handleBlurTelefono()
    this.handleBlurTipos()
    
    const { errorNombre, errorTipo, errorPropietario, errorMail, errorTelefono } = this.state;

    if ( errorNombre && errorTipo && errorPropietario && errorMail && errorTelefono ) {
        var data = {
            "type": 'com.leloir.backend.domain.Animal',
            "bitAlta": true,
            "historial": null,
            "mail": emptyToNull(this.state.mail),
            "nombre": titleCase(this.state.nombre),
            "propietario": titleCase(this.state.propietario),
            "telefono": emptyToNull(this.state.telefono),
            "tipoAnimal": {
                "nombre": this.state.tipo,
                "tipoAnimalId": getIdTipoAnimal(this.state.tipo, this.state.tipos)
            },
      };

      console.log('Type: ' + 'com.leloir.backend.domain.Animal')
      console.log('Bit alta: ' + true)
      console.log('Mail: ' + emptyToNull(this.state.mail))
      console.log('Nombre: ' + titleCase(this.state.nombre))
      console.log('Propietario: ' + titleCase(this.state.propietario))
      console.log('Telefono: ' + emptyToNull(this.state.telefono))
      console.log('Tipo animal nombre: ' + this.state.tipo)
      console.log('Tipo animal id: ' + getIdTipoAnimal(this.state.tipo, this.state.tipos))

      const api = '/pacientes/modificar/' + this.props.id;

      axios.put(api,data)
        .then((response) => {
            if (response.status === 200) {
                alert('Se ha modificado la determinación con éxito.');
            } else {
                alert('No se ha podido modificar la determinación.');
                const api = "/pacientes/id/" + this.state.id ;
                this.handleUpdateClick(api);
            }
        });
  
      this.setState({
        modificacion: true,
        cancelar: true,
        cambios: false,
      })
      
    } else {
      alert("Revise los datos ingresados.")
      console.log('Nombre: ', errorNombre,' Propietario: ', errorPropietario, ' Telefono: ', errorTelefono,' Tipo: ', errorTipo, ' Mail: ', errorMail)
    }    

  }
    
  handleUpdateClick = (api) => {
    axios.get(api).then(paciente => {
      this.setState({
        id: paciente.data.idPaciente,
        nombre: paciente.data.nombre,
        propietario: paciente.data.propietario,
        fechaAlta: getHumanDate(paciente.data.fechaAlta),
        tipo: paciente.data.tipoAnimal.nombre,
        telefono: paciente.data.telefono,
        mail: paciente.data.mail,
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

  cambioTipo(e) {
    this.setState( {
      tipo: e.target.value,
      cambios: true,
    })
  }  

  cambioPropietario(e){
    this.setState( {
        propietario: e.target.value,
        cambios: true,
    })
  } 

  cambioTelefono(e){
    this.setState( {
        telefono: e.target.value,
        cambios: true,
    })
  }

  cambioMail(e){
      this.setState( {
          mail: e.target.value,
          cambios: true,
      })
  }

  cambioFechaAlta(e){
    this.setState( {
        fechaAlta: e.target.value
    })
  }

  cambioBitAlta(e){
    this.setState({
      bitAlta: e.target.value,
    })
  }

  
  render(){
    return(
      <div className='Formularios'>
      {this.state.estado === '' ? <CircularProgress size={50}/> : 
      <Form>
          <Form.Field required label='Número de Paciente' control='input' disabled={true}  value={this.state.id} onChange={this.cambioId} />

          <Form.Field required label='Nombre Animal' control='input' disabled={this.state.modificacion}  value={this.state.nombre} onChange={this.cambioNombre} className= {(this.state.errorNombre=== '' || this.state.errorNombre === true) ? null : 'error'} onBlur={this.handleBlurNombre}/>

          <Form.Field required label='Tipo Animal' control='select' disabled={this.state.modificacion} value={this.state.tipo} onChange={this.cambioTipo} className= {(this.state.errorTipo=== '' || this.state.errorTipo === true) ? null : 'error'} onBlur={this.handleBlurTipos}>
            <option value={null}>  </option>
            {this.state.tipos.map(item => (
            <option key={item.tipoAnimalId}>{item.nombre}</option>))}
          </Form.Field>

          <Form.Field required label='Propietario' control='input' disabled={this.state.modificacion} value={this.state.propietario} onChange={this.cambioPropietario} className= {(this.state.errorPropietario === '' || this.state.errorPropietario === true) ? null : 'error'} onBlur={this.handleBlurPropietario}>
          </Form.Field>

          <Form.Field required label='Fecha alta' control='input' disabled={true} value={this.state.fechaAlta} onChange={this.cambioFechaAlta}/>

          <Form.Field  label='Telefono' control='input' disabled={this.state.modificacion} value={this.state.telefono || ''} className= {(this.state.errorTelefono === '' || this.state.errorTelefono === true) ? null : 'error'} onChange={this.cambioTelefono} onBlur={this.handleBlurTelefono}/>

          <Form.Field  label='Mail' control='input' disabled={this.state.modificacion} value={this.state.mail || ''} className= {(this.state.errorMail === '' || this.state.errorMail === true) ? null : 'error'} onChange={this.cambioMail} onBlur={this.handleBlurMail}/>

          {( !this.state.isbottonPressed && this.state.modificacion && this.state.estado) ? <Button disabled={this.state.isbottonPressed} onClick={(e) => { 
              this.habilitarModificacion(e)} }>Modificar</Button>  : null}

          {(!this.state.estado) ? <Button onClick={(e) => { 
            if (window.confirm('¿Esta seguro que quiere dar de alta al paciente ' + this.state.nombre + '?')) {  
              this.alta(e)
              } else {e.preventDefault()}} }>Dar de Alta</Button> : null}
            
          {(!this.state.modificacion) ? <Button disabled={this.state.isbottonPressed}  onClick={(e) => { 
            if (window.confirm('¿Esta seguro que quiere modificar al paciente ' + this.state.nombre + '?')) {  
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

export default ConsultaAnimal;