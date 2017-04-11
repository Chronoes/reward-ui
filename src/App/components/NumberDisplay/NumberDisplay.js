import React, { Component } from 'react';

class NumberDisplay extends Component {
  render() {
    const { number } = this.props;
    return (
      <div>
        <h3>{number}</h3>
      </div>
    );
  }
}

export default NumberDisplay;
