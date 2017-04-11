import React, { Component } from 'react';
import Odometer from 'odometer';

import 'odometer/themes/odometer-theme-train-station.css';
import './NumberDisplay.css';

class NumberDisplay extends Component {
  componentDidMount() {
    this.odometer = this.constructOdometer(this.odometerRef);
    setTimeout(() => {
      this.odometerRef.textContent = this.props.number;
    }, 1000);
  }

  constructOdometer(el) {
    return new Odometer({
      el,
      value: el.textContent.replace(/./g, '9'),
      theme: 'train-station',
    });
  }

  render() {
    const { number } = this.props;
    return (
      <div ref={el => { this.odometerRef = el; }} className="number-display odometer">
        {number}
      </div>
    );
  }
}

export default NumberDisplay;
