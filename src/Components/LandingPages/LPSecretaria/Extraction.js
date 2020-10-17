import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import './LPSecretaria.css';


 class Extraction extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            extraction: [],
        })
    }


    componentWillReceiveProps() {
        this.setState({
            extraction: JSON.parse(localStorage.getItem('extraction'))
        })
    }

    saveStorage = (name, data) => {
        if (data != null){
             localStorage.setItem(name, JSON.stringify(data))
        }
    }
  
  
     next = () => {
        let array = this.state.extraction
        array.shift()
        if (array === [] || array.length === 0){
            localStorage.removeItem('extraction')
        } else {
            this.saveStorage('extraction', array)
        }
        this.setState({
            extraction: array
        })
    }


     render(){
         
         return (
            <div className="extractionMain">
            <label>Cola de Extracciones</label>
            <ul className="Lista">
                {this.state.extraction!==null ? this.state.extraction.map( (ex) => {
                    return(
                        <li>
                        {ex.text}
                    </li>)
                }) 
                : null}
            </ul>

            {this.state.extraction!==null&&this.state.extraction.length>=1 ?
            <Button icon labelPosition='right' size='small' onClick={() => this.next()}>
                <Icon name='arrow alternate circle right outline' color='blue' />Siguiente
            </Button>
            : null} 

        </div>
    )
}
}


export default Extraction;
