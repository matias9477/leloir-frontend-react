import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';
import './styles.css';
import { Button, Header, Form, Radio } from 'semantic-ui-react'

class FormConsulta extends Component {
  constructor(props) {
    super(props);
    this.state = ({        
        busquedaId: false,
        busquedaDoc: false,
        busquedaNombre: false,
        
        isRadioSelected: true,
        valor:true,

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
      
        documentos:[],
        paises: [],
        obrasSociales:[],
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
      <div className='FormularioConsulta'>
      <Header as='h3' dividing>Registrar nuevo paciente</Header>
      <Form onSubmit={this.fetchPaciente}>
          <Form.Field control='input' type='radio' label='Búsqueda por Número de Paciente' name='busqueda' value={this.state.busquedaId}             onChange={this.cambioBusquedaId}/>

          <Form.Field control='input' type='radio' label='Búsqueda por Número de Documento' name='busqueda' value={this.state.busquedaDoc} onChange={this.cambioBusquedaDoc}/>
        
          <Form.Radio control='input' type='radio' label='Búsqueda por Nombre y Apellido' name='busqueda' value={this.state.busquedaNombre} onChange={this.cambioBusquedaNombre}/>
             
          <br></br>
           
          <Form.Field fluid label='Número de Paciente' control='input' disabled={this.state.isRadioSelected || (!this.state.isBusquedaId)} value={this.state.id} onChange={this.cambioId}/>

          <Form.Field fluid label='Nombre' control='input' disabled={this.state.isRadioSelected || (!this.state.isBusquedaNombre)} value={this.state.nombre} onChange={this.cambioNombre}/>

          <Form.Field fluid label='Apellido' control='input' disabled={this.state.isRadioSelected || (!this.state.isBusquedaNombre)} value={this.state.apellido} onChange={this.cambioApellido}/>
          
          <Form.Field fluid label='Tipo documento' control='select' disabled={true}  value={this.state.tipoDoc} onChange={this.cambioTipoDoc} >
            <option value={null}> </option>
            {this.state.documentos.map(item => (
            <option key={item.idTipoDocumento}>{item.nombre}</option>))}
          </Form.Field>

          <Form.Field fluid label='Número de documento' control='input' disabled={this.state.isRadioSelected || (!this.state.isBusquedaDoc)} value={this.state.nroDoc} onChange={this.cambioNroDoc}/>

          <Form.Field fluid label='Fecha alta' control='input' disabled={true} value={this.state.fechaAlta} onChange={this.cambioFechaAlta}/>

          <Form.Field fluid label='Sexo' control='select' disabled={true} value={this.state.sexo} onChange={this.cambioSexo} >
            <option value={null}>  </option>
            <option value="Femenino"> Femenino </option>
            <option value="Masculino"> Masculino </option>
          </Form.Field>

          <Form.Field fluid label='Nacionalidad' control='select' disabled={true} value={this.state.nacionalidad} onChange={this.cambioNacionalidad} >
            <option value={null}>  </option>
            {this.state.paises.map(item => (
            <option key={item.idPais}>{item.nombreBonito}</option>))}
          </Form.Field> 
          
          <Form.Field disabled={true}>
            <label>Fecha de Nacimiento</label>
              <DatePicker selected={Date.parse(this.state.fechaNacimiento)} onChange= {this.cambioFechaNacimiento} peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" maxDate={addDays(new Date(), 0)} dateFormat="yyyy-MM-dd">
              </DatePicker> 
          </Form.Field>

          <Form.Field fluid label='Telefono' control='input' disabled={true} value={this.state.telefono || ''} onChange={this.cambioTelefono}/>

          <Form.Field fluid label='Mail' control='input' disabled={true} value={this.state.mail || ''} onChange={this.cambioMail}/>

          <Form.Field fluid label='Obra Social' control='select' disabled={true} value={this.state.obraSocial} onChange={this.cambioObraSocial} >
            <option value={null}>  </option>
            {this.state.obrasSociales.map(item => (
            <option key={item.idObraSocial}>{item.razonSocial}</option>))}
          </Form.Field> 
          
          <Button primary type="submit" disabled={this.state.valor}>Buscar Paciente</Button>
                   
      </Form>  
    </div>
    );
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
        fechaNacimiento: this.getHumanDate(paciente.fechaNacimiento),
        fechaAlta: this.getHumanDate(paciente.fechaAlta),
        sexo: this.getSexo(paciente.sexo),
        nacionalidad: paciente.nacionalidad.nombreBonito,
        telefono: paciente.telefono,
        mail: paciente.mail,
        obraSocial: this.verificarExistenciaObraSocial(paciente.obraSocial),
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
      fechaNacimiento: this.getHumanDate(paciente[0].fechaNacimiento),
      fechaAlta: this.getHumanDate(paciente[0].fechaAlta),
      sexo: this.getSexo(paciente[0].sexo),
      nacionalidad: paciente[0].nacionalidad.nombreBonito,
      telefono: paciente[0].telefono,
      mail: paciente[0].mail,
      obraSocial: this.verificarExistenciaObraSocial(paciente[0].obraSocial),
    });
  }).catch(function(error) {
    alert('No se encontró al paciente. Revise la información e intente nuevamente.')
  }, this.vaciadoCampos());
  }

  fetchPaciente(e){
    e.preventDefault();
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
      paciente: [],
    })
  }

  cambioBusquedaId(e) {
    this.setState( {
      isRadioSelected: false,
      isBusquedaId: true,
      isBusquedaDoc: false,
      isBusquedaNombre: false,
    })
    this.vaciadoCampos();
  } 

  cambioBusquedaDoc(e) {
    this.setState( {
      isRadioSelected: false,
      isBusquedaDoc: true,
      isBusquedaId: false,
      isBusquedaNombre:false,
    })
    this.vaciadoCampos();
  } 

  cambioBusquedaNombre(e){
    this.setState( {
      isRadioSelected: false,
      isBusquedaNombre: true,
      isBusquedaDoc: false,
      isBusquedaId: false,
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
      nombre: e.target.value
    })
  }

  cambioApellido(e) {
    this.setState( {
      apellido: e.target.value,
      valor:false,
    })
  }  

  cambioTipoDoc(e){
    this.setState( {
        tipoDoc: e.target.value
    })
  }

  cambioNroDoc(e) {
    this.setState( {
      nroDoc: e.target.value,
      valor:false,
    })
  }

  cambioFechaNacimiento(e){
    this.setState( {
        fechaNacimiento: e
    })
  }

  cambioFechaAlta(e){
      this.setState( {
          fechaAlta: e.target.value
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
    
  getSexo = (sex) => {
    if (sex === true){
      return  "Masculino"
    }else {
      return "Femenino"
    }
  }

  getHumanDate = (date) => {
    date = new Date(date);
    var d = date.getDate().toString();
    var dd = (d.length === 2) ? d : "0"+d;
    var m = (date.getMonth()+1).toString();
    var mm = (m.length === 2) ? m : "0"+m;     
    return((date.getFullYear()) + '/' + mm + '/' + dd.toString());
  }

  verificarExistenciaObraSocial (os){
    if (os === null){
      return null;
    } else{
      return os.razonSocial;
    }
  }

}

export default FormConsulta;