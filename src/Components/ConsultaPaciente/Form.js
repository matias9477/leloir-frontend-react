import React, { Component } from 'react';
import './styles.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = ({
        loading: true,
        paciente: null,
        
        busquedaId: false,
        busquedaDoc: false,
        isRadioSelected: true,
        valor:'',
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

  async componentDidMount(){
    const api = "http://localhost:8080/pacientes/id/1";
    const response = await fetch(api);
    const data = await response.json();
    this.setState({paciente:data, loading: false})
}

  render() {
    return (
      <div>
        <div className="Consulta">Consulta paciente</div>
       
        <form onSubmit={this.procesar} className="Form">

            <p><input type="radio" value={this.state.busquedaId} name="radio" onChange={this.cambioBusquedaId} /> Busqueda por Id</p> 
            <p><input type="radio" value={this.state.busquedaDoc} name="radio" onChange={this.cambioBusquedaDoc} /> Busqueda por Documento</p> 
            <br></br>

            Ingrese busqueda: <input type="int" value={this.state.valor} disabled={this.state.isRadioSelected} onChange={this.cambioValor} />
            
            <button disabled={this.state.isRadioSelected} className="ButtonBuscar" > Buscar Paciente</button >
            
            <br></br>
            <br></br>
            <hr></hr>
            <p>Nombre: <input type="text" value={this.state.nombre} disabled={this.state.isButtonPressed}  /></p>
            <p>Apellido: <input type="text" value={this.state.apellido} disabled={this.state.isButtonPressed} /></p>    <p>Tipo Documento: <input type="text" value={this.state.tipoDoc} disabled={this.state.isButtonPressed} /></p>    
            <p>Número Documento: <input type="int" value={this.state.nroDoc} disabled={this.state.isButtonPressed} /></p>    
            <p>Fecha de nacimiento: <input type="text" value={this.state.fechaNacimiento} disabled={this.state.isButtonPressed} /></p>   
            <p>Fecha de alta: <input type="text" value={this.state.fechaAlta} disabled={this.state.isButtonPressed} /></p>     
            <p>Sexo: <input type="text" value={this.state.sexo} disabled={this.state.isButtonPressed} /></p>    
            <p>Nacionalidad: <input type="text" value={this.state.nacionalidad} disabled={this.state.isButtonPressed}/></p>    
            <p>Teléfono: <input type="int" value={this.state.telefono} disabled={this.state.isButtonPressed} /></p>    
            <p>Mail: <input type="text" value={this.state.mail} disabled={this.state.isButtonPressed}/></p>    
            <p>Obra Social: <input type="text" value={this.state.obraSocial} disabled={this.state.isButtonPressed} /></p>    

            <p><input type="submit" /></p>
        </form>  
      </div>
    );
  }
 
  procesar(e) {
    e.preventDefault();
    this.setState({
      isButtonPressed:false,
      nombre: this.state.paciente.nombre,
      apellido: this.state.paciente.apellido,
      tipoDoc: this.state.paciente.tipoDocumento.nombre,
      nroDoc: this.state.paciente.nroDocumento,
      fechaNacimiento: this.state.paciente.fechaNacimiento,
      fechaAlta: this.state.paciente.fechaAlta,
      sexo: this.state.paciente.sexo,
      nacionalidad: this.state.paciente.nacionalidad.nombreBonito,
      telefono: this.state.paciente.telefono,
      mail: this.state.paciente.mail,
      obraSocial: this.state.paciente.obraSocial,

    })
    alert('Se encontró al paciente: '+this.state.paciente.nombre + ' ' + this.state.paciente.apellido);
  }

  cambioBusquedaId(e) {
    this.setState( {
      isRadioSelected: false
    })
  } 

  cambioBusquedaDoc(e) {
    this.setState( {
      isRadioSelected: false
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