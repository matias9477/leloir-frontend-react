import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';
import { Button, Header, Form, Icon, Container } from 'semantic-ui-react'
import './../styles.css';
import { getFechaNacimientoConsulta, verificarExistenciaObraSocial, getHumanDate } from './../../Services/MetodosPaciente';
import MenuLateral from '../MenuLateral';
import { getIdTipoDoc, getFechaNacimiento, getSexoId, getIdPais, getIso, getNombrePais, getIso3, getCodigoTelefono, getIdObraSocial, getCuitObraSocial, getDomicilioObraSocial, getTelefonoObraSocial, getEmailObraSocial, validateName, validateApellido, validateTipoDoc, validateNroDoc, validateSexo, validateNacionalidad, validateNacimiento, fechaAltaDateStamp  } from './../../Services/MetodosPaciente';
import {Link} from 'react-router-dom';

import {urlDocs, urlObrasSoc,urlPaises,urlSexos} from '../../Constants/URLs';

class FormConsulta extends Component {
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
        bitAlta: '',
        estado: '',

        errorNombre: true,
        errorApellido: true,
        errorTipoDoc: true,
        errorNroDoc: true,
        errorSexo: true,
        errorNac: true,
        errorFechaNac: true,
      
        documentos:[],
        paises: [],
        obrasSociales:[],
        sexos:[],
        
      })
    this.cambioId = this.cambioId.bind(this);
    this.cambioNombre = this.cambioNombre.bind(this);
    this.cambioApellido = this.cambioApellido.bind(this);    
    this.cambioTipoDoc = this.cambioTipoDoc.bind(this);
    this.cambioNroDoc = this.cambioNroDoc.bind(this);
    this.cambioFechaNacimiento = this.cambioFechaNacimiento.bind(this);
    this.cambioFechaAlta = this.cambioFechaAlta.bind(this);
    this.cambioSexo = this.cambioSexo.bind(this);
    this.cambioNacionalidad = this.cambioNacionalidad.bind(this);
    this.cambioTelefono = this.cambioTelefono.bind(this);
    this.cambioMail = this.cambioMail.bind(this);
    this.cambioObraSocial = this.cambioObraSocial.bind(this);
    this.cambioBitAlta = this.cambioBitAlta.bind(this);
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
    const api = "/pacientes/id/" + this.props.match.params.id ;
    this.handleUpdateClick(api);
  }

  renderForm() {
    return (
      <div className='Formularios'>
        <Container className='btnHeader'>
          <Button className='boton' as= {Link} to='/pacientes' floated='left' icon labelPosition='left' primary size='small'>
            <Icon name='arrow alternate circle left' /> Volver
          </Button>
          <br></br>
          <Header as='h3' dividing>Búsqueda y modificación</Header>
        </Container>

      <Form>
          
          <Form.Field required label='Número de Paciente' control='input' disabled={true}  value={this.state.id} onChange={this.cambioId} />

          <Form.Field required label='Nombre' control='input' disabled={this.state.modificacion}  value={this.state.nombre} onChange={this.cambioNombre} className= {this.state.errorNombre ? null : 'error'}/>

          <Form.Field required label='Apellido' control='input' disabled={this.state.modificacion}  value={this.state.apellido} onChange={this.cambioApellido} className= {this.state.errorApellido ? null : 'error' }/>
          
          <Form.Group widths='equal'>
            <Form.Field required label='Tipo documento' control='select' disabled={this.state.modificacion}  value={this.state.tipoDoc} onChange={this.cambioTipoDoc} className= {this.state.errorTipoDoc ? null : 'error' } >
              <option value={null}> </option>
              {this.state.documentos.map(item => (
              <option key={item.idTipoDocumento}>{item.nombre}</option>))}
            </Form.Field>

            <Form.Field required label='Número de documento' control='input'  disabled={this.state.modificacion}  value={this.state.nroDoc} onChange={this.cambioNroDoc} className= {this.state.errorNroDoc ? null : 'error' }/>
          </Form.Group>

          <Form.Field required label='Fecha alta' control='input' disabled={true} value={this.state.fechaAlta} onChange={this.cambioFechaAlta}/>

          <Form.Field required label='Sexo' control='select' disabled={this.state.modificacion} value={this.state.sexo} onChange={this.cambioSexo} className= {this.state.errorSexo ? null : 'error' }>
            <option value={null}>  </option>
            {this.state.sexos.map(item => (
            <option key={item.sexoId}>{item.nombre}</option>))}
          </Form.Field>

          <Form.Field required label='Nacionalidad' control='select' disabled={this.state.modificacion} value={this.state.nacionalidad} onChange={this.cambioNacionalidad} className= {this.state.errorNac ? null : 'error' }>
            <option value={null}>  </option>
            {this.state.paises.map(item => (
            <option key={item.idPais}>{item.nombreBonito}</option>))}
          </Form.Field> 
          
          <Form.Field required disabled={this.state.modificacion} className= {this.state.errorFechaNac ? null : 'error' } >
            <label>Fecha de Nacimiento</label>
              <DatePicker selected={Date.parse(this.state.fechaNacimiento)} onChange= {this.cambioFechaNacimiento} peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" maxDate={addDays(new Date(), 0)} dateFormat="yyyy-MM-dd">
              </DatePicker> 
          </Form.Field>

          <Form.Field  label='Telefono' control='input' disabled={this.state.modificacion} value={this.state.telefono || ''} onChange={this.cambioTelefono}/>

          <Form.Field  label='Mail' control='input' disabled={this.state.modificacion} value={this.state.mail || ''} onChange={this.cambioMail}/>

          <Form.Field  label='Obra Social' control='select' disabled={this.state.modificacion} value={this.state.obraSocial} onChange={this.cambioObraSocial} >
            <option value={null}>  </option>
            {this.state.obrasSociales.map(item => (
            <option key={item.idObraSocial}>{item.razonSocial}</option>))}
          </Form.Field> 

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
    </div>
    );
  }

  alta(e){
    fetch(`/pacientes/switch-alta/${this.props.match.params.id}`, {
        method: 'PUT', 
        headers:{
        'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
          alert("Se ha dado de alta al paciente con éxito.");
          this.setState({estado: true})
         
          const api = "/pacientes/id/" + this.props.match.params.id ;
          this.handleUpdateClick(api);
          
          return response.text();
        } else {
          if(this.state.bitAlta) {
              alert(`No se ha podido dar de alta al paciente ${this.state.nombre} ${this.state.apellido}. Intentelo nuevamente.`)
            }
            return Promise.reject({status: response.status, statusText: response.statusText});
        }
        });
  
  }

  cancelar(e){
    e.preventDefault();
    this.setState({
      modificacion: true,
      cambios: false,
      errorNombre: true,
      errorApellido: true,
      errorTipoDoc: true,
      errorNroDoc: true,
      errorSexo: true,
      errorNac: true,
      errorFechaNac: true,
    })
    if (this.state.cambios){
      const api = "/pacientes/id/" + this.props.match.params.id ;
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
    var data;

    const { nombre, apellido, tipoDoc, nroDoc, fechaNacimiento, sexo, nacionalidad } = this.state;
    const errorNombre = validateName(nombre);
    const errorApellido = validateApellido(apellido);
    const errorTipoDoc = validateTipoDoc(tipoDoc);
    const errorNroDoc = validateNroDoc(nroDoc);
    const errorFechaNac = validateNacimiento(fechaNacimiento);
    const errorSexo = validateSexo(sexo);
    const errorNac = validateNacionalidad(nacionalidad);

    if ( errorNombre && errorApellido && errorTipoDoc && errorNroDoc && errorFechaNac && errorSexo && errorNac ) {
      if (this.state.obraSocial === null || this.state.obraSocial === ''){
        data = {
          "apellido": this.state.apellido,
          "bitAlta": this.state.bitAlta,
          "fechaAlta": fechaAltaDateStamp(this.state.fechaAlta),
          "fechaNacimiento": typeof this.state.fechaNacimiento === "string" ? fechaAltaDateStamp(this.state.fechaNacimiento) : getFechaNacimiento(this.state.fechaNacimiento),
          "historial": null,
          "idPaciente": this.state.id,
          "mail": this.state.mail,
          "nacionalidad": {
            "idPais": getIdPais(this.state.nacionalidad, this.state.paises),
            "iso": getIso(this.state.nacionalidad, this.state.paises),
            "nombre": getNombrePais(this.state.nacionalidad, this.state.paises),
            "nombreBonito": this.state.nacionalidad,
            "iso3": getIso3(this.state.nacionalidad, this.state.paises),
            "codigoTelefono": getCodigoTelefono(this.state.nacionalidad, this.state.paises),
          },
          "nombre": this.state.nombre,
          "nroDocumento": this.state.nroDoc,
          "obraSocial": null,
          "sexo": {
            "sexoId": getSexoId(this.state.sexo, this.state.sexos),
            "nombre": this.state.sexo,
          },
          "telefono": this.state.telefono,
          "tipoDocumento": {
            "idTipoDocumento": getIdTipoDoc(this.state.tipoDoc, this.state.documentos),
            "nombre": this.state.tipoDoc
          }
        }
      } else {
        data = {
            "apellido": this.state.apellido,
            "bitAlta": this.state.bitAlta,
            "fechaAlta": fechaAltaDateStamp(this.state.fechaAlta),
            "fechaNacimiento": typeof this.state.fechaNacimiento === "string" ? fechaAltaDateStamp(this.state.fechaNacimiento) : getFechaNacimiento(this.state.fechaNacimiento),
            "historial": null,
            "idPaciente": this.state.id,
            "mail": this.state.mail,
            "nacionalidad": {
              "idPais": getIdPais(this.state.nacionalidad, this.state.paises),
              "iso": getIso(this.state.nacionalidad, this.state.paises),
              "nombre": getNombrePais(this.state.nacionalidad, this.state.paises),
              "nombreBonito": this.state.nacionalidad,
              "iso3": getIso3(this.state.nacionalidad, this.state.paises),
              "codigoTelefono": getCodigoTelefono(this.state.nacionalidad, this.state.paises),
            },
            "nombre": this.state.nombre,
            "nroDocumento": this.state.nroDoc,
            "obraSocial": {
              "idObraSocial": getIdObraSocial(this.state.obraSocial, this.state.obrasSociales),
              "razonSocial": this.state.obraSocial,
              "cuit": getCuitObraSocial(this.state.obraSocial, this.state.obrasSociales),
              "domicilio": getDomicilioObraSocial(this.state.obraSocial, this.state.obrasSociales),
              "telefono": getTelefonoObraSocial(this.state.obraSocial, this.state.obrasSociales),
              "email": getEmailObraSocial(this.state.obraSocial, this.state.obrasSociales),
            },
            "sexo": {
              "sexoId": getSexoId(this.state.sexo, this.state.sexos),
              "nombre": this.state.sexo,
            },
            "telefono": this.state.telefono,
            "tipoDocumento": {
              "idTipoDocumento": getIdTipoDoc(this.state.tipoDoc, this.state.documentos),
              "nombre": this.state.tipoDoc
            }
      };
      }
      
      const urlModificar = "/pacientes/modificar/" + this.state.id;
     
      fetch(urlModificar, {
        method: 'PUT', 
        body: JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        }
        }).then(response => {
          if (response.ok) {
            alert('Se ha modificado el paciente con éxito.');
            return response.text();
          } else {
            alert('No se ha podido modificar el paciente.');
            const api = "/pacientes/id/" + this.props.match.params.id ;
            this.handleUpdateClick(api);
            return Promise.reject({status: response.status, statusText: response.statusText});
          }
        });
  
        this.setState({
          modificacion: true,
          cancelar: true,
          cambios: false,
          errorApellido: true,
          errorTipoDoc: true,
          errorNroDoc: true,
          errorSexo: true,
          errorNac: true,
          errorFechaNac: true,
        })
      
    } else {
      alert("Revise los datos ingresados.")
      this.setState ({ 
        errorNombre,  errorApellido, errorTipoDoc, errorNroDoc, errorFechaNac, errorSexo, errorNac,
      })
    }    

  }
  
    
  handleUpdateClick = (api) => {
    fetch(api).then ( resolve => {
      if(resolve.ok) { 
        return resolve.json();
      } else {
        throw Error(resolve.statusText);
      }
    }).then(paciente => {
      this.setState({
        id: paciente.idPaciente,
        nombre: paciente.nombre,
        apellido: paciente.apellido,
        tipoDoc: paciente.tipoDocumento.nombre,
        nroDoc: paciente.nroDocumento,
        fechaNacimiento: getFechaNacimientoConsulta(paciente.fechaNacimiento),
        fechaAlta: getHumanDate(paciente.fechaAlta),
        sexo: paciente.sexo.nombre,
        nacionalidad: paciente.nacionalidad.nombreBonito,
        telefono: paciente.telefono,
        mail: paciente.mail,
        obraSocial: verificarExistenciaObraSocial(paciente.obraSocial),
        bitAlta: paciente.bitAlta,    
        isbottonPressed:false,
        estado: paciente.bitAlta,
      })
    }).catch(function(error) {
      alert('No se encontró al paciente. Revise la información e intente nuevamente.'); 
  });
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

  cambioApellido(e) {
    this.setState( {
      apellido: e.target.value,
      valor:false,
      cambios: true,
    })
  }  

  cambioTipoDoc(e){
    this.setState( {
        tipoDoc: e.target.value,
        cambios: true,
    })
  }

  cambioNroDoc(e) {
    this.setState( {
      nroDoc: e.target.value,
      valor:false,
      cambios: true,
    })
  }

  cambioFechaNacimiento(e){
    this.setState( {
        fechaNacimiento: e,
        cambios: true,
    })
  }

  cambioFechaAlta(e){
      this.setState( {
          fechaAlta: e.target.value
      })
  }

  cambioSexo(e){
    this.setState( {
        sexo: e.target.value,
        cambios: true,
    })
  }

  cambioNacionalidad(e){
    this.setState( {
        nacionalidad: e.target.value,
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

  cambioObraSocial(e){
      this.setState( {
          obraSocial: e.target.value,
          cambios: true,
      })
  }

  cambioBitAlta(e){
    this.setState({
      bitAlta: e.target.value,
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

export default FormConsulta;