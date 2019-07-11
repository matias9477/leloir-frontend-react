import React from "react";
import PropTypes from 'prop-types';
import './styles.css';

export default class Form extends React.Component {
  state = {
    nombre: "",
    apellido: "",
    tipoDni: "",
    dni: "",
    fechaNacimiento:"",
    sexo:"",
    nacionalidad:"",
    telefono:"",
    email: "",
    obraSocial:"",
  };

  change = e => {
    this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
   
    e.preventDefault();
    // this.props.onSubmit(this.state);

    Form.propTypes = {
      nombre: PropTypes.string.isRequired,
      apellido: PropTypes.string.isRequired,
      dni: PropTypes.number.isRequired,
      telefono: PropTypes.number.isRequired,
      email: PropTypes.string.isRequired,
    }

    this.setState({
      nombre: "",
      apellido: "",
      dni: "",
      tipoDni: "",
      fechaNacimiento:"",
      sexo:"",
      nacionalidad:"",
      telefono:"",
      email: "",
      obraSocial:"",
    });
    this.props.onChange({
      nombre: "",
      apellido: "",
      dni: "",
      tipoDni: "",
      fechaNacimiento:"",
      sexo:"",
      nacionalidad:"",
      telefono:"",
      email: "",
      obraSocial:"",
    });
  };

  render() {
    return (
      <form className="formulario">
        <div className="Paciente"> Nuevo paciente </div>
        <label className="nombrePaciente"> {"Nombre:   "}</label>  
          <input 
            name="nombre"
            placeholder="Ingrese nombre..."
            value={this.state.nombre}
            onChange={e => this.change(e)}
          /> 
        <br />
        <label>{"Apellido:  "}</label>
          <input
            name="apellido"
            placeholder="Ingrese apellido..."
            value={this.state.apellido}
            onChange={e => this.change(e)}
          />
        <br />
        <label>{"Tipo Dni: "}</label>
        <input
          name="tipoDni"
          placeholder="Tipo Dni"
          value={this.state.tipoDni}
          onChange={e => this.change(e)}
        />
        <br />
        <label>{"Dni:  "}</label>
        <input
          name="dni"
          placeholder="Ingrese número Dni..."
          value={this.state.dni}
          onChange={e => this.change(e)}
        />
        <br />
        <label>{"Fecha de nacimiento: "}</label>
        <input
          name="fechaNacimiento"
          placeholder="Fecha de nacimiento"
          value={this.state.fechaNacimiento}
          onChange={e => this.change(e)}
        />
        <br /> 
        <label>{"Sexo: "}</label>
        <input
          name="sexo"
          placeholder="sexo"
          value={this.state.sexo}
          onChange={e => this.change(e)}
        />
        <br /> 
        <label>{"Nacionalidad: "}</label>
        <input
          name="nacionalidad"
          placeholder="Ingrese nacionalidad..."
          value={this.state.nacionalidad}
          onChange={e => this.change(e)}
        />
        <br />
        <label>{"Teléfono: "}</label>
        <input
          name="telefono"
          placeholder="Ingrese teléfono..."
          value={this.state.telefono}
          onChange={e => this.change(e)}
        />
        <br />
        <label>{"Email: "}</label>
        <input
          name="email"
          placeholder="Ingrese mail..."
          value={this.state.email}
          onChange={e => this.change(e)}
        />
        <br />
        <label>{"Obra social: "}</label>
        <input
          name="obraSocial"
          placeholder="Ingrese obra social..."
          value={this.state.obraSocial}
          onChange={e => this.change(e)}
        />
        <br />
        <button className="boton" onClick={e => this.onSubmit(e)}>Registrar</button>
      </form>
    );
  }
}

