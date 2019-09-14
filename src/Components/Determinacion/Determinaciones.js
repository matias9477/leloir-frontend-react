import React, {Component} from 'react';
import axios from 'axios'
import MenuLateral from "../MenuLateral";
import {Button, Header, Pagination, Icon, Input} from "semantic-ui-react";
import {Link} from "react-router-dom";
import './../styles.css';
import {urlDeterminaciones} from "../../Constants/URLs"
import {orderBy} from "lodash";

class Determinaciones extends Component {
    constructor(props) {
        super(props);
        this.state = {
            determinaciones: [],
            limit: 25,
            activePage: 1,
            totalCount: 0,
            sortParams: {
                direction: undefined
            }
        };
        this.cambioLimite = this.cambioLimite.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        // this.handleSearch = this.handleSearch.bind(this);
    }

    componentWillMount() {
        this.getAllDeterminaciones()
    }

    getAllDeterminaciones = () => {
        axios.get(urlDeterminaciones).then((response) => {
            this.setState({
                determinaciones: Object.values(response.data).flat(),
                totalCount: (Object.values(response.data).flat()).length,
            });


            let determinaciones = orderBy(this.state.determinaciones, [(determinacion) => determinacion.determinacionId], ["asc"]);

            this.setState({
                determinaciones: determinaciones,
            })
        }, (error) => {
            console.log('Error', error.message);
        })
    };

    cantdeterminacionIdadPorPagina() {
        return (
            <div className='rightAlign'>
                CantdeterminacionIdad de determinaciones por página: &nbsp;&nbsp;
                <select determinacionId='int' onChange={this.cambioLimite} value={this.state.limit}
                        className='selectCantdeterminacionIdad'>
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
        return (this.state.determinaciones.slice(from, to))
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
            determinaciones,
            sortParams: {direction}
        } = this.state;

        const sortDirection = direction === "desc" ? "asc" : "desc";
        const sortedCollection = orderBy(determinaciones, [sortKey], [sortDirection]);

        this.setState({
            determinaciones: sortedCollection,
            sortParams: {
                direction: sortDirection
            }
        });
    }

    // estado(bitAlta) {
    //     if (bitAlta) {
    //         return "Dar de baja"
    //     } else {
    //         return "Dar de alta"
    //     }
    // }

    // handleSearch(valor) {
    //     this.setState({
    //         filtro: valor.target.value,
    //     });
    //
    //     var pac = this.state.determinaciones.filter(function (determinacion) {
    //         return (determinacion.nombre.includes(valor.target.value) ||
    //             determinacion.determinacionId.toString().includes(valor.target.value) ||
    //             determinacion.metodologia.toString().includes(valor.target.value));
    //     });
    //
    //     this.setState({
    //         determinaciones: pac,
    //         totalCount: pac.length,
    //     })
    //
    // }


    render() {
        return (
            <div className='union'>
                <MenuLateral/>
                <div className='tablaDeterminaciones'>

                    <Header as='h2'>Determinaciones</Header>

                    <Button as={Link} to='/' exact='true' floated='right' icon labelPosition='left' primary
                            size='small'>
                        <Icon name='user'/> Nueva Determinacion
                    </Button>

                    <br></br>
                    <br></br>
                    <br></br>

                    <div className='union'>
                        <div className="ui icon input">


                            <Input value={this.state.filtro} onChange={this.handleSearch}
                                   placeholder='Ingrese búsqueda...' icon={{name: 'search'}}/>

                        </div>
                        {this.cantdeterminacionIdadPorPagina()}
                    </div>

                    <table className="ui single line table">
                        <thead className='centerAlignment'>
                        <tr>
                            <th onClick={() => this.handleColumnHeaderClick("determinacionId")}>Id</th>
                            <th onClick={() => this.handleColumnHeaderClick("nombre")}>Nombre</th>
                            <th onClick={() => this.handleColumnHeaderClick("metodologia")}>Metodologia</th>
                            <th onClick={() => this.handleColumnHeaderClick("descripcion")}>Descripcion</th>
                        </tr>
                        </thead>

                        <tbody className='centerAlignment'>
                        {(this.loadData(((this.state.activePage - 1) * this.state.limit), (this.state.activePage * this.state.limit))).map((determinacion, index) => (
                            <tr key={index} determinacion={determinacion}>
                                <td data-label="Número determinacion">
                                    {determinacion.determinacionId}
                                </td>
                                <td data-label="Nombre">
                                    {determinacion.nombre}
                                </td>
                                <td data-label="Metodologia">
                                    {determinacion.metodologia}
                                </td>
                                <td data-label="Descripcion">
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

Determinaciones.propTypes = {};

export default Determinaciones;
