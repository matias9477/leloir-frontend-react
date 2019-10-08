import React, { Component } from 'react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Header, Form } from 'semantic-ui-react';
import { getCurrentDate, getIdTipoAnimal } from '../../Services/MetodosPaciente';
import { emptyToNull, titleCase, validateNombre, validateOnlyNumbers, validateMail, validateRequiredCombos } from './../../Services/MetodosDeValidacion';
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

        errorNombre: true,
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
  } 

  comboTipos = () =>{
    axios.get(urlTiposAnimales).then(resolve => {
      this.setState({
        tipos: Object.values(resolve.data).flat(),
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
            "tipoAnimalId": getIdTipoAnimal(this.state.tipo, this.state.tipos),
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
    
    const { nombre, tipo, propietario, mail, telefono } = this.state;

    const errorNombre = validateNombre(nombre);
    const errorTipo = validateRequiredCombos(tipo);
    const errorPropietario = validateNombre(propietario);
    const errorMail = validateMail(mail);
    const errorTelefono = validateOnlyNumbers(telefono);

    if ( errorNombre && errorTipo && errorPropietario && errorMail && errorTelefono ) {
      const api = '/pacientes/add';
      this.handleUpdateClick(api);
    } else {
      alert("Verifique los datos ingresados.")
      this.setState({
        errorNombre,
        errorTipo,
        errorPropietario,
        errorMail,
        errorTelefono,
      })
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
      errorNombre: true,
      errorTipo: true,
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

  render(){
    return (
      <div className='altasYConsultas'>
        <Header as='h3' dividing>Registrar nuevo Animal</Header>

        <Form onSubmit={this.getPaciente}>
          <Form.Group widths='equal'>
            <Form.Field required label='Nombre' control='input' 
            placeholder='Nombre' 
            value={this.state.nombre} 
            onChange={this.cambioNombre} 
            className= {this.state.errorNombre === true ? null : 'error'} 
            />
          
            <Form.Field required label='Tipo Animal' control='select' 
            placeholder = 'Tipo animal' 
            value={this.state.tipo} 
            onChange={this.cambioTipo} 
            className= {this.state.errorTipo === true ? null : 'error'} 
            >
              <option value={null}>  </option>
              {this.state.tipos.map(item => (
              <option key={item.tipoAnimalId}>{item.nombre}</option>))}
            </Form.Field>
          </Form.Group>

          <Form.Field required label='Propietario' control='input' placeholder='Propietario' 
          value={this.state.propietario} 
          onChange={this.cambioPropietario} 
          className= {this.state.errorPropietario === true ? null : 'error'} 
          />

          <Form.Group widths='equal'>
            <Form.Field label='Telefono' control='input' 
            placeholder='Teléfono' 
            value={this.state.telefono} 
            onChange={this.cambioTelefono} 
            className= {this.state.errorTelefono === true ? null : 'error' } 
            />

            <Form.Field label='E-Mail' control='input' 
            placeholder='E-Mail' value={this.state.mail} 
            onChange={this.cambioMail} 
            className= {this.state.errorMail === true ? null : 'error'} 
            />    
          </Form.Group>  

          <br/>
        
          <Button primary type="submit" onClick={this.getPaciente} className="boton"> Registrar Animal</Button >       

        </Form>  
      </div>

    );
  }


}


export default AltaAnimal;