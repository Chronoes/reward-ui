import React, { Component } from 'react';

class NumberGeneration extends Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

  handleGenerate = (event) => {
    event.preventDefault();
    const { generateNumber } = this.props;
    const minimumNumber = parseInt(this.state.minimum, 10);
    const maximumNumber = parseInt(this.state.maximum, 10);

    const maximum = Math.max(Math.max(maximumNumber, minimumNumber), 1);
    const minimum = Math.max(Math.min(minimumNumber, maximum), 0);

    generateNumber(minimum, maximum);
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState((oldState) => ({ ...oldState,  [name]: value }));
  }

  render() {
    const { minimum, maximum } = this.state;
    return (
      <form onSubmit={this.handleGenerate}>
        <div className="form-group">
          <input type="number" name="minimum" value={minimum} onChange={this.handleInputChange} className="form-control" />
        </div>
        <div className="form-group mt-4">
          <input type="number" name="maximum" value={maximum} onChange={this.handleInputChange} className="form-control" />
        </div>
        <div className="form-group mt-4">
          <button type="submit" className="btn btn-primary btn-block">Generate number</button>
        </div>
      </form>
    );
  }
}

export default NumberGeneration;
