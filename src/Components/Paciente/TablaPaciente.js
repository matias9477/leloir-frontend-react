import React from 'react'
import axios from 'axios'
import { Button, Dropdown, Header, Icon, Input, Pagination } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { orderBy } from 'lodash'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'

import MenuOpciones from '../MenuOpciones'
import {nullTo, titleCase} from '../../Services/MetodosDeValidacion'
import {nroPorPagina} from "../../Constants/utils"
import {urlPacientes} from '../../Constants/URLs'
import { getPatientsAction } from './../../Redux/patientsDuck'
import './../styles.css'

class TablaPaciente extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: nroPorPagina[1].value,
            activePage: 1,
            totalCount: 0,
            sortParams: {
                direction: undefined
            },
            filtro: '',
            pacientesFiltrados: [],
        };
        //TODO: cambiar a arrow function para eliminar el bind
        this.cambioLimite = this.cambioLimite.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        this.getAllPacientes()
        
    }

    getAllPacientes = () => {
        this.props.getPatientsAction()

        //TODO: arreglar filtros de columna
        // const filtro = orderBy(this.state.pacientesFiltrados, [(paciente) => paciente.bitAlta, (paciente) => paciente.id
        // ], ["desc", "desc"]);
        // const pacientes = orderBy(this.props.patients, [(paciente) => paciente.bitAlta, (paciente) => paciente.id
        // ], ["desc", "desc"]);

        // this.setState({
        //     pacientesFiltrados: filtro,
        //     pacientes: pacientes,
        // })
    };


    bitInverse = paciente => { //TODO: cambiar url por import
        const urlPacientes = `/pacientes/switch-alta/${paciente.id}`;
        
        axios.put(urlPacientes).then(response => {
                if (paciente.bitAlta) {
                    alert(`Se ha dado de baja el paciente ${paciente.nombre} ${this.checkApellido(paciente.apellido)} con éxito.`);
                    this.getAllPacientes()
                } else {
                    alert(`Se ha dado de alta al paciente ${paciente.nombre} ${this.checkApellido(paciente.apellido)} con éxito.`);
                    this.getAllPacientes()
                }    
        }, (error) => {
            if (paciente.bitAlta) {
                alert(`No se ha podido dar de baja el paciente ${paciente.nombre} ${this.checkApellido(paciente.apellido)}. Intentelo nuevamente.`)
            } else {
                alert(`No se ha podido dar de alta al paciente. ${paciente.nombre} ${this.checkApellido(paciente.apellido)} Intentelo nuevamente.`)
            }
        })

    };

    checkApellido(apellido){
        if(apellido !== undefined){
            return apellido;
        } 
        else{
            return '';
        }
    }
    //TODO: poner todos los nombres en ingles
    mensajeConfirmacion(paciente) {
        if (paciente.bitAlta) {
            return (`¿Esta seguro que quiere eliminar al paciente ${paciente.nombre} ${this.checkApellido(paciente.apellido)}?`);
        } else {
            return (`¿Esta seguro que quiere dar de alta al paciente ${paciente.nombre} ${this.checkApellido(paciente.apellido)}?`);
        }
    }

    cantidadPorPagina() {
        return (
            <div className='rightAlign'>
                <span>
                    Cantidad de pacientes por página{' '}
                    <Dropdown
                        inline
                        options={nroPorPagina}
                        value = {this.state.limit}
                        onChange={this.cambioLimite} 
                    />
                </span>
            </div>

        )
    };

    cambioLimite(e, data) {
        this.setState({
            limit: data.value,
            activePage: 1,
        });
        return this.handleSearch(this.state.filtro,((this.state.activePage - 1) * this.state.limit), (this.state.activePage * this.state.limit));
    }
    
    onChangePage = (e, {activePage}) => {
        if (activePage === this.state.activePage) {
            return null;
        } else {
            this.setState({
                activePage,
            });
            return (this.handleSearch(this.state.filtro,((this.state.activePage - 1) * this.state.limit), (this.state.activePage * this.state.limit)))
        }
    };
    
    handleColumnHeaderClick(sortKey) {
        const {
            pacientesFiltrados,
            sortParams: {direction}
        } = this.state;

        const sortDirection = direction === "desc" ? "asc" : "desc";
        const sortedCollection = orderBy(pacientesFiltrados, [sortKey], [sortDirection]);

        this.setState({
            pacientesFiltrados: sortedCollection,
            sortParams: {
                direction: sortDirection
            }
        });
    }
    
    estado(bitAlta) {
        if (bitAlta) {
            return "Dar de baja"
        } else {
            return "Dar de alta"
        }
    }
    
    
    // filtratePatients = (valor) =>{
        
    //     return (this.props.patients.filter(function (paciente) {
    //         return ((paciente.nombre === undefined ? null : titleCase(paciente.nombre).includes(titleCase(valor.target.value))) || 
    //             (paciente.apellido === undefined ? null : titleCase(paciente.apellido).includes(titleCase(valor.target.value))) ||
    //             (paciente.id === undefined ? null : paciente.id.toString().includes(valor.target.value)) ||
    //             ((paciente.nroDocumento === undefined || paciente.nroDocumento === '-') ? null : paciente.nroDocumento.toString().includes(valor.target.value)));
    //     }))
    //     }
    
        // loadData(from, to) {
        //     return (this.state.pacientesFiltrados.slice(from, to))
    
        //     //ASI ANDA DE ENTRADA PERO NO FILTRA
        //     // let pacientesFiltrados=this.props.patients
        //     // return (pacientesFiltrados.slice(from, to))
        // }
    
    handleSearch(valor, from, to) {     
        //TODO: cambiar el search para que sea por caracter
        
        if(this.state.filtro===""){
        return this.props.patients.slice(from, to)
        }
        else{
            // this.setState({
            //     filtro: valor.target.value,
            // });

            //FIXME: No funciona el filtrado porque es una pija
            
        const pacientesFiltrados = this.props.patients.filter(function (paciente) {
            return ((paciente.nombre === undefined ? null : titleCase(paciente.nombre).includes(titleCase(this.state.filtro))) || 
                (paciente.apellido === undefined ? null : titleCase(paciente.apellido).includes(titleCase(this.state.filtro))) ||
                (paciente.id === undefined ? null : paciente.id.toString().includes(this.state.filtro)) ||
                ((paciente.nroDocumento === undefined || paciente.nroDocumento === '-') ? null : paciente.nroDocumento.toString().includes(this.state.filtro)));
        });

        this.setState({
            // pacientesFiltrados: pac,
            totalCount: pacientesFiltrados.length,
        })

        return pacientesFiltrados.slice(from,to)
        }
    }

    getIconTipo(tipo){
        if (tipo === 'ANIMAL'){
            return 'paw'
        } else if(tipo === 'PERSONA'){
            return 'user'
        } else if(tipo === 'INSTITUCION'){
            return 'building'
        }
    }




    render() {
        console.log("filtro: " + this.state.filtro)
        const { fetching } = this.props

        return (
            <div className='union'>
                <MenuOpciones/>

                {fetching ? 
                <div className='tablaListadoHistorico'>
                <Header as='h2'>Pacientes</Header>
                <CircularProgress size='60px'></CircularProgress> 
                </div>
                :
                
            
           

                <div className='tablaListadoHistorico'>
                    

                    <Header as='h2'>Pacientes</Header>

                    <Button as={Link} to={{pathname: '/pacientes/add', state: { prevPath: window.location.pathname }}} exact='true' floated='right' icon labelPosition='left' primary size='small'>
                        <Icon name='user'/> Nuevo Paciente
                    </Button>

                    <br></br>
                    <br></br>
                    <br></br>

                    <div className='union'>
                        <div className="ui icon input">
                            <Input value={this.state.filtro} 
                            onChange={(filtro)=>
                                this.setState({
                                    filtro: filtro.target.value
                                })
                            
                            }
                                
                                   placeholder='Ingrese búsqueda...' icon={{name: 'search'}} value="Temporalmente deshabilitado" disabled/>
                                   {/* TODO cuando funcione el filtrado sacar el value y el disabled de arriba */}

                        </div>
                        {this.cantidadPorPagina()}
                    </div>


                     

                    <table className="ui single line striped table">
                        <thead className='centerAlignment'>
                        <tr>
                            <th onClick={() => this.handleColumnHeaderClick("id")}>Número Paciente</th>
                            <th onClick={() => this.handleColumnHeaderClick("tipoPaciente")}>Tipo</th>
                            <th onClick={() => this.handleColumnHeaderClick("nombre")}>Nombre</th>
                            <th onClick={() => this.handleColumnHeaderClick("nroDocumento")}>Número de Documento</th>
                            <th onClick={() => this.handleColumnHeaderClick("bitAlta")}>Opciones</th>
                        </tr>
                        </thead>

                        <tbody className='centerAlignment'>

                        {(this.handleSearch(this.state.filtro,((this.state.activePage - 1) * this.state.limit), (this.state.activePage * this.state.limit))).map((paciente, index) => (
                            <tr key={index} paciente={paciente} className={paciente.bitAlta ? null : "listadosBaja"}>
                                <td data-label="Número Paciente">
                                    {paciente.id}
                                </td>
                                <td data-label="Tipo">
                                    <Icon name={this.getIconTipo(paciente.tipoPaciente)}/>
                                </td>
                                <td data-label="Nombre">
                                    {paciente.nombre}&nbsp;&nbsp;{paciente.apellido}
                                </td>
                                <td data-label="Número de Documento">
                                    {nullTo(paciente.nroDocumento)}
                                </td>
                                <td>
                                    <Dropdown item icon='ellipsis horizontal' simple>
                                        <Dropdown.Menu>
                                            <Dropdown.Item
                                                onClick={() => window.confirm(this.mensajeConfirmacion(paciente)) ? this.bitInverse(paciente) : null}>
                                                {this.estado(paciente.bitAlta)}
                                            </Dropdown.Item>
                                            <Dropdown.Item as={Link} to={{pathname: `/pacientes/consulta/${paciente.id}`, state: { prevPath: window.location.pathname }}}
                                                           exact='true'>
                                                Ver/Modificar
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>

                                </td>
                            </tr>
                        ))}

                        </tbody>
                    
                    </table>
                    
                    <Pagination
                        activePage={this.state.activePage}
                        totalPages={Math.ceil((this.props.patients.length) / this.state.limit)}
                        onPageChange={this.onChangePage}
                    />

                    

                </div>      
            
            
                        }
    }
    </div>
        )
    

}}



const mapStateToProps = state =>({
    fetching: state.patients.fetching,
    patients: state.patients.patients
})


export default connect(mapStateToProps,{getPatientsAction})(TablaPaciente)


