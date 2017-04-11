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
      <div className="app-wrapper">
        <div className="container">
          <header className="row">
            <div className="col-12">
              <h1 className="app-title">
                Rando 👋 🎲
              </h1>
            </div>
          </header>
          {generating ? (
            <main className="row">
              <div className="col-12">
                <NumberDisplay number={number} maximum={end} />
              </div>
              <div className="col-12 col-sm-6 col-md-4">
                <button className="btn btn-primary mt-2 btn-block" onClick={this.restartGeneration}>Restart</button>
              </div>
            </main>
          ) : (
            <main className="row mt-4">
              <div className="col-12 col-sm-6 col-md-4">
                <NumberGeneration start={start} end={end} generateNumber={this.generateNumber} />
              </div>
            </main>
          )}
        </div>
      </div>
    );
  }
}

export default App;
