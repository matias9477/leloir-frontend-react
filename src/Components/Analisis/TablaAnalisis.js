import React from 'react';
import axios from 'axios';
import { Button, Header, Pagination, Icon, Input, Dropdown } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import { orderBy } from 'lodash';

import MenuOpciones from '../MenuOpciones';
import { urlAnalisis } from './../../Constants/URLs';
import { nroPorPagina } from "../../Constants/utils";
import { titleCase} from '../../Services/MetodosDeValidacion';
import { getHumanDate } from '../../Services/MetodosPaciente';
import './../styles.css';

export default class TablaObraSocial extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          analisis: [],
          limit: nroPorPagina[1].value,
          activePage: 1,
          totalCount: 0,
          sortParams:{
              direction: undefined
          },  
          filtro: '',
          analisisFiltrados: [],
        }
        this.cambioLimite = this.cambioLimite.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
      }

    componentDidMount(){
        this.getAnalisis();
    }

    getAnalisis = () => {
        axios.get(urlAnalisis).then(resolve => {
            this.setState({
                analisis: Object.values(resolve.data).flat(),
                analisisFiltrados: Object.values(resolve.data).flat(),
                totalCount: (Object.values(resolve.data).flat()).length,
            });

            var filtro = orderBy(this.state.analisisFiltrados, [(analisis) => analisis.bitActivo, (analisis) => analisis.analisisId
            ], ["desc", "desc"]);
            var arr = orderBy(this.state.analisis, [(analisis) => analisis.bitActivo, (analisis) => analisis.idanalisis
                ], ["desc", "desc"]);

            this.setState({
                analisisFiltrados: filtro,
                analisis: arr,
            })

            }, (error) => {
                console.log('Error', error.message);
            })
    }

    mensajeConfirmacion(analisis){
        if (analisis.bitActivo){
            return (`¿Esta seguro que quiere dar de baja el análisis ${analisis.razonSocial}?`)
        }
        else {
            return (`¿Esta seguro que quiere dar de alta el análisis ${analisis.razonSocial}?`)
        }
    }

    cantidadPorPagina() {
        return (
            <div className='rightAlign'>
                <span>
                    Cantidad de análisis por página:{' '}
                    <Dropdown
                        inline
                        options={nroPorPagina}
                        value = {this.state.limit}
                        onChange={this.cambioLimite} 
                    />
                </span>
            </div>
        )
    };

    cambioLimite(e, data) {
        this.setState({
            limit: data.value,
            activePage: 1,
        });
        return this.loadData(((this.state.activePage - 1) * this.state.limit), (this.state.activePage * this.state.limit));
    }

    loadData(from, to){
        return (this.state.analisisFiltrados.slice(from, to))
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
          analisisFiltrados,  
          sortParams: { direction }  
        } = this.state;
  
        const sortDirection = direction === "desc" ? "asc" : "desc";
        const sortedCollection = orderBy(analisisFiltrados, [sortKey], [sortDirection]);
  
        this.setState({  
          analisisFiltrados: sortedCollection,  
          sortParams: {  
            direction: sortDirection  
          }  
        });  
    } 

    handleSearch(valor){
        this.setState({
            filtro: valor.target.value,
        });

        const an = this.state.analisis.filter(function (analisis) {
            return (analisis.analisisId === undefined ? null : analisis.analisisId.toString().includes(valor.target.value) ||

                (analisis.paciente.nombre === undefined ? null : titleCase(analisis.paciente.nombre).includes(titleCase(valor.target.value))) ||

                (analisis.paciente.apellido === undefined ? null : titleCase(analisis.paciente.apellido).includes(titleCase(valor.target.value))) ||

                (analisis.paciente.estado === undefined ? null : titleCase(analisis.paciente.estado.nombre).includes(titleCase(valor.target.value))) ||
                
                (analisis.paciente.createdAt === undefined ? null : analisis.createdAt.toString().includes(valor.target.value))
                )
          });

        this.setState({
            analisisFiltrados: an,
            totalCount: an.length,
        })
    }


    render(){
        return(
            <div className='union'>
                <MenuOpciones/>

                <div className='tablaListadoHistorico'>

                    <Header as='h2'>Análisis</Header>
                    
                    <Button as= {Link} to='/analisis/add' exact='true' floated='right' icon labelPosition='left' primary size='small'>
                        <Icon name='syringe' /> Nuevo Análisis
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
                            <th onClick={() => this.handleColumnHeaderClick("analisisId")} >Id</th>
                            <th onClick={() => this.handleColumnHeaderClick("createdAt")} >Fecha</th>
                            <th onClick={() => this.handleColumnHeaderClick("paciente.nombre")} >Paciente</th>
                            <th onClick={() => this.handleColumnHeaderClick("estado.nombre")} >Estado</th>
                            <th>Opciones </th>
                        </tr>
                    </thead>
                    
                    <tbody className='centerAlignment'>
                    
                        {(this.loadData(((this.state.activePage-1) * this.state.limit), (this.state.activePage * this.state.limit))).map(  (analisis, index) => (
                        <tr key={index} value={analisis}> 
                            <td data-label="Id">
                                {analisis.analisisId}
                            </td>
                            <td data-label="Fecha">
                                {getHumanDate(analisis.createdAt)}
                            </td>
                            <td data-label="Nombre">
                            {analisis.paciente.nombre}&nbsp;&nbsp;{analisis.paciente.apellido}
                            </td>
                            <td data-label="Telefono">
                                {analisis.estado.nombre}
                            </td>
                            <td>
                                <Dropdown item icon='ellipsis horizontal' simple>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as= {Link} to={`/analisis/consulta/${analisis.analisisId}`} exact='true'>
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
