import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Header, Button, Icon } from 'semantic-ui-react';
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
       // onRowClick: function(row){
       //     if (window.confirm(`¿Quiere modificar al paciente: ${row.nombre} ${row.apellido}?`)) { 
         //       window.open(console.log('you have just canceled'), console.log("Thanks for Visiting!"));
          //    }   
       // }

    }

    alta = (row, cell) => {
        return (<Button onClick={this.func}
            icon={row === true ? 'trash' : 'undo'}
            className={row ? "ui red button" : 'twitter'} />
        )
    }

    func(){
        return alert("me has tocao")
    }

    consulta = (cell) => {
        console.log(cell)
        return (<Button as={Link} to='/pacientes/consulta' 
            icon='user'
            className='twitter'/>
        )
    }

    logicDelete = cell => {
        console.log(cell)
        fetch(`/pacientes/dar-de-baja/${cell.id}`, {
            method: 'PUT', 
            headers:{
            'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert(`Se ha eliminado el paciente ${cell.nombre} ${cell.apellido} con éxito.`);
                return response.text();
            } else {
                alert('No se ha podido eliminar el paciente.');
                return Promise.reject({status: response.status, statusText: response.statusText});
            }
            })
        
    }      

        
    render(){
        return(
            <div className='union'>
                <MenuLateral/>
           
            <div className='tablaPacientes'>
                <div className='headeryboton'>
                <Header as='h2'>Pacientes</Header>
                
                <Button className='boton' as= {Link} to='/pacientes/add' floated='right' icon labelPosition='left' primary size='small'>
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
                    <TableHeaderColumn dataField='bitAlta' dataAlign="center" dataSort dataFormat={ this.alta }>Operaciones</TableHeaderColumn>
                    <TableHeaderColumn dataField='bitAlta' dataAlign="center" >Consulta</TableHeaderColumn>
                </BootstrapTable>
            </div>
            </div>
        )
    }
}