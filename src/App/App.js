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
      <div>
        <section className="jumbotron jumbotron-fluid" style={{ backgroundColor: '#1abc9c', color: '#ffffff' }}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1>Random number generator</h1>
              </div>
            </div>
          </div>
        </section>
        <div className="container">
          <div className="row">
            <div className="col-12">
              {generating ? (
                <div>
                  <NumberDisplay number={number} />
                  <div>
                    <button onClick={this.restartGeneration}>Restart</button>
                  </div>
                </div>
              ) : (
                <NumberGeneration start={start} end={end} generateNumber={this.generateNumber} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
