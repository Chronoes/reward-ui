import React, { Component } from 'react';
import Odometer from 'odometer';

import drumRoll from './drum-roll-loopable.ogg';
import cymbal from './cymbal.ogg';

import './NumberDisplay.css';

const ODOMETER_ANIMATION_DURATION = 2000;

class NumberDisplay extends Component {
  componentWillMount() {
    // Ensure audio is loaded before mounting
    this.drumRollAudio = new Audio(drumRoll);
    this.cymbalAudio = new Audio(cymbal);
  }

  componentDidMount() {
    const odometerDuration = 2000;
    const odometer = this.constructOdometer();
    odometer.update(this.props.number);
    this.drumRollAudio.play();
    setTimeout(() => {
      this.cymbalAudio.play();
      this.drumRollAudio.pause();
    }, ODOMETER_ANIMATION_DURATION - 10);
  }

  constructOdometer() {
    return new Odometer({
      el: this.odometerNode,
      value: [...this.props.maximum.toString(10)].map(() => '0').join(''), // 1000 -> 0000
      theme: 'minimal',
      duration: ODOMETER_ANIMATION_DURATION,
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
