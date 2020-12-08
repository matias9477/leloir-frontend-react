import React, { Component } from 'react';
import { Button, Form, Icon, Container, Divider, Tab } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Select from 'react-select';

import NavBar from '../NavBar/NavBar';
import { urlTablaObrasSociales } from '../../Constants/NavUrl';
import { getObraSocialByIdAction, switchAltaAction, alterObraSocialAction, getTiposPlanesAction } from '../../Redux/obrasSocialesDuck';
import { titleCase, emptyToNull, validateNombre, validateOnlyNumbers, validateMail } from '../../Services/MetodosDeValidacion';
import '../styles.css';

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
        planes: [],

        errorRazonSocial: true,
        errorCuit: true,
        errorTelefono: true,
        errorMail: true,
        errorValorUb:true,

    })
  }

  componentDidMount() {
    this.props.getObraSocialByIdAction(this.props.match.params.id)
    this.props.getTiposPlanesAction()
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
      planes: nextProps.obraSocial.planes,
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


  tabs(){
    const panes = [
      {
        menuItem: 'Información de la Obra Social', render: () => 
          <Tab.Pane loading={this.props.fetching}>
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
                value={this.state.cuit === null ? '' : this.state.cuit}
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
                  if (window.confirm('¿Esta seguro que quiere cambiar el estado la obra social ' + this.state.razonSocial + '?')) {
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
          </Tab.Pane>,
      },
      { 
        menuItem: 'Planes', render: () => 
          <Tab.Pane loading={this.props.fetching}>

            <Form size='huge'>                
              <Form.Field control='input' 
              value={"Planes de la Obra Social " + this.state.razonSocial} 
              id = 'headerConsulta'
              className= {this.state.errorRazonSocial === true ? null : 'error'} 
              />
              <Divider id='divider'/>
            </Form>

            

              {this.state.planes.map((plan, index) => (
                <Form>

                <Form.Group>
                  <Form.Field required label='Id' control='input'
                  id='disabled'
                  value={plan.planId} 
                  width={3}
                  />

                  <Form.Field required label='Nombre' control='input'
                  value={plan.nombre}
                  // onChange={this.cambioNombre}
                  width={13}
                  />
                </Form.Group>

                  <label width='250px' 
                  // className={this.state.errorConcepto ? 'labelsSelect' : 'labelsSelectError'}
                  >Tipo Plan <span>*</span></label>
                  <Select
                      value={plan.tipoPlan.nombre}
                      // onChange={this.cambioConceptoTransaccion}
                      placeholder= "Seleccione tipo de plan..."
                      options={this.props.tiposPlanes}
                      getOptionValue={this.getOptionValueTipoPlan}
                      getOptionLabel={this.getOptionLabelTipoPlan}
                      // styles={this.state.errorConcepto === true ? '' : styleErrorSelect}
                  />

                  <Divider style={{margin: '3rem 0'}}/>
                </Form>
              ))}
                
           
          </Tab.Pane> 
      },
    ]

    return panes
  }


  render() {
    return (
      <div>
        <NavBar/>
        <div className='avoidMenu'>

          <Container className='btnHeader'>
            <Button as= {Link} to={urlTablaObrasSociales} floated='left' icon labelPosition='left' primary size='small'>
              <Icon name='arrow alternate circle left' /> Volver
            </Button>
          </Container>

          <Tab panes={this.tabs()} />
          
        </div>

    </div>
    )
  }

  getOptionLabelTipoPlan = option => option.nombre

  getOptionValueTipoPlan = option => option.planId

}

const mapStateToProps = (state, props) => ({
  obraSocial: state.obrasSociales.obraSocial,
  fetching: state.obrasSociales.fetching,
  tiposPlanes: state.obrasSociales.tiposPlanes,
})

export default connect(mapStateToProps, { getObraSocialByIdAction, switchAltaAction, alterObraSocialAction, getTiposPlanesAction })(ConsultaObraSocial)
