import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import '../styles.css';

class iFramePBI extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <div className='avoidMenu'>
                    <iframe width="1140" height="700" src="https://app.powerbi.com/reportEmbed?reportId=444126c9-dfb9-4f35-8a86-164e7806a845&autoAuth=true&ctid=82dcaed7-6bb5-4354-8298-b43eb4e0e4ca&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXVzLWVhc3QyLWItcHJpbWFyeS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D" frameborder="0" allowFullScreen="true"></iframe>              
                </div>
            </div>
        );
    }
}

export default iFramePBI;