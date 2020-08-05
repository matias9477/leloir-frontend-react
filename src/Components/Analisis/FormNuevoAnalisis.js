import React, { Component } from 'react';
import axios from 'axios';
import { Button, Header, Icon, Grid, Step, Container, Form } from 'semantic-ui-react';
import {Link, withRouter, Redirect } from 'react-router-dom';
import Select from 'react-select';
import { connect } from 'react-redux';

import NavBar from '../NavBar/NavBar';
import { urlTablaAnalisis } from './../../Constants/NavUrl';
import { checkAtributo, validateRequiredCombos, validateString } from '../../Services/MetodosDeValidacion';
import SelectedPaciente from './SelectedPaciente';
import SelectedDeterminaciones from './SelectedDeterminaciones';
import { getPatientsAction } from '../../Redux/patientsDuck';
import { getDeterminacionesAction } from '../../Redux/determinacionesDuck';
import { addAnalisisAction } from '../../Redux/analisisDuck';
import { getObrasSocialesAction } from '../../Redux/obrasSocialesDuck';
import './../styles.css';
import './analisisStyle.css';

class FormNuevoAnalisis extends Component {
  constructor(props) {
    super(props)
    this.state = ({
        determinaciones: [],
        pacientes: [],
        precio: '',
        medico: '',

        mod: false,

        selectedPaciente: '',
        selectedDeterminaciones: [], 

        flagProceso: 'seleccionPacientes',

        errorPaciente: true,
        errorDeterminaciones: true,
        errorMedico: true,
    })
    }

  componentDidMount(){
    this.props.getObrasSocialesAction()

    this.props.getPatientsAction()
    this.props.getDeterminacionesAction()
  }

  componentWillReceiveProps(nextProp){
    this.setState({
      pacientes: nextProp.patients,
      determinaciones: nextProp.determinaciones,
    })
  }

  // componentDidUpdate(){  //esto esta re mal
  //   if(this.state.mod === true){
  //   this.getPrecio()
  //   }
  // }

  nuevoAnalisis = (e) => {
    e.preventDefault()
    const { selectedPaciente, selectedDeterminaciones, medico } = this.state

    const errorPaciente = validateRequiredCombos(selectedPaciente)
    const errorDeterminaciones = validateRequiredCombos(selectedDeterminaciones)
    const errorMedico = validateString(medico)

    if ( errorPaciente && errorDeterminaciones && errorMedico ) {
      var data = {
        "idPaciente": this.state.selectedPaciente.id,
        "codigoPracticaDeterminaciones": this.listIdDets(this.state.selectedDeterminaciones),
        "medicoSolicitante": this.state.medico,
        "precio": this.state.precio,
      }
  
      this.props.addAnalisisAction(data)
    } else {
      alert("Revise los datos ingresados.")
      this.setState({
        errorPaciente: false,
        errorDeterminaciones: false,
      })
    }    
  }
 
  getPrecio = (e) => { //TODO: arreglar esta mierda
    const api = ""
    axios.get(api)
    .then(resolve =>{
      this.setState({
        precio: resolve.data,
        mod:false
      })
    }, (error) => {
      console.log('error al buscar precio de analisis')
    })
  }

  listIdDets(dets) {
    let list = []
    for (let i=0; i<dets.length; i+=1) {
     list.push(dets[i].codigoPractica)
    }
    return list
  }

  seleccionPaciente(){
    return(
        <div className='seleccionPaciente'> 
          <Step.Group size='tiny'>
            <Step active>
              <Icon name='user' />
              <Step.Content>
                <Step.Title>Paciente</Step.Title>
                <Step.Description>Elige un paciente</Step.Description>
              </Step.Content>
            </Step>

            <Step disabled>
              <Icon name='lab' />
              <Step.Content>
                <Step.Title>Determinaciones</Step.Title>
                <Step.Description>Elige las determinaciones a realizar</Step.Description>
              </Step.Content>
            </Step>

            <Step disabled>
              <Icon name='dollar sign' />
              <Step.Content>
                <Step.Title>Pago</Step.Title>
              </Step.Content>
            </Step>
          </Step.Group>

          <Grid columns='equal'>
            <Grid.Column width={12}>
              <Select
                name='pacientes'
                value={this.state.selectedPaciente}
                onChange={this.handleChangeListPacientes}
                placeholder= "Busque un paciente..."
                options={this.props.patients}
                getOptionValue={this.getOptionValuePatient}
                getOptionLabel={this.getOptionLabelPatient}
              />
            </Grid.Column>
            <Grid.Column width={4}>
              <Button as= {Link} to={{pathname: '/pacientes/add', state: { prevPath: window.location.pathname }}} exact='true' floated='right' icon labelPosition='left' color='twitter' size='small' className='buttonNuevoPaciente'>
                <Icon name='user'/>Nuevo Paciente
              </Button>
            </Grid.Column>
          </Grid>
          
          <SelectedPaciente selected={this.state.selectedPaciente}/>

          {this.state.selectedPaciente!=='' ? <Button floated='right' circular icon='arrow right' size='big' primary inverted onClick={e=>(this.setState({ flagProceso: 'seleccionDeterminaciones'}))} /> : null}
          
        </div>
    )
  }

  seleccionDeterminaciones(){
    return(
        <div className='seleccionDeterminaciones'> 
          <Step.Group size='tiny'>
            <Step completed>
              <Icon name='user'/>
              <Step.Content>
                <Step.Title>Paciente</Step.Title>
                <Step.Description>Elige el paciente que se hará el análisis</Step.Description>
              </Step.Content>
            </Step>

            <Step active>
              <Icon name='lab' />
              <Step.Content>
                <Step.Title>Determinaciones</Step.Title>
                <Step.Description>Elige las determinaciones a realizar</Step.Description>
              </Step.Content>
            </Step>

            <Step disabled>
              <Icon name='dollar sign' />
              <Step.Content>
                <Step.Title>Pago</Step.Title>
              </Step.Content>
            </Step>
          </Step.Group>

          <Form>
            <Form.Field label='Médico Solicitante' control='input' 
            placeholder='Ingrese médico solicitante...' value={this.state.medico} 
            onChange={this.cambioMedico} 
            className= {this.state.errorMedico === true ? null : 'error'} 
            />  
          </Form>

          <br/> <br/>

          <Select
            isMulti
            options={this.props.determinaciones}
            value={this.state.selectedDeterminaciones}
            onChange={this.handleChangeListDeterminaciones}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder='Seleccione determinaciones...'
            closeMenuOnSelect={false}
            getOptionValue={this.getOptionValueDeterminaciones}
            getOptionLabel={this.getOptionLabelDeterminaciones}
          />

          <SelectedDeterminaciones determinaciones={this.state.selectedDeterminaciones}/>
         
          <Button floated='left' circular icon='arrow left' size='big' primary inverted onClick={e=>(this.setState({ flagProceso: 'seleccionPacientes'}))} /> 
          
          {this.state.selectedDeterminaciones.length>0 ? <Button floated='right' circular icon='arrow right' size='big' primary inverted onClick={e=>(this.setState({ flagProceso: 'pago'}))} /> : null}
            
        </div>
    )
  }

  seccionPagoYRegistro(){
    return(
      <div className='seccionPago'> 
          <Step.Group size='tiny'>
            <Step completed>
              <Icon name='user' />
              <Step.Content>
                <Step.Title>Paciente</Step.Title>
                <Step.Description>Elige un paciente</Step.Description>
              </Step.Content>
            </Step>

            <Step completed>
              <Icon name='lab' />
              <Step.Content>
                <Step.Title>Determinaciones</Step.Title>
                <Step.Description>Elige las determinaciones a realizar</Step.Description>
              </Step.Content>
            </Step>

            <Step active>
              <Icon name='dollar sign' />
              <Step.Content>
                <Step.Title>Pago</Step.Title>
              </Step.Content>
            </Step>
          </Step.Group>

        <Container>
          <Header>Pago</Header>
           {/* <Header as={'h5'}>Precio</Header>
        
          <Form.Field control='input' 
            placeholder='Precio' 
            value={this.state.precio}   
            /> */}
        </Container>

        <Grid>
          <Grid.Column floated='left' width={5}>
            <Button floated='left' circular icon='arrow left' size='big' primary inverted onClick={e=>(this.setState({ flagProceso: 'seleccionDeterminaciones'}))} /> 
          </Grid.Column>
          <Grid.Column floated='right' width={5}>
            <Button primary size='small' onClick={this.nuevoAnalisis} floated='right'> 
              Registrar Análisis
            </Button>
          </Grid.Column>
        </Grid>

      </div>
    )
  }

  seccionRender(){
    switch (this.state.flagProceso) {
      case 'seleccionPacientes':
        return this.seleccionPaciente();
      case 'seleccionDeterminaciones':
        return this.seleccionDeterminaciones();
      case 'pago':
        return this.seccionPagoYRegistro();
      default:
        return this.seleccionPaciente();
    }
  }


  render() {
    if (!this.props.upToDateAnalisisAll) {
      return <Redirect to={urlTablaAnalisis} />
    }
    return (
      <div className='union'>
        <NavBar/>
        <Container className='formAnalsis'>
          <Button as= {Link} to='/analisis' exact='true' floated='left' icon labelPosition='left' primary size='small'>
            <Icon name='arrow left' /> Volver
          </Button>
          
          {this.seccionRender()}
        </Container>
          
      </div>
    )
  }

  getOptionLabelPatient = option => `${option.nombre} ${checkAtributo(option.apellido)}`

  getOptionValuePatient = option => option.id

  getOptionLabelDeterminaciones = option => `${option.codigoPractica} ${option.descripcionPractica}`

  getOptionValueDeterminaciones = option => option.codigoPractica

  handleChangeListPacientes = selectedPaciente => {
    this.setState({ selectedPaciente })
  }

  handleChangeListDeterminaciones = selectedDeterminaciones => {
    this.setState({ selectedDeterminaciones })
    if(this.state.mod === false){
      this.setState({
        mod:true
      })
    }
  }

  cambioMedico = e => {
    this.setState ({
      medico: e.target.value
    })
  }
}

const mapStateToProps = state => ({
  patients: state.patients.patients,
  determinaciones: state.determinaciones.determinaciones,
  obrasSociales: state.obrasSociales.obrasSociales,
  upToDateAnalisisAll: state.analisis.upToDateAnalisisAll,
})

export default  withRouter(connect(mapStateToProps, 
  {getPatientsAction, getDeterminacionesAction, addAnalisisAction, getObrasSocialesAction})(FormNuevoAnalisis))
