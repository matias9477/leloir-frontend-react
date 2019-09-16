import React, { Component } from 'react';
import { Button, Header, Form, Icon, Container } from 'semantic-ui-react'
import './../styles.css';
import MenuLateral from '../MenuLateral';
import { validateRazonSocial  } from '../../Services/MetodosPaciente';
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
        
        errorNombre: true,
        
      })
    this.cambioId = this.cambioId.bind(this);
    this.cambioRazonSocial = this.cambioRazonSocial.bind(this);
    this.cambioTelefono = this.cambioTelefono.bind(this);
    this.cambioMail = this.cambioMail.bind(this);
    this.cambioCuit = this.cambioCuit.bind(this);
  }

  componentWillMount() {
    const api = "/obras_sociales/id/" + this.props.match.params.id ;
    this.handleUpdateClick(api);
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

          <Form.Field required label='Razon Social' control='input' disabled={this.state.modificacion}  value={this.state.razonSocial} onChange={this.cambioRazonSocial} className= {this.state.errorNombre ? null : 'error'}/>

          <Form.Field required label='Cuit' control='input' disabled={this.state.modificacion}  value={this.state.cuit} onChange={this.cambioCuit}/>
        
          <Form.Field  label='Telefono' control='input' disabled={this.state.modificacion} value={this.state.telefono || ''} onChange={this.cambioTelefono}/>

          <Form.Field  label='Mail' control='input' disabled={this.state.modificacion} value={this.state.mail || ''} onChange={this.cambioMail}/>


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
            this.cancelar(e)} }> X </Button> : null }     
                   
      </Form>  
    </div>
    );
  }

  alta(e){
    fetch(`/obras_sociales/switch-alta/${this.props.match.params.id}`, {
        method: 'PUT', 
        headers:{
        'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
          alert("Se ha dado de alta la obra social con éxito.");
          this.setState({estado: true})
         
          const api = "/obras_sociales/id/" + this.props.match.params.id ;
          this.handleUpdateClick(api);
          
          return response.text();
        } else {
          if(this.state.estado) {
              alert(`No se ha podido dar de alta la obra social ${this.state.razonSocial}. Intentelo nuevamente.`)
            }
            return Promise.reject({status: response.status, statusText: response.statusText});
        }
        });
  
  }

  cancelar(e){
    e.preventDefault();
    this.setState({
      modificacion: true,
      cambios: false,
      errorNombre: true,
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
    var data;
    const { razonSocial } = this.state;
    const errorNombre = validateRazonSocial(razonSocial);

    if ( errorNombre ) {
        data = {
          "razonSocial": this.state.razonSocial,
          "idObraSocial": this.state.id,
          "mail": this.state.mail,
          "telefono": this.state.telefono,
          "cuit": this.state.cuit,
          "bitActivo": true,
        }
      
      const urlModificar = "/obras_sociales/modificar/" + this.state.id;
     
      fetch(urlModificar, {
        method: 'PUT', 
        body: JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        }
        }).then(response => {
          if (response.ok) {
            alert('Se ha modificado la obra social con éxito.');
            return response.text();
          } else {
            alert('No se ha podido modificar la obra social.');
            const api = "/obras_sociales/id/" + this.props.match.params.id ;
            this.handleUpdateClick(api);
            return Promise.reject({status: response.status, statusText: response.statusText});
          }
        });
  
        this.setState({
          modificacion: true,
          cancelar: true,
          cambios: false,
          errorNombre: true,
        })
      
    } else {
      alert("Revise los datos ingresados.")
      this.setState ({ 
        errorNombre
      })
    }    

  }
  
    
  handleUpdateClick = (api) => {
    fetch(api).then ( resolve => {
      if(resolve.ok) { 
        return resolve.json();
      } else {
        throw Error(resolve.statusText);
      }
    }).then(obraSocial => {
      this.setState({
        id: obraSocial.idObraSocial,
        razonSocial: obraSocial.razonSocial,
        telefono: obraSocial.telefono,
        mail: obraSocial.mail,
        cuit: obraSocial.cuit,    
        isbottonPressed: false,
        estado: obraSocial.bitActivo,
      })
    }).catch(function(error) {
      alert('No se encontró la obra social. Revise la información e intente nuevamente.'); 
  });
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
        <MenuLateral/>
        <div className="FormAlta">
          {this.renderForm()}
        </div>
      
      
      </div>
    );
  }

}

export default ConsultaObraSocial;