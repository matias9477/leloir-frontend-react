import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import './LPSecretaria.css';

let array = JSON.parse(localStorage.getItem('extraction')) || []



// let extractions = JSON.parse(localStorage.getItem('extraction')) 

 class Extraction extends Component {
     constructor(props) {
         super(props);
         this.state = ({
             flag:false
         })
     }

      saveStorage = (name, data) => {
        if (data != null){
             localStorage.setItem(name, JSON.stringify(data))
        }
    }
  
    
     next = () => {
        array.shift()
        if (array === [] || array.length === 0){
            localStorage.removeItem('extraction')
        } else {
            this.saveStorage('extraction', array)
        }
        this.setState({
            flag: true
        })
    }

    componentDidMount() {
        this.setState({
            flag:true,
        })
    }

     render(){
         
         return (
             <div className="extractionMain">
        <label>Cola de Extracciones</label>
        <ul className="List">
            {array!==null ? array.map( (ex) => {
                return(
                    <li>
                    {ex.text}
                </li>)
            }) 
            : null}
        </ul>

            {array.length>=1 ?
            <Button icon labelPosition='right' size='small' onClick={() => this.next()}>
                <Icon name='arrow alternate circle right outline' color='blue' />Siguiente
            </Button>
            : null} 

        </div>
    )
}
}


export default Extraction;
