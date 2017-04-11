import React, { Component } from 'react';
import Odometer from 'odometer';

import drumRoll from './drum-roll-loopable.ogg';
import cymbal from './cymbal.ogg';

import './NumberDisplay.css';

class NumberDisplay extends Component {
  componentWillMount() {
    // Ensure audio is loaded before mounting
    this.drumRollAudio = new Audio(drumRoll);
    this.cymbalAudio = new Audio(cymbal);
  }

  componentDidMount() {
    const odometerDuration = 2000;
    const odometer = this.constructOdometer(odometerDuration);
    odometer.update(this.props.number);
    this.drumRollAudio.play();
    setTimeout(() => {
      this.cymbalAudio.play();
      this.drumRollAudio.pause();
    }, odometerDuration);
  }

  constructOdometer(duration) {
    return new Odometer({
      el: this.odometerNode,
      value: [...this.props.maximum.toString(10)].map(() => '0').join(''), // 1000 -> 0000
      theme: 'minimal',
      duration,
    });
  }

  saveReferenceToOdometerNode = (node) => {
    this.odometerNode = node;
  }

  render() {
    return <div ref={this.saveReferenceToOdometerNode} className="number-display odometer" />;
  }
}

export default NumberDisplay;
