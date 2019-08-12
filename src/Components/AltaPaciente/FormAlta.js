import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';
import { Button, Header, Form } from 'semantic-ui-react'
import { fetchDocumentos, fetchObrasSociales, fetchPaises, fetchSexos } from './../../Services/FetchsPacientes';
import { getIdTipoDoc, getFechaNacimiento, getCurrentDate, getSexoId, getIdPais, getIso, getNombrePais, getIso3, getCodigoTelefono, emptyToNull, getIdObraSocial, getCuitObraSocial, getDomicilioObraSocial, getTelefonoObraSocial, getEmailObraSocial} from './../../Services/MetodosPaciente';
import './styles.css';

class FormAlta extends Component {
  constructor(props) {
    super(props);
    this.state = ({
        nombre: '',
        apellido:'',
        tipoDoc:'',
        nroDoc:'',
        fechaNacimiento: '',
        fechaAlta:'',
        sexo:'',
        nacionalidad:'',
        telefono:'',
        mail:'',
        obraSocial: '',

        documentos:[],
        paises: [],
        obrasSociales:[],
        sexos:[],
      })
    this.fetchPaciente = this.fetchPaciente.bind(this);
    this.cambioNombre = this.cambioNombre.bind(this);
    this.cambioApellido = this.cambioApellido.bind(this);    
    this.cambioTipoDoc = this.cambioTipoDoc.bind(this);
    this.cambioNroDoc = this.cambioNroDoc.bind(this);
    this.cambioFechaNacimiento = this.cambioFechaNacimiento.bind(this);
    this.cambioSexo = this.cambioSexo.bind(this);
    this.cambioNacionalidad = this.cambioNacionalidad.bind(this);
    this.cambioTelefono = this.cambioTelefono.bind(this);
    this.cambioMail = this.cambioMail.bind(this);
    this.cambioObraSocial = this.cambioObraSocial.bind(this);
  }
  
  componentDidMount(){
    this.setState({
      documentos: fetchDocumentos(),
      obrasSociales: fetchObrasSociales(),
      paises: fetchPaises(),
      sexos: fetchSexos(),
    })

  }

  render() {
    return (
      <div className='FormularioAlta'>
        <Header as='h3' dividing>Registrar nuevo paciente</Header>
        <Form onSubmit={this.fetchPaciente}>
            
          <Form.Field required label='Nombre' control='input' 
          placeholder='Nombre' value={this.state.nombre} onChange={this.cambioNombre}/>
          
          <Form.Field required label='Apellido' control='input'
          placeholder='Apellido' value={this.state.apellido} onChange={this.cambioApellido}/>

          <Form.Field required label='Tipo documento' control='select' placeholder ='Tipo documento' value={this.state.tipoDoc} onChange={this.cambioTipoDoc} >
              <option value={null}> </option>
              {this.state.documentos.map(item => (
              <option key={item.idTipoDocumento}>{item.nombre}</option>))}
          </Form.Field>

          <Form.Field required label='Número de Documento' control='input' placeholder='Número de documento' value={this.state.nroDoc} onChange={this.cambioNroDoc}>
          </Form.Field>

          <Form.Field required label='Sexo' control='select' placeholder = 'Sexo' value={this.state.sexo} onChange={this.cambioSexo} >
            <option value={null}>  </option>
            {this.state.sexos.map(item => (
            <option key={item.sexoId}>{item.nombre}</option>))}
          </Form.Field>

          <Form.Field required label='Nacionalidad' control='select' placeholder = 'Nacionalidad' value={this.state.nacionalidad} onChange={this.cambioNacionalidad} >
            <option value={null}>  </option>
              {this.state.paises.map(item => (
            <option key={item.idPais}>{item.nombreBonito}</option>))}
          </Form.Field>

          <Form.Field required>
            <label>Fecha de Nacimiento</label>
              <DatePicker className="dat" placeholderText="Fecha de Nacimiento"
              selected={this.state.fechaNacimiento} onChange= {this.cambioFechaNacimiento} peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" maxDate={addDays(new Date(), 0)} dateFormat="yyyy-MM-dd">
              </DatePicker> 
            </Form.Field>

          <Form.Field label='Telefono' control='input' placeholder='Teléfono' value={this.state.telefono} onChange={this.cambioTelefono}/>

          <Form.Field  label='E-Mail' control='input' placeholder='E-Mail' value={this.state.mail} onChange={this.cambioMail}/>      

          <Form.Field required  label='Obra Social' control='select' placeholder = 'Obra Social' value={this.state.obraSocial} onChange={this.cambioObraSocial} >
            <option key={null}>  </option>
              {this.state.obrasSociales.map(item => (
            <option key={item.idObraSocial}>{item.razonSocial}</option>))}
          </Form.Field>    
          
          <Button primary type="submit" onClick={this.fetchPaciente} className="boton"> Registrar Paciente</Button >       

        </Form>  
      </div>
    );
  }
  
  handleUpdateClick = (api) => {
    var data;
    if (this.state.obraSocial === null || this.state.obraSocial === ''){
      data = {
        "nombre": this.state.nombre,
        "apellido": this.state.apellido,
        "nroDocumento": this.state.nroDoc,
        "tipoDocumento": {
          "idTipoDocumento": getIdTipoDoc(this.state.tipoDoc, this.state.documentos),
          "nombre": this.state.tipoDoc
        },
        "fechaNacimiento": getFechaNacimiento(this.state.fechaNacimiento),
        "fechaAlta": getCurrentDate(),
        "sexo": {
          "sexoId": getSexoId(this.state.sexo, this.state.sexos),
          "nombre": this.state.sexo,
        },
        "nacionalidad": {
          "idPais": getIdPais(this.state.nacionalidad, this.state.paises),
          "iso": getIso(this.state.nacionalidad, this.state.paises),
          "nombre": getNombrePais(this.state.nacionalidad, this.state.paises),
          "nombreBonito": this.state.nacionalidad,
          "iso3": getIso3(this.state.nacionalidad, this.state.paises),
          "codigoTelefono": getCodigoTelefono(this.state.nacionalidad, this.state.paises),
        },
        "telefono": emptyToNull(this.state.telefono),
        "mail": emptyToNull(this.state.mail),
        "obraSocial": null,
        "historial": null,
        "bitAlta": true
    };
    } else {
      data = {
        "nombre": this.state.nombre,
        "apellido": this.state.apellido,
        "nroDocumento": this.state.nroDoc,
        "tipoDocumento": {
          "idTipoDocumento": getIdTipoDoc(this.state.tipoDoc, this.state.documentos),
          "nombre": this.state.tipoDoc
        },
        "fechaNacimiento": getFechaNacimiento(this.state.fechaNacimiento),
        "fechaAlta": getCurrentDate(),
        "sexo": {
          "sexoId": getSexoId(this.state.sexo, this.state.sexos),
          "nombre": this.state.sexo,
        },
        "nacionalidad": {
          "idPais": getIdPais(this.state.nacionalidad, this.state.paises),
          "iso": getIso(this.state.nacionalidad, this.state.paises),
          "nombre": getNombrePais(this.state.nacionalidad, this.state.paises),
          "nombreBonito": this.state.nacionalidad,
          "iso3": getIso3(this.state.nacionalidad, this.state.paises),
          "codigoTelefono": getCodigoTelefono(this.state.nacionalidad, this.state.paises),
        },
        "telefono": emptyToNull(this.state.telefono),
        "mail": emptyToNull(this.state.mail),
        "obraSocial": {
          "idObraSocial": getIdObraSocial(this.state.obraSocial, this.state.obrasSociales),
          "razonSocial": this.state.obraSocial,
          "cuit": getCuitObraSocial(this.state.obraSocial, this.state.obrasSociales),
          "domicilio": getDomicilioObraSocial(this.state.obraSocial, this.state.obrasSociales),
          "telefono": getTelefonoObraSocial(this.state.obraSocial, this.state.obrasSociales),
          "email": getEmailObraSocial(this.state.obraSocial, this.state.obrasSociales),
        },
        "historial": null,
        "bitAlta": true
    };
    }

    fetch(api, {
      method: 'POST', 
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
      }).then(response => {
        if (response.ok) {
          alert('Se registro el paciente ' + this.state.nombre +' ' + this.state.apellido + ' con éxito.');
          return response.text();
        } else {
          alert('No se ha podido registrar el paciente.');
          return Promise.reject({status: response.status, statusText: response.statusText});
        }
      });
  }

  fetchPaciente(e){
    e.preventDefault();
    const api = '/pacientes/add';
    this.handleUpdateClick(api);
  }
 
  cambioNombre(e) {
    this.setState( {
      nombre: e.target.value
    })
  }

  cambioApellido(e) {
    this.setState( {
      apellido: e.target.value
    })
  }  

  cambioTipoDoc(e){
    this.setState( {
        tipoDoc: e.target.value
    })
  } 

  cambioNroDoc(e) {
      this.setState( {
        nroDoc: e.target.value
      })
  }

  cambioFechaNacimiento(e){
    this.setState( {
        fechaNacimiento: e
    })
  }

  cambioSexo(e){
      this.setState( {
          sexo: e.target.value
      })
  }

  cambioNacionalidad(e){
      this.setState( {
          nacionalidad: e.target.value
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

  cambioObraSocial(e){
      this.setState( {
          obraSocial: e.target.value
      })
  }

}

export default FormAlta;