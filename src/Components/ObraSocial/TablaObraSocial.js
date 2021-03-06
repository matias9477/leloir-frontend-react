import React from 'react';
import { connect } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

import NavBar from '../NavBar/NavBar';
import { urlAddObraSocial } from '../../Constants/NavUrl';
import Tabla from '../Reusables/Tabla/Tabla'
import { urlConsultaObraSocial } from '../../Constants/NavUrl';
import { getObrasSocialesAction } from '../../Redux/obrasSocialesDuck';
import '../styles.css';

const columns = [
    {
        dataField: 'razonSocial',
        text: 'Razón Social',
    },
    {
        dataField: 'cuit',
        text: 'Cuit',
    },
    {
        dataField: 'telefono',
        text: 'Teléfono',
    }
];


class TablaObraSocial extends React.Component {

    componentDidMount(){
        this.props.getObrasSocialesAction()
    }

    render(){
        const { fetching } = this.props

        return(
            <div>
                <NavBar/>

                {fetching ? <div className='spinner'>
                        <ClipLoader
                            size={60}
                            color={'black'}
                        />
                    </div> :

                    <div>

                        <Tabla
                            data={this.props.obrasSociales}
                            param='idObraSocial'
                            urlAdd={urlAddObraSocial}
                            buttonTitleAdd='Nueva Obra Social'
                            columns={columns}
                            title='Obras Sociales'
                            options={true}
                            path={urlConsultaObraSocial}
                        />
                    </div>
                }

            </div>
        )
    }

}
const mapStateToProps = state => ({
    fetching: state.obrasSociales.fetching,
    obrasSociales: state.obrasSociales.obrasSociales
})

export default connect(mapStateToProps, { getObrasSocialesAction })(TablaObraSocial)