import React from 'react';
import { Button, Header, Pagination, Icon, Input, Dropdown } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import { orderBy } from "lodash";
import MenuLateral from '../MenuLateral';
import './../styles.css';


export default class Tabla2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          pacientes: [],
          limit: 25,
          activePage: 1,
          totalCount: 0,
          sortParams:{
              direction: undefined
          },
          filtered: [],
        }
        this.cambioLimite = this.cambioLimite.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
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
                pacientes: Object.values(pac).flat(),
                totalCount: (Object.values(pac).flat()).length,
                filtered: pac,
            })
            
            var newArr = orderBy(this.state.pacientes, [(paciente) => paciente.bitAlta, (paciente) => paciente.id
              ], ["desc", "desc"]);
            this.setState({
                pacientes: newArr
            })
        })
    }

    bitInverse = paciente => {
        fetch(`/pacientes/switch-alta/${paciente.id}`, {
          method: 'PUT', 
          headers:{
          'Content-Type': 'application/json'
          }
      }).then(response => {
          if (response.ok) {
            if(paciente.bitAlta) { 
                alert(`Se ha eliminado el paciente ${paciente.nombre} ${paciente.apellido} con éxito.`)
                this.fetchPacientesAll()
            } else {
                alert(`Se ha dado de alta al paciente ${paciente.nombre} ${paciente.apellido} con éxito.`)
                this.fetchPacientesAll()
            }
              return response.text();
          } else {
            if(paciente.bitAlta) { 
                alert(`No se ha podido eliminar el paciente ${paciente.nombre} ${paciente.apellido}. Intentelo nuevamente.`)
              } else {
                alert(`No se ha podido dar de alta al paciente ${paciente.nombre} ${paciente.apellido}. Intentelo nuevamente.`)
              }
              return Promise.reject({status: response.status, statusText: response.statusText});
          }
          });
    }

    mensajeConfirmacion(paciente){
        if (paciente.bitAlta){
            return (`¿Esta seguro que quiere eliminar al paciente ${paciente.nombre} ${paciente.apellido}?`)
        }
        else {
            return (`¿Esta seguro que quiere dar de alta al paciente ${paciente.nombre} ${paciente.apellido}?`)
        }
    }

    cantidadPorPagina(){
        return ( 
        <div className='rightAlign'>
            Cantidad de pacientes por página: &nbsp;&nbsp; 
            <select id='int' onChange={this.cambioLimite} value={this.state.limit} className='selectCantidad'>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
        </div>
        
        )
    }

    cambioLimite(e){
        this.setState( {
            limit: e.target.value,
            activePage: 1,
        })
        return this.loadData(((this.state.activePage-1) * this.state.limit), (this.state.activePage * this.state.limit));
    }

    loadData(from, to){
        return (this.state.pacientes.slice(from, to))
    }

    onChangePage = (e, {activePage}) => {
        if (activePage === this.state.activePage){
            return null;
        } else {
            this.setState({
                activePage,
            })
            return (this.loadData(((this.state.activePage-1) * this.state.limit), (this.state.activePage * this.state.limit) ))
        }        
    };
    
    handleColumnHeaderClick(sortKey) {
        const {  
          pacientes,  
          sortParams: { direction }  
        } = this.state;
  
        const sortDirection = direction === "desc" ? "asc" : "desc";
        const sortedCollection = orderBy(pacientes, [sortKey], [sortDirection]);
  
        this.setState({  
          pacientes: sortedCollection,  
          sortParams: {  
            direction: sortDirection  
          }  
        });  
    } 
    
    handleSearch(e){
        console.log(e.target.value)
        
        // var filtrado = this.state.pacientes.filter(function(filtro){
        //     console.log(filtro === e);
        // })


        // this.state.pacientes.map(function(filtro){
        //     if(filtro.filter(e)){
        //         console.log("Si")
        //     }
        //     console.log(filtro.id)
        // })

        let newArray = this.state.pacientes.filter(
            this.state.pacientes.id === e || this.state.pacientes.nombre === e || this.state.pacientes.apellido === e || this.state.pacientes.nroDocumento === e
        )

        console.log(newArray)

    }
  
    estado(bitAlta){
        if(bitAlta){
            return "Dar de baja"
        }
        else {
            return "Dar de alta"
        }
    }

    render(){
        return(
            <div className='union'>
                <MenuLateral/>

                <div className='tablaPacientes'>

                    <Header as='h2'>Pacientes</Header>
                    
                    <Button as= {Link} to='/pacientes/add' exact='true' floated='right' icon labelPosition='left' primary size='small'>
                        <Icon name='user' /> Nuevo Paciente
                    </Button>
                  
                    <br></br>
                    <br></br>
                    <br></br>
                   
                    <div className='union'>
                        <div className="ui icon input">
                            <Input type='text' onChange={this.handleSearch} placeholder='Ingrese búsqueda...' />
                            <i aria-hidden="true" className="search icon"></i>
                        </div>
                        {this.cantidadPorPagina()}
                    </div> 

                    <table className="ui single line table" >
                    <thead className='centerAlignment'>
                        <tr>
                            <th onClick={() => this.handleColumnHeaderClick("id")}  >Número Paciente</th>
                            <th onClick={() => this.handleColumnHeaderClick("nombre")} >Nombre</th>
                            <th onClick={() => this.handleColumnHeaderClick("apellido")} >Apellido</th>
                            <th onClick={() => this.handleColumnHeaderClick("nroDocumento")} >Número de Documento</th>
                            <th onClick={() => this.handleColumnHeaderClick("bitAlta")} >Opciones </th>
                        </tr>
                    </thead>
                    
                    <tbody className='centerAlignment'>
                    
                        {(this.loadData(((this.state.activePage-1) * this.state.limit), (this.state.activePage * this.state.limit))).map(  (paciente, index) => (
                        <tr key={index} paciente={paciente} className={ paciente.bitAlta ? null : "pacienteBaja"} > 
                            <td data-label="Número Paciente">
                                {paciente.id}
                            </td>
                            <td data-label="Nombre">
                                {paciente.nombre}
                            </td>
                            <td data-label="Apellido">
                                {paciente.apellido}
                            </td>
                            <td data-label="Número de Documento">
                                {paciente.nroDocumento}
                            </td>
                            <td>
                                <Dropdown item icon='ellipsis horizontal' simple>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => window.confirm(this.mensajeConfirmacion(paciente)) ? this.bitInverse(paciente): null} >
                                            {this.estado(paciente.bitAlta)}
                                        </Dropdown.Item>
                                        <Dropdown.Item as= {Link} to={`/pacientes/consulta/${paciente.id}`} exact='true'>
                                            Ver/Modificar
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>




                                {/* <Button onClick={() => window.confirm(this.mensajeConfirmacion(paciente)) ? this.bitInverse(paciente): null} 
                                    className={paciente.bitAlta ? "ui red button" : 'twitter'}
                                    icon={paciente.bitAlta ? 'trash' : 'undo'}>
                                </Button> */}

                                {/* <Button onClick={() => window.confirm(`¿Quiere ver más datos del paciente ${paciente.nombre} ${paciente.apellido}?`) ? (alert("Acceso")): null} 
                                    className="ui pink button" 
                                    icon='user' >
                                </Button> */}
                                
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