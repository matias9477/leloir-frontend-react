import React, {Component} from 'react';
import axios from 'axios'
import MenuLateral from "../MenuOpciones";
import {Button, Dropdown, Header, Icon, Input, Pagination} from "semantic-ui-react";
import {Link} from "react-router-dom";
import './../styles.css';
import {convertStyleString} from './../../Services/MetodosPaciente';
import {urlDeterminaciones} from "../../Constants/URLs"
import {orderBy} from "lodash";
import {arrayOf, number, oneOf, shape, string} from "prop-types";
import {determinacionType} from "../../Types";


const nroPorPagina = [
    {
        key: 10,
        text: '10',
        value: 10,
    },
    {
        key: 25,
        text: '25',
        value: 25,
    },
    {
        key: 50,
        text: '50',
        value: 50,
    },
    {
        key: 100,
        text: '100',
        value: 100,
    }
];

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

            let filtro = orderBy(this.state.determinacionesFiltrados, [(determinacion) => determinacion.id], ["asc"]);
            let determinaciones = orderBy(this.state.determinaciones, [(determinacion) => determinacion.id], ["asc"]);

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
                        defaultValue={nroPorPagina[0].value}
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
            return (determinacion.nombre.includes(convertStyleString(valor.target.value)) ||
                determinacion.id.toString().includes(valor.target.value) ||
                determinacion.metodologia.toString().includes(convertStyleString(valor.target.value)));
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

                    <Button as={Link} to='/' exact='true' floated='right' icon labelPosition='left' primary
                            size='small'>
                        <Icon name='user'/> Nueva Determinación
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
                            <th onClick={() => this.handleColumnHeaderClick("id")}>Id</th>
                            <th onClick={() => this.handleColumnHeaderClick("nombre")}>Nombre</th>
                            <th onClick={() => this.handleColumnHeaderClick("metodologia")}>Metodología</th>
                            <th onClick={() => this.handleColumnHeaderClick("descripcion")}>Descripción</th>
                        </tr>
                        </thead>

                        <tbody className='centerAlignment'>
                        {(this.loadData(((this.state.activePage - 1) * this.state.limit), (this.state.activePage * this.state.limit))).map((determinacion, index) => (
                            <tr key={index} determinacion={determinacion}>
                                <td data-label="Número determinacion">
                                    {determinacion.id}
                                </td>
                                <td data-label="Nombre">
                                    {determinacion.nombre}
                                </td>
                                <td data-label="Metodología">
                                    {determinacion.metodologia}
                                </td>
                                <td data-label="Descripción">
                                    {determinacion.descripcion}
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
