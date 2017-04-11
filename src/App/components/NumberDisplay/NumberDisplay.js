import React, { Component } from 'react';
import Odometer from 'odometer';

import './NumberDisplay.css';

class NumberDisplay extends Component {
  componentDidMount() {
    const odometer = this.constructOdometer();
    odometer.update(this.props.number);
  }

  constructOdometer() {
    return new Odometer({
      el: this.odometerNode,
      value: [this.props.number.toString(10)].map(() => '0'), // 1512 -> 0000
      theme: 'minimal',
    });
  }

  saveReferenceToOdometerNode = (node) => {
    this.odometerNode = node;
  }

  render() {
    const { number } = this.props;
    return (
      <div ref={this.saveReferenceToOdometerNode} className="number-display odometer">
        {number}
      </div>
    );
  }
}

export default NumberDisplay;
