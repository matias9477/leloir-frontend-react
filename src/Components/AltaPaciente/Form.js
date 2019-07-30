import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns/esm';
import './styles.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = ({
        nombre: '',
        apellido:'',
        tipoDoc:'',
        nroDoc:'',
        fechaNacimiento: new Date(),
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
        <form className="Form">
            <p>Nombre: <input type="text" value={this.state.nombre} onChange={this.cambioNombre} /></p>
            <p>Apellido: <input type="text" value={this.state.apellido} onChange={this.cambioApellido} /></p>    
            <p>Tipo Documento: <input type="text" value={this.state.tipoDoc} onChange={this.cambioTipoDoc} /></p>    
            <p>Número Documento: <input type="text" value={this.state.nroDoc} onChange={this.cambioNroDoc} /></p>         
                        
            Sexo: <select className="selectSexo" value={this.state.sexo} onChange={this.cambioSexo} >
              <option value="Masculino"> Masculino </option>
              <option value="Femenino"> Femenino </option>
            </select>

            <p>Nacionalidad: <input type="text" value={this.state.nacionalidad} onChange={this.cambioNacionalidad} /></p>    

            Fecha de nacimiento:  <DatePicker 
            selected={this.state.fechaNacimiento}  onChange={this.cambioFechaNacimiento} 
            peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" maxDate={addDays(new Date(), 0)} placeholderText="Ingrese fecha nac" ></DatePicker> 

            <p>Teléfono: <input type="text" value={this.state.telefono} onChange={this.cambioTelefono} /></p>    
            <p>Mail: <input type="text" value={this.state.mail} onChange={this.cambioMail}/></p>    
            <p>Obra Social: <input type="text" value={this.state.obraSocial} onChange={this.cambioObraSocial}/></p>    
            <br></br>
            <button type="submit" onClick={this.fetchPaciente} className="boton"> Registrar Paciente</button >
            <br></br>          
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
      "nombre": "Documento Nacional de Identidad"
    },
    "fechaNacimiento": this.getFechaNacimiento(),
    "fechaAlta": this.getCurrentDate(),
    "sexo": this.getBooleanSex(this.state.sexo),
    "nacionalidad": {
      "idPais": 43,
      "iso": "CL",
      "nombre": "CHILE",
      "nombreBonito": "Chile",
      "iso3": "CHL",
      "codigoTelefono": 56
    },
    "telefono": this.state.telefono,
    "mail": this.state.mail,
    "obraSocial": 1,
    "historial": null,
    "bitAlta": true
};

fetch(url, {
  method: 'POST', 
  body: JSON.stringify(data),
  headers:{
    'Content-Type': 'application/json'
  }
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', alert('Se registro el paciente ' + this.state.nombre +' ' + this.state.apellido+ ' con éxito')));
}

  fetchPaciente(e){
    e.preventDefault();
    const api = "localhost:8080/pacientes/add";
    this.handleUpdateClick(api);
    console.log(this.state.sexo)
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
  return year + '-' + month + '-' + date + 'T00:00:00.000+0000';
}

getFechaNacimiento(){
  var año = this.state.fechaNacimiento.getFullYear();
  var mes = (this.state.fechaNacimiento.getMonth()+1);
  var dia = this.state.fechaNacimiento.getDate();
  if (mes < 10){
    mes = "0" + mes;
  } 
  return año + "-" + mes + "-" + dia + "T00:00:00.000+0000";
}

}

export default Form;