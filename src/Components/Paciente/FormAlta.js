import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';
import { Button, Header, Form, Icon, Container } from 'semantic-ui-react'
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuLateral from '../MenuLateral';
import {Link} from 'react-router-dom';

import {urlDocs, urlObrasSoc,urlPaises,urlSexos} from '../../Constants/URLs';
import { getIdTipoDoc, getFechaNacimiento, getCurrentDate, getSexoId, getIdPais, getIso, getNombrePais, getIso3, getCodigoTelefono, emptyToNull, getIdObraSocial, getCuitObraSocial, getDomicilioObraSocial, getTelefonoObraSocial, getEmailObraSocial, validateName, validateApellido, validateTipoDoc, validateNroDoc, validateSexo, validateNacionalidad, validateNacimiento, convertStyleString} from '../../Services/MetodosPaciente';
import './../styles.css';

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

        errorNombre: true,
        errorApellido: true,
        errorTipoDoc: true,
        errorNroDoc: true,
        errorSexo: true,
        errorNac: true,
        errorFechaNac: true,

        loading:true,
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
  
  fillCombos = () =>{
    this.comboObrasSociales();
    this.comboTiposDocs();
    this.comboSexos();
    this.comboPaises();
  }  

  comboSexos = () =>{
    fetch(urlSexos).then ( resolve => {
        if(resolve.ok) { 
            return resolve.json();
        } else {
            throw Error(resolve.statusText);
        }
    }).then(sexo => {
       this.setState({sexos:sexo}) 
    })
  }

  comboPaises = () =>{
    fetch(urlPaises).then ( resolve => {
        if(resolve.ok) { 
            return resolve.json();
        } else {
            throw Error(resolve.statusText);
        }
    }).then(pais => {
        this.setState({paises:pais})
    })    
  }

  comboObrasSociales = () =>{
    fetch(urlObrasSoc).then ( resolve => {
        if(resolve.ok) { 
            return resolve.json();
        } else {
            throw Error(resolve.statusText);
        }
    }).then(obrasSoc => {
        this.setState({obrasSociales:obrasSoc});
    })
  }

  comboTiposDocs = () =>{
  fetch(urlDocs).then ( resolve => {
      if(resolve.ok) { 
          return resolve.json();
      } else {
          throw Error(resolve.statusText);
      }
  }).then(tipos => {
      this.setState({documentos:tipos})
  })

}


  componentWillMount() {
    this.fillCombos();

  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.loading!==true){
    // this.fillCombos();
    }
  }
  

  renderForm(){
    return (
      <div className='Formularios'>
        <Container className='btnHeader'>
          <Button className='boton' as= {Link} to='/pacientes' exact='true' floated='left' icon labelPosition='left' primary size='small'>
            <Icon name='arrow alternate circle left' /> Volver
          </Button>

          <Header as='h3' dividing>Registrar nuevo paciente</Header>
        </Container>

        <Form onSubmit={this.fetchPaciente}>

          <Form.Field required label='Nombre' control='input' 
          placeholder='Nombre' value={this.state.nombre} onChange={this.cambioNombre} className= {this.state.errorNombre ? null : 'error'} />
          

          <Form.Field required label='Apellido' control='input'
          placeholder='Apellido' value={this.state.apellido} onChange={this.cambioApellido} className= {this.state.errorApellido ? null : 'error' } />


          <Form.Group widths='equal'>
            <Form.Field required label='Tipo documento' control='select' placeholder ='Tipo documento' value={this.state.tipoDoc} onChange={this.cambioTipoDoc} className= {this.state.errorTipoDoc ? null : 'error' }>
                <option value={null}> </option>
                {this.state.documentos.map(item => (
                <option key={item.idTipoDocumento}>{item.nombre}</option>))}
            </Form.Field>
            <Form.Field required label='Número de Documento' control='input' placeholder='Número de documento' value={this.state.nroDoc} onChange={this.cambioNroDoc} className= {this.state.errorNroDoc ? null : 'error' }>
            </Form.Field>
           </Form.Group>


          <Form.Field required label='Sexo' control='select' placeholder = 'Sexo' value={this.state.sexo} onChange={this.cambioSexo} className= {this.state.errorSexo ? null : 'error' }>
            <option value={null}>  </option>
            {this.state.sexos.map(item => (
            <option key={item.sexoId}>{item.nombre}</option>))}
          </Form.Field>


          <Form.Field required label='Nacionalidad' control='select' placeholder = 'Nacionalidad' value={this.state.nacionalidad} onChange={this.cambioNacionalidad} className= {this.state.errorNac ? null : 'error' }>
            <option value={null}>  </option>
              {this.state.paises.map(item => (
            <option key={item.idPais}>{item.nombreBonito}</option>))}
          </Form.Field>


          <Form.Field required className= {this.state.errorFechaNac ? null : 'error' }>
            <label>Fecha de Nacimiento</label>
              <DatePicker placeholderText="Fecha de Nacimiento"
              selected={this.state.fechaNacimiento} onChange= {this.cambioFechaNacimiento} peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" maxDate={addDays(new Date(), 0)} dateFormat="yyyy-MM-dd">
              </DatePicker> 
            </Form.Field>


          <Form.Field label='Telefono' control='input' placeholder='Teléfono' value={this.state.telefono} onChange={this.cambioTelefono}/>


          <Form.Field label='E-Mail' control='input' placeholder='E-Mail' value={this.state.mail} onChange={this.cambioMail}/>      


          <Form.Field label='Obra Social' control='select' placeholder = 'Obra Social' value={this.state.obraSocial} onChange={this.cambioObraSocial} >
            <option key={null}>  </option>
              {this.state.obrasSociales.map(item => (
            <option key={item.idObraSocial}>{item.razonSocial}</option>))}
          </Form.Field>  
          
          <Button primary type="submit" onClick={this.fetchPaciente} className="boton"> Registrar Paciente</Button >       

        </Form>  
      </div>

    );
  }

  renderProgress(){
    return <CircularProgress size={50}/>;
  }
  
  handleUpdateClick = (api) => {
    var data;
    if (this.state.obraSocial === null || this.state.obraSocial === ''){
      data = {
        "nombre": convertStyleString(this.state.nombre),
        "apellido": convertStyleString(this.state.apellido),
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
        "mail": emptyToNull(this.state.mail.toLowerCase()),
        "obraSocial": null,
        "historial": null,
        "bitAlta": true
    };
    } else {
      data = {
        "nombre": convertStyleString(this.state.nombre),
        "apellido": convertStyleString(this.state.apellido),
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
        "mail": emptyToNull(this.state.mail.toLowerCase()),
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
          alert('Se registro el paciente ' + convertStyleString(this.state.nombre) +' ' + convertStyleString(this.state.apellido) + ' con éxito.'); 
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
    const { nombre, apellido, tipoDoc, nroDoc, fechaNacimiento, sexo, nacionalidad } = this.state;
    const errorNombre = validateName(nombre);
    const errorApellido = validateApellido(apellido);
    const errorTipoDoc = validateTipoDoc(tipoDoc);
    const errorNroDoc = validateNroDoc(nroDoc);
    const errorFechaNac = validateNacimiento(fechaNacimiento);
    const errorSexo = validateSexo(sexo);
    const errorNac = validateNacionalidad(nacionalidad);

    if ( errorNombre && errorApellido && errorTipoDoc && errorNroDoc && errorFechaNac && errorSexo && errorNac ) {
      const api = '/pacientes/add';
      this.handleUpdateClick(api);
      
    } else {
      this.setState ({ 
        errorNombre,  errorApellido, errorTipoDoc, errorNroDoc, errorFechaNac, errorSexo, errorNac,
      })
    }    
  }

  vaciadoCampos(){
    this.setState( {
      id: '',
      nombre: '',
      apellido:'',
      tipoDoc:'',
      nroDoc:'',
      fechaNacimiento:'',
      fechaAlta:'',
      sexo:'',
      nacionalidad:'',
      telefono:'',
      mail:'',
      obraSocial:'',
      paciente: [],
      errorNombre: true,
      errorApellido: true,
      errorTipoDoc: true,
      errorNroDoc: true,
      errorSexo: true,
      errorNac: true,
      errorFechaNac: true,
    })
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


  render() {
    
    return (
      <div className='union'>
        <MenuLateral/>
        <div className="FormAlta">
          {this.renderForm()}
        </div>
      
      
      </div>
    );
  }

}


export default FormAlta;