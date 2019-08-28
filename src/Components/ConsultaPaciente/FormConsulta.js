import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';
import { Button, Header, Form, Icon, Container } from 'semantic-ui-react'
import './../styles.css';
import { getFechaNacimientoConsulta, verificarExistenciaObraSocial, getHumanDate } from './../../Services/MetodosPaciente';
import MenuLateral from '../MenuLateral';
import { getIdTipoDoc, getFechaNacimiento, getSexoId, getIdPais, getIso, getNombrePais, getIso3, getCodigoTelefono, getIdObraSocial, getCuitObraSocial, getDomicilioObraSocial, getTelefonoObraSocial, getEmailObraSocial, validateName, validateApellido, validateTipoDoc, validateNroDoc, validateSexo, validateNacionalidad, validateNacimiento, fechaAltaDateStamp, getbitAlta, booleanBitAlta} from './../../Services/MetodosPaciente';
import {Link} from 'react-router-dom';

import {urlDocs, urlObrasSoc,urlPaises,urlSexos} from '../../Constants/URLs';

class FormConsulta extends Component {
  constructor(props) {
    super(props);
    this.state = ({        
        busquedaId: false,
        busquedaDoc: false,
        busquedaNombre: false,
        
        isRadioSelected: true,
        isbottonPressed:true,
        modificacion: true,
        cancelar: true,
        valor:true,
        showButton: false,
        cambios: false,

        isBusquedaId:false,
        isBusquedaDoc:false,
        isBusquedaNombre:false,

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
    this.fetchPaciente = this.fetchPaciente.bind(this);
    this.cambioBusquedaId = this.cambioBusquedaId.bind(this);
    this.cambioBusquedaDoc = this.cambioBusquedaDoc.bind(this);
    this.cambioBusquedaNombre = this.cambioBusquedaNombre.bind(this);
    
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
    console.log("component will mount")
    this.fillCombos();

  }
  
  componentDidMount(){
    console.log("Comp did mount")
    // this.fillCombos();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.loading!==true){
    // this.fillCombos();
    }
  }

  renderForm() {
    return (
      <div className='Formularios'>
        <Container className='btnHeader'>
          <Button className='boton' as= {Link} to='/pacientes' exact floated='left' icon labelPosition='left' primary size='small'>
            <Icon name='arrow alternate circle left' /> Volver
          </Button>
          <Header as='h3' dividing>Buscar paciente</Header>
        </Container>

      <Form>
        
          <Form.Field control='input' type='radio' label='Búsqueda por Número de Paciente' name='busqueda' value={this.state.busquedaId} onChange={this.cambioBusquedaId}/>

          <Form.Field control='input' type='radio' label='Búsqueda por Número de Documento' name='busqueda' value={this.state.busquedaDoc} onChange={this.cambioBusquedaDoc}/>
        
          <Form.Radio control='input' type='radio' label='Búsqueda por Nombre y Apellido' name='busqueda' value={this.state.busquedaNombre} onChange={this.cambioBusquedaNombre}/>
             
          <br></br>
          
          <Form.Field  label='Número de Paciente' control='input' disabled={(this.state.isRadioSelected || (!this.state.isBusquedaId)) || !this.state.modificacion} value={this.state.id} onChange={this.cambioId}/>

          <Form.Field required label='Nombre' control='input' disabled={(this.state.isRadioSelected || (!this.state.isBusquedaNombre)) && this.state.modificacion} value={this.state.nombre} onChange={this.cambioNombre} className= {this.state.errorNombre ? null : 'error'}/>

          <Form.Field required label='Apellido' control='input' disabled={(this.state.isRadioSelected || (!this.state.isBusquedaNombre)) && this.state.modificacion} value={this.state.apellido} onChange={this.cambioApellido} className= {this.state.errorApellido ? null : 'error' }/>
          
          <Form.Group widths='equal'>
            <Form.Field required label='Tipo documento' control='select' disabled={this.state.modificacion}  value={this.state.tipoDoc} onChange={this.cambioTipoDoc} className= {this.state.errorTipoDoc ? null : 'error' } >
              <option value={null}> </option>
              {this.state.documentos.map(item => (
              <option key={item.idTipoDocumento}>{item.nombre}</option>))}
            </Form.Field>

            <Form.Field required label='Número de documento' control='input'  disabled={(this.state.isRadioSelected || (!this.state.isBusquedaDoc)) && this.state.modificacion} value={this.state.nroDoc} onChange={this.cambioNroDoc} className= {this.state.errorNroDoc ? null : 'error' }/>
          </Form.Group>

          <Form.Field  label='Fecha alta' control='input' disabled={true} value={this.state.fechaAlta} onChange={this.cambioFechaAlta}/>

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
          
          <Form.Field required disabled={this.state.modificacion} className= {this.state.errorFechaNac ? null : 'error' }>
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

          <Form.Field label='Bit Alta' control='input' disabled={true} value={this.state.bitAlta} onChange={this.cambioBitAlta}/>
          
          <Button className='boton' primary type="submit" disabled={this.state.valor || !this.state.modificacion} onClick={this.fetchPaciente}>Buscar Paciente</Button> 

           {(!this.state.showButton && !this.state.isbottonPressed && this.state.modificacion) ? <Button disabled={this.state.isbottonPressed} onClick={(e) => { 
              this.habilitarModificacion(e)} }>Modificar</Button>  : null}
            
            {(!this.state.modificacion) ? <Button disabled={this.state.isbottonPressed}  onClick={(e) => { 
              if (window.confirm('¿Esta seguro que quiere modificar al paciente ' + this.state.nombre + ' ' + this.state.apellido + '?')) {  
                this.modificarPaciente(e)
                } else {e.preventDefault()} } }>
              Aceptar
            </Button> : null}           

            {(!this.state.modificacion) ? <Button disabled={this.state.cancelar} onClick={(e) => { 
              this.cancelar(e)} }> X </Button> : null }

            {(!this.state.showButton && !this.state.isbottonPressed && this.state.modificacion) ? <Button disabled={this.state.isbottonPressed}  onClick={(e) => { 
              if (window.confirm('¿Esta seguro que quiere eliminar al paciente ' + this.state.nombre + ' ' + this.state.apellido + '?')) {  
                this.baja(e)
                } else {e.preventDefault()} } }>
              Eliminar Paciente
            </Button> : null }
                   
      </Form>  
    </div>
    );
  }

  baja = (e) => {
    const urlBaja = "/pacientes/dar-de-baja/" + this.state.id;
    
    fetch(urlBaja, {
        method: 'PUT', 
        headers:{
        'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert('Se ha eliminado el paciente con éxito.');
            this.vaciadoCampos();
            return response.text();
        } else {
            alert('No se ha podido eliminar el paciente.');
            return Promise.reject({status: response.status, statusText: response.statusText});
        }
        })
  }

  cancelar(e){
    e.preventDefault();
    this.setState({
      modificacion: true,
      showButton: false,
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
      this.fetchPaciente(e);
    }
  }

  habilitarModificacion(e){
    e.preventDefault();
    this.setState ({
      modificacion: false,
      showButton: false,
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
          "bitAlta": booleanBitAlta(this.state.bitAlta),
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
            "bitAlta": booleanBitAlta(this.state.bitAlta),
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
            return Promise.reject({status: response.status, statusText: response.statusText});
          }
        });
  
        this.setState({
          modificacion: true,
          cancelar: true,
          showButton: false,
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
        bitAlta: getbitAlta(paciente.bitAlta),    isbottonPressed:false
      })
    }).catch(function(error) {
      alert('No se encontró al paciente. Revise la información e intente nuevamente.'); 
  }, this.vaciadoCampos());
  }

  handleUpdateClickNombre = (api) => {
    fetch(api).then ( resolve => {
      return resolve.json();
  }).then(paciente => {
    this.setState({
      id: paciente[0].idPaciente,
      nombre: paciente[0].nombre,
      apellido: paciente[0].apellido,
      tipoDoc: paciente[0].tipoDocumento.nombre,
      nroDoc: paciente[0].nroDocumento,
      fechaNacimiento: getFechaNacimientoConsulta(paciente[0].fechaNacimiento),
      fechaAlta: getHumanDate(paciente[0].fechaAlta),
      sexo: paciente[0].sexo.nombre,
      nacionalidad: paciente[0].nacionalidad.nombreBonito,
      telefono: paciente[0].telefono,
      mail: paciente[0].mail,
      obraSocial: verificarExistenciaObraSocial(paciente[0].obraSocial),
      bitAlta: getbitAlta(paciente[0].bitAlta),
      isbottonPressed:false
    });
  }).catch(function(error) {
    alert('No se encontró al paciente. Revise la información e intente nuevamente.')
  }, this.vaciadoCampos());
  }

  fetchPaciente(e){
    e.preventDefault();
    this.setState({isbottonPressed:false})
    if (this.state.isBusquedaId === true){
      const api = "/pacientes/id/" + this.state.id ;
      this.handleUpdateClick(api);
    } else if (this.state.isBusquedaDoc === true){
      const api = "/pacientes/dni/" + this.state.nroDoc ;
      this.handleUpdateClick(api);
    } else {
      const api = "/pacientes/nombre/" + this.state.nombre +"/apellido/"+ this.state.apellido;
      this.handleUpdateClickNombre(api);
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
      bitAlta:'',
      paciente: [],
    })
  }

  cambioBusquedaId(e) {
    this.setState( {
      isRadioSelected: false,
      isBusquedaId: true,
      isBusquedaDoc: false,
      isBusquedaNombre: false,
      modificacion:true,
      showButton: false,
      isbottonPressed:true,
    })
    this.vaciadoCampos();
  } 

  cambioBusquedaDoc(e) {
    this.setState( {
      isRadioSelected: false,
      isBusquedaDoc: true,
      isBusquedaId: false,
      isBusquedaNombre:false,
      modificacion:true,
      showButton: false,
      isbottonPressed:true,
    })
    this.vaciadoCampos();
  } 

  cambioBusquedaNombre(e){
    this.setState( {
      isRadioSelected: false,
      isBusquedaNombre: true,
      isBusquedaDoc: false,
      isBusquedaId: false,
      modificacion:true,
      showButton: false,
      isbottonPressed:true,
    })
    this.vaciadoCampos();
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