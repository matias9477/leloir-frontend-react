import React, { Component } from 'react';
import { Button, Form, Icon, Container, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

import NavBar from '../NavBar/NavBar';
import { getMuestraByIdAction, switchAltaAction, getTiposMuestrasAction, alterMuestraAction } from '../../Redux/muestrasDuck';
import { validateRequiredCombos } from '../../Services/MetodosDeValidacion';
import '../styles.css';

class ConsultaMuestra extends Component {
  constructor(props) {
    super(props)
    this.state = ({
        cambios: false,

        idMuestra:'',
        fecha: '',
        tipo: '',
        estado: [],
        bitActivo: '',

        errorTipo: true,

    })
  }

  componentDidMount() {
    this.props.getTiposMuestrasAction()
    this.props.getMuestraByIdAction(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps){
    this.setState({
        idMuestra: nextProps.muestra.idMuestra,
        fecha: nextProps.muestra.createdAt,
        tipo: nextProps.muestra.tipoMuestra,
        estado: nextProps.muestra.estadoMuestra,
        bitActivo: nextProps.muestra.bitActivo,
    })
  }

  alta(e){
    this.props.switchAltaAction(this.state.idMuestra)
  }

  modificarMuestra = (e) => {
    e.preventDefault()

    const { tipo } = this.state

    const errorTipo = validateRequiredCombos(tipo)

    this.setState({
      errorTipo
    })

    if ( errorTipo ) {
      var data = {
          "bitActivo": true,
          "createdAt": this.props.muestra.createdAt,
          "createdBy": this.props.muestra.createdBy,
          "estadoMuestra": {
            "estadoId": this.props.muestra.estadoMuestra.tipoMuestraId,
            "nombre": this.props.muestra.nombre
          },
          "idMuestra": this.props.muestra.idMuestra,
          "tipoMuestra": {
            "nombre": "string",
            "tipoMuestraId": 0
          },
          "updatedAt": this.props.muestra.updatedAt,
          "updatedBy": this.props.muestra.updatedBy
        
      }

      this.props.alterMuestraAction(this.state.idMuestra, data)

      this.setState({
          cambios: false,
      })

    } else {
      alert("Revise los datos ingresados.")
    }

  }

  cambioTipo = (e) => {
    console.log(e.target.value)
      this.setState( {
          tipoMuestra: e,
          cambios: true,
      })
  }

  mensajeBtnSwitchAlta(){
    if (this.state.bitActivo) {
      return 'Dar de Baja'
    }
    else {
      return 'Dar de Alta'
    }
  }


  render() {
    const {fetching} = this.props
     
    return (
        <div>
            <NavBar/>
            <div className='avoidMenu'>

            <Container className='btnHeader'>
                <Button as= {Link} to='/muestras' floated='left' icon labelPosition='left' primary size='small'>
                <Icon name='arrow alternate circle left' /> Volver
                </Button>
            </Container>

            {(fetching) ? <div className='spinner'>
                <ClipLoader
                    size={60}
                    color={'black'}/>
              </div> :

                <Container>
                  <Form size='huge'>                
                    <Form.Field control='input' 
                      value="Muestra" 
                      id = 'headerConsulta' 
                    />
                <Divider id='divider'/>
                
              </Form>
                  {typeof(this.props.muestra) === "string" ? null :
                  
                  <Form>

                    <Form.Group widths='equal'>
                      <Form.Field required label='Id' control='input'
                      id='disabled'  width={5}
                      value={this.state.idMuestra} />

                      <Form.Field required label='Tipo Muestra' control='select' 
                        placeholder = 'Tipo Muestra' 
                        value={this.state.tipo.nombre} 
                        onChange={this.cambioTipo} 
                        className= {this.state.errorTipo === true ? null : 'error'} 
                        >
                        {this.props.tiposMuestras.map(item => (
                            <option key={item.tipoMuestraId}>{item.nombre}</option>))}
                      </Form.Field>
                    </Form.Group>


                    <Form.Group widths='equal'>
                      <Form.Field required label='Fecha' control='input'
                      value={this.state.fecha}
                      id='disabled'
                      />

                      <Form.Field required label='Estado' control='input'
                      value={this.state.estado.nombre}
                      id='disabled'
                      />

                    </Form.Group>

                    <br/>

                    <Button color={this.state.bitActivo ? 'red' : 'green'}
                    onClick={(e) => {
                    if (window.confirm('¿Esta seguro que quiere dar de alta la muestra?')) {
                        this.alta(e) }
                    else {e.preventDefault()}} }
                    >{this.mensajeBtnSwitchAlta()}</Button>

                    {(this.state.cambios && this.state.bitActivo) ? <Button primary onClick={(e) => {
                    if (window.confirm('¿Esta seguro que quiere modificar la muestra?')) {
                        this.modificarMuestra(e)
                        } else {window.location.reload(true)} } }>
                    Modificar Muestra
                    </Button> : null}

                  </Form> 
                }
                </Container>
            }
            </div>

        </div>
    )
}

}

const mapStateToProps = (state) => ({
  muestra: state.muestras.muestra,
  fetching: state.muestras.fetching,
  tiposMuestras: state.muestras.tiposMuestras,

})

export default connect(mapStateToProps, { getMuestraByIdAction, switchAltaAction, getTiposMuestrasAction, alterMuestraAction })(ConsultaMuestra)
