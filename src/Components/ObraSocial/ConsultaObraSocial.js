import React, { Component } from 'react'
import { Button, Form, Icon, Container, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ClipLoader from 'react-spinners/ClipLoader'

import NavBar from '../NavBar/NavBar'
import { getObraSocialByIdAction, switchAltaAction, alterObraSocialAction } from '../../Redux/obrasSocialesDuck'
import { titleCase, emptyToNull, validateNombre, validateOnlyNumbers, validateMail } from '../../Services/MetodosDeValidacion'
import './obraSocialStyles.css'

class ConsultaObraSocial extends Component {
  constructor(props) {
    super(props)
    this.state = ({
        cambios: false,

        id:'',
        razonSocial: '',
        telefono:'',
        mail:'',
        cuit:'',
        valorUb:'',
        bitAlta: '',

        errorRazonSocial: true,
        errorCuit: true,
        errorTelefono: true,
        errorMail: true,
        errorValorUb:true,

    })
  }

  componentDidMount() {
    this.props.getObraSocialByIdAction(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      id: nextProps.obraSocial.idObraSocial,
      razonSocial: nextProps.obraSocial.razonSocial,
      telefono: nextProps.obraSocial.telefono,
      mail: nextProps.obraSocial.mail,
      cuit: nextProps.obraSocial.cuit,
      valorUb: nextProps.obraSocial.valorUb,
      bitAlta: nextProps.obraSocial.bitActivo,
    })
  }

  alta(e){
    this.props.switchAltaAction(this.state.id)
  }

  modificarObraSocial = (e) => {
    e.preventDefault()

    const { razonSocial, cuit, telefono, mail, valorUb} = this.state

    const errorRazonSocial = validateNombre(razonSocial)
    const errorCuit = validateOnlyNumbers(cuit)
    const errorTelefono = validateOnlyNumbers(telefono)
    const errorMail = validateMail(mail)
    const errorValorUb = validateOnlyNumbers(valorUb)

    this.setState({
      errorRazonSocial,
      errorCuit,
      errorTelefono,
      errorMail,
      errorValorUb,
    })

    if ( errorRazonSocial && errorCuit && errorMail && errorTelefono && errorValorUb ) {
      var data = {
          "razonSocial": titleCase(this.state.razonSocial),
          "idObraSocial": this.state.id,
          "email": emptyToNull(this.state.mail),
          "telefono": emptyToNull(this.state.telefono),
          "cuit": this.state.cuit,
          "valorUb": emptyToNull(this.state.valorUb),
          "bitActivo": true,
        }

      this.props.alterObraSocialAction(this.state.id, data)

      this.setState({
          cambios: false,
      })

    } else {
      alert("Revise los datos ingresados.")
    }

  }

  cambioRazonSocial = (e) => {
    this.setState( {
      razonSocial: e.target.value,
      cambios: true,
    })
  }

  cambioTelefono = (e) => {
    this.setState( {
        telefono: e.target.value,
        cambios: true,
    })
  }

  cambioMail = (e) => {
      this.setState( {
          mail: e.target.value,
          cambios: true,
      })
  }

  cambioValorUb = (e) => {
      this.setState( {
          valorUb: e.target.value,
          cambios: true,
      })
  }

  cambioCuit = (e) => {
      this.setState( {
          cuit: e.target.value,
          cambios: true,
      })
  }

  mensajeBtnSwitchAlta(){
    if (this.state.bitAlta) {
      return 'Dar de Baja'
    }
    else {
      return 'Dar de Alta'
    }
  }


  render() {
    return (
      <div className='union'>
        <NavBar/>
        <div className='consulta'>

          <Container className='btnHeader'>
            <Button as= {Link} to='/obras_sociales' floated='left' icon labelPosition='left' primary size='small'>
              <Icon name='arrow alternate circle left' /> Volver
            </Button>
          </Container>

          {this.props.fetching ? <div className='spinner'>
              <ClipLoader
                  size={60}
                  color={'black'}
              />
            </div> :

            <Container>
              <Form size='huge'>                
                <Form.Field control='input' 
                value={this.state.razonSocial} 
                id = 'headerConsulta'
                className= {this.state.errorRazonSocial === true ? null : 'error'} 
                />
                <Divider id='divider'/>
                
              </Form>

              <Form>

                <Form.Group widths='equal'>
                  <Form.Field required label='Id' control='input'
                  id='disabled'  width={5}
                  value={this.state.id} />

                  <Form.Field required label='Razon Social' control='input'
                  value={this.state.razonSocial}
                  onChange={this.cambioRazonSocial}
                  className= {this.state.errorRazonSocial === true ? null : 'error'}
                  />
                </Form.Group>

                <Form.Field  label='Cuit' maxLength={11} control='input'
                value={this.state.cuit}
                onChange={this.cambioCuit}
                className= {this.state.errorCuit === true ? null : 'error'}
                />

                <Form.Group widths='equal'>
                  <Form.Field  label='Telefono' control='input'
                  value={this.state.telefono || ''}
                  onChange={this.cambioTelefono}
                  className= {this.state.errorTelefono === true ? null : 'error'}
                  />

                  <Form.Field  label='Mail' control='input'
                  value={this.state.mail || ''}
                  onChange={this.cambioMail}
                  className= {this.state.errorMail === true ? null : 'error'}
                  />

                  <Form.Field  label='Unidad Bioquimica' maxLength={11} control='input'
                  value={this.state.valorUb}
                  onChange={this.cambioValorUb}
                  className= {this.state.errorValorUb === true ? null : 'error'}
                  />
                </Form.Group>

                <br/>

                <Button color={this.state.bitAlta ? 'red' : 'green'}
                  onClick={(e) => {
                  if (window.confirm('¿Esta seguro que quiere dar de alta la obra social ' + this.state.razonSocial + '?')) {
                    this.alta(e) }
                  else {e.preventDefault()}} }
                >{this.mensajeBtnSwitchAlta()}</Button>

                {(this.state.cambios && this.state.bitAlta) ? <Button primary onClick={(e) => {
                  if (window.confirm('¿Esta seguro que quiere modificar la obra social ' + this.state.razonSocial + '?')) {
                    this.modificarObraSocial(e)
                    } else {window.location.reload(true)} } }>
                  Modificar Obra Social
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
  obraSocial: state.obrasSociales.obraSocial,
  fetching: state.obrasSociales.fetching,

})

export default connect(mapStateToProps, { getObraSocialByIdAction, switchAltaAction, alterObraSocialAction })(ConsultaObraSocial)
