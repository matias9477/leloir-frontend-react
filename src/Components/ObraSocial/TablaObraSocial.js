import React from 'react'
import { Button, Header, Pagination, Icon, Input, Dropdown } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import SyncLoader from "react-spinners/SyncLoader"

import MenuOpciones from '../MenuOpciones'
import { nroPorPagina } from "../../Constants/utils"
import { nullTo } from '../../Services/MetodosDeValidacion'
import { getObrasSocialesAction, switchAltaAction } from '../../Redux/obrasSocialesDuck'
import './../styles.css'

class TablaObraSocial extends React.Component {
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
            param: 'idObraSocial',
        }
      }

    componentDidMount(){
        this.props.getObrasSocialesAction()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
          totalCount: nextProps.obrasSociales.length
        })
    }

    bitInverse = obraSocial => {
        this.props.switchAltaAction(obraSocial.idObraSocial)
    }

    confirmationSwitchAltaMessage(obraSocial){
        if (obraSocial.bitActivo){
            return (`¿Esta seguro que quiere dar de baja la obra social ${obraSocial.razonSocial}?`)
        }
        else {
            return (`¿Esta seguro que quiere dar de alta la obra social ${obraSocial.razonSocial}?`)
        }
    }

    obrasSocialesPerPage() {
        return (
            <div className='rightAlign'>
                <span>
                    Cantidad de obras sociales por página:{' '}
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
            return this.filtado(this.props.obrasSociales).slice(from, to)

        } else {
            if (this.state.activePage !== 1) {
                this.setState({
                    activePage: 1
                })
            }

            let {filter} = this.state

            const filteredObrasSociales = this.props.obrasSociales.filter(os => 
                os.razonSocial.toUpperCase().includes(filter.toUpperCase()) || 
                os.idObraSocial.toString().includes(filter) ||
                ((os.cuit===undefined || os.cuit===null) ? null : os.cuit.toString().includes(filter)) ||
                ((os.telefono===undefined || os.telefono===null) ? null : os.telefono.toString().includes(filter)) 
            )

            if (this.state.totalCount !== filteredObrasSociales.length) {
                this.setState({
                    totalCount: filteredObrasSociales.length,
                })
            }

            return this.filtado(filteredObrasSociales).slice(from, to)
        }
    }


    render(){
        const { fetching } = this.props
        return(
            <div className='union'>
                <MenuOpciones/>

                <div className='tablaListadoHistorico'>

                    <Header as='h2'>Obras Sociales</Header>
                    
                    <Button as= {Link} to='/obras_sociales/add' exact='true' floated='right' icon labelPosition='left' primary size='small'>
                        <Icon name='medkit' /> Nueva Obra Social
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
                                {this.obrasSocialesPerPage()}
                            </div> 

                            <table className="ui single line table" >
                            <thead className='centerAlignment'>
                                <tr>
                                    <th onClick={() => this.handleColumnHeaderClick("idObraSocial")}  >Id</th>
                                    <th onClick={() => this.handleColumnHeaderClick("razonSocial")} >Nombre</th>
                                    <th onClick={() => this.handleColumnHeaderClick("cuit")} >Cuit</th>
                                    <th onClick={() => this.handleColumnHeaderClick("telefono")} >Teléfono</th>
                                    <th onClick={() => this.handleColumnHeaderClick("bitActivo")} >Opciones </th>
                                </tr>
                            </thead>
                            
                            <tbody className='centerAlignment'>
                            
                                {(this.handleSearch(((this.state.activePage-1) * this.state.limit), (this.state.activePage * this.state.limit))).map(  (obraSocial, index) => (
                                <tr key={index} value={obraSocial} className={ obraSocial.bitActivo ? null : "listadosBaja"} > 
                                    <td data-label="Id">
                                        {obraSocial.idObraSocial}
                                    </td>
                                    <td data-label="Nombre">
                                        {obraSocial.razonSocial}
                                    </td>
                                    <td data-label="Cuit">
                                        {nullTo(obraSocial.cuit)}
                                    </td>
                                    <td data-label="Telefono">
                                        {nullTo(obraSocial.telefono)}
                                    </td>
                                    <td>
                                        <Dropdown item icon='ellipsis horizontal' simple>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => window.confirm(this.confirmationSwitchAltaMessage(obraSocial)) ? this.bitInverse(obraSocial): null} >
                                                    {this.actualState(obraSocial.bitActivo)}
                                                </Dropdown.Item>
                                                <Dropdown.Item as= {Link} to={`/obras_sociales/consulta/${obraSocial.idObraSocial}`} exact='true'>
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
                                totalPages={this.state.filter === '' ? Math.ceil((this.props.obrasSociales.length) / this.state.limit) : Math.ceil((this.state.totalCount) / this.state.limit)}
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
    fetching: state.obrasSociales.fetching,
    obrasSociales: state.obrasSociales.obrasSociales
})


export default connect(mapStateToProps,{getObrasSocialesAction, switchAltaAction})(TablaObraSocial)


