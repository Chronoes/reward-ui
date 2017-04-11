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
    const { start, end } = this.state;
    generateNumber(parseInt(start, 10), parseInt(end, 10));
  }

  handleStartChange = (event) => {
    const { value } = event.target;
    const { end } = this.state;
    this.setState({ start: Math.max(Math.min(value, end), 0) });
  }

  handleEndChange = (event) => {
    const { value } = event.target;
    const { start } = this.state;
    this.setState({ end: Math.max(Math.max(value, start), 1) });
  }

  render() {
    const { start, end } = this.state;
    return (
      <form onSubmit={this.handleGenerate}>
        <input type="number" value={start} onChange={this.handleStartChange}></input>
        <input type="number" value={end} onChange={this.handleEndChange}></input>
        <button type="submit">Generate number</button>
      </form>
    );
  }
}

export default NumberGeneration;
