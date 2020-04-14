import React from 'react'
import { Button, Dropdown, Header, Icon, Input, Pagination } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { orderBy } from 'lodash'
import { connect } from 'react-redux'
import SyncLoader from "react-spinners/SyncLoader"

import MenuOpciones from '../MenuOpciones'
import {nullTo, titleCase} from '../../Services/MetodosDeValidacion'
import {nroPorPagina} from "../../Constants/utils"
import { getPatientsAction, switchAltaAction } from './../../Redux/patientsDuck'
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
            filter: '',
            filteredPatients: [],
        };
    }

    componentDidMount() {
        this.getAllPacientes()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
          totalCount: nextProps.patients.length
        })
     }

    getAllPacientes = () => {
        this.props.getPatientsAction()
    }

    bitInverse = paciente => { 
        this.props.switchAltaAction(paciente.id)
    }

    checkName(patient){
        let name = patient.nombre
        if(patient.apellido !== undefined){
            name = name + ' ' + patient.apellido
        } 
        return name
    } 

    confirmationMessage(paciente) {
        if (paciente.bitAlta) {
            return (`¿Esta seguro que quiere dar de baja al paciente ${this.checkName(paciente)}?`);
        } else {
            return (`¿Esta seguro que quiere dar de alta al paciente ${this.checkName(paciente)}?`);
        }
    }

    patientsPerPage() {
        return (
            <div className='rightAlign'>
                <span>
                    Cantidad de pacientes por página{' '}
                    <Dropdown
                        inline
                        options={nroPorPagina}
                        value = {this.state.limit}
                        onChange={this.changeLimit} 
                    />
                </span>
            </div>

        )
    }

    changeLimit = (e, data) => {
        this.setState({
            limit: data.value,
            activePage: 1,
        });
        return this.handleSearch(((this.state.activePage - 1) * this.state.limit), (this.state.activePage * this.state.limit));
    }
    
    onChangePage = (e, {activePage}) => {
        if (activePage === this.state.activePage) {
            return null;
        } else {
            this.setState({
                activePage,
            });
            return (this.handleSearch(((this.state.activePage - 1) * this.state.limit), (this.state.activePage * this.state.limit)))
        }
    }
    
    handleColumnHeaderClick(sortKey) { //FIXME: sorting columns
        const {
            filteredPatients,
            sortParams: {direction}
        } = this.state;

        const sortDirection = direction === "desc" ? "asc" : "desc";
        const sortedCollection = orderBy(filteredPatients, [sortKey], [sortDirection]);

        this.setState({
            filteredPatients: sortedCollection,
            sortParams: {
                direction: sortDirection
            }
        });
    }
    
    patientsState(bitAlta) {
        if (bitAlta) {
            return "Dar de baja"
        } else {
            return "Dar de alta"
        }
    }
    
    handleSearch = (from, to) =>{     
        if(this.state.filter===""){            
            return this.props.patients.slice(from, to)
        } else {
            if (this.state.activePage !== 1) {
                this.setState({
                    activePage: 1
                })
            }

            let {filter} = this.state

            const filteredPatients = this.props.patients.filter(p => p.nombre.includes(titleCase(filter)) || 
            p.id.toString().includes(filter) ||
            (p.apellido===undefined ? null : p.apellido.includes(titleCase(filter))) ||
            (p.apellido===undefined ? null : (p.nombre + ' ' + p.apellido).includes(titleCase(filter))) ||
            (p.nroDocumento===undefined ? null : p.nroDocumento.toString().includes(filter)) 
            )

            if (this.state.totalCount !== filteredPatients.length) {
                this.setState({
                    totalCount: filteredPatients.length,
                })
            }

            return filteredPatients.slice(from,to)
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
        const { fetching } = this.props

        return (
            <div className='union'>
                <MenuOpciones/>
                <div className='tablaListadoHistorico'>
                    <Header as='h2'>Pacientes</Header>

                    <Button as={Link} to={{pathname: '/pacientes/add', state: { prevPath: window.location.pathname }}} exact='true' floated='right' icon labelPosition='left' primary size='small'>
                        <Icon name='user'/> Nuevo Paciente
                    </Button>

                    <br></br>
                    <br></br>
                    <br></br>

                    {fetching ? <div className='tablaListadoHistorico'>
                        <SyncLoader
                        size={10}
                        margin={5}
                        color={"black"}
                        loading={fetching}
                        />
                        </div> :

                        <div>
                            <div className='union'>
                                <div className="ui icon input">
                                    <Input value={this.state.filter} 
                                    onChange={(filter)=>
                                        this.setState({
                                            filter: filter.target.value
                                        })}
                                        
                                        placeholder='Ingrese búsqueda...' icon={{name: 'search'}} 
                                        />
                                </div>
                                {this.patientsPerPage()}
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

                                {(this.handleSearch(((this.state.activePage - 1) * this.state.limit), (this.state.activePage * this.state.limit))).map((paciente, index) => (
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
                                                        onClick={() => window.confirm(this.confirmationMessage(paciente)) ? this.bitInverse(paciente) : null}>
                                                        {this.patientsState(paciente.bitAlta)}
                                                    </Dropdown.Item>
                                                    <Dropdown.Item as={Link} to={{pathname: `/pacientes/consulta/${paciente.id}`, state: { prevPath: window.location.pathname }}}
                                                                exact='true'>
                                                        Ver/Modificar
                                                    </Dropdown.Item>
                                                    {/* TODO: Esto es provisorio, despues hay que borrarlo o dejarlo vofi */}
                                                    <Dropdown.Item as={Link} to={{pathname: `/pacientes/historial/${paciente.id}`, state: { prevPath: window.location.pathname }}}
                                                                exact='true'>
                                                                    Ver historial
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
                                totalPages={this.state.filter === '' ? Math.ceil((this.props.patients.length) / this.state.limit) : Math.ceil((this.state.totalCount) / this.state.limit)}
                                onPageChange={this.onChangePage}
                            />

                        </div>

                    }

                </div>    
            }
            </div>
    )
}
}


const mapStateToProps = state =>({
    fetching: state.patients.fetching,
    patients: state.patients.patients.sort((a, b) => (a.id > b.id) ? -1 : 1),
})


export default connect(mapStateToProps,{getPatientsAction, switchAltaAction})(TablaPaciente)


