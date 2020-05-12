import React, { Component } from 'react'
import { Button, Form, Icon, Container, Divider } from 'semantic-ui-react'
import CircularProgress from '@material-ui/core/CircularProgress'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'

import MenuOpciones from '../MenuOpciones'
import { getDomicilioByIdAction, switchAltaAction, alterDomicilioAction } from '../../Redux/domiciliosDuck'
import './domicilioStyles.css'

class ConsultaDomicilio extends Component {
  constructor(props) {
    super(props)
    this.state = ({
        cambios: false,

        id:'',
        direccion: '',
        descripcion:'',
        bitAlta: '',

        errorDireccion: true,
        errorDescripcion: true,

    })
  }

  componentDidMount() {
    this.props.getDomicilioByIdAction(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      id: nextProps.domicilio.idDomicilio,
      direccion: nextProps.domicilio.direccion,
      descripcion: nextProps.domicilio.descripcion,
      bitAlta: nextProps.domicilio.bitActivo,
    })
  }

  alta(e){
    this.props.switchAltaAction(this.state.id)
  }

  modificarDomicilio = (e) => {
    e.preventDefault()

      var data = {
          "direccion": this.state.direccion,
          "descripcion": this.state.descripcion,
          "bitActivo": true,
        }

      this.props.alterDomicilioAction(this.state.id, data)

      this.setState({
          cambios: false,
      })


  }

  cambioDireccion = (e) => {
    this.setState( {
      direccion: e.target.value,
      cambios: true,
    })
  }

  cambioDescripcion = (e) => {
    this.setState( {
        descripcion: e.target.value,
        cambios: true,
    })
  }


  render() {
    return (
      <div className='union'>
        <MenuOpciones/>
        <div className='Formularios'>

          <Container className='btnHeader'>
            <Button className='boton' as= {Link} to='/domicilios' floated='left' icon labelPosition='left' primary size='small'>
              <Icon name='arrow alternate circle left' /> Volver
            </Button>
          </Container>

          {this.props.fetching ? <CircularProgress size={50}/> :

            <Container>
              <Form size='huge'>                
                <Form.Field control='input' 
                value={this.state.direccion} 
                id = 'headerConsulta'
                className= {this.state.errorDireccion === true ? null : 'error'} 
                />
                <Divider id='divider'/>
                
              </Form>

              <Form className='consulta'>

              <Form.Group widths='equal'>

                <Form.Field required label='Dirección' control='input'
                value={this.state.direccion}
                onChange={this.cambioDireccion}
                className= {this.state.errorDireccion === true ? null : 'error'}
                />
              </Form.Group>

              <Form.Group widths='equal'>

                <Form.Field  label='Descripción' control='input'
                value={this.state.descripcion || ''}
                onChange={this.cambioDescripcion}
                className= {this.state.errorDescripcion === true ? null : 'error'}
                />
              </Form.Group>

              <br/>

              {(!this.state.bitAlta) ? <Button onClick={(e) => {
                if (window.confirm('¿Esta seguro que quiere dar de alta el domicilio ' + this.state.direccion + '?')) {
                  this.alta(e)
                  } else {e.preventDefault()}} }>Dar de Alta</Button> : null}

              {(this.state.cambios && this.state.bitAlta) ? <Button primary onClick={(e) => {
                if (window.confirm('¿Esta seguro que quiere modificar el domicilio ' + this.state.direccion + '?')) {
                  this.modificarDomicilio(e)
                  } else {window.location.reload(true)} } } primary>
                Modificar Domicilio
              </Button> : null}

            </Form>
            </Container>
          }
        </div>

    </div>
    )
  }

}

const mapStateToProps = (state, props) => ({
  domicilio: state.domicilios.domicilio,
  fetching: state.domicilios.fetching,

})

export default connect(mapStateToProps, { getDomicilioByIdAction, switchAltaAction, alterDomicilioAction })(ConsultaDomicilio)
