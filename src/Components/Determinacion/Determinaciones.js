import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ClipLoader from 'react-spinners/ClipLoader'

import MenuOpciones from '../MenuOpciones'
import { getDeterminacionesAction, switchAltaAction } from '../../Redux/determinacionesDuck'
import { urlConsultaForm } from '../../Constants/NavURL'
import Tabla from '../Reusables/Tabla/Tabla'
import './determinaciones.css'

const columns = [
    {
        dataField: 'codigoPractica',
        text: 'Código Práctica',
    },
    {
        dataField: 'descripcionPractica',
        text: 'Descripcion Práctica',
    },
    {
        dataField: 'unidadBioquimica',
        text: 'Unidad Bioquimica',
    },
    {
        dataField: 'unidadMedida',
        text: 'Unidad de Medida'
    }
  ];
  

class TablaDeterminaciones extends React.Component {
   
    componentDidMount(){
        this.props.getDeterminacionesAction()
    }

    render(){
        const { fetching } = this.props

        return(
            <div className='union'>
                <MenuOpciones/>
              
                {fetching ? <div className='spinner'>
                        <ClipLoader
                            size={60}
                            color={'black'}
                        />
                    </div> : 

                    <div className='determinacionesAll'>
                        
                        <Button as={Link} to='/determinaciones/add' exact='true' floated='right' icon labelPosition='left' primary
                            size='small'>
                            <Icon name='lab'/> Nueva Determinación
                        </Button>

                        <Tabla
                            data={this.props.determinaciones}
                            param={'codigoPractica'}
                            columns={columns}
                            title='Determinaciones'
                            path={urlConsultaForm}
                            options={true}
                            switchAlta={true}
                        />
                    </div>
                }
                    
            </div>
        )
    }

}
const mapStateToProps = state => ({
    fetching: state.determinaciones.fetching,
    determinaciones: state.determinaciones.determinaciones
})

export default connect(mapStateToProps, { getDeterminacionesAction, switchAltaAction })(TablaDeterminaciones)
