import React from 'react'
import { Button, Header, Pagination, Icon, Input, Dropdown } from 'semantic-ui-react'
import {Link } from 'react-router-dom'
import { connect } from 'react-redux'
import SyncLoader from "react-spinners/SyncLoader"

import NavBar from '../NavBar/NavBar'
import { nroPorPagina } from "../../Constants/utils"
import { getHumanDate } from '../../Services/MetodosPaciente'
import { getAnalisisAction } from '../../Redux/analisisDuck'
import './../styles.css'

class TablaObraSocial extends React.Component {
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
            param: 'analisisId',
        }
      }

    componentDidMount(){
        this.props.getAnalisisAction()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
          totalCount: nextProps.analisis.length
        })
    }

    analisisPerPage() {
        return (
            <div className='rightAlign'>
                <span>
                    Cantidad de análisis por página:{' '}
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

    filtado(array){
        let { param } = this.state

        if (this.state.sortParams.direction === 'desc'){
            return array.sort((a, b) => (a[param] > b[param]) ? -1 : 1)
        } else {
            return array.sort((a, b) => (a[param] > b[param]) ? 1 : -1)
        }           
    }

    handleSearch = (from, to) => {
        if (this.state.filter === ''){
            return this.filtado(this.props.analisis).slice(from, to)
        } else {
            if (this.state.activePage !== 1) {
                this.setState({
                    activePage: 1
                })
            }

            let {filter} = this.state

            const filteredAnalisis = this.props.analisis.filter(a =>
                a.analisisId.toString().includes(filter) ||
                a.paciente.nombre.toUpperCase().includes(filter.toUpperCase()) ||
                (a.paciente.apellido===undefined ? null : a.paciente.apellido.toUpperCase().includes(filter.toUpperCase())) ||
                (a.paciente.apellido===undefined ? null : (a.paciente.nombre + ' ' + a.paciente.apellido).toUpperCase().includes(filter.toUpperCase())) ||
                a.estadoAnalisis.nombre.toUpperCase().includes(filter.toUpperCase()) ||
                getHumanDate(a.createdAt).toString().includes(filter)

            )

            if (this.state.totalCount !== filteredAnalisis.length) {
                this.setState({
                    totalCount: filteredAnalisis.length,
                })
            }

            return this.filtado(filteredAnalisis).slice(from, to)

        }
    }


    render(){
        const { fetching } = this.props

        return(
            <div className='union'>
                <NavBar/>

                <div className='tablaListadoHistorico'>

                    <Header as='h2'>Análisis</Header>
                    
                    <Button as= {Link} to='/analisis/add' exact='true' floated='right' icon labelPosition='left' primary size='small'>
                        <Icon name='syringe' /> Nuevo Análisis
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
                                {this.analisisPerPage()}
                            </div> 

                            <table className="ui single line table" >
                            <thead className='centerAlignment'>
                                <tr>
                                    <th onClick={() => this.handleColumnHeaderClick("analisisId")} >Id</th>
                                    <th onClick={() => this.handleColumnHeaderClick("createdAt")} >Fecha</th>
                                    <th onClick={() => this.handleColumnHeaderClick("paciente.nombre")} >Paciente</th>
                                    <th onClick={() => this.handleColumnHeaderClick("estado.nombre")} >Estado</th>
                                    <th>Opciones </th>
                                </tr>
                            </thead>
                            
                            <tbody className='centerAlignment'>
                            
                                {(this.handleSearch(((this.state.activePage-1) * this.state.limit), (this.state.activePage * this.state.limit))).map(  (analisis, index) => (
                                <tr key={index} value={analisis}> 
                                    <td data-label="Id">
                                        {analisis.analisisId}
                                    </td>
                                    <td data-label="Fecha">
                                        {getHumanDate(analisis.createdAt)}
                                    </td>
                                    <td data-label="Nombre">
                                    {analisis.paciente.nombre}&nbsp;{analisis.paciente.apellido}
                                    </td>
                                    <td data-label="Telefono">
                                        {analisis.estadoAnalisis.nombre}
                                    </td>
                                    <td>
                                        <Dropdown item icon='ellipsis horizontal' simple>
                                            <Dropdown.Menu>
                                                <Dropdown.Item as= {Link} to={{pathname: `/analisis/consulta/${analisis.analisisId}`, state: { prevPath: window.location.pathname }}} exact='true'>
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
                                totalPages={this.state.filter === '' ? Math.ceil((this.props.analisis.length) / this.state.limit) : Math.ceil((this.state.totalCount) / this.state.limit)}
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
    fetching: state.analisis.fetching,
    analisis: state.analisis.analisisAll
})

export default connect(mapStateToProps, { getAnalisisAction })(TablaObraSocial)