import React from "react";
import PropTypes from 'prop-types';
import './index.css';

export default class Form extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    dniType: "",
    dni: "",
    birth:"",
    registrationDate: "",
    sex:"",
    phone:"",
    email: "",
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
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      dni: PropTypes.number.isRequired,
      phone: PropTypes.number.isRequired,
      email: PropTypes.string.isRequired,
    }

    this.setState({
      firstName: "",
      lastName: "",
      dni: "",
      dniType: "",
      birth:"",
      registrationDate:"",
      sex:"",
      phone:"",
      email: "",
    });
    this.props.onChange({
      firstName: "",
      lastName: "",
      dni: "",
      dniType: "",
      birth:"",
      registrationDate:"",
      sex:"",
      phone:"",
      email: "",
    });
  };

  render() {
    return (
      <form className="formulario">
        <div className="Paciente"> Nuevo paciente </div>
        <label> {"Nombre:   "}</label>  
          <input 
            name="firstName"
            placeholder="Ingrese nombre..."
            value={this.state.firstName}
            onChange={e => this.change(e)}
          /> 
        <br />
        <label>{"Apellido:  "}</label>
          <input
            name="lastName"
            placeholder="Ingrese apellido..."
            value={this.state.lastName}
            onChange={e => this.change(e)}
          />
        <br />
        <label>{"Tipo Dni: "}</label>
        <input
          name="dniType"
          placeholder="Tipo Dni"
          value={this.state.dniType}
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
          name="birth"
          placeholder="Fecha de nacimiento"
          value={this.state.birth}
          onChange={e => this.change(e)}
        />
        <br />
        <label>{"Fecha alta: "}</label>
        <input
          name="registrationDate"
          placeholder="Fecha Alta"
          value={this.state.registrationDate}
          onChange={e => this.change(e)}
        />
        <br /> 
        <label>{"Sexo: "}</label>
        <input
          name="sex"
          placeholder="Sexo"
          value={this.state.sex}
          onChange={e => this.change(e)}
        />
        <br />
        <label>{"Teléfono: "}</label>
        <input
          name="phone"
          placeholder="Ingrese teléfono..."
          value={this.state.phone}
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
        <button className="boton" onClick={e => this.onSubmit(e)}>Registrar</button>
      </form>
    );
  }
}

