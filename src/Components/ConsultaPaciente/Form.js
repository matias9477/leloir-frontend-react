import React, { Component } from 'react';
import FetchPaciente from './FetchPaciente';
import './styles.css';

class Form extends Component {
  constructor(props) {
      const nom = "hola";

    super(props);
    this.state = ({
        busquedaId: false,
        busquedaDoc: false,
        valor:'',
        nombre: nom,
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
    this.procesar = this.procesar.bind(this);
    this.cambioBusquedaId = this.cambioBusquedaId.bind(this);
    this.cambioBusquedaDoc = this.cambioBusquedaDoc.bind(this);
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
       
        <form onSubmit={this.procesar} className="Form">

            <p><input type="radio" value={this.state.busquedaId} name="radio" onChange={this.cambioBusquedaId} /> Busqueda por Id</p> 
            <p><input type="radio" value={this.state.busquedaDoc} name="radio" onChange={this.cambioBusquedaDoc} /> Busqueda por Documento</p> 
            <br></br>
            <p>Ingrese busqueda: <input type="int" value={this.state.valor} onChange={this.cambioValor} /></p>
            <br></br>
            <p>Nombre: <input type="text" value={this.state.nombre} onChange={this.cambioNombre} /></p>
            <p>Apellido: <input type="text" value={this.state.apellido} onChange={this.cambioApellido} /></p>    <p>Tipo Documento: <input type="text" value={this.state.tipoDoc} onChange={this.cambioTipoDoc} /></p>    
            <p>Número Documento: <input type="int" value={this.state.nroDoc} onChange={this.cambioNroDoc} /></p>    
            <p>Fecha de nacimiento: <input type="text" value={this.state.fechaNacimiento} onChange={this.cambioFechaNacimiento} /></p>   
            <p>Fecha de alta: <input type="text" value={this.state.fechaAlta} onChange={this.cambioFechaAlta} /></p>     
            <p>Sexo: <input type="text" value={this.state.sexo} onChange={this.cambioSexo} /></p>    
            <p>Nacionalidad: <input type="text" value={this.state.nacionalidad} onChange={this.cambioNacionalidad} /></p>    
            <p>Teléfono: <input type="int" value={this.state.telefono} onChange={this.cambioTelefono} /></p>    
            <p>Mail: <input type="text" value={this.state.mail} onChange={this.cambioMail} /></p>    
            <p>Obra Social: <input type="text" value={this.state.obraSocial} onChange={this.cambioObraSocial} /></p>    

            <p><input type="submit" /></p>
        </form>  
      </div>
    );
  }

  procesar(e) {
    e.preventDefault();
    alert('Se encontró al paciente: '+this.state.nombre + ' ' + this.state.apellido);
  }

  cambioBusquedaId(e) {
    this.setState( {
      busquedaId: !this.state.busquedaId
    })
  } 

  cambioBusquedaDoc(e) {
    this.setState( {
      busquedaDoc: !this.state.busquedaDoc
    })
  } 

  cambioValor(e) {
      this.setState( {
          valor: e.target.value
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
  

}

export default Form;