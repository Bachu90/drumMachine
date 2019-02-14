import React from 'react';

const Switch = props => {
    return(
        <div className="switch-container">
            <p className="switch-label">{props.name}</p>
            <div id={props.id} className={`switch ${props.condition ? 'left' : 'right'}`} onClick={props.click}>
              <span>{props.label[0]}</span><span>{props.label[1]}</span>
            </div>
        </div>
    )
}

export default Switch;