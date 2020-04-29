import React, {Component} from 'react';
import axios from 'axios'
import {Button, Dropdown, Header, Icon, Input, Pagination} from "semantic-ui-react";
import {Link} from "react-router-dom";
import { connect } from 'react-redux'
import SyncLoader from "react-spinners/SyncLoader"
import { getDeterminacionesAction, switchAltaAction } from './../../Redux/determinacionesDuck'
import MenuOpciones from "../MenuOpciones";
import {titleCase} from './../../Services/MetodosDeValidacion';
import { urlConsultaDeterminacion } from "../../Constants/URLs"
import {orderBy} from "lodash";
import {nroPorPagina} from "../../Constants/utils";
import './../styles.css';

class Determinaciones extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: nroPorPagina[1].value,
            activePage: 1,
            totalCount: 0,
            sortParams: {
                direction: 'desc'
            },
            filter: '',
            param: 'idDeterminacion',
        };
        this.cambioLimite = this.cambioLimite.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        this.props.getDeterminacionesAction()
    }

    componentWillReceiveProps(nextProps) {
        	this.setState({
                totalCount: nextProps.determinaciones.length
            })
    }
    

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
        return this.handleSearch(((this.state.activePage - 1) * this.state.limit), (this.state.activePage * this.state.limit));
    }

    // loadData(from, to) {
    //     return (this.state.determinacionesFiltrados.slice(from, to))
    // }

    onChangePage = (e, {activePage}) => {
        if (activePage === this.state.activePage) {
            return null;
        } else {
            this.setState({
                activePage,
            });
            return (this.handleSearch(((this.state.activePage - 1) * this.state.limit), (this.state.activePage * this.state.limit)))
        }
    };

    handleColumnHeaderClick(sortKey) { 
        this.setState({
            param: sortKey
        })

        if (this.state.sortParams.direction === 'desc'){
            this.setState({
                sortParams: {
                    direction: 'asc'
                }
            })
        } else {
            this.setState({
                sortParams: {
                    direction: 'desc'
                }
            })
        }          
    } 


    filtrado(array){
        let { param } = this.state

        if (this.state.sortParams.direction === 'desc'){
            return array.sort((a, b) => (a[param] > b[param]) ? -1 : 1)
        } else {
            return array.sort((a, b) => (a[param] > b[param]) ? 1 : -1)
        }           
    }

    handleSearch = (from,to) => {
        if(this.state.filter === ""){
            return this.filtrado(this.props.determinaciones).slice(from,to)
        } else {
            if(this.state.activePage !== 1){
                this.setState({
                    activePage: 1
                })
            }
            
            let {filter} = this.state

            const filteredDeterminaciones = this.props.determinaciones.filter( det =>
                det.descripcionPractica.toUpperCase().includes(filter.toUpperCase()) ||
                det.codigoPractica.toString().includes(filter) ||
                det.unidadBioquimica.toString().includes(filter)||
                (det.unidadMedida===undefined ? null : det.unidadMedida.includes(titleCase(filter)))
                )

            if(this.state.totalCount !== filteredDeterminaciones.length){
                this.setState({
                    totalCount: filteredDeterminaciones.length,
                })
            }
            return this.filtrado(filteredDeterminaciones).slice(from,to)
        } 

    }

    bitInverse = determinacion => {
        this.props.switchAltaAction(determinacion.codigoPractica)
    }

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
        const { fetching } = this.props
        return (
            <div className='union'>
                <MenuOpciones/>
                <div className='tablaListadoHistorico'>

                    <Header as='h2'>Determinaciones</Header>

                    <Button as={Link} to='/determinaciones/add' exact='true' floated='right' icon labelPosition='left' primary
                            size='small'>
                        <Icon name='lab'/> Nueva Determinación
                    </Button>

                    <br/>
                    <br/>
                    <br/>

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

                        <Input value={this.state.filtro} 
                        onChange={(filter)=>
                            this.setState({
                                filter: filter.target.value
                            })}
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
                            <th>Opciones</th>
                        </tr>
                        </thead>

                        <tbody className='centerAlignment'>
                        {(this.handleSearch(((this.state.activePage - 1) * this.state.limit), (this.state.activePage * this.state.limit))).map((determinacion, index) => (
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
                                            <Dropdown.Item as={Link} to={`${urlConsultaDeterminacion}${determinacion.codigoPractica}`}
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
            }

            </div>
            </div>
        );
    }
}

const mapStateToProps = state =>({
    fetching: state.determinaciones.fetching,
    determinaciones: state.determinaciones.determinaciones
})

export default connect(mapStateToProps, { getDeterminacionesAction, switchAltaAction })(Determinaciones);
