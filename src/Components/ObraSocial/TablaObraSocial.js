import React from 'react';
import { Button, Header, Pagination, Icon, Input, Dropdown } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import { orderBy } from 'lodash';
import MenuOpciones from '../MenuOpciones';
import { urlObrasSoc } from './../../Constants/URLs';
import './../styles.css';

export default class TablaObraSocial extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          obrasSociales: [],
          limit: 25,
          activePage: 1,
          totalCount: 0,
          sortParams:{
              direction: undefined
          },  
          filtro: '',
          obrasSocialesFiltrados: [],
        }
        this.cambioLimite = this.cambioLimite.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
      }

    componentWillMount(){
        this.fetchobrasSocialesAll();
    }

    fetchobrasSocialesAll = () => {
        fetch(urlObrasSoc).then ( resolve => {
            if(resolve.ok) { 
                return resolve.json();
            } else {
                throw Error(resolve.statusText);
            }
        }).then(obrasSociales => {
            this.setState({
                obrasSociales: Object.values(obrasSociales).flat(),
                obrasSocialesFiltrados: Object.values(obrasSociales).flat(),
                totalCount: Object.values(obrasSociales).flat().length,
            })
            
            var filtro = orderBy(this.state.obrasSocialesFiltrados, [(obraSocial) => obraSocial.bitActivo, (obraSocial) => obraSocial.idObraSocial
              ], ["desc", "desc"]);
            var arr = orderBy(this.state.obrasSociales, [(obraSocial) => obraSocial.bitActivo, (obraSocial) => obraSocial.idObraSocial
              ], ["desc", "desc"]);

            this.setState({
                obrasSocialesFiltrados: filtro,
                obrasSociales: arr,
            })

        })
    }

    bitInverse = obraSocial => {
        fetch(`obras_sociales/switch-alta/${obraSocial.idObraSocial}`, {
          method: 'PUT', 
          headers:{
          'Content-Type': 'application/json'
          }
      }).then(response => {
          if (response.ok) {
            if(obraSocial.bitActivo) { 
                alert(`Se ha eliminado la obra social ${obraSocial.razonSocial} con éxito.`)
                this.fetchobrasSocialesAll()
            } else {
                alert(`Se ha dado de alta la obra social ${obraSocial.razonSocial} con éxito.`)
                this.fetchobrasSocialesAll()
            }
              return response.text();
          } else {
            if(obraSocial.bitActivo) { 
                alert(`No se ha podido eliminar la obra social ${obraSocial.razonSocial}. Intentelo nuevamente.`)
              } else {
                alert(`No se ha podido dar de alta la obra social ${obraSocial.razonSocial}. Intentelo nuevamente.`)
              }
              return Promise.reject({status: response.status, statusText: response.statusText});
          }
          });
    }

    mensajeConfirmacion(obraSocial){
        if (obraSocial.bitActivo){
            return (`¿Esta seguro que quiere eliminar la obra social ${obraSocial.razonSocial}?`)
        }
        else {
            return (`¿Esta seguro que quiere dar de alta la obra social ${obraSocial.razonSocial}?`)
        }
    }

    cantidadPorPagina(){
        return ( 
        <div className='rightAlign'>
            Cantidad de obras sociales por página: &nbsp;&nbsp; 
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
        return (this.state.obrasSocialesFiltrados.slice(from, to))
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
          obrasSocialesFiltrados,  
          sortParams: { direction }  
        } = this.state;
  
        const sortDirection = direction === "desc" ? "asc" : "desc";
        const sortedCollection = orderBy(obrasSocialesFiltrados, [sortKey], [sortDirection]);
  
        this.setState({  
          obrasSocialesFiltrados: sortedCollection,  
          sortParams: {  
            direction: sortDirection  
          }  
        });  
    } 

    estado(bitActivo){
        if(bitActivo){
            return "Dar de baja"
        }
        else {
            return "Dar de alta"
        }
    }

    handleSearch(valor){
        this.setState({
            filtro: valor.target.value,
        })
        
        var os = this.state.obrasSociales.filter(function (obraSocial) {
               
            return (obraSocial.razonSocial.toLowerCase().includes(valor.target.value.toLowerCase()) || 
            obraSocial.cuit.toString().includes(valor.target.value) );
          });

        this.setState({
            obrasSocialesFiltrados: os,
            totalCount: os.length,
        })

    }


    render(){
        return(
            <div className='union'>
                <MenuOpciones/>

                <div className='tablaListadoHistorico'>

                    <Header as='h2'>Obras Sociales</Header>
                    
                    <Button as= {Link} to='/obras_sociales/add' exact='true' floated='right' icon labelPosition='left' primary size='small'>
                        <Icon name='user' /> Nueva Obra Social
                    </Button>
                  
                    <br></br>
                    <br></br>
                    <br></br>
                   
                    <div className='union'>
                        <div className="ui icon input">

                            <Input value={this.state.filtro} onChange={this.handleSearch} placeholder='Ingrese búsqueda...' icon={{ name: 'search' }}/>
                            
                        </div>
                        {this.cantidadPorPagina()}
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
                    
                        {(this.loadData(((this.state.activePage-1) * this.state.limit), (this.state.activePage * this.state.limit))).map(  (obraSocial, index) => (
                        <tr key={index} value={obraSocial} className={ obraSocial.bitActivo ? null : "pacienteBaja"} > 
                            <td data-label="Id">
                                {obraSocial.idObraSocial}
                            </td>
                            <td data-label="Nombre">
                                {obraSocial.razonSocial}
                            </td>
                            <td data-label="Cuit">
                                {obraSocial.cuit}
                            </td>
                            <td data-label="Telefono">
                                {obraSocial.telefono}
                            </td>
                            <td>
                                <Dropdown item icon='ellipsis horizontal' simple>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => window.confirm(this.mensajeConfirmacion(obraSocial)) ? this.bitInverse(obraSocial): null} >
                                            {this.estado(obraSocial.bitActivo)}
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
                        totalPages={Math.ceil((this.state.totalCount) / this.state.limit)}
                        onPageChange={this.onChangePage}
                    />
                </div>
            </div>
        )
    }

}
