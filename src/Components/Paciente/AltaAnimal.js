import React, { Component } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Header, Form } from 'semantic-ui-react'
import { getCurrentDate, emptyToNull,  validateName, validateTipoAnimal, validatePropietario, convertStyleString} from '../../Services/MetodosPaciente';
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
        idTipo: '',

        tipos:[],

        errorNombre: true,
        errorTipo: true,
        errorPropietario: true,
      })
    this.fetchPaciente = this.fetchPaciente.bind(this);
    this.cambioNombre = this.cambioNombre.bind(this);
    this.cambioTipo = this.cambioTipo.bind(this); 
    this.cambioPropietario = this.cambioPropietario.bind(this);
    this.cambioTelefono = this.cambioTelefono.bind(this);
    this.cambioMail = this.cambioMail.bind(this);
  } 

  comboTipos = () =>{
    // fetch(urlTiposAnimales).then ( resolve => {
    //     if(resolve.ok) { 
    //         return resolve.json();
    //     } else {
    //         throw Error(resolve.statusText);
    //     }
    // }).then(tiposAnimales => {
    //    this.setState({tipos:tiposAnimales}) 
    // })
  }

  componentWillMount() {
    //this.comboTipos();

  }

  handleUpdateClick = (api) => {
    var data = {
        "type": "com.leloir.backend.domain.Animal",
        "bitAlta": true,
        "fechaAlta": getCurrentDate(),
        "historial": null,
        "mail": emptyToNull(this.state.mail.toLowerCase()),
        "nombre": convertStyleString(this.state.nombre),
        "propietario": convertStyleString(this.state.propietario),
        "telefono": emptyToNull(this.state.telefono),
        "tipoAnimal": {
            "nombre": this.state.tipo,
            "tipoAnimalId": 1
        }
    };
   

    fetch(api, {
      method: 'POST', 
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
      }).then(response => {
        if (response.ok) {
          alert('Se registro el paciente ' + convertStyleString(this.state.nombre)  + ' con éxito.'); 
          this.vaciadoCampos();
          return response.text();
        } else {
          alert('No se ha podido registrar el paciente.');
          return Promise.reject({status: response.status, statusText: response.statusText});
        }
      });
  }

  fetchPaciente(e){
    e.preventDefault();
    const { nombre, tipo, propietario } = this.state;
    const errorNombre = validateName(nombre);
    const errorTipo = validateTipoAnimal(tipo);
    const errorPropietario = validatePropietario(propietario);

    if ( errorNombre && errorTipo && errorPropietario ) {
      const api = '/pacientes/add';
      this.handleUpdateClick(api);
      
    } else {
      this.setState ({ 
        errorNombre,
        errorTipo,
        errorPropietario,
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
      <div className='altasPaciente'>
        <Header as='h3' dividing>Registrar nuevo Animal</Header>

        <Form onSubmit={this.fetchPaciente}>

          <Form.Field required label='Nombre' control='input' 
          placeholder='Nombre' value={this.state.nombre} onChange={this.cambioNombre} className= {this.state.errorNombre ? null : 'error'} />
        
          <Form.Field required label='Tipo Animal' control='select' placeholder = 'Tipo animal' value={this.state.tipo} onChange={this.cambioTipo} className= {this.state.errorTipo ? null : 'error' }>
            <option value={null}>  </option>
            {this.state.tipos.map(item => (
            <option key={item.Id}>{item.nombre}</option>))}
          </Form.Field>

          <Form.Field required label='Propietario' control='input' placeholder='Propietario' value={this.state.propietario} onChange={this.cambioPropietario} className= {this.state.errorPropietario ? null : 'error' }>
          </Form.Field>

          <Form.Field label='Telefono' control='input' placeholder='Teléfono' value={this.state.telefono} onChange={this.cambioTelefono}/>

          <Form.Field label='E-Mail' control='input' placeholder='E-Mail' value={this.state.mail} onChange={this.cambioMail}/>      
          
          <Button primary type="submit" onClick={this.fetchPaciente} className="boton"> Registrar Animal</Button >       

        </Form>  
      </div>

    );
  }


}


export default AltaAnimal;