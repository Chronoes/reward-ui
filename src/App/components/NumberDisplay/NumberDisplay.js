import React, { Component } from 'react';
import Odometer from 'odometer';

import drumRoll from './drum-roll-loopable.ogg';
import cymbal from './cymbal.ogg';
import johnCena from './john-cena-theme.ogg';

import './NumberDisplay.css';

const ODOMETER_ANIMATION_DURATION = 2000;
const FADEOUT_DURATION = 350;

class NumberDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { showCena: false };
  }

  componentWillMount() {
    // Ensure audio is loaded before mounting
    this.audioTracks = {
      drumRoll: new Audio(drumRoll),
      cymbal: new Audio(cymbal),
      johnCena: new Audio(johnCena),
    };
  }

  componentDidMount() {
    const odometer = this.constructOdometer();
    odometer.update(this.props.number);
    this.audioTracks.drumRoll.play();
    setTimeout(() => {
      if (this.props.isJohnCena) {
        this.audioTracks.johnCena.play();
        setTimeout(() => {
          this.setState(() => ({ showCena: true }));
        }, 1000);
      } else {
        this.audioTracks.cymbal.play();
      }
      this.audioTracks.drumRoll.pause();
    }, ODOMETER_ANIMATION_DURATION - (this.props.isJohnCena ? 850 : 10));
  }

  componentWillUnmount() {
    // Fade music out gracefully on unmount
    let step = FADEOUT_DURATION;
    const fadeOut = setInterval(() => {
      step -= 1;
      Object.keys(this.audioTracks).forEach((audio) => { this.audioTracks[audio].volume = step / FADEOUT_DURATION; });

      if (step <= 0) {
        Object.keys(this.audioTracks).forEach((audio) => this.audioTracks[audio].pause());
        clearInterval(fadeOut);
      }
    }, 1);
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
    if (this.state.showCena) {
      return (
        <img
          className="img-fluid rounded"
          alt="John Cena"
          src="http://i0.kym-cdn.com/photos/images/newsfeed/001/015/752/a14.jpg"
        />
      );
    }
    return <div ref={this.saveReferenceToOdometerNode} className="number-display odometer" />;
  }
}

export default NumberDisplay;
