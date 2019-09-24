import React, {Component} from 'react';
import axios from 'axios'
import MenuLateral from "../MenuOpciones";
import {Button, Dropdown, Header, Icon, Input, Pagination} from "semantic-ui-react";
import {Link} from "react-router-dom";
import './../styles.css';
import {titleCase} from './../../Services/MetodosDeValidacion';
import {urlDeterminaciones} from "../../Constants/URLs"
import {orderBy} from "lodash";
import {arrayOf, number, oneOf, shape, string} from "prop-types";
import {determinacionType} from "../../Types";
import {nroPorPagina} from "../../Constants/utils";

class Determinaciones extends Component {
    constructor(props) {
        super(props);
        this.state = {
            determinaciones: [],
            limit: nroPorPagina[0].value,
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


                            <Input value={this.state.filtro} onChange={this.handleSearch}
                                   placeholder='Ingrese búsqueda...' icon={{name: 'search'}}/>

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
                        </tr>
                        </thead>

                        <tbody className='centerAlignment'>
                        {(this.loadData(((this.state.activePage - 1) * this.state.limit), (this.state.activePage * this.state.limit))).map((determinacion, index) => (
                            <tr key={index} determinacion={determinacion}>
                                <td data-label="Código determinacion">
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

Determinaciones.propTypes = {
    determinacion: determinacionType,
    determinaciones: arrayOf(determinacionType),
    determinacionesFiltrados: arrayOf(determinacionType),
    limit: number,
    activePage: number,
    totalCount: number,
    filtro: string,
    sortParams: shape({
        direction: oneOf(['asc', 'desc'])
    })
};

export default Determinaciones;
