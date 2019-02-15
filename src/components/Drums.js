import React from 'react';
import sounds from './sounds';

class Drums extends React.Component {

    handlePadPress = pad => {
        !pad.classList.contains('pressed') && pad.classList.add('pressed');
    }

    handlePadRelease = pad => {
        pad.classList.contains('pressed') && pad.classList.remove('pressed');
    }

    playSound = pad => {
        const audio = pad.querySelector('audio');
        audio.volume = this.props.volume / 100;
        console.log(this.props.volume/100)
        audio.play()
        this.handlePadPress(pad);
        this.props.displayChange(pad.id)
        setTimeout(()=>{
            this.handlePadRelease(pad);
        },200);
    }

    handleClick = e =>{
        if(this.props.powerOn){
            const pad = e.target;
            this.playSound(pad);
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', e => {
            if(this.props.powerOn){
                const key = e.keyCode;
                const sound = sounds[this.props.bank].find(sound => {
                    return sound.keyCode === key
                });
                if(sound){
                    const pad = document.getElementById(sound.id);
                    this.playSound(pad);
                }
            }
        })
    }

    render(){
        return(
            <div className="drums-keyboard">
            {sounds[this.props.bank].map(sound => (
                <div className="drum-pad" id={sound.id} key={sound.id} onClick={this.handleClick} >
                    {sound.keyTrigger}
                    <audio src={sound.url} className="clip" id={sound.keyTrigger}></audio>
                </div>
            ))}
            </div>
        )
    }
}

export default Drums;