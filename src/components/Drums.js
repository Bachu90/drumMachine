import React from 'react';
import sounds from './sounds';

const Drums = props => {
    return(
        <div className="drums-keyboard">
        {sounds[props.bank].map(sound => (
            <div className="drum-pad" id={sound.id} key={sound.id} onClick={(e) => {
                props.play(e)
                props.displayChange(sound.id)
            }} >{sound.keyTrigger}<audio src={sound.url} className="clip" ></audio></div>
        ))}
        </div>
    )
}

export default Drums;