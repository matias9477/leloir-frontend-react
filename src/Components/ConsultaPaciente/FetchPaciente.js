import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class FetchPaciente extends React.Component{
    state = {
        loading: true,
        paciente: null,
    }

    async componentDidMount(){
        const api = "http://localhost:8080/pacientes/id/1";
        const response = await fetch(api);
        const data = await response.json();
        this.setState({paciente:data, loading: false})
    }

    render(){
        return (
        <div>
            {this.state.loading || !this.state.paciente ? (
             <CircularProgress size = {50}>  </ CircularProgress >
            ) : (
            <div> 
                {this.state.paciente.nombre}
            </div>
            )}
        </div>
        );
}
}