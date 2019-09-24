import React, { Component } from 'react';
import axios from 'axios';
import { Button, Header, Form, Icon, Container } from 'semantic-ui-react'
import './../styles.css';
import MenuOpciones from '../MenuOpciones';
import { titleCase, hasNumbers, validMail, emptyToNull  } from '../../Services/MetodosDeValidacion';
import {Link} from 'react-router-dom';


class ConsultaObraSocial extends Component {
  constructor(props) {
    super(props);
    this.state = ({        
        isbottonPressed:true,
        modificacion: true,
        cancelar: true,
        valor:true,

        cambios: false,

        id:'',
        razonSocial: '',
        telefono:'',
        mail:'',
        cuit:'',
        
        errorRazonSocial: '',
        errorCuit: '',
        errorTelefono: '',
        errorMail: '',
        
      })
    this.cambioId = this.cambioId.bind(this);
    this.cambioRazonSocial = this.cambioRazonSocial.bind(this);
    this.cambioTelefono = this.cambioTelefono.bind(this);
    this.cambioMail = this.cambioMail.bind(this);
    this.cambioCuit = this.cambioCuit.bind(this);

    this.handleBlurRazonSocial = this.handleBlurRazonSocial.bind(this);
    this.handleBlurCuit = this.handleBlurCuit.bind(this);
    this.handleBlurTelefono = this.handleBlurTelefono.bind(this);
    this.handleBlurMail = this.handleBlurMail.bind(this);
  }

  componentDidMount() {
    const api = "/obras_sociales/id/" + this.props.match.params.id;
    this.handleUpdateClick(api);
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
    if (this.state.telefono === '' || this.state.telefono === null){
      this.setState({ errorTelefono: true })
    } else if (isFinite(String(this.state.telefono))){
      this.setState({ errorTelefono: true })
    } else {
      this.setState({errorTelefono: false })
    }
  }

  handleBlurMail = ( ) => {
    if(this.state.mail === '' || this.state.mail === null){
      this.setState({errorMail: true})
    } else if ( validMail.test(this.state.mail) ) {
        this.setState({ errorMail: true })
    } else {
      this.setState({errorMail: false })
    } 
  }


  renderForm() {
    return (
      <div className='Formularios'>
        <Container className='btnHeader'>
          <Button className='boton' as= {Link} to='/obras_sociales' floated='left' icon labelPosition='left' primary size='small'>
            <Icon name='arrow alternate circle left' /> Volver
          </Button>
          <br></br>
          <Header as='h3' dividing>Búsqueda y modificación</Header>
        </Container>

      <Form>
          
          <Form.Field required label='Id' control='input' disabled={true}  value={this.state.id} onChange={this.cambioId} />

          <Form.Field required label='Razon Social' control='input' disabled={this.state.modificacion}  value={this.state.razonSocial} onChange={this.cambioRazonSocial} className= {(this.state.errorRazonSocial=== '' || this.state.errorRazonSocial === true) ? null : 'error'} onBlur={this.handleBlurRazonSocial}/>

          <Form.Field required label='Cuit' maxLength={11} control='input' disabled={this.state.modificacion}  value={this.state.cuit} onChange={this.cambioCuit} className= {(this.state.errorCuit === '' || this.state.errorCuit === true) ? null : 'error'} onBlur={this.handleBlurCuit}/>
        
          <Form.Field  label='Telefono' control='input' disabled={this.state.modificacion} value={this.state.telefono || ''} onChange={this.cambioTelefono} className= {(this.state.errorTelefono === '' || this.state.errorTelefono === true) ? null : 'error'} onBlur={this.handleBlurTelefono}/>

          <Form.Field  label='Mail' control='input' disabled={this.state.modificacion} value={this.state.mail || ''} onChange={this.cambioMail} className= {(this.state.errorMail=== '' || this.state.errorMail === true) ? null : 'error'} onBlur={this.handleBlurMail}/>


          {( !this.state.isbottonPressed && this.state.modificacion && this.state.estado) ? <Button disabled={this.state.isbottonPressed} onClick={(e) => { 
              this.habilitarModificacion(e)} }>Modificar</Button>  : null}

          {(!this.state.estado) ? <Button onClick={(e) => { 
            if (window.confirm('¿Esta seguro que quiere dar de alta la obra social ' + this.state.razonSocial + '?')) {  
              this.alta(e)
              } else {e.preventDefault()}} }>Dar de Alta</Button> : null}
            
          {(!this.state.modificacion) ? <Button disabled={this.state.isbottonPressed}  onClick={(e) => { 
            if (window.confirm('¿Esta seguro que quiere modificar la obra social ' + this.state.razonSocial + '?')) {  
              this.modificarObraSocial(e)
              } else {e.preventDefault()} } }>
            Aceptar
          </Button> : null}           

          {(!this.state.modificacion) ? <Button disabled={this.state.cancelar} onClick={(e) => { 
            this.cancelar(e)}}>
              <Icon name={'cancel'} color='red'/>
          </Button>: null }     
                   
      </Form>  
    </div>
    );
  }

  alta(e){
    axios.put(`/obras_sociales/switch-alta/${this.props.match.params.id}`).then(response => {
      alert("Se ha dado de alta la orbra social con éxito.");
        this.setState({estado: true})
        
        const api = "/obras_sociales/id/" + this.props.match.params.id ;
        this.handleUpdateClick(api);
      }, (error) => {
          if(this.state.bitAlta) {
              alert(`No se ha podido dar de alta la obra social ${this.state.razonSocial}. Intentelo nuevamente.`)
            }
      })
  
  }

  cancelar(e){
    e.preventDefault();
    this.setState({
      modificacion: true,
      cambios: false,
      errorRazonSocial: '',
      errorCuit: '',
      errorMail: '',
      errorTelefono: '',
    })
    if (this.state.cambios){
      const api = "/obras_sociales/id/" + this.props.match.params.id ;
      this.handleUpdateClick(api);
    }
  }

  habilitarModificacion(e){
    e.preventDefault();
    this.setState ({
      modificacion: false,
      cancelar: false,
    })
  }
  
  modificarObraSocial = (e) => {
    e.preventDefault();

    this.handleBlurRazonSocial();
    this.handleBlurCuit();
    this.handleBlurMail();
    this.handleBlurTelefono();
    
    const { errorRazonSocial, errorCuit, errorMail, errorTelefono  } = this.state;

    var data;
    if ( errorRazonSocial && errorCuit && errorMail && errorTelefono ) {
        data = {
          "razonSocial": titleCase(this.state.razonSocial),
          "idObraSocial": this.state.id,
          "email": emptyToNull(this.state.mail),
          "telefono": emptyToNull(this.state.telefono),
          "cuit": this.state.cuit,
          "bitActivo": true,
        }
      
      const urlModificar = "/obras_sociales/modificar/" + this.state.id;
     
      axios.put(urlModificar, data).then(response => {
        alert('Se ha modificado la obra social con éxito.');
      }, (error) => {
          alert('No se ha podido modificar la obra social.');
          const api = "/obras_sociales/id/" + this.props.match.params.id ;
          this.handleUpdateClick(api);
      })
  
      this.setState({
        modificacion: true,
        cancelar: true,
        cambios: false,
      })
      
    } else {
      alert("Revise los datos ingresados.")
    }    

  }
  
    
  handleUpdateClick = (api) => {
    axios.get(api).then(obraSocial => {
      this.setState({
        id: obraSocial.data.idObraSocial,
        razonSocial: obraSocial.data.razonSocial,
        telefono: obraSocial.data.telefono,
        mail: obraSocial.data.email,
        cuit: obraSocial.data.cuit,    
        isbottonPressed: false,
        estado: obraSocial.data.bitActivo,
        errorRazonSocial: true,
        errorCuit: true,
        errorTelefono: true,
        errorMail: true,
      });
    }, (error) => {
        alert('No se encontró la obra social. Revise la información e intente nuevamente.'); 
        console.log('Error fetch obra social: ', error.message);
    })

  }
  
  cambioId(e) {
    this.setState( {
      id: e.target.value,
      valor:false,
    })
  }

  cambioRazonSocial(e) {
    this.setState( {
      razonSocial: e.target.value,
      cambios: true,
    })
  }

  cambioTelefono(e){
    this.setState( {
        telefono: e.target.value,
        cambios: true,
    })
  }

  cambioMail(e){
      this.setState( {
          mail: e.target.value,
          cambios: true,
      })
  }

  cambioCuit(e){
      this.setState( {
          cuit: e.target.value,
          cambios: true,
      })
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

export default ConsultaObraSocial;