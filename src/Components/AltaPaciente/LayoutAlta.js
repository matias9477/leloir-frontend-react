import React, {Component} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchDocumentos, fetchObrasSociales, fetchPaises, fetchSexos } from './../../Services/FetchsPacientes';

class LayoutAlta extends Component{
    constructor(){
        super();
        this.state={    documentos:[],
                        paises: [],
                        obrasSociales:[],
                        sexos:[],}
    }

    componentDidMount() {
        this.getCombosData();
    }


    getCombosData = () =>{
        this.setState({
            documentos: fetchDocumentos(),
            obrasSociales: fetchObrasSociales(),
            paises: fetchPaises(),
            sexos: fetchSexos(),
          })

    }


    renderProgress(){
        return <CircularProgress size={50}/>;
    }


    render(){
        return(
            <div>
            <div>Registro de nuevo paciente</div>
            
            
            {this.documentos[1] ? <FormAlta documentos={this.state.documentos} obrasSociales={this.state.obrasSociales} 
                                                paises={this.state.paises} sexos={this.state.sexos}/>
                : this.renderProgress()}
           </div>
        )
    }

}

export default LayoutAlta;