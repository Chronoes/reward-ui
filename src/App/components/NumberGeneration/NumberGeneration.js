import React, { Component } from 'react';

class NumberGeneration extends Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    const minimumNumber = parseInt(this.state.minimum, 10);
    const maximumNumber = parseInt(this.state.maximum, 10);

    const maximum = Math.max(Math.max(maximumNumber, minimumNumber), 1);
    const minimum = Math.max(Math.min(minimumNumber, maximum), 0);

    this.props.onGenerateNumber(minimum, maximum);
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState((oldState) => ({ ...oldState,  [name]: value }));
  }

  render() {
    const { minimum, maximum } = this.state;
    return (
      <form onSubmit={this.onFormSubmit}>
        <div className="form-group">
          <label className="control-label" htmlFor="minimum-input">Generate a random number from</label>
          <input
            type="number"
            name="minimum"
            value={minimum}
            onChange={this.handleInputChange}
            className="form-control"
            id="minimum-input"
          />
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="maximum-input">to</label>
          <input
            type="number"
            name="maximum"
            value={maximum}
            onChange={this.handleInputChange}
            className="form-control"
            id="maximum-input"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-block">Generate number</button>
        </div>
      </form>
    );
  }
}

export default NumberGeneration;
