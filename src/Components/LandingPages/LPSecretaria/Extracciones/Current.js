import React, { Component } from 'react';
import './../LPSecretaria.css';
import { Icon, Button, Grid, Divider, List, Container } from 'semantic-ui-react';


class Current extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            selectedQueuer: '',
            flag: false,
        });
    }

    saveStorage(name, data){
        if (data != null){
             localStorage.setItem(name, JSON.stringify(data))
        }
    }

    componentWillReceiveProps(nextProps) {
        this.saveStorage('currentExtraction', nextProps.currenQueuer)
    }

    handleChangeListQueuers = selectedQueuer => {
        let aux = []
        aux.push(selectedQueuer)
            this.saveStorage('currentExtraction', aux)
            this.setState({ selectedQueuer })
    }

    clearCurrent(){
        localStorage.removeItem('currentExtraction')
        window.location.reload(true)
    }

    removeCurrent = () => {
        localStorage.removeItem("nombreCurrentExtraction");
        this.setState({
            flag: true
        })
    }

    patientFound(){
        return(
            <div> 
                {JSON.parse(localStorage.nombreCurrentExtraction)}                
            </div>
        )
    }
    

    render() {
        return (
            <div className='atencion'>
                {(localStorage.nombreCurrentExtraction !== undefined) ? 
                    <Container >
                            <div>
                {JSON.parse(localStorage.nombreCurrentExtraction) !== undefined ?  <div> {JSON.parse(localStorage.nombreCurrentExtraction)} 
                <Button onClick={this.removeCurrent} size='small' basic color='black'>Finalizar atención</Button>
                
                </div> : null}
      
                            </div>
                    
                   </Container>
                    
                : <div> {'Agrega pacientes a la cola de extracción y pulsa el botón siguiente para comenzar a atender' }</div>
                }
            </div>
        );
    }
}

export default Current;