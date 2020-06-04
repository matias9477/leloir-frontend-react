import React from 'react'
import { Header, Pagination, Input, Dropdown } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import ClipLoader from "react-spinners/ClipLoader"

import NavBar from '../NavBar/NavBar'
import { nroPorPagina } from "../../Constants/utils"
import { getMuestrasAction, switchAltaAction } from '../../Redux/muestrasDuck'
import './../styles.css'

class TablaMuestra extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            limit: nroPorPagina[1].value,
            activePage: 1,
            totalCount: 0,
            sortParams:{
                direction: 'desc'
            },  
            filter: '',
            param: 'idMuestra',
        }
    }

    componentDidMount(){
        this.props.getMuestrasAction()
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            totalCount: nextProps.muestras.length
        })
    }

    bitInverse = muestra => {
        this.props.switchAltaAction(muestra.idMuestra)
    }

    mensajeConfirmacion(muestra){
        if (muestra.bitActivo){
            return (`¿Esta seguro que quiere dar de baja la muestra ${muestra.idMuestra}?`)
        }
        else {
            return (`¿Esta seguro que quiere dar de alta la muestra ${muestra.idMuestra}?`)
        }
    }

    muestrasPerPage() {
        return (
            <div className='rightAlign'>
                <span>
                    Cantidad de muestras por página:{' '}
                    <Dropdown
                        inline
                        options={nroPorPagina}
                        value = {this.state.limit}
                        onChange={this.limitChange}
                    />
                </span>
            </div>
        )
    }

    limitChange = (e, data) => {
        this.setState({
            limit: data.value,
            activePage: 1,
        })
        return this.handleSearch(((this.state.activePage - 1) * this.state.limit), (this.state.activePage * this.state.limit))
    }

    onChangePage = (e, {activePage}) => {
        if (activePage === this.state.activePage){
            return null
        } else {
            this.setState({
                activePage,
            })
            return (this.handleSearch(((this.state.activePage-1) * this.state.limit), (this.state.activePage * this.state.limit) ))
        }
    }

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

    estado(bitActivo){
        if(bitActivo){
            return "Dar de baja"
        }
        else {
            return "Dar de alta"
        }
    }

    filtado(array){
        let { param } = this.state

        if (this.state.sortParams.direction === 'desc'){
            return array.sort((a, b) => (a[param] > b[param]) ? -1 : 1)
        } else {
            return array.sort((a, b) => (a[param] > b[param]) ? 1 : -1)
        }           
    }

    handleSearch = (from, to) => {
        
        if(this.state.filter === ""){     
            return this.filtado(this.props.muestras).slice(from, to)

        } else {
            if (this.state.activePage !== 1) {
                this.setState({
                    activePage: 1
                })
            }

            let {filter} = this.state

            const filteredMuestras = this.props.muestras.filter(m => 
                m.idMuestra.toString().includes(filter) ||
                ((m.tipoMuestra===undefined || m.tipoMuestra===null) ? null : m.tipoMuestra.toUpperCase().includes(filter.toUpperCase())) ||
                m.estado.toUpperCase().includes(filter.toUpperCase()) ||
                m.paciente.toUpperCase().includes(filter.toUpperCase())
            )

            if (this.state.totalCount !== filteredMuestras.length) {
                this.setState({
                    totalCount: filteredMuestras.length,
                })
            }

            return this.filtado(filteredMuestras).slice(from, to)
        }

    }


    render(){
        const { fetching } = this.props
        return(
            <div className='union'>
                <NavBar/>

                <div className='tablaListadoHistorico'>

                    <Header as='h2'>Muestras</Header>

                    <br></br>
                    <br></br>
                    <br></br>
                    
                    {fetching ? <div className='spinnerPosition'> 
                        <ClipLoader
                        size={50}
                        color={"black"}
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
                                {this.muestrasPerPage()}
                            </div>

                            <table className="ui single line table" >
                                <thead className='centerAlignment'>
                                <tr>
                                    <th onClick={() => this.handleColumnHeaderClick("idMuestra")}  >Muestra</th>
                                    <th onClick={() => this.handleColumnHeaderClick("paciente")} >Paciente</th>
                                    <th onClick={() => this.handleColumnHeaderClick("analisisId")} >Analisis</th>
                                    <th onClick={() => this.handleColumnHeaderClick("tipoMuestra")} >Tipo Muestra</th>
                                    <th onClick={() => this.handleColumnHeaderClick("idEstado")} >Estado</th>
                                    <th>Opciones</th>
                                </tr>
                                </thead>

                                <tbody className='centerAlignment'>

                                {(this.handleSearch(((this.state.activePage-1) * this.state.limit), (this.state.activePage * this.state.limit))).map(  (muestra, index) => (
                                    <tr key={index} value={muestra} className={ muestra.bitActivo ? null : "listadosBaja"} >
                                        <td data-label="Id Muestra">
                                            {muestra.idMuestra}
                                        </td>
                                        <td data-label="Paciente">
                                            {muestra.paciente}
                                        </td>
                                        <td data-label="Analisis">
                                            {muestra.analisisId}
                                        </td>
                                        <td data-label="Tipo Muestra">
                                            {muestra.tipoMuestra}
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
                                                        Ver/Modificar Proximamente
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
                                totalPages={this.state.filter === '' ? Math.ceil((this.props.muestras.length) / this.state.limit) : Math.ceil((this.state.totalCount) / this.state.limit)}
                                onPageChange={this.onChangePage}
                            />
                        </div>
                    }
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    fetching: state.muestras.fetching,
    muestras: state.muestras.muestras,
})

export default connect(mapStateToProps, {getMuestrasAction, switchAltaAction}) (TablaMuestra)