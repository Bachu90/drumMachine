import React from 'react';
import './App.css';
import Drums from './Drums';
import Display from './Display';

class App extends React.Component {

  state = {
    volume: 0.8,
    bank: 'bankTwo',
    display: ''
  }

  displayChange = text => {
    this.setState({
      display: text
    })
    setTimeout(()=> {
      this.setState({
        display: ''
      })
    }, 1000);
  }

  playSound = (e) =>{
    const sound = e.target.querySelector('audio');
    sound.volume = this.state.volume;
    sound.play();
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
          <Drums play={this.playSound} displayChange={this.displayChange} bank={this.state.bank} />
        </div>
        <div className="console-right">
          <input type="range" val="0.5" onChange={this.changeVolume}></input>
        </div>
      </div>
    );
  }
}

export default App;
