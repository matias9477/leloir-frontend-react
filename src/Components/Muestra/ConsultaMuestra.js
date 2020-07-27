import React, { Component } from 'react';
import { Button, Form, Icon, Container, Divider, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import Select from 'react-select';

import NavBar from '../NavBar/NavBar';
import { urlTablaMuestras } from '../../Constants/NavUrl'
import { getMuestraByIdAction, switchAltaAction, getTiposMuestrasAction, alterMuestraAction } from '../../Redux/muestrasDuck';
import { validateRequiredCombos } from '../../Services/MetodosDeValidacion';
import { getHumanDate } from '../../Services/MetodosPaciente';
import './muestras.css';
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
    
      this.props.alterMuestraAction(this.state.idMuestra, this.state.tipo.nombre)

      this.setState({
          cambios: false,
      })

    } else {
      alert("Revise los datos ingresados.")
    }
  }

  cambioTipo = tipo => {
    this.setState({ 
      tipo,
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
    var prevURL = this.props.location.state.prevPath || urlTablaMuestras
    const {fetching} = this.props
     
    return (
      <div>
        <NavBar/>
        <div className='avoidMenu'>

        <Container className='btnHeader'>
          <Button as= {Link} to={{pathname: prevURL, state: {prevPath: undefined}}} exact='true' floated='left' icon labelPosition='left' primary size='small'>
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
                readOnly={true}
                className='headerFont'
              />
              <Divider id='divider'/>
            
            </Form>
              
            {typeof(this.props.muestra) === "string" ? null :
              
              <Form>
                <Grid columns='equal'>
                  <Grid.Column>
                    <Form.Field required label='Id' control='input'
                    id='disabled'  width={5} readOnly={true}
                    value={this.state.idMuestra} />
                  </Grid.Column>
                  
                  <Grid.Column>
                    <Form.Field required label='Tipo Muestra' id='labelTipoMuestra' />
                    <Select
                      name='tipo muestra'
                      value={this.state.tipo}
                      onChange={this.cambioTipo}
                      placeholder= "Tipo muestra"
                      options={this.props.tiposMuestras}
                      getOptionValue={this.getOptionValuTipoMuestra}
                      getOptionLabel={this.getOptionLabelTipoMuestra}
                    />
                  </Grid.Column>
                </Grid>

                <Form.Group widths='equal'>
                  <Form.Field required label='Fecha' control='input'
                  value={getHumanDate(this.state.fecha)} readOnly={true}
                  id='disabled'
                  />

                  <Form.Field required label='Estado' control='input'
                  value={this.state.estado.nombre} readOnly={true}
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
  getOptionLabelTipoMuestra = option => option.nombre;

  getOptionValuTipoMuestra = option => option.tipoMuestraId;
}

const mapStateToProps = (state) => ({
  muestra: state.muestras.muestra,
  fetching: state.muestras.fetching,
  tiposMuestras: state.muestras.tiposMuestras,

})

export default connect(mapStateToProps, { getMuestraByIdAction, switchAltaAction, getTiposMuestrasAction, alterMuestraAction })(ConsultaMuestra)
