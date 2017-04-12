import React, { Component } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import NumberDisplay from './components/NumberDisplay';
import ParameterForm from './components/ParameterForm';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      generating: false,
      minimum: 0,
      maximum: 1000,
      number: 0,
    };
  }

  generateNumber = (minimum, maximum) => this.setState(oldState => ({
    ...oldState,
    generating: true,
    minimum,
    maximum,
    number: Math.floor(Math.random() * (maximum - minimum + 1) + minimum),
  }));

  restartGeneration = () => this.setState(oldState => ({ ...oldState, generating: false }));

  renderParameterForm() {
    const { minimum, maximum } = this.state;
    return (
      <main className="col-12 col-sm-8 col-md-6 col-lg-4 flip-out" key="1">
        <ParameterForm
          key="0"
          minimum={minimum}
          maximum={maximum}
          onGenerateNumber={this.generateNumber}
        />
      </main>
    );
  }

  renderRestartButton() {
    return (
      <div className="col-12 col-sm-8 col-md-6 col-lg-4">
        <button
          className="btn btn-primary mt-2 btn-block"
          onClick={this.restartGeneration}>
          Restart
        </button>
      </div>
    );
  }

  renderAnimatedContent() {
    const { number, generating, minimum, maximum } = this.state;
    return (
      <CSSTransitionGroup
        transitionName="flip-out"
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200}>
        {generating ? (
          <main className="col-12 flip-out" key="0">
            <div className="row">
              <div className="col-12">
                <NumberDisplay
                  number={number}
                  maximum={maximum}
                  isJohnCena={minimum === 420 && maximum === 1337}
                  isSnoopDogg={number === 420}
                />
              </div>
              {this.renderRestartButton()}
            </div>
          </main>
        ) : (
          this.renderParameterForm()
        )}
      </CSSTransitionGroup>
    );
  }

  renderContent() {
    const { number, generating } = this.state;
    return (
      generating ? (
        <main className="col-12">
          <div className="row">
            <div className="col-12">
              <h1 className="number-display">{number}</h1>
            </div>
            {this.renderRestartButton()}
          </div>
        </main>
      ) : (
        this.renderParameterForm()
      )
    );
  }

  render() {
    const { animated } = this.props;

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
          <div className="row">
            {animated ? this.renderAnimatedContent() : this.renderContent()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
