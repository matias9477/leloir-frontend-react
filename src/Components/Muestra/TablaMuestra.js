import React from 'react';
import axios from 'axios';
import { Button, Header, Pagination, Icon, Input, Dropdown } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import { orderBy } from 'lodash';

import MenuOpciones from '../MenuOpciones';
import { urlMuestras } from './../../Constants/URLs';
import { nroPorPagina } from "../../Constants/utils";
import './../styles.css';

export default class TablaMuestra extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            muestras: [],
            limit: nroPorPagina[1].value,
            activePage: 1,
            totalCount: 0,
            sortParams:{
                direction: undefined
            },
            filtro: '',
            muestrasFiltrados: [],
        };
        this.cambioLimite = this.cambioLimite.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount(){
        this.fetchMuestrasAll();
    }

    fetchMuestrasAll = () => {
        axios.get(urlMuestras).then(resolve => {
            this.setState({
                muestras: Object.values(resolve.data).flat(),
                muestrasFiltrados: Object.values(resolve.data).flat(),
                totalCount: (Object.values(resolve.data).flat()).length,
            });

            var filtro = orderBy(this.state.muestrasFiltrados, [(muestra) => muestra.bitActivo, (muestra) => muestra.idMuestra
            ], ["desc", "desc"]);
            var arr = orderBy(this.state.muestras, [(muestra) => muestra.bitActivo, (muestra) => muestra.idMuestra
            ], ["desc", "desc"]);

            this.setState({
                muestrasFiltrados: filtro,
                muestras: arr,
            })

        }, (error) => {
            console.log('Error', error.message);
        })
    };

    bitInverse = muestra => {
        axios.put(`muestra/switch-alta/${muestra.idMuestra}`).then(response => {
            if (muestra.bitActivo) {
                alert(`Se ha dado de baja la muestra ${muestra.idMuestra} con éxito.`);
                this.fetchMuestrasAll()
            } else {
                alert(`Se ha dado de alta la muestra ${muestra.idMuestra} con éxito.`);
                this.fetchMuestrasAll()
            }
        }, (error) => {
            if (muestra.bitActivo) {
                alert(`No se ha podido dar de baja la muestra ${muestra.idMuestra}. Intentelo nuevamente.`)
            } else {
                alert(`No se ha podido dar de alta la muestra. ${muestra.idMuestra} Intentelo nuevamente.`)
            }
        })
    };

    mensajeConfirmacion(muestra){
        if (muestra.bitActivo){
            return (`¿Esta seguro que quiere dar de baja la muestra ${muestra.idMuestra}?`)
        }
        else {
            return (`¿Esta seguro que quiere dar de alta la muestra ${muestra.idMuestra}?`)
        }
    }

    cantidadPorPagina() {
        return (
            <div className='rightAlign'>
                <span>
                    Cantidad de muestras por página:{' '}
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
        return this.loadData(((this.state.activePage - 1) * this.state.limit), (this.state.activePage * this.state.limit));
    }

    loadData(from, to){
        return (this.state.muestrasFiltrados.slice(from, to))
    }

    onChangePage = (e, {activePage}) => {
        if (activePage === this.state.activePage){
            return null;
        } else {
            this.setState({
                activePage,
            });
            return (this.loadData(((this.state.activePage-1) * this.state.limit), (this.state.activePage * this.state.limit) ))
        }
    };

    handleColumnHeaderClick(sortKey) {
        const {
            muestrasFiltrados,
            sortParams: { direction }
        } = this.state;

        const sortDirection = direction === "desc" ? "asc" : "desc";
        const sortedCollection = orderBy(muestrasFiltrados, [sortKey], [sortDirection]);

        this.setState({
            muestrasFiltrados: sortedCollection,
            sortParams: {
                direction: sortDirection
            }
        });
    }

    estado(bitActivo){
        if(bitActivo){
            return "Dar de baja"
        }
        else {
            return "Dar de alta"
        }
    }

    handleSearch(valor){
        this.setState({
            filtro: valor.target.value,
        })

        var mu = this.state.muestras.filter(function (muestra) {
           return ((muestra.idMuestra === undefined ? null : muestra.idMuestra.toString().includes(valor.target.value)) ||
               (muestra.analisisId === undefined ? null : muestra.analisisId.toString().includes(valor.target.value)) );
        });

        this.setState({
            muestrasFiltrados: mu,
            totalCount: mu.length,
        })

    }


    render(){
        return(
            <div className='union'>
                <MenuOpciones/>

                <div className='tablaListadoHistorico'>

                    <Header as='h2'>Muestras</Header>

                    <Button as= {Link} to='/muestras/add' exact='true' floated='right' icon labelPosition='left' primary size='small'>
                        <Icon name='lab' /> Nueva Muestra
                    </Button>

                    <br></br>
                    <br></br>
                    <br></br>

                    <div className='union'>
                        <div className="ui icon input">

                            <Input value={this.state.filtro} onChange={this.handleSearch} placeholder='Ingrese búsqueda...' icon={{ name: 'search' }}/>

                        </div>
                        {this.cantidadPorPagina()}
                    </div>

                    <table className="ui single line table" >
                        <thead className='centerAlignment'>
                        <tr>
                            <th onClick={() => this.handleColumnHeaderClick("idMuestra")}  >Muestra</th>
                            <th onClick={() => this.handleColumnHeaderClick("analisisId")}  >Analisis</th>
                            <th onClick={() => this.handleColumnHeaderClick("tipoMuestra")} >Tipo Muestra</th>
                            <th onClick={() => this.handleColumnHeaderClick("createdAt")} >Fecha</th>
                            <th onClick={() => this.handleColumnHeaderClick("idEstado")} >Estado</th>
                            <th onClick={() => this.handleColumnHeaderClick("bitAlta")}>Opciones</th>
                        </tr>
                        </thead>

                        <tbody className='centerAlignment'>

                        {(this.loadData(((this.state.activePage-1) * this.state.limit), (this.state.activePage * this.state.limit))).map(  (muestra, index) => (
                            <tr key={index} value={muestra} className={ muestra.bitActivo ? null : "listadosBaja"} >
                                <td data-label="Id Muestra">
                                    {muestra.idMuestra}
                                </td>
                                <td data-label="Analisis">
                                    {muestra.analisisId}
                                </td>
                                <td data-label="Tipo Muestra">
                                    {muestra.tipoMuestra}
                                </td>
                                <td data-label="Fecha Alta">
                                    {muestra.createdAt}
                                </td>
                                <td data-label="Estado">
                                    {muestra.estado}
                                </td>
                                <td>
                                    <Dropdown item icon='ellipsis horizontal' simple>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => window.confirm(this.mensajeConfirmacion(muestra)) ? this.bitInverse(muestra): null} >
                                                {this.estado(muestra.bitActivo)}
                                            </Dropdown.Item>
                                            <Dropdown.Item as= {Link} to={`/muestras/id/${muestra.idMuestra}`} exact='true'>
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
