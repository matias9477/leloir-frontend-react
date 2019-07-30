import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';
import './styles.css';

class Form extends Component {
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
        obraSocial:'',
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
  
  render() {
    return (
      <div>
        <div className="Registrar">Registrar paciente</div>
        <form onSubmit={this.fetchPaciente} className="Form">
            <p>Nombre: <input type="text" value={this.state.nombre} onChange={this.cambioNombre} /></p>
            <p>Apellido: <input type="text" value={this.state.apellido} onChange={this.cambioApellido} /></p>    
            Tipo Documento: <select className="combos" value={this.state.tipoDoc} onChange={this.cambioTipoDoc} >
              <option value={null}>  </option>
              <option value="Documento Nacional de Identidad"> Documento Nacional de Identidad </option>
              <option value="Pasaporte" > Pasaporte </option>
            </select>     
            <p>Número Documento: <input type="text" value={this.state.nroDoc} onChange={this.cambioNroDoc} /></p>         
                        
            Sexo: <select className="combos" value={this.state.sexo} onChange={this.cambioSexo} >
              <option value={null}>  </option>
              <option value="Femenino"> Femenino </option>
              <option value="Masculino"> Masculino </option>
            </select>
            <p></p>
            Nacionalidad: <select className="combos" value={this.state.nacionalidad} onChange={this.cambioNacionalidad} >
            <option value={null}>  </option>
              <option value="Argentina"> Argentina </option>
              <option value="Chile"> Chile </option>
            </select>    
            <p></p>
            Fecha de nacimiento:  <DatePicker
            selected={this.state.fechaNacimiento} onChange={this.cambioFechaNacimiento} 
            peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" maxDate={addDays(new Date(), 0)} dateFormat="yyyy-MM-dd"></DatePicker> 

            <p>Teléfono: <input type="text" value={this.state.telefono} onChange={this.cambioTelefono} /></p>    
            <p>Mail: <input type="text" value={this.state.mail} onChange={this.cambioMail}/></p>    
            Obra Social: <select className="combos" value={this.state.obraSocial} onChange={this.cambioObraSocial} >
              <option value="">  </option>
              <option value=" "> No posee </option>
              <option value="1"> Medife </option>
              <option value="2"> Osde </option>
            </select>
            <br></br>
            <button type="submit" onClick={this.fetchPaciente} className="boton"> Registrar Paciente</button >       
        </form>  
      </div>
    );
  }
  
handleUpdateClick = (api) => {
  var url = 'http://localhost:8080/pacientes/add';
  var data = {
    "nombre": this.state.nombre,
    "apellido": this.state.apellido,
    "nroDocumento": this.state.nroDoc,
    "tipoDocumento": {
      "idTipoDocumento": 1,
      "nombre": this.state.tipoDoc
    },
    "fechaNacimiento": this.getFechaNacimiento(),
    "fechaAlta": this.getCurrentDate(),
    "sexo": this.getBooleanSex(this.state.sexo),
    "nacionalidad": {
      "idPais": 10,
      "iso": "AR",
      "nombre": "ARGENTINA",
      "nombreBonito": this.state.nacionalidad,
      "iso3": "ARG",
      "codigoTelefono": 54
    },
    "telefono": this.state.telefono,
    "mail": this.state.mail,
    "obraSocial": this.state.obraSocial,
    "historial": null,
    "bitAlta": true
};

fetch(url, {
  method: 'POST', 
  body: JSON.stringify(data),
  headers:{
    'Content-Type': 'application/json'
  }
  }).then(response => response.text())
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', data, alert('Se registro el paciente ' + this.state.nombre +' ' + this.state.apellido + ' con éxito')));
}

  fetchPaciente(e){
    e.preventDefault();
    const api = "localhost:8080/pacientes/add";
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

}

export default Form;