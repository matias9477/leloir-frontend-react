import React from 'react'
import { Button, Header, Pagination, Icon, Input, Dropdown } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import SyncLoader from "react-spinners/SyncLoader"

import NavBar from '../NavBar/NavBar';
import { nroPorPagina } from "../../Constants/utils"
import { nullTo } from '../../Services/MetodosDeValidacion'
import { getDomiciliosAction, switchAltaAction } from '../../Redux/domiciliosDuck'
import './../styles.css'

class TablaDomicilio extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            limit: nroPorPagina[1].value,
            activePage: 1,
            totalCount: 0,
            sortParams:{
                direction: 'desc'
            },  
            filter: '',
            param: 'idDomicilio',
        }
      }

    componentDidMount(){
        this.props.getDomiciliosAction()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
          totalCount: nextProps.domicilios.length
        })
    }

    bitInverse = domicilio => {
        this.props.switchAltaAction(domicilio.idDomicilio)
    }

    confirmationSwitchAltaMessage(domicilio){
        if (domicilio.bitActivo){
            return (`¿Esta seguro que quiere eliminar el domicilio ${domicilio.direccion}?`)
        }
        else {
            return (`¿Esta seguro que quiere eliminar el domicilio ${domicilio.direccion}?`)
        }
    }

    domiciliosPerPage() {
        return (
            <div className='rightAlign'>
                <span>
                    Cantidad de domicilios por página:{' '}
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
            return null;
        } else {
            this.setState({
                activePage,
            })
            return (this.handleSearch(((this.state.activePage - 1) * this.state.limit), (this.state.activePage * this.state.limit)))
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

    actualState(bitActivo){
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

    handleSearch = (from, to) =>{     

        if(this.state.filter === ""){     
            return this.filtado(this.props.domicilios).slice(from, to)

        } else {
            if (this.state.activePage !== 1) {
                this.setState({
                    activePage: 1
                })
            }

            let {filter} = this.state

            const filteredDomicilios = this.props.domicilios.filter(dom =>  
                dom.idDomicilio.toString().includes(filter) ||
                ((dom.direccion===undefined || dom.direccion===null) ? null : dom.direccion.toString().includes(filter))  
            )

            if (this.state.totalCount !== filteredDomicilios.length) {
                this.setState({
                    totalCount: filteredDomicilios.length,
                })
            }

            return this.filtado(filteredDomicilios).slice(from, to)
        }
    }


    render(){
        const { fetching } = this.props
        return(
            <div className='union'>
                <NavBar/>

                <div className='tablaListadoHistorico'>

                    <Header as='h2'>Domicilios</Header>
                    
                    <Button as= {Link} to='/domicilios/add' exact='true' floated='right' icon labelPosition='left' primary size='small'>
                        <Icon name='home' /> Nuevo domicilio
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
                                {this.domiciliosPerPage()}
                            </div> 

                            <table className="ui single line table" >
                            <thead className='centerAlignment'>
                                <tr>
                                    <th onClick={() => this.handleColumnHeaderClick("idDomicilio")}  >Id</th>
                                    <th onClick={() => this.handleColumnHeaderClick("direccion")} >Direccion</th>
                                    <th onClick={() => this.handleColumnHeaderClick("descripcion")} >Descripción</th>
                                    <th onClick={() => this.handleColumnHeaderClick("paciente")} >Paciente</th>
                                    <th onClick={() => this.handleColumnHeaderClick("bitActivo")} >Opciones </th>
                                </tr>
                            </thead>
                            
                            <tbody className='centerAlignment'>
                            
                                {(this.handleSearch(((this.state.activePage-1) * this.state.limit), (this.state.activePage * this.state.limit))).map(  (domicilio, index) => (
                                <tr key={index} value={domicilio} className={ domicilio.bitActivo ? null : "listadosBaja"} > 
                                    <td data-label="Id">
                                        {domicilio.idDomicilio}
                                    </td>
                                    <td data-label="Dirección">
                                        {domicilio.direccion}
                                    </td>
                                    <td data-label="Descripción">
                                        {nullTo(domicilio.descripcion)}
                                    </td>
                                    <td data-label="Paciente">
                                        {nullTo(domicilio.paciente)}
                                    </td>
                                    <td>
                                        <Dropdown item icon='ellipsis horizontal' simple>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => window.confirm(this.confirmationSwitchAltaMessage(domicilio)) ? this.bitInverse(domicilio): null} >
                                                    {this.actualState(domicilio.bitActivo)}
                                                </Dropdown.Item>
                                                <Dropdown.Item as= {Link} to={`/domicilios/consulta/${domicilio.idDomicilio}`} exact='true'>
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
                                totalPages={this.state.filter === '' ? Math.ceil((this.props.domicilios.length) / this.state.limit) : Math.ceil((this.state.totalCount) / this.state.limit)}
                                onPageChange={this.onChangePage}
                            />
                    </div>
                    }
                </div>
            </div>
        )
    }

}

const mapStateToProps = state =>({
    fetching: state.domicilios.fetching,
    domicilios: state.domicilios.domicilios
})


export default connect(mapStateToProps,{getDomiciliosAction, switchAltaAction})(TablaDomicilio)


