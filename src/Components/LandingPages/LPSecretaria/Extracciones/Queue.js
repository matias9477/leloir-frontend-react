import React, { Component } from 'react';
import FlipMove from 'react-flip-move';

import './../LPSecretaria.css';

class Queue extends Component {

    constructor(props){
        super(props);
        this.createQueuer = this.createQueuer.bind(this);
    }

    createQueuer(queuer){
        return <li onClick={() => this.delete(queuer.key)}
         key={queuer.key}>{queuer.text}</li>
    }

    delete(key){
        let queuers = JSON.parse(localStorage.extraction)
       
        let filtered = queuers.filter(function(value, index, arr){ return value.key !== key})
        if (filtered === []){
            localStorage.removeItem('extraction')
        } else{
            this.saveStorage('extraction', filtered)
        }
        this.props.delete(key);
    }

    saveStorage(name, data){
        localStorage.setItem(name, JSON.stringify(data))
    }

    render(){
        var queuerEntries= this.props.entries;
        var listQueuers = queuerEntries.map(this.createQueuer);

        return (
            <ul className="List">
                <FlipMove duration={200} easing="ease-out">
                {listQueuers}
                </FlipMove>
            </ul>
        );
    }

}


export default Queue;