import React, {Component} from 'react';
import axios from 'axios'
import {Button, Dropdown, Header, Icon, Input, Pagination} from "semantic-ui-react";
import {Link} from "react-router-dom";

import MenuLateral from "../MenuOpciones";
import {titleCase} from './../../Services/MetodosDeValidacion';
import {urlDeterminaciones} from "../../Constants/URLs"
import {orderBy} from "lodash";
import {nroPorPagina} from "../../Constants/utils";
import './../styles.css';

class Determinaciones extends Component {
    constructor(props) {
        super(props);
        this.state = {
            determinaciones: [],
            limit: nroPorPagina[1].value,
            activePage: 1,
            totalCount: 0,
            sortParams: {
                direction: undefined
            },
            filtro: '',
            determinacionesFiltrados: []
        };
        this.cambioLimite = this.cambioLimite.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        this.getAllDeterminaciones()
    }

    getAllDeterminaciones = () => {
        axios.get(urlDeterminaciones).then((response) => {
            this.setState({
                determinaciones: Object.values(response.data).flat(),
                determinacionesFiltrados: Object.values(response.data).flat(),
                totalCount: (Object.values(response.data).flat()).length,
            });

            let filtro = orderBy(this.state.determinacionesFiltrados, [(determinacion) => determinacion.codigoPractica], ["asc"]);
            let determinaciones = orderBy(this.state.determinaciones, [(determinacion) => determinacion.codigoPractica], ["asc"]);

            this.setState({
                determinacionesFiltrados: filtro,
                determinaciones: determinaciones
            })
        }, (error) => {
            console.log('Error', error.message);
        })
    };

    cantidadPorPagina() {
        return (
            <div className='rightAlign'>
                <span>
                    Cantidad de determinaciones por página{' '}
                    <Dropdown
                        inline
                        options={nroPorPagina}
                        onChange={this.cambioLimite} value = {this.state.limit}
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
        return this.loadData(((this.state.activePage - 1) * this.state.limit), (this.state.activePage * this.state.limit));
    }

    loadData(from, to) {
        return (this.state.determinacionesFiltrados.slice(from, to))
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
            determinacionesFiltrados,
            sortParams: {direction}
        } = this.state;

        const sortDirection = direction === "desc" ? "asc" : "desc";
        const sortedCollection = orderBy(determinacionesFiltrados, [sortKey], [sortDirection]);

        this.setState({
            determinacionesFiltrados: sortedCollection,
            sortParams: {
                direction: sortDirection
            }
        });
    }

    handleSearch(valor) {
        this.setState({
            filtro: valor.target.value,
        });

        let det = this.state.determinaciones.filter(function (determinacion) {
            return ((titleCase(determinacion.descripcionPractica).includes(titleCase(valor.target.value)))||
                determinacion.codigoPractica.toString().includes(valor.target.value));
        });

        this.setState({
            determinacionesFiltrados: det,
            totalCount: det.length,
        })

    }

    bitInverse = determinacion => {
        axios.put(`/determinaciones/switch-alta/${determinacion.codigoPractica}`).then(response => {
            if (determinacion.bitAlta) {
                alert(`Se ha dado de baja la determinacion ${determinacion.descripcionPractica} con éxito.`);
                this.getAllDeterminaciones()
            } else {
                alert(`Se ha dado de alta la determinacion ${determinacion.descripcionPractica} con éxito.`);
                this.getAllDeterminaciones()
            }
            return response.data;
        }, (error) => {
            if (determinacion.bitAlta) {
                alert(`No se ha podido dar de baja ${determinacion.descripcionPractica}. Intentelo nuevamente.`)
            } else {
                alert(`No se ha podido dar de alta ${determinacion.descripcionPractica}. Intentelo nuevamente.`)
            }
            return Promise.reject({status: error.status, statusText: error.statusText});
        });
    };

    mensajeConfirmacion(determinacion) {
        if (determinacion.bitAlta) {
            return (`¿Esta seguro que quiere dar de baja la determinación ${determinacion.descripcionPractica}?`)
        } else {
            return (`¿Esta seguro que quiere dar de alta la determinación ${determinacion.descripcionPractica} ?`)
        }
    }

    estado(bitAlta) {
        if (bitAlta) {
            return "Dar de baja"
        } else {
            return "Dar de alta"
        }
    }


    render() {
        return (
            <div className='union'>
                <MenuLateral/>
                <div className='tablaListadoHistorico'>

                    <Header as='h2'>Determinaciones</Header>

                    <Button as={Link} to='/determinaciones/add' exact='true' floated='right' icon labelPosition='left' primary
                            size='small'>
                        <Icon name='lab'/> Nueva Determinación
                    </Button>

                    <br/>
                    <br/>
                    <br/>

                    <div className='union'>
                        <div className="ui icon input">

                        <Input value={this.state.filtro} onChange={this.handleSearch} placeholder='Ingrese búsqueda...' icon={{name: 'search'}}/>

                        </div>
                        {this.cantidadPorPagina()}
                    </div>

                    <table className="ui single line table">
                        <thead className='centerAlignment'>
                        <tr>
                            <th onClick={() => this.handleColumnHeaderClick("codigoPractica")}>Código Práctica</th>
                            <th onClick={() => this.handleColumnHeaderClick("descripcionPractica")}>Descripción Práctica</th>
                            <th onClick={() => this.handleColumnHeaderClick("unidadBioquimica")}>Unidad Bioquímica</th>
                            <th onClick={() => this.handleColumnHeaderClick("unidadMedida")}>Unidad Medida</th>
                            <th onClick={() => this.handleColumnHeaderClick("bitAlta")}>Opciones</th>
                        </tr>
                        </thead>

                        <tbody className='centerAlignment'>
                        {(this.loadData(((this.state.activePage - 1) * this.state.limit), (this.state.activePage * this.state.limit))).map((determinacion, index) => (
                            <tr key={index} determinacion={determinacion} className={determinacion.bitAlta ? null : "listadosBaja"}>
                                <td data-label="Código Práctica">
                                    {determinacion.codigoPractica}
                                </td>
                                <td data-label="Descripción Práctica">
                                    {determinacion.descripcionPractica}
                                </td>
                                <td data-label="Unidad Bioquimica">
                                    {determinacion.unidadBioquimica}
                                </td>
                                <td data-label="Unidad Medida">
                                    {determinacion.unidadMedida}
                                </td>
                                <td>
                                    <Dropdown item icon='ellipsis horizontal' simple>
                                        <Dropdown.Menu>
                                            <Dropdown.Item
                                                onClick={() => window.confirm(this.mensajeConfirmacion(determinacion)) ? this.bitInverse(determinacion) : null}>
                                                {this.estado(determinacion.bitAlta)}
                                            </Dropdown.Item>
                                            <Dropdown.Item as={Link} to={`/determinaciones/consulta/${determinacion.codigoPractica}`}
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
        );
    }
}


export default Determinaciones;
