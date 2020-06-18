import React from 'react';
import { Header, Pagination, Input, Dropdown, Grid, Button } from 'semantic-ui-react';
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
        } else {
            if (this.state.activePage !== 1) {
                this.setState({
                    activePage: 1
                })
            }

            let {filter} = this.state

            const filteredData = this.props.data.filter((data, index) =>
                this.props.columns.map(col=>(
                    (typeof(data[col.dataField]) === 'number' ? (data[col.dataField]).toString().includes(filter) : null)
                )
                )  
            )


            // const filteredData = this.props.data.filter(a =>
            //     a.analisisId.toString().includes(filter) ||
            //     a.paciente.nombre.toUpperCase().includes(filter.toUpperCase()) ||
            //     (a.paciente.apellido===undefined ? null : a.paciente.apellido.toUpperCase().includes(filter.toUpperCase())) ||
            //     (a.paciente.apellido===undefined ? null : (a.paciente.nombre + ' ' + a.paciente.apellido).toUpperCase().includes(filter.toUpperCase())) ||
            //     a.estadoAnalisis.nombre.replace('_', ' ').toUpperCase().includes(filter.toUpperCase()) ||
            //     getHumanDate(a.createdAt).toString().includes(filter)

            // )

            if (this.state.totalCount !== filteredData.length) {
                this.setState({
                    totalCount: filteredData.length,
                })
            }

            return this.filtado(filteredData).slice(from, to)

        }
    }

    checkEmptyEntry(value){
        if(value === ''){
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

    render(){
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
                        {this.props.columns.map(col => ( 
                            <th onClick={() => this.handleColumnHeaderClick(col.dataField)}>{col.text}</th>
                        ))}
                        {this.props.path ? <th/> : null}
                    </tr>
                </thead>
            
                <tbody className='centerAlignment'>
                
                    {(this.handleSearch(((this.state.activePage-1) * this.state.limit), (this.state.activePage * this.state.limit))).map(  (row, index) => (

                        <tr key={index} value={row}  className={(row.bitAlta===false ) ? "listadosBaja" : null}> 

                            {this.props.columns.map((col, index)=> (
                                <td data-label={col.text}>
                                    {col.type === 'Date' ? getHumanDate(row[col.dataField]) : (this.checkEmptyEntry(row[col.dataField]))}
                                </td> 
                            ))}

                            {this.props.options ? <td>
                                {this.props.path ?
                                    <Button circular icon='settings'
                                    as= {Link} 
                                    to={{pathname: `${this.props.path}${row[this.props.param]}`, state: { prevPath: window.location.pathname }}} 
                                    exact='true' style={{marginLeft: 'auto', marginRight: 'auto'}}>
                                    </Button> 
                                : null }
                            </td>  : null}
                    
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

}


export default Tabla