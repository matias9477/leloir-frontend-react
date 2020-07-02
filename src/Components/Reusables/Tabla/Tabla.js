import React from 'react';
import { Header, Pagination, Input, Dropdown, Grid, Button, Icon } from 'semantic-ui-react';
import {Link } from 'react-router-dom'

import { nroPorPagina } from '../../../Constants/utils'
import { getHumanDate } from '../../../Services/MetodosPaciente';
import './tabla.css';


class Tabla extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            limit: nroPorPagina[1].value,
            activePage: 1,
            totalCount: props.data.length,
            sortParams:{
                direction: 'desc',
                param: props.param,
            }, 
            filter: '',
            param: props.param,
        }
      }

    entriesPerPage() {
        return (
            <Dropdown
            inline
            options={nroPorPagina}
            value = {this.state.limit}
            onChange={this.limitChange} 
            />          
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
            return this.filtado(this.props.data).slice(from, to)
        } 
        else {

            let {filter} = this.state
            let filteredData = []

            for (let i = 0; i < this.props.data.length; i++) {
                for (let index = 0; index < this.props.columns.length; index++) {
                    var a = this.props.columns[index].dataField
                    var b = this.props.data[i]
                
                    if (b[a]===undefined || b[a]===null) {
                        break
                    } else if (b[a].toString().toUpperCase().includes(filter.toString().toUpperCase()) === true) {
                        filteredData.push(this.props.data[i])
                        break
                    }
                }
            }

            if (this.state.totalCount !== filteredData.length) {
                this.setState({
                    totalCount: filteredData.length,
                })
            }

            if(this.state.activePage > Math.ceil(this.state.totalCount / this.state.limit) && Math.ceil(this.state.totalCount / this.state.limit) > 0){
                console.log("entro aca")
                this.setState({
                    activePage: Math.ceil(this.state.totalCount / this.state.limit)
                })
            }

            return this.filtado(filteredData).slice(from, to)
        }
    }

    checkEmptyEntry(value){
        if(value === '' || value === undefined || value === null){
            return '-'
        } 
        return value
        
    }

    actualState(bitAlta){
        if(bitAlta){
            return "Dar de baja"
        }
        else {
            return "Dar de alta"
        }
    }

    confirmationSwitchAltaMessage(obj){
        if (obj.bitAlta){
            return (`¿Esta seguro que lo quiere dar de baja?`)
        }
        else {
            return (`¿Esta seguro que quiere lo quiere dar de alta?`)
        }
    }


    getIconTipo(tipo){
        if (tipo === 'ANIMAL'){
            return 'paw'
        } else if(tipo === 'PERSONA'){
            return 'user'
        } else if(tipo === 'INSTITUCION'){
            return 'building'
        }
    }

    render(){
        const { param } = this.props

        return <div className='tabla'>
            
            <Header as='h2'>{this.props.title}</Header>
            
            <div className='filter'>
                <Grid>
                    <Grid.Column floated='left' width={4}>
                        <Input value={this.state.filter} 
                            onChange={(filter)=>
                                this.setState({
                                    filter: filter.target.value
                                })}
                                    
                            placeholder='Ingrese búsqueda...' icon={{name: 'search'}} 
                        />
                    </Grid.Column>
                    <Grid.Column floated='right'>
                        {this.entriesPerPage()}
                    </Grid.Column>
                </Grid>
            </div>
                
            <table className='ui single line table' >
                <thead className='centerAlignment'>
                    <tr>
                        {this.props.columns.map((col, index) => ( 
                            <th key={index} onClick={() => this.handleColumnHeaderClick(col.dataField)}>{col.text}</th>
                        ))}
                        {this.props.path ? <th/> : null}
                    </tr>
                </thead>
            
                <tbody className='centerAlignment'>
                
                    {(this.handleSearch(((this.state.activePage-1) * this.state.limit), (this.state.activePage * this.state.limit))).map(  (row, index) => (

                        <tr key={index} value={row}  className={(row.bitAlta===false ) ? "listadosBaja" : null}> 

                            {this.props.columns.map((col, index)=> (
                                <td key={index} data-label={col.text}>
                                    {col.type === 'Date' ? getHumanDate(row[col.dataField]) : (col.type ==='icon' ?  <Icon name={this.getIconTipo(row[col.dataField])}/> : this.checkEmptyEntry(row[col.dataField]))}
                                </td> 
                            ))}

                            {this.props.options ? <td>
                                {this.props.path ?
                                    <Button circular icon='settings'
                                    as= {Link} 
                                    to={{pathname: `${this.props.path}${this.props.data[index][param]}`, state: { prevPath: window.location.pathname }}} 
                                    exact='true' style={{marginLeft: 'auto', marginRight: 'auto'}}
                                    >
                                    </Button> 
                                : null }
                            </td>  : null}
                    
                        </tr>
                    ))}
                    
                </tbody>
            
            </table>
            <Pagination
                totalPages={Math.ceil(this.state.totalCount / this.state.limit)}
                activePage={(this.state.activePage > Math.ceil(this.state.totalCount / this.state.limit) ? Math.ceil(this.state.totalCount / this.state.limit) : this.state.activePage)}
                onPageChange={this.onChangePage}
            />
            
        </div>
        
    }

}


export default Tabla