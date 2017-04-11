import React, { Component } from 'react';
import Odometer from 'odometer';

import './NumberDisplay.css';

class NumberDisplay extends Component {
  componentDidMount() {
    this.odometer = this.constructOdometer(this.odometerNode);
    this.odometer.update(this.props.number);
  }

  constructOdometer(el) {
    return new Odometer({ el, value: el.textContent.replace(/./g, '9'), theme: 'minimal' });
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
