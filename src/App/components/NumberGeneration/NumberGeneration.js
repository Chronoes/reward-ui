import React, { Component } from 'react';

class NumberGeneration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start: props.start || 0,
      end: props.end || 1000,
    };
  }

  handleGenerate = () => {
    const { generateNumber } = this.props;
    const startValue = parseInt(this.state.start, 10);
    const endValue = parseInt(this.state.end, 10);

    const end = Math.max(Math.max(endValue, startValue), 1);
    const start = Math.max(Math.min(startValue, end), 0);

    generateNumber(start, end);
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { start, end } = this.state;
    return (
      <form onSubmit={this.handleGenerate}>
        <input type="number" name="start" value={start} onChange={this.handleInputChange}></input>
        <input type="number" name="end" value={end} onChange={this.handleInputChange}></input>
        <button type="submit">Generate number</button>
      </form>
    );
  }
}

export default NumberGeneration;
