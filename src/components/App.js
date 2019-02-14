import React from 'react';
import './App.css';
import Drums from './Drums';
import Display from './Display';
import Switch from './Switch';

class App extends React.Component {

  state = {
    volume: 0.8,
    bank: 'bankTwo',
    display: '',
    powerOn: true
  }

  displaySwitchOff;

  powerSwitch = () => {
    this.displayChange(this.state.powerOn ? 'Power off' : 'Power on')
    this.setState(prevState => ({
      powerOn: !prevState.powerOn
    }))
  }

  bankSwitch = () => {
    if(this.state.bank === "bankOne"){
      this.setState({
        bank: 'bankTwo'
      })
      this.displayChange('Smooth piano kit');
    }else {
      this.setState({
        bank: 'bankOne'
      })
      this.displayChange('Heater Kit');
    }
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

  changeVolume = (e) => {
    const volume = e.target.value / 100;
    this.displayChange(`Volume ${e.target.value}`);
    this.setState({
      volume
    })
  }

  render() {
    return (
      <div className="drum-machine" id="drum-machine">
        <div className="console-left">
          <Display text={this.state.display} />
          <Drums volume={this.state.volume} displayChange={this.displayChange} bank={this.state.bank} powerOn={this.state.powerOn}/>
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
