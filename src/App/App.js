import React, { Component } from 'react';

import NumberDisplay from './components/NumberDisplay';
import NumberGeneration from './components/NumberGeneration';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      generating: false,
      start: 0,
      end: 0,
      number: 0,
    }
  }

  generateNumber = (start, end) => {
    this.setState({
      generating: true,
      start,
      end,
      number: parseInt(start + Math.random() * end, 10),
    });
  }

  restartGeneration = () => {
    this.setState({ generating: false });
  }

  render() {
    const { number, generating, start, end } = this.state;
    return (
      <div className="app">
        <div className="app__header">
          <h2>Random number generator</h2>
        </div>
        <div className="app__content">
          <div className="app__number-display">
            {generating ? (
              <div>
                <NumberDisplay number={number} />
                <button onClick={this.restartGeneration}>Restart</button>
              </div>
            ) : (
              <NumberGeneration start={start} end={end} generateNumber={this.generateNumber} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
