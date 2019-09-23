import React from 'react';
import axios from 'axios'
import { Button, Dropdown, Header, Icon, Input, Pagination } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { orderBy } from 'lodash';
import MenuOpciones from '../MenuOpciones';
import { titleCase, nullTo } from '../../Services/MetodosDeValidacion';
import './../styles.css';
import { animalType, institucionType, pacientesArrayType, personaType } from "../../Types";
import { oneOfType } from "prop-types";

export default class TablaPaciente extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pacientes: [],
            limit: 25,
            activePage: 1,
            totalCount: 0,
            sortParams: {
                direction: undefined
            },
            filtro: '',
            pacientesFiltrados: [],
        };
        this.cambioLimite = this.cambioLimite.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        this.getAllPacientes();
    }

    getAllPacientes = () => {
        const urlPacientes = '/pacientes/all';
        axios.get(urlPacientes).then(resolve => {
            this.setState({
                pacientes: Object.values(resolve.data).flat(),
                pacientesFiltrados: Object.values(resolve.data).flat(),
                totalCount: (Object.values(resolve.data).flat()).length,
            });

            const filtro = orderBy(this.state.pacientesFiltrados, [(paciente) => paciente.bitAlta, (paciente) => paciente.id
            ], ["desc", "desc"]);
            const pacientes = orderBy(this.state.pacientes, [(paciente) => paciente.bitAlta, (paciente) => paciente.id
            ], ["desc", "desc"]);

            this.setState({
                pacientesFiltrados: filtro,
                pacientes: pacientes,
            })

        }, (error) => {
            console.log('Error', error.message);
        })
    };

    bitInverse = paciente => {
        // fetch(`/pacientes/switch-alta/${paciente.id}`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }).then(response => {
        //     if (response.ok) {
        //         if (paciente.bitAlta) {
        //             alert(`Se ha eliminado el paciente ${paciente.nombre} ${paciente.apellido} con éxito.`);
        //             this.getAllPacientes()
        //         } else {
        //             alert(`Se ha dado de alta al paciente ${paciente.nombre} ${paciente.apellido} con éxito.`);
        //             this.getAllPacientes()
        //         }
        //         return response.text();
        //     } else {
        //         if (paciente.bitAlta) {
        //             alert(`No se ha podido eliminar el paciente ${paciente.nombre} ${paciente.apellido}. Intentelo nuevamente.`)
        //         } else {
        //             alert(`No se ha podido dar de alta al paciente ${paciente.nombre} ${paciente.apellido}. Intentelo nuevamente.`)
        //         }
        //         return Promise.reject({status: response.status, statusText: response.statusText});
        //     }
        // });

        const urlPacientes = `/pacientes/switch-alta/${paciente.id}`;
        axios.put(urlPacientes).then(response => {
            if (response.ok) {
                if (paciente.bitAlta) {
                    alert(`Se ha eliminado el paciente ${paciente.nombre} ${paciente.apellido} con éxito.`);
                    this.getAllPacientes()
                } else {
                    alert(`Se ha dado de alta al paciente ${paciente.nombre} ${paciente.apellido} con éxito.`);
                    this.getAllPacientes()
                }
                return response.text();
            } else {
                if (paciente.bitAlta) {
                    alert(`No se ha podido eliminar el paciente ${paciente.nombre} ${paciente.apellido}. Intentelo nuevamente.`)
                } else {
                    alert(`No se ha podido dar de alta al paciente ${paciente.nombre} ${paciente.apellido}. Intentelo nuevamente.`)
                }
                return Promise.reject({status: response.status, statusText: response.statusText});
            }

        }, (error) => {
            alert('No se ha podido efectuar la acción. Intente nuevamente.')
        })

    };

    mensajeConfirmacion(paciente) {
        if (paciente.bitAlta) {
            return (`¿Esta seguro que quiere eliminar al paciente ${paciente.nombre} ${paciente.apellido}?`)
        } else {
            return (`¿Esta seguro que quiere dar de alta al paciente ${paciente.nombre} ${paciente.apellido}?`)
        }
    }

    cantidadPorPagina() {
        return (
            <div className='rightAlign'>
                Cantidad de pacientes por página: &nbsp;&nbsp;
                <select id='int' onChange={this.cambioLimite} value={this.state.limit} className='selectCantidad'>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>

        )
    }

    cambioLimite(e) {
        this.setState({
            limit: e.target.value,
            activePage: 1,
        });
        return this.loadData(((this.state.activePage - 1) * this.state.limit), (this.state.activePage * this.state.limit));
    }

    loadData(from, to) {
        return (this.state.pacientesFiltrados.slice(from, to))
    }

    onChangePage = (e, {activePage}) => {
        if (activePage === this.state.activePage) {
            return null;
        } else {
            this.setState({
                activePage,
            });
            return (this.loadData(((this.state.activePage - 1) * this.state.limit), (this.state.activePage * this.state.limit)))
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

    handleSearch(valor) {
        this.setState({
            filtro: valor.target.value,
        });

        const pac = this.state.pacientes.filter(function (paciente) {
            return (paciente.nombre.includes(titleCase(valor.target.value)) || paciente.apellido.includes(titleCase(valor.target.value)) ||
                paciente.id.toString().includes(valor.target.value) ||
                paciente.nroDocumento.toString().includes(valor.target.value));
        });

        this.setState({
            pacientesFiltrados: pac,
            totalCount: pac.length,
        })

    }


    render() {
        return (
            <div className='union'>
                <MenuOpciones/>

                <div className='tablaListadoHistorico'>

                    <Header as='h2'>Pacientes</Header>

                    <Button as={Link} to='/pacientes/add' exact='true' floated='right' icon labelPosition='left' primary
                            size='small'>
                        <Icon name='user'/> Nuevo Paciente
                    </Button>

                    <br></br>
                    <br></br>
                    <br></br>

                    <div className='union'>
                        <div className="ui icon input">
                            <Input value={this.state.filtro} onChange={this.handleSearch}
                                   placeholder='Ingrese búsqueda...' icon={{name: 'search'}}/>

                        </div>
                        {this.cantidadPorPagina()}
                    </div>

                    <table className="ui single line striped table">
                        <thead className='centerAlignment'>
                        <tr>
                            <th onClick={() => this.handleColumnHeaderClick("id")}>Número Paciente</th>
                            <th >Tipo</th>
                            <th onClick={() => this.handleColumnHeaderClick("nombre")}>Nombre</th>
                            <th onClick={() => this.handleColumnHeaderClick("nroDocumento")}>Número de Documento</th>
                            <th onClick={() => this.handleColumnHeaderClick("bitAlta")}>Opciones</th>
                        </tr>
                        </thead>

                        <tbody className='centerAlignment'>

                        {(this.loadData(((this.state.activePage - 1) * this.state.limit), (this.state.activePage * this.state.limit))).map((paciente, index) => (
                            <tr key={index} paciente={paciente} className={paciente.bitAlta ? null : "pacienteBaja"}>
                                <td data-label="Número Paciente">
                                    {paciente.id}
                                </td>
                                <td data-label="Tipo">
                                    {'tipo'}
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
                                            <Dropdown.Item as={Link} to={`/pacientes/consulta/${paciente.id}`}
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
                        totalPages={Math.ceil((this.state.totalCount) / this.state.limit)}
                        onPageChange={this.onChangePage}
                    />
                </div>
            </div>
        )
    }

}

TablaPaciente.propTypes = {
    pacientes: pacientesArrayType,
    pacientesFiltrados: pacientesArrayType,
    paciente: oneOfType([personaType, animalType, institucionType])
};