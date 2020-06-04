import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Header, Form, Icon, Container } from 'semantic-ui-react'
import { emptyToNull, titleCase, validateNombre, validateOnlyNumbers, validateMail} from './../../Services/MetodosDeValidacion';
import { addObraSocialAction } from '../../Redux/obrasSocialesDuck';
import NavBar from '../NavBar/NavBar'
import './../styles.css';

class AltaObraSocial extends Component {
  constructor(props) {
    super(props);
    this.state = ({
        razonSocial: '',
        telefono:'',
        mail:'',
        cuit: '',
        valorUb: '',

        errorRazonSocial: true,
        errorCuit: true,
        errorTelefono: true,
        errorMail: true,
        errorValorUb: true,

      });
      this.nuevaObraSocial = this.nuevaObraSocial.bind(this);
      this.cambioRazonSocial = this.cambioRazonSocial.bind(this);
      this.cambioTelefono = this.cambioTelefono.bind(this);
      this.cambioMail = this.cambioMail.bind(this);
      this.cambioCuit = this.cambioCuit.bind(this);
      this.cambioValorUb = this.cambioValorUb.bind(this);

  }
  

  renderForm(){
    return (
      <div className='Formularios'>
        <Container className='btnHeader'>
          <Button className='boton' as= {Link} to='/obras_sociales' exact='true' floated='left' icon labelPosition='left' primary size='small'>
            <Icon name='arrow alternate circle left' /> Volver
          </Button>

          <Header as='h3' dividing>Registrar nueva Obra Social</Header>
        </Container>

        <Form onSubmit={this.nuevaObraSocial} className='altasYConsultas'>

          <Form.Field required label='Razón Social' control='input' 
          placeholder='Razón Social'
          value={this.state.razonSocial}
          onChange={this.cambioRazonSocial}
          className= {this.state.errorRazonSocial === true ? null : 'error'}
          />
          
          <Form.Field label='Cuit' maxLength={11} control='input'
          placeholder='Cuit'
          value={this.state.cuit}
          onChange={this.cambioCuit}
          className= {this.state.errorCuit === true ? null : 'error'}
          />

          <Form.Group widths='equal'>
            <Form.Field label='Telefono' control='input'
            placeholder='Teléfono'
            value={this.state.telefono}
            onChange={this.cambioTelefono}
            className= {this.state.errorTelefono === true ? null : 'error'}
            />

          <Form.Field label='E-Mail' control='input'
                      placeholder='E-Mail'
                      value={this.state.mail}
                      onChange={this.cambioMail}
                      className= {this.state.errorMail===  true ? null : 'error'}
          />

          <Form.Field label='Valor Unidad Bioquimica' control='input'
                      placeholder='Valor' value={this.state.valorUb}
                      onChange={this.cambioValorUb}
                      className={this.state.errorValorUb=== true ? null : 'error'}
          />
          </Form.Group>

          <br/>

          <Button primary type="submit" onClick={this.nuevaObraSocial} className="boton"> Registrar Obra Social</Button >

        </Form>  
      </div>

    );
  }
  
  handleUpdateClick = (api) => {
    var data = {
      "razonSocial": titleCase(this.state.razonSocial),
      "cuit": this.state.cuit,
      "telefono": emptyToNull(this.state.telefono),
      "email": emptyToNull(this.state.mail.toLowerCase()),
      "valorUb":emptyToNull(this.state.valorUb),
      "bitActivo": true
    };

      this.props.addObraSocialAction(data)
      //TODO: aca vaciaba si salia todo bien, si no te lo dejaba vofi como se hace ahora jeje saludos a la flia xdxdxdxd
      this.vaciadoCampos()
  };

  nuevaObraSocial(e){
    e.preventDefault();
    
    const { razonSocial, cuit, telefono, mail, valorUb } = this.state;

    const errorRazonSocial = validateNombre(razonSocial);
    const errorCuit = validateOnlyNumbers(cuit);
    const errorTelefono = validateOnlyNumbers(telefono);
    const errorMail = validateMail(mail);
    const errorValorUb = validateOnlyNumbers(valorUb);

    if ( errorRazonSocial && errorCuit && errorMail && errorTelefono  && errorValorUb) {
      const api = '/obras_sociales/add';
      this.handleUpdateClick(api);
    } else {
      alert("Revise los datos ingresados.");
      this.setState({
        errorRazonSocial,
        errorCuit,
        errorTelefono,
        errorMail,
        errorValorUb,
      })
    }    
  }

  vaciadoCampos(){
    this.setState( {
      razonSocial: '',
      cuit: '',
      telefono:'',
      mail:'',
      valorUb:'',
      errorRazonSocial: true,
      errorCuit: true,
      errorTelefono: true,
      errorMail: true,
      errorValorUb: true,
    })
  }
 
  cambioRazonSocial(e) {
    this.setState( {
      razonSocial: e.target.value
    })
  }

  cambioCuit(e) {
    this.setState( {
      cuit: e.target.value
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

  cambioValorUb(e) {
    this.setState( {
      valorUb: e.target.value
    })
  }

  render() {
    return (
      <div className='union'>
        <NavBar/>
        <div className="FormAlta">
          {this.renderForm()}
        </div>
      </div>
    );
  }

}

const mapStateToProps = state =>({
  fetching: state.obrasSociales.fetching,
})


export default connect(mapStateToProps,{addObraSocialAction})(AltaObraSocial);