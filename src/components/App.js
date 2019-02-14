import React from 'react';
import './App.css';
import Drums from './Drums';
import Display from './Display';
import Switch from './Switch';
import sounds from './sounds';

class App extends React.Component {

  state = {
    volume: 0.8,
    bank: 'bankTwo',
    display: '',
    powerOn: true
  }

  displaySwitchOff;

  powerSwitch = () => {
    this.setState(prevState => ({
      powerOn: !prevState.powerOn
    }))
  }

  bankSwitch = () => {
    const bank = this.state.bank === "bankOne" ? "bankTwo" : "bankOne";
    this.setState({
      bank
    })
  }

  displayChange = text => {
    clearTimeout(this.displaySwitchOff);
    this.setState({
      display: text
    })
    this.displaySwitchOff = setTimeout(()=> {
      this.setState({
        display: ''
      })
    }, 1000);
  }

  handleDrumPadPress = drumPad => {
    drumPad.classList.add('active');
    setTimeout(() => {
      drumPad.classList.remove('active');
    },400);
  }

  playSound = drumPad => {
    const sound = drumPad.querySelector('audio');
    sound.volume = this.state.volume;
    sound.play();
  }

  handleKeyUp = () => {
    const drumPads = document.querySelectorAll('.drum-pad');
    [...drumPads].forEach(drumPad => drumPad.classList.contains('active') && drumPad.classList.remove('active'));
  }

  handleKeyDown = (e) => {
    const key = e.keyCode;
    const sound = sounds[this.state.bank].find(sound => sound.keyCode === key);
    if(sound){
      const drumPad = document.getElementById(sound.id);
      if(drumPad){
        this.playSound(drumPad)
        this.displayChange(sound.id);
        this.handleDrumPadPress(drumPad);
      } 
    }
  }

  handleClick = (e) => {
    this.playSound(e.target);
    this.handleDrumPadPress(e.target);
  }

  changeVolume = (e) => {
    const volume = e.target.value / 100;
    this.setState({
      volume
    })
  }

  render() {
    return (
      <div className="drum-machine" id="drum-machine">
        <div className="console-left">
          <Display text={this.state.display} />
          <Drums 
            click={this.handleClick} 
            displayChange={this.displayChange} 
            bank={this.state.bank} 
            handleKeyDown={this.handleKeyDown}
            handleKeyUp={this.handleKeyUp}
          />
        </div>
        <div className="console-right">
          <Switch name="power" label={['O','I']} condition={this.state.powerOn === true} click={this.powerSwitch} />
          <Switch name="bank" label={['II', 'I']} condition={this.state.bank === "bankOne"} click={this.bankSwitch} />
          <div className="slider-container">
            <p className="switch-label">volume</p>
            <input type="range" className="slider" val="0.5" onChange={this.changeVolume}></input>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
