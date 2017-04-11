import React, { Component } from 'react';

import NumberDisplay from './components/NumberDisplay';
import NumberGeneration from './components/NumberGeneration';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      generating: false,
      minimum: 0,
      maximum: 1000,
      number: 0,
    }
  }

  generateNumber = (minimum, maximum) => this.setState(oldState => ({
    ...oldState,
    generating: true,
    minimum,
    maximum,
    number: Math.floor(Math.random() * (maximum - minimum + 1) + minimum),
  }));

  restartGeneration = () => this.setState(oldState => ({ ...oldState, generating: false }));

  render() {
    const { number, generating, minimum, maximum } = this.state;
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
                <NumberDisplay number={number} maximum={maximum} playCena={minimum === 420 && maximum === 1337} />
              </div>
              <div className="col-12 col-sm-6 col-md-4">
                <button className="btn btn-primary mt-2 btn-block" onClick={this.restartGeneration}>Restart</button>
              </div>
            </main>
          ) : (
            <main className="row mt-4">
              <div className="col-12 col-sm-6 col-md-4">
                <NumberGeneration
                  minimum={minimum}
                  maximum={maximum}
                  generateNumber={this.generateNumber}
                />
              </div>
            </main>
          )}
        </div>
      </div>
    );
  }
}

export default App;
