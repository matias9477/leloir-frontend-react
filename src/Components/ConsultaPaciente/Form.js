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
        isBusquedaId:false,
        isBusquedaDoc:false,
        isBusquedaNombre:false,
        valor:'',
        isValorEntered: true,
        isButtonPressed: true,

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
    this.cambioValor = this.cambioValor.bind(this)

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
            <p><input type="radio" value={this.state.busquedaNombre} name="radio" onChange={this.cambioBusquedaNombre} /> Busqueda por Nombre</p> 
            <br></br>

            Ingrese busqueda: <input type="int" value={this.state.valor} disabled={this.state.isRadioSelected} onChange={this.cambioValor} />
            
            <button type="submit" disabled={this.state.isValorEntered} onClick={this.fetchPaciente} className="ButtonBuscar"> Buscar Paciente</button >
            
            <br></br>
            <br></br>
            <hr></hr>
            <p>Nombre: <input type="text" value={this.state.nombre} disabled={true} /></p>
            <p>Apellido: <input type="text" value={this.state.apellido} disabled={true} /></p>    
            <p>Tipo Documento: <input type="text" value={this.state.tipoDoc} disabled={true} /></p>    
            <p>Número Documento: <input type="int" value={this.state.nroDoc} disabled={true} /></p>    
            <p>Fecha de nacimiento: <input type="text" value={this.state.fechaNacimiento} disabled={true} /></p> 
            <p>Fecha de alta: <input type="text" value={this.state.fechaAlta} disabled={true} /></p>     
            <p>Sexo: <input type="text" value={this.state.sexo} disabled={true} /></p>    
            <p>Nacionalidad: <input type="text" value={this.state.nacionalidad} disabled={true}/></p>    
            <p>Teléfono: <input type="int" value={this.state.telefono} disabled={true} /></p>    
            <p>Mail: <input type="text" value={this.state.mail} disabled={true}/></p>    
            <p>Obra Social: <input type="text" value={this.state.obraSocial} disabled={true} /></p>    
        </form>  
      </div>
    );
  }
  
handleUpdateClick = (api) => {
  fetch(api).then ( resolve => {
      return resolve.json();
  }).then(paciente => {
    this.setState({
      er: true,
      nombre: paciente.nombre,
      apellido: paciente.apellido,
      tipoDoc: paciente.tipoDocumento.nombre,
      nroDoc: paciente.nroDocumento,
      fechaNacimiento: paciente.fechaNacimiento,
      fechaAlta: paciente.fechaAlta,
      sexo: paciente.sexo,
      nacionalidad: paciente.nacionalidad.nombreBonito,
      telefono: paciente.telefono,
      mail: paciente.mail,
      obraSocial: paciente.obraSocial,
    });
  }).catch(function(error) {
    alert('No se encontró al paciente. Intente nuevamente...');
});

}


  fetchPaciente(e){
    e.preventDefault();
    if (this.state.isBusquedaId === true){
      const api = "http://localhost:8080/pacientes/id/" + this.state.valor ;
      this.handleUpdateClick(api);
    } else if (this.state.isBusquedaDoc === true){
      const api = "http://localhost:8080/pacientes/dni/" + this.state.valor ;
      this.handleUpdateClick(api);
    } 

  }
 
  cambioBusquedaId(e) {
    this.setState( {
      isRadioSelected: false,
      isBusquedaId: true,
      isBusquedaDoc: false,
      isBusquedaNombre: false,
    })
  } 

  cambioBusquedaDoc(e) {
    this.setState( {
      isRadioSelected: false,
      isBusquedaDoc: true,
      isBusquedaId: false,
      isBusquedaNombre:false,
    })
  } 

  cambioBusquedaNombre(e){
    this.setState( {
      isRadioSelected: false,
      isBusquedaNombre: true,
      isBusquedaDoc: false,
      isBusquedaId: false,
    })
  } 

  cambioValor(e) {
      this.setState( {
          valor: e.target.value,
          isValorEntered: false,
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
  
getSexo = sex => {
  if (sex === true){
    sex = "Masculino"
  }else {
    sex = "Femenino"
  }
}

}

export default Form;