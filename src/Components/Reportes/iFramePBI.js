import React, { Component } from 'react';
import MenuOpciones from '../MenuOpciones';
import '../styles.css';

class iFramePBI extends Component {
    render() {
        return (
            <div className="union">
                <MenuOpciones/>
                <div className="avoidMenu">
                    <iframe width="933" height="700" src="https://app.powerbi.com/view?r=eyJrIjoiMzFhMTdlMmEtZTQxMC00NjBlLTkwZGItNWI4ZTFmOGU4YTk5IiwidCI6ImI5NzNlNjljLTYzYzItNGY0MS1iMzU2LTgyZDY5Yjc4NjRjMiJ9" frameborder="0" allowFullScreen="true"></iframe>              
                </div>
            </div>
        );
    }
}

export default iFramePBI;