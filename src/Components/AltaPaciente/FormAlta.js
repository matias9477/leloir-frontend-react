import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';
import { Button, Header, Form, Dropdown } from 'semantic-ui-react'
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
    const urlDocs = "/tipos_documento/all";
    const urlObrasSoc = "/obras_sociales/all";
    const urlPaises = "/paises/all";

    fetch(urlDocs).then ( resolve => {
      if(resolve.ok) { 
        return resolve.json();
      } else {
        throw Error(resolve.statusText);
      }
  }).then(tipos => {
      this.setState({
        documentos: tipos,
      })
  })


    fetch(urlObrasSoc).then ( resolve => {
      if(resolve.ok) { 
        return resolve.json();
      } else {
        throw Error(resolve.statusText);
      }
  }).then(obrasSoc => {
      this.setState({
        obrasSociales: obrasSoc,
      })
  })

  fetch(urlPaises).then ( resolve => {
    if(resolve.ok) { 
      return resolve.json();
    } else {
      throw Error(resolve.statusText);
    }
}).then(paises => {
    this.setState({
      paises: paises,
    })
})

  }

  render() {
    return (
      <div className='FormularioAlta'>
        <Header as='h3' dividing>Registrar nuevo paciente</Header>
        <Form onSubmit={this.fetchPaciente}>
            
            <Form.Field required fluid label='Nombre' control='input' 
            placeholder='Nombre' value={this.state.nombre} onChange={this.cambioNombre}/>
           


            <Form.Field required fluid label='Apellido' control='input'
            placeholder='Apellido' value={this.state.apellido} onChange={this.cambioApellido}/>



          <Form.Field>
            <label>Tipo de Documento</label>
            <select className="combosAlta" value={this.state.tipoDoc} onChange={this.cambioTipoDoc}>
                <option value={null}>  </option>
                {this.state.documentos.map(item => (
                <option key={item.idTipoDocumento}>{item.nombre}</option>))}
            </select> 
          </Form.Field>


            <Form.Field required>
              <label>Número de Documento</label>
              <input placeholder='Número de documento' type="text" value={this.state.nroDoc} onChange={this.cambioNroDoc} />
            </Form.Field>
  
                
            <Form.Field required>
              <label>Sexo</label>
              <select className="combosAlta" value={this.state.sexo} onChange={this.cambioSexo} >
              <option value={null}>  </option>
              <option value="Femenino"> Femenino </option>
              <option value="Masculino"> Masculino </option>
            </select>
            </Form.Field>

            <Form.Field required>
              <label>Nacionalidad</label>
              <select placeholder='Nacionalidad' className="combosAlta" value={this.state.nacionalidad} onChange={this.cambioNacionalidad} >
                <option value={null}>  </option>
                {this.state.paises.map(item => (
                <option key={item.idPais}>{item.nombreBonito}</option>))}
            </select>
            </Form.Field>

            <Form.Field>
              <label>Fecha de Nacimiento</label>
              <DatePicker placeholderText="Fecha de Nacimiento"
            selected={this.state.fechaNacimiento} onChange={this.cambioFechaNacimiento} 
            peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" maxDate={addDays(new Date(), 0)} dateFormat="yyyy-MM-dd">
              </DatePicker> 
            </Form.Field>

            <Form.Field>
              <label>Teléfono</label>
              <input placeholder='Teléfono' type="text" value={this.state.telefono} onChange={this.cambioTelefono} />
            </Form.Field> 

            <Form.Field>
              <label>E-Mail</label>
              <input placeholder='E-Mail' type="text" value={this.state.mail} onChange={this.cambioMail}/>
            </Form.Field>        

            <Form.Field>
                  <label>Obra Social</label>
                  <select className="combosAlta" value={this.state.obraSocial} onChange={this.cambioObraSocial} >
                <option key={null}>  </option>
                {this.state.obrasSociales.map(item => (
                <option key={item.idObraSocial}>{item.razonSocial}</option>))}
            </select> 
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
          "idTipoDocumento": this.getIdTipoDoc(),
          "nombre": this.state.tipoDoc
        },
        "fechaNacimiento": this.getFechaNacimiento(),
        "fechaAlta": this.getCurrentDate(),
        "sexo": this.getBooleanSex(this.state.sexo),
        "nacionalidad": {
          "idPais": this.getIdPais(),
          "iso": this.getIso(),
          "nombre": this.getNombrePais(),
          "nombreBonito": this.state.nacionalidad,
          "iso3": this.getIso3(),
          "codigoTelefono": this.getCodigoTelefono(),
        },
        "telefono": this.emptyToNull(this.state.telefono),
        "mail": this.emptyToNull(this.state.mail),
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
          "idTipoDocumento": this.getIdTipoDoc(),
          "nombre": this.state.tipoDoc
        },
        "fechaNacimiento": this.getFechaNacimiento(),
        "fechaAlta": this.getCurrentDate(),
        "sexo": this.getBooleanSex(this.state.sexo),
        "nacionalidad": {
          "idPais": this.getIdPais(),
          "iso": this.getIso(),
          "nombre": this.getNombrePais(),
          "nombreBonito": this.state.nacionalidad,
          "iso3": this.getIso3(),
          "codigoTelefono": this.getCodigoTelefono(),
        },
        "telefono": this.emptyToNull(this.state.telefono),
        "mail": this.emptyToNull(this.state.mail),
        "obraSocial": {
          "idObraSocial": this.getIdObraSocial(),
          "razonSocial": this.state.obraSocial,
          "cuit": this.getCuitObraSocial(),
          "domicilio": this.getDomicilioObraSocial(),
          "telefono": this.getTelefonoObraSocial(),
          "email": this.getEmailObraSocial(),
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

  getBooleanSex = (sex) => {
    if (sex === "Masculino"){
      return  true
    } else {
      return false
    }
  }

  getCurrentDate(){
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1; 
    var year = new Date().getFullYear(); 
    if (month < 10) {
      month = "0" + month;
    }
    if (date < 10){
      date = "0" + date;
    } 
    return year + '-' + month + '-' + date + 'T00:00:00.000+0000';
  }

  getFechaNacimiento(){
    var año = this.state.fechaNacimiento.getFullYear();
    var mes = (this.state.fechaNacimiento.getMonth()+1);
    var dia = this.state.fechaNacimiento.getDate();
    if (mes < 10){
      mes = "0" + mes;
    } 
    if (dia < 10){
      dia = "0" + dia;
    } 
    return año + "-" + mes + "-" + dia + "T00:00:00.000+0000";
  }

  getIdTipoDoc = () => {
    for(let i=0; i < this.state.documentos.length; i++){
      if (this.state.tipoDoc === this.state.documentos[i].nombre)
        return this.state.documentos[i].idTipoDocumento;
    }
  }

  getIdPais = () => {
    for(let i=0; i < this.state.paises.length; i++){
      if (this.state.nacionalidad === this.state.paises[i].nombreBonito)
        return this.state.paises[i].idPais;
    }
  }

  getIso = () => {
    for(let i=0; i < this.state.paises.length; i++){
      if (this.state.nacionalidad === this.state.paises[i].nombreBonito)
        return this.state.paises[i].iso;
    }
  }

  getIso3 = () => {
    for(let i=0; i < this.state.paises.length; i++){
      if (this.state.nacionalidad === this.state.paises[i].nombreBonito)
        return this.state.paises[i].iso3;
    }
  }

  getNombrePais = () => {
    for(let i=0; i < this.state.paises.length; i++){
      if (this.state.nacionalidad === this.state.paises[i].nombreBonito)
        return this.state.paises[i].nombre;
    }
  }

  getCodigoTelefono = () => {
    for(let i=0; i < this.state.paises.length; i++){
      if (this.state.nacionalidad === this.state.paises[i].nombreBonito)
        return this.state.paises[i].codigoTelefono;
    }
  }

  getIdObraSocial = () => {
    for(let i=0; i < this.state.obrasSociales.length; i++){
      if (this.state.obraSocial === this.state.obrasSociales[i].razonSocial)
        return this.state.obrasSociales[i].idObraSocial;
    }
  }

  getCuitObraSocial = () => {
    for(let i=0; i < this.state.obrasSociales.length; i++){
      if (this.state.obraSocial === this.state.obrasSociales[i].razonSocial)
        return this.state.obrasSociales[i].cuit;
    }
  }

  getDomicilioObraSocial = () => {
    for(let i=0; i < this.state.obrasSociales.length; i++){
      if (this.state.obraSocial === this.state.obrasSociales[i].razonSocial)
        return this.state.obrasSociales[i].domicilio;
    }
  }

  getTelefonoObraSocial = () => {
    for(let i=0; i < this.state.obrasSociales.length; i++){
      if (this.state.obraSocial === this.state.obrasSociales[i].razonSocial)
        return this.state.obrasSociales[i].telefono;
    }
  }

  getEmailObraSocial = () => {
    for(let i=0; i < this.state.obrasSociales.length; i++){
      if (this.state.obraSocial === this.state.obrasSociales[i].razonSocial)
        return this.state.obrasSociales[i].email;
    }
  }

  emptyToNull = (v) => {
    if (v === ''){
      return v=null;
    } else {
      return v;
    }
  }

}

export default FormAlta;