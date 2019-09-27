import React, { Component } from 'react';
import axios from 'axios'
import { Button, Header, Form, Icon, Container } from 'semantic-ui-react'
import {Link} from 'react-router-dom';

import MenuOpciones from '../MenuOpciones';
import { emptyToNull, titleCase, hasNumbers, validMail } from './../../Services/MetodosDeValidacion';
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

        errorRazonSocial: '',
        errorCuit: '',
        errorTelefono: '',
        errorMail: '',
        errorValorUb:'',

      });
      this.nuevaObraSocial = this.nuevaObraSocial.bind(this);
      this.cambioRazonSocial = this.cambioRazonSocial.bind(this);
      this.cambioTelefono = this.cambioTelefono.bind(this);
      this.cambioMail = this.cambioMail.bind(this);
      this.cambioCuit = this.cambioCuit.bind(this);
      this.cambioValorUb = this.cambioValorUb.bind(this);

      this.handleBlurRazonSocial = this.handleBlurRazonSocial.bind(this);
      this.handleBlurCuit = this.handleBlurCuit.bind(this);
      this.handleBlurTelefono = this.handleBlurTelefono.bind(this);
      this.handleBlurMail = this.handleBlurMail.bind(this);
      this.handleBlurValorUb = this.handleBlurValorUb.bind(this);
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

        <Form onSubmit={this.nuevaObraSocial}>

          <Form.Field required label='Razón Social' control='input' 
          placeholder='Razón Social' value={this.state.razonSocial} onChange={this.cambioRazonSocial} className= {(this.state.errorRazonSocial=== '' || this.state.errorRazonSocial === true) ? null : 'error'} onBlur={this.handleBlurRazonSocial}/>
          
          <Form.Field label='Cuit' maxLength={11} control='input'
          placeholder='Cuit' value={this.state.cuit} onChange={this.cambioCuit} className= {(this.state.errorCuit === '' || this.state.errorCuit === true) ? null : 'error'} onBlur={this.handleBlurCuit}/>

          <Form.Field label='Telefono' control='input' placeholder='Teléfono' value={this.state.telefono} onChange={this.cambioTelefono} className= {(this.state.errorTelefono === '' || this.state.errorTelefono === true) ? null : 'error'} onBlur={this.handleBlurTelefono}/>

          <Form.Field label='E-Mail' control='input' placeholder='E-Mail' value={this.state.mail} onChange={this.cambioMail} className= {(this.state.errorMail=== '' || this.state.errorMail === true) ? null : 'error'} onBlur={this.handleBlurMail}/>

          <Form.Field label='Valor Unidad Bioquimica' control='input' placeholder='Valor' value={this.state.valorUb} onChange={this.cambioValorUb} className={(this.state.errorValorUb===''|| this.state.errorValorUb === true) ? null : 'error'} onBlur={this.handleBlurValorUb}/>

          <Button primary type="submit" onClick={this.nuevaObraSocial} className="boton"> Registrar Obra Social</Button >

        </Form>  
      </div>

    );
  }
  
  handleUpdateClick = (api) => {
    this.handleBlurRazonSocial(); 
    this.handleBlurCuit(); 
    this.handleBlurTelefono(); 
    this.handleBlurMail();
    this.handleBlurValorUb();

    const { errorRazonSocial, errorCuit, errorTelefono, errorMail, errorValorUb } = this.state;

    if( errorRazonSocial && errorCuit && errorTelefono && errorMail && errorValorUb) {
      var data = {
        "razonSocial": titleCase(this.state.razonSocial),
        "cuit": this.state.cuit,
        "telefono": emptyToNull(this.state.telefono),
        "email": emptyToNull(this.state.mail.toLowerCase()),
        "valorUb": emptyToNull(this.state.valorUb),
        "bitActivo": true
      };

    axios.post(api, data).then((response) => {
        alert('Se registro la obra social ' + titleCase(this.state.razonSocial) + ' con éxito.'); 
        this.vaciadoCampos();
      }, (error) => {
          alert('No se ha podido registrar la obra social.');
        })
    } else{
      alert ('Revise los datos ingresados.')
    }
    
  }

  nuevaObraSocial(e){
    e.preventDefault();
    const { errorRazonSocial, errorCuit, errorMail, errorTelefono, errorValorUb  } = this.state;
    
    this.handleBlurRazonSocial();
    this.handleBlurCuit();
    this.handleBlurMail();
    this.handleBlurTelefono();
    this.handleBlurValorUb();

    if ( errorRazonSocial && errorCuit && errorMail && errorTelefono  && errorValorUb) {
      const api = '/obras_sociales/add';
      this.handleUpdateClick(api);
    } else {
      alert("Revise los datos ingresados.")
    }    
  }

  vaciadoCampos(){
    this.setState( {
      razonSocial: '',
      cuit: '',
      telefono:'',
      mail:'',
      errorRazonSocial: '',
      errorCuit: '',
      errorTelefono: '',
      errorMail: '',
      errorValorUb: '',
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
  handleBlurRazonSocial = () => {
    if (this.state.razonSocial === ''  || this.state.razonSocial.length === 0 ||  hasNumbers(this.state.razonSocial)){
      this.setState({ errorRazonSocial: false })
    } else {
      this.setState({errorRazonSocial: true})
    }
  }

  handleBlurCuit = () => {
    if (this.state.cuit === '') {
      this.setState({ errorCuit: false})
    } else if(isFinite(String(this.state.cuit))){
      this.setState({ errorCuit: true})
    } else{
      this.setState({ errorCuit: false})
    }
  }

  handleBlurTelefono = () => {
    if (this.state.telefono === ''){
      this.setState({ errorTelefono: true })
    } else if (isFinite(String(this.state.telefono))){
      this.setState({ errorTelefono: true })
    } else {
      this.setState({
        errorTelefono: false
      })
    }
  }

  handleBlurMail = ( ) => {
    if(this.state.mail === ''){
      this.setState({
        errorMail: true,
      })
    } else if ( validMail.test(this.state.mail) ) {
        this.setState({
          errorMail: true,
        })
    } else {
      this.setState({
        errorMail: false,
      })
    } 
  }

  handleBlurValorUb = () => {
    if (this.state.valorUb.length === 0) {
      this.setState({ errorValorUb: false})
    } else if(isFinite(String(this.state.valorUb))){
      this.setState({ errorValorUb: true})
    } else{
      this.setState({ errorValorUb: false})
    }
  }



  render() {
    return (
      <div className='union'>
        <MenuOpciones/>
        <div className="FormAlta">
          {this.renderForm()}
        </div>
      </div>
    );
  }

}


export default AltaObraSocial;