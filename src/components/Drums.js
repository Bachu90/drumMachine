import React from 'react';
import sounds from './sounds';

class Drums extends React.Component {
    state={
        activeDrum: ''
    }

    handleDrumPadPress = drumPad => {
        drumPad.classList.add('pressed');
        setTimeout(() => {
          drumPad.classList.remove('pressed');
        },200);
      }

    render(){
        return(
            <div className="drums-keyboard">
            {sounds[this.props.bank].map(sound => (
                <div className={`drum-pad ${this.props.powerOn && 'active'}`} id={sound.id} key={sound.id} >
                    {sound.keyTrigger}
                    <audio src={sound.url} className="clip" ></audio>
                </div>
            ))}
            </div>
        )
    }
}

export default Drums;