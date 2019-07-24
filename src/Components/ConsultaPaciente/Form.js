import React, { Component } from 'react';
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
            <p>Tipo Documento: <input type="text" value={this.state.tipoDoc} disabled={true} /></p>    
            <p>Número Documento: <input type="int" value={this.state.nroDoc} disabled={this.state.isRadioSelected || (!this.state.isBusquedaDoc)} onChange={this.cambioNroDoc} /></p>    
            <p>Fecha de nacimiento: <input type="text" value={this.state.fechaNacimiento} disabled={true} /></p> 
            <p>Fecha de alta: <input type="text" value={this.state.fechaAlta} disabled={true} /></p>     
            <p>Sexo: <input type="text" value={this.state.sexo} disabled={true} /></p>    
            <p>Nacionalidad: <input type="text" value={this.state.nacionalidad} disabled={true}/></p>    
            <p>Teléfono: <input type="int" value={this.state.telefono} disabled={true} /></p>    
            <p>Mail: <input type="text" value={this.state.mail} disabled={true}/></p>    
            <p>Obra Social: <input type="text" value={this.state.obraSocial} disabled={true} /></p>    
               
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

  }
 
  cambioBusquedaId(e) {
    this.setState( {
      isRadioSelected: false,
      isBusquedaId: true,
      isBusquedaDoc: false,
      isBusquedaNombre: false,
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

  cambioBusquedaDoc(e) {
    this.setState( {
      isRadioSelected: false,
      isBusquedaDoc: true,
      isBusquedaId: false,
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
    })
  } 

  cambioBusquedaNombre(e){
    this.setState( {
      isRadioSelected: false,
      isBusquedaNombre: true,
      isBusquedaDoc: false,
      isBusquedaId: false,
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
    })
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
        fechaNacimiento: e.target.value
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
  return(dd+"/"+mm+ "/" + (date.getFullYear()).toString());
}

}

export default Form;