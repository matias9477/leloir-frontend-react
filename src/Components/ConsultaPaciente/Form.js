import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = ({
        paciente: null,
        
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
        fechaNacimiento2:'',
        fechaAlta:'',
        sexo:'',
        nacionalidad:'',
        telefono:'',
        mail:'',
        obraSocial:'',
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
    this.cambioFechaNacimiento2 = this.cambioFechaNacimiento2.bind(this);
    this.cambioFechaAlta = this.cambioFechaAlta.bind(this);
    this.cambioSexo = this.cambioSexo.bind(this);
    this.cambioNacionalidad = this.cambioNacionalidad.bind(this);
    this.cambioTelefono = this.cambioTelefono.bind(this);
    this.cambioMail = this.cambioMail.bind(this);
    this.cambioObraSocial = this.cambioObraSocial.bind(this);
    
  }

  render() {
    return (
      <div>
        <div className="Consulta">Consulta paciente</div>
        <form className="Form">

            <p><input type="radio" value={this.state.busquedaId} name="radio" onChange={this.cambioBusquedaId} /> Busqueda por Id</p> 
            <p><input type="radio" value={this.state.busquedaDoc} name="radio" onChange={this.cambioBusquedaDoc} /> Busqueda por Documento</p> 
            <p><input type="radio" value={this.state.busquedaNombre} name="radio" onChange={this.cambioBusquedaNombre} /> Busqueda por Nombre y Apellido</p> 
            <br></br>
            <hr></hr>
            <br></br>
            <p>Id: <input type="text" value={this.state.id} disabled={this.state.isRadioSelected || (!this.state.isBusquedaId)}  onChange={this.cambioId} size="43px"/></p>
            <p>Nombre: <input type="text" value={this.state.nombre} disabled={this.state.isRadioSelected || (!this.state.isBusquedaNombre)} onChange={this.cambioNombre} size="43px"/></p>
            <p>Apellido: <input type="text" value={this.state.apellido} disabled={this.state.isRadioSelected || (!this.state.isBusquedaNombre) } onChange={this.cambioApellido} /></p> 

            Tipo Documento: <select disabled={true} className="combos" value={this.state.tipoDoc} onChange={this.cambioTipoDoc} >
              <option value={null}>  </option>
              <option value="Documento Nacional de Identidad"> Documento Nacional de Identidad </option>
              <option value="Pasaporte" > Pasaporte </option>
            </select>    

            <p>Número Documento: <input type="text" value={this.state.nroDoc} disabled={this.state.isRadioSelected || (!this.state.isBusquedaDoc)} onChange={this.cambioNroDoc} /></p>    
            <p>Fecha de alta: <input type="text" value={this.state.fechaAlta} disabled={true} onChange={this.cambioFechaAlta}/></p>

            Sexo: <select disabled={true}className="combos" value={this.state.sexo} onChange={this.cambioSexo} >
              <option value={null}>  </option>
              <option value="Femenino"> Femenino </option>
              <option value="Masculino"> Masculino </option>
            </select>
            <p></p>
            Nacionalidad: <select disabled={true} className="combos" value={this.state.nacionalidad} onChange={this.cambioNacionalidad} >
            <option value={null}>  </option>
              <option value="Argentina"> Argentina </option>
              <option value="Chile"> Chile </option>
            </select>    
            <p></p>
            
            Fecha de nacimiento:  <DatePicker disabled={true} openToDate={new Date(this.state.fechaNacimiento)}
            value={this.state.fechaNacimiento}
            onChange={this.cambioFechaNacimiento} 
            peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" dateFormat="yyyy-MM-dd"></DatePicker> 

            <p>Teléfono: <input type="text" value={this.state.telefono} disabled={true} onChange={this.cambioTelefono} /></p>    
            <p>Mail: <input type="text" value={this.state.mail} disabled={true} onChange={this.cambioMail}/></p>    
            
            Obra Social: <select disabled={true}className="combos" value={this.state.obraSocial} onChange={this.cambioObraSocial} >
              <option value="">  </option>
              <option value=" "> No posee </option>
              <option value="1"> Medife </option>
              <option value="2"> Osde </option>
            </select>    
            <p></p>
            <button type="submit" disabled={this.state.valor} onClick={this.fetchPaciente} className="ButtonBuscar"> Buscar Paciente</button >
        </form>  
      </div>
    );
  }
  
handleUpdateClick = (api) => {
  fetch(api).then ( resolve => {
      return resolve.json();
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
      obraSocial: paciente.obraSocial,
    });
  }).catch(function(error) {
    alert('No se encontró al paciente. Revise la información e intente nuevamente.');
});
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
    obraSocial: paciente[0].obraSocial,
  });
}).catch(function(error) {
  alert('No se encontró al paciente. Revise la información e intente nuevamente.');
});
}

  fetchPaciente(e){
    e.preventDefault();
    if (this.state.isBusquedaId === true){
      const api = "http://localhost:8080/pacientes/id/" + this.state.id ;
      this.handleUpdateClick(api);
    } else if (this.state.isBusquedaDoc === true){
      const api = "http://localhost:8080/pacientes/dni/" + this.state.nroDoc ;
      this.handleUpdateClick(api);
    } else {
      const api = "http://localhost:8080/pacientes/nombre/" + this.state.nombre +"/apellido/"+ this.state.apellido;
      this.handleUpdateClickNombre(api);
    } 
    console.log(this.state.fechaNacimiento2);
  }
 
  vaciadoCampos(){
    this.setState( {
      nombre: '',
      id:'',
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

  cambioFechaNacimiento2(e){
    this.setState( {
        fechaNacimiento2: e
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



}

export default Form;