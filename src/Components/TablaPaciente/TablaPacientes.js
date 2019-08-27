import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Header, Button, Icon, Menu } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import './tablaStyles.css';
import MenuLateral from '../MenuLateral';

export default class TablaPacientes extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          pacientes: []
        }
      }

    componentWillMount(){
        this.fetchPacientesAll();
    }

    fetchPacientesAll = () => {
        const urlPacientes = '/pacientes/all';
        fetch(urlPacientes).then ( resolve => {
            if(resolve.ok) { 
                return resolve.json();
            } else {
                throw Error(resolve.statusText);
            }
        }).then(pac => {
            this.setState({
                pacientes: Object.values(pac).flat()
            })
        })
    }


    
    rowclick = {
        sortIndicator: false,
        onRowClick: function(row){
            alert(`¿Quiere modificar al paciente: ${row.id}?`);
        }
    }


    renderShowsTotal() {
        return (
          <p> Cantidad de pacientes por página </p>
        );
      }

      
    options = {
        page: 1,  
        sizePerPageList: [ {
        text: '10', value: 10
        }, {
        text: '25', value: 25
        }, {
            text: '50', value: 50
        }, {
            text: '100', value: 100
        } ], // you can change the dropdown list for size per page
        sizePerPage: 25,  // which size per page you want to locate as default
        pageStartIndex: 1, // where to start counting the pages
        paginationSize: 3,  // the pagination bar size.
        //prePage: 'Anterior', // Previous page button text
        //nextPage: 'Siguiente', // Next page button text
        //firstPage: 'Primera', // First page button text
        //lastPage: 'Última', // Last page button text
        paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
        paginationPosition: 'bottom',  // default is bottom, top and both is all available
        // hideSizePerPage: true // > You can hide the dropdown for sizePerPage
        alwaysShowAllBtns: true, // Always show next and previous button
        // withFirstAndLast: false > Hide the going to First and Last page button

        sortIndicator: false,
        onRowClick: function(row){
            if (window.confirm(`¿Quiere modificar al paciente: ${row.nombre} ${row.apellido}?`)) { 
                window.open(console.log('you have just canceled'), console.log("Thanks for Visiting!"));
              }   
        }

    }

    alta(row) {
        return <Button
                   icon={row.bitAlta ? 'trash' : 'undo'}
                   />
      }

        
    render(){
        return(
            <div>
                <MenuLateral/>
           
            <div className='tablaPacientes'>
                <div className='headeryboton'>
                <Header as='h2'>Pacientes</Header>
                
                <Button className='boton' as= {Link} to='/pacientes/add' exact floated='right' icon labelPosition='left' primary size='small'>
                    <Icon name='user' /> Nuevo Paciente
                </Button>
                
                </div>
                
                <BootstrapTable
                data={this.state.pacientes}
                pagination = { true }
                search={ true }
                options={this.options}
                striped={true}
                searchPlaceholder='Ingrese búsqueda de paciente'
                >
                    <TableHeaderColumn dataField='id' isKey dataSort filter={ { type: 'TextFilter', delay: 10 } } dataAlign="center">Número de Paciente</TableHeaderColumn>
                    <TableHeaderColumn dataField='nombre' dataSort dataAlign="center">Nombre</TableHeaderColumn>
                    <TableHeaderColumn dataField='apellido' dataSort dataAlign="center">Apellido</TableHeaderColumn>
                    <TableHeaderColumn dataField='nroDocumento' dataSort dataAlign="center">Número de Documento</TableHeaderColumn>
                    <TableHeaderColumn dataField='bitAlta' dataAlign="center" dataSort  dataFormat={ this.alta }>Operaciones</TableHeaderColumn>
                </BootstrapTable>
            </div>
            </div>
        )
    }
}