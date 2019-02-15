import React from 'react';
import './App.css';
import Drums from './Drums';
import Display from './Display';
import Switch from './Switch';

class App extends React.Component {

  state = {
    volume: 50,
    bank: 'bankOne',
    display: '',
    powerOn: false
  }

  displaySwitchOff;

  powerSwitch = () => {
    this.displayChange(this.state.powerOn ? 'Power off' : 'Power on')
    this.setState(prevState => ({
      powerOn: !prevState.powerOn
    }))
    
  }

  bankSwitch = () => {
    if(this.state.powerOn){
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
    if(this.state.powerOn){
      const volume = e.target.value;
      this.displayChange(`Volume ${volume}`);
      this.setState({
        volume
      })
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', e => {
      if(e.keyCode === 66 && this.state.powerOn){
        this.bankSwitch()
      }else if(e.keyCode === 80){
        this.powerSwitch()
      }
    })
  }

  render() {
    return (
      <div className={`drum-machine ${this.state.powerOn ? 'active' : ''}`} id="drum-machine">
        <div className="console-left">
          <Display text={this.state.display} />
          <Drums volume={this.state.volume} displayChange={this.displayChange} bank={this.state.bank} powerOn={this.state.powerOn}/>
        </div>
        <div className="console-right">
          <Switch name="power" label={['O','I']} condition={this.state.powerOn === true} click={this.powerSwitch} />
          <Switch name="bank" label={['II', 'I']} condition={this.state.bank === "bankOne"} click={this.bankSwitch} />
          <div className="slider-container">
            <p className="switch-label">volume</p>
            <input type="range" className="slider" value={this.state.volume} onChange={this.changeVolume} disabled={!this.state.powerOn}></input>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
