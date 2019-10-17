import React from 'react';
import axios from 'axios';
import { Button, Header, Pagination, Icon, Input, Dropdown } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import { orderBy } from 'lodash';

import MenuOpciones from '../MenuOpciones';
import { urlObrasSoc } from './../../Constants/URLs';
import { nroPorPagina } from "../../Constants/utils";
import { nullTo, titleCase} from '../../Services/MetodosDeValidacion';
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
        axios.get(urlObrasSoc).then(resolve => {
            this.setState({
                analisis: Object.values(resolve.data).flat(),
                analisisFiltrados: Object.values(resolve.data).flat(),
                totalCount: (Object.values(resolve.data).flat()).length,
            });

            var filtro = orderBy(this.state.analisisFiltrados, [(obraSocial) => obraSocial.bitActivo, (obraSocial) => obraSocial.idObraSocial
            ], ["desc", "desc"]);
            var arr = orderBy(this.state.analisis, [(obraSocial) => obraSocial.bitActivo, (obraSocial) => obraSocial.idObraSocial
                ], ["desc", "desc"]);

            this.setState({
                analisisFiltrados: filtro,
                analisis: arr,
            })

            }, (error) => {
                console.log('Error', error.message);
            })
    }

    bitInverse = obraSocial => {
        axios.put(`obras_sociales/switch-alta/${obraSocial.idObraSocial}`).then(response => {
            if (obraSocial.bitActivo) {
                alert(`Se ha dado de baja el análisis ${obraSocial.razonSocial} con éxito.`);
                this.getAnalisis()
            } else {
                alert(`Se ha dado de alta el análisis ${obraSocial.razonSocial} con éxito.`);
                this.getAnalisis()
            }    
            }, (error) => {
                if (obraSocial.bitActivo) {
                    alert(`No se ha podido dar de baja el análisis ${obraSocial.razonSocial}. Intentelo nuevamente.`)
                } else {
                    alert(`No se ha podido dar de alta el análisis. ${obraSocial.razonSocial} Intentelo nuevamente.`)
                }
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
        });

        const an = this.state.analisis.filter(function (muestra) {
            return (muestra.razonSocial=== undefined ? null : titleCase(muestra.razonSocial).includes(titleCase(valor.target.value)) ||
                (muestra.idObraSocial=== undefined ? null : muestra.idObraSocial.toString().includes(valor.target.value)))
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
                            <th onClick={() => this.handleColumnHeaderClick("idObraSocial")} >Id</th>
                            <th onClick={() => this.handleColumnHeaderClick("razonSocial")} >Fecha</th>
                            <th onClick={() => this.handleColumnHeaderClick("cuit")} >Paciente</th>
                            <th onClick={() => this.handleColumnHeaderClick("telefono")} >Estado</th>
                            <th onClick={() => this.handleColumnHeaderClick("bitActivo")} >Opciones </th>
                        </tr>
                    </thead>
                    
                    <tbody className='centerAlignment'>
                    
                        {(this.loadData(((this.state.activePage-1) * this.state.limit), (this.state.activePage * this.state.limit))).map(  (analisis, index) => (
                        <tr key={index} value={analisis} className={ analisis.bitActivo ? null : "listadosBaja"} > 
                            <td data-label="Id">
                                {analisis.idObraSocial}
                            </td>
                            <td data-label="Nombre">
                                {analisis.razonSocial}
                            </td>
                            <td data-label="Cuit">
                                {nullTo(analisis.cuit)}
                            </td>
                            <td data-label="Telefono">
                                {nullTo(analisis.telefono)}
                            </td>
                            <td>
                                <Dropdown item icon='ellipsis horizontal' simple>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => window.confirm(this.mensajeConfirmacion(analisis)) ? this.bitInverse(analisis): null} >
                                            {this.estado(analisis.bitActivo)}
                                        </Dropdown.Item>
                                        <Dropdown.Item as= {Link} to={`/obras_sociales/consulta/${analisis.idObraSocial}`} exact='true'>
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
