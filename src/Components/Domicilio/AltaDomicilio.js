import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Header, Form, Icon, Container } from 'semantic-ui-react'
import { addDomicilioAction } from '../../Redux/domiciliosDuck';
import NavBar from '../NavBar/NavBar';
import './../styles.css';

class AltaDomicilio extends Component {
  constructor(props) {
    super(props);
    this.state = ({
        direccion: '',
        descripcion:'',

        errorDireccion: true,
        errorDescripcion: true,

      });
      this.nuevoDomicilio = this.nuevoDomicilio.bind(this);
      this.cambioDireccion = this.cambioDireccion.bind(this);
      this.cambioDescripcion = this.cambioDescripcion.bind(this);

  }
  

  renderForm(){
    return (
      <div className='Formularios'>
        <Container className='btnHeader'>
          <Button className='boton' as= {Link} to='/domicilios' exact='true' floated='left' icon labelPosition='left' primary size='small'>
            <Icon name='arrow alternate circle left' /> Volver
          </Button>

          <Header as='h3' dividing>Registrar nuevo domicilio</Header>
        </Container>

        <Form onSubmit={this.nuevoDomicilio} className='altasYConsultas'>

          <Form.Field required label='Dirección' control='input' 
          placeholder='Dirección'
          value={this.state.direccion}
          onChange={this.cambioDireccion}
          className= {this.state.errorDireccion === true ? null : 'error'}
          />
          
          <Form.Field label='Descripción' control='input'
          placeholder='Descripción'
          value={this.state.descripcion}
          onChange={this.cambioDescripcion}
          className= {this.state.errorDescripcion === true ? null : 'error'}
          />

          <br/>

          <Button primary type="submit" onClick={this.nuevoDomicilio} className="boton"> Registrar Domicilio</Button >

        </Form>  
      </div>

    );
  }
  
  handleUpdateClick = (api) => {
    var data = {
      "direccion": this.state.direccion,
      "descripcion": this.state.descripcion,
      "bitActivo": true
    };

      this.props.addDomicilioAction(data)
      //TODO: aca vaciaba si salia todo bien, si no te lo dejaba vofi como se hace ahora jeje saludos a la flia xdxdxdxd
      this.vaciadoCampos()
  };

  nuevoDomicilio(e){
    e.preventDefault();

      const api = '/domicilios/add';
      this.handleUpdateClick(api);
     
  }

  vaciadoCampos(){
    this.setState( {
      direccion: '',
      descripcion: '',
      errorDireccion: true,
      errorDescripcion: true,
    })
  }
 
  cambioDireccion(e) {
    this.setState( {
      direccion: e.target.value
    })
  }

  cambioDescripcion(e) {
    this.setState( {
      descripcion: e.target.value
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
  fetching: state.domicilios.fetching,
})


export default connect(mapStateToProps,{addDomicilioAction})(AltaDomicilio);