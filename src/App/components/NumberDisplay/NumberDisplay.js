import React, { Component } from 'react';
import Odometer from 'odometer';

import drumRoll from './drum-roll-loopable.ogg';
import cymbal from './cymbal.ogg';
import johnCena from './john-cena-theme.ogg';
import snoopDogg from './snoop-dogg.ogg';

import './NumberDisplay.css';

const ODOMETER_ANIMATION_DURATION = 2000;
const FADEOUT_DURATION = 350;
const RANDOM_SUCCESS_EMOJIS = ['👌', '👍', '😊', '😎', '✊', '✌️', '🤙', '🙏'];

function getRandomEmoji() {
  return RANDOM_SUCCESS_EMOJIS[Math.floor(Math.random() * RANDOM_SUCCESS_EMOJIS.length)];
}

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
      snoopDogg: new Audio(snoopDogg),
    };
  }

  calculateOdometerDuration(isDefault = false) {
    const defaultDuration = ODOMETER_ANIMATION_DURATION - 10;
    if (isDefault) {
      return defaultDuration;
    }

    if (this.props.isJohnCena) {
      return ODOMETER_ANIMATION_DURATION - 850;
    } else if (this.props.isSnoopDogg) {
      return ODOMETER_ANIMATION_DURATION - 950;
    }
    return defaultDuration;
  }

  componentDidMount() {
    this.mounted = true;
    const odometer = this.constructOdometer();
    odometer.update(this.props.number);
    this.audioTracks.drumRoll.play();
    setTimeout(() => {
      if (this.props.isJohnCena) {
        this.audioTracks.johnCena.play();
        setTimeout(() => {
          if (this.mounted) {
            this.setState(oldState => ({ ...oldState, showCena: true }));
          }
        }, 1200);
      } else if (this.props.isSnoopDogg) {
        this.audioTracks.snoopDogg.play();
      } else {
        this.audioTracks.cymbal.play();
      }

      this.audioTracks.drumRoll.pause();
    }, this.calculateOdometerDuration());

    setTimeout(() => {
      if (this.mounted) {
        this.odometerNode.classList.toggle('number-display--finished');
      }
    }, this.calculateOdometerDuration(true));
  }

  componentWillUnmount() {
    this.mounted = false;
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
      value: this.props.maximum
        .toString(10)
        .split('')
        .map(() => '0')
        .join(''), // 1000 -> 0000
      theme: 'minimal',
      duration: ODOMETER_ANIMATION_DURATION,
    });
  }

  saveReferenceToOdometerNode = (node) => {
    this.odometerNode = node;
  }

  render() {
    const { showCena } = this.state;
    if (showCena) {
      return (
        <img
          className="img-fluid rounded img-cena"
          alt="John Cena"
          src="http://i0.kym-cdn.com/photos/images/newsfeed/001/015/752/a14.jpg"
        />
      );
    }
    return (
      <div>
        <div ref={this.saveReferenceToOdometerNode} className="number-display odometer" />
      </div>
    );
  }
}

export default NumberDisplay;
