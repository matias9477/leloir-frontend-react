import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

import NavBar from '../NavBar/NavBar';
import Tabla from '../Reusables/Tabla/Tabla'
import { urlConsultaAnalisis } from '../../Constants/NavUrl';
import { getAnalisisAction } from '../../Redux/analisisDuck';
import './analisisStyle.css';

const columns = [
    {
        dataField: 'createdAt',
        text: 'Fecha',
    },
    {
        dataField: 'paciente',
        text: 'Paciente',
    },
    {
        dataField: 'estadoAnalisis',
        text: 'Estado',
    }
];


class TablaAnalisis extends React.Component {

    componentDidMount(){
        this.props.getAnalisisAction()
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

                        <Button as= {Link} to='/analisis/add' style={{marginRight: '6em'}}  exact='true' floated='right' icon labelPosition='left' primary size='small'>
                            <Icon name='syringe' /> Nuevo Análisis
                        </Button>

                        <Tabla
                            data={this.props.analisis}
                            param={'idAnalisis'}
                            columns={columns}
                            title='Analisis'
                            options={true}
                            path={urlConsultaAnalisis}
                        />
                    </div>
                }

            </div>
        )
    }

}
const mapStateToProps = state => ({
    fetching: state.analisis.fetching,
    analisis: state.analisis.analisisAll
})

export default connect(mapStateToProps, { getAnalisisAction })(TablaAnalisis)
