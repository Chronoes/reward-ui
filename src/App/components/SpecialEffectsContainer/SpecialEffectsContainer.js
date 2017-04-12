import React, { Component } from 'react';

import drumRoll from './drum-roll-loopable.ogg';
import cymbal from './cymbal.ogg';
import johnCena from './john-cena-theme.ogg';
import snoopDogg from './snoop-d.ogg';

import './SpecialEffectsContainer.css';

const FADEOUT_DURATION = 350;

class SpecialEffectsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCena: false,
    };
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

  componentDidMount() {
    this.mounted = true;

    const endTime = this.determineSoundEndTime();

    this.audioTracks.drumRoll.play();
    setTimeout(() => {
      if (this.props.isJohnCena) {
        this.audioTracks.johnCena.play();
      } else if (this.props.isSnoopDogg) {
        this.audioTracks.snoopDogg.play();
      } else {
        this.audioTracks.cymbal.play();
      }

      this.audioTracks.drumRoll.pause();
    }, endTime);

    setTimeout(() => {
      if (this.mounted) {
        this.setState(oldState => ({ ...oldState, showCena: true }));
      }
    }, this.props.duration + 50);
  }


  componentWillUnmount() {
    this.mounted = false;
    // Fade music out gracefully on unmount
    let step = FADEOUT_DURATION;
    const fadeOut = setInterval(() => {
      step -= 1;
      Object.values(this.audioTracks).forEach((audio) => { audio.volume = step / FADEOUT_DURATION; });

      if (step <= 0) {
        Object.values(this.audioTracks).forEach((audio) => audio.pause());
        clearInterval(fadeOut);
      }
    }, 1);
  }

  determineSoundEndTime() {
    const { duration } = this.props;

    if (this.props.isJohnCena) {
      return duration - 850;
    } else if (this.props.isSnoopDogg) {
      return duration - 950;
    }
    return duration - 10;
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
    return this.props.children;
  }
}

export default SpecialEffectsContainer;
