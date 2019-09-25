import React, { Component } from 'react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Header, Form } from 'semantic-ui-react';
import { getCurrentDate } from '../../Services/MetodosPaciente';
import { emptyToNull, titleCase, hasNumbers, validMail } from './../../Services/MetodosDeValidacion';
import { urlTiposAnimales } from './../../Constants/URLs';
import './../styles.css';

class AltaAnimal extends Component {
  constructor(props) {
    super(props);
    this.state = ({
        nombre: '',
        telefono:'',
        mail:'',
        propietario: '',
        tipo: '',

        tipos:[],

        errorNombre: '',
        errorTelefono: true,
        errorTipo: true,
        errorPropietario: true,
        errorMail: true,
      })
    this.getPaciente = this.getPaciente.bind(this);
    this.cambioNombre = this.cambioNombre.bind(this);
    this.cambioTipo = this.cambioTipo.bind(this); 
    this.cambioPropietario = this.cambioPropietario.bind(this);
    this.cambioTelefono = this.cambioTelefono.bind(this);
    this.cambioMail = this.cambioMail.bind(this);

    this.handleBlurNombre = this.handleBlurNombre.bind(this);
    this.handleBlurMail = this.handleBlurMail.bind(this);
    this.handleBlurTelefono = this.handleBlurTelefono.bind(this);
    this.handleBlurTipos = this.handleBlurTipos.bind(this);
    this.handleBlurPropietario = this.handleBlurPropietario.bind(this);
  } 

  comboTipos = () =>{
    axios.get(urlTiposAnimales).then(resolve => {
      this.setState({
        tipos: resolve.data,
      });
    }, (error) => {
        console.log('Error combo animales', error.message);
    })

  }

  componentDidMount() {
    this.comboTipos();

  }

  handleUpdateClick = (api) => {
    var data = {
        "type": "com.leloir.backend.domain.Animal",
        "bitAlta": true,
        "fechaAlta": getCurrentDate(),
        "historial": null,
        "mail": emptyToNull(this.state.mail),
        "nombre": titleCase(this.state.nombre),
        "propietario": titleCase(this.state.propietario),
        "telefono": emptyToNull(this.state.telefono),
        "tipoAnimal": {
            "nombre": this.state.tipo,
            "tipoAnimalId": 1
        }
    };

      axios.post(api, data
        ).then((response) => {
          alert('Se registro el paciente ' + titleCase(this.state.nombre)  + ' con éxito.'); 
          this.vaciadoCampos();
        }, (error) => {
          alert('No se ha podido registrar el paciente.');
      });
  }

  getPaciente(e){
    e.preventDefault();

    this.handleBlurNombre()
    this.handleBlurMail()
    this.handleBlurPropietario()
    this.handleBlurTelefono()
    this.handleBlurTipos()
    
    const { errorNombre, errorTipo, errorPropietario, errorMail, errorTelefono } = this.state;

    if ( errorNombre && errorTipo && errorPropietario && errorMail && errorTelefono ) {
      const api = '/pacientes/add';
      this.handleUpdateClick(api);
    } else {
      alert("Verifique los datos ingresados.")
    }    
  }

  vaciadoCampos(){
    this.setState( {
      id: '',
      nombre: '',
      tipo: '',
      propietario: '',
      telefono:'',
      mail:'',
      errorNombre: '',
      errorTipo: '',
      errorPropietario: true,
      errorTelefono: true,
      errorMail: true,
    })
  }
 
  cambioNombre(e) {
    this.setState( {
      nombre: e.target.value
    })
  }

  cambioTipo(e) {
    this.setState( {
      tipo: e.target.value
    })
  }  

  cambioPropietario(e){
    this.setState( {
        propietario: e.target.value
    })
  } 

  cambioTelefono(e){
    this.setState( {
        telefono: e.target.value
    })
  }

  cambioMail(e){
    this.setState( {
        mail: e.target.value
    })
  }

  handleBlurNombre(){
    if (this.state.nombre === ''  || this.state.nombre.length === 0 ||  hasNumbers(this.state.nombre)){
      this.setState({ errorNombre: false })
    } else {
      this.setState({errorNombre: true})
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

  handleBlurPropietario(){
    if (this.state.propietario === ''  || this.state.propietario.length === 0 ||  hasNumbers(this.state.propietario)){
      this.setState({ errorPropietario: false })
    } else {
      this.setState({ errorPropietario: true })
    }
  }
  

  render(){
    return (
      <div className='altasPaciente'>
        <Header as='h3' dividing>Registrar nuevo Animal</Header>

        <Form onSubmit={this.getPaciente}>

          <Form.Field required label='Nombre' control='input' 
          placeholder='Nombre' value={this.state.nombre} onChange={this.cambioNombre} className= {(this.state.errorNombre=== '' || this.state.errorNombre === true) ? null : 'error'} onBlur={this.handleBlurNombre} />
        
          <Form.Field required label='Tipo Animal' control='select' placeholder = 'Tipo animal' value={this.state.tipo} onChange={this.cambioTipo} className= {(this.state.errorTipo=== '' || this.state.errorTipo === true) ? null : 'error'} onBlur={this.handleBlurTipos}>
            <option value={null}>  </option>
            {this.state.tipos.map(item => (
            <option key={item.tipoAnimalId}>{item.nombre}</option>))}
          </Form.Field>

          <Form.Field required label='Propietario' control='input' placeholder='Propietario' value={this.state.propietario} onChange={this.cambioPropietario} className= {(this.state.errorPropietario === '' || this.state.errorPropietario === true) ? null : 'error'} onBlur={this.handleBlurPropietario}>
          </Form.Field>

          <Form.Field label='Telefono' control='input' placeholder='Teléfono' value={this.state.telefono} onChange={this.cambioTelefono} className= {(this.state.errorTelefono === '' || this.state.errorTelefono === true) ? null : 'error' } onBlur={this.handleBlurTelefono}/>

          <Form.Field label='E-Mail' control='input' placeholder='E-Mail' value={this.state.mail} onChange={this.cambioMail} className= {(this.state.errorMail === '' || this.state.errorMail === true) ? null : 'error'} onBlur={this.handleBlurMail}/>      
          
          <Button primary type="submit" onClick={this.getPaciente} className="boton"> Registrar Animal</Button >       

        </Form>  
      </div>

    );
  }


}


export default AltaAnimal;