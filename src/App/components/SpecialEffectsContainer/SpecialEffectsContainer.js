import React, { Component } from 'react';

import drumRoll from './drum-roll-loopable.ogg';
import cymbal from './cymbal.ogg';

import './SpecialEffectsContainer.css';

const FADEOUT_DURATION = 350;

const DEFAULT_EFFECT = {
  track: cymbal,
  effectStart(duration) {
    return duration - 10;
  },
  useEffect() {
    return true;
  },
};

class SpecialEffectsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCena: false,
    };
  }

  componentWillMount() {
    // Ensure audio is loaded before mounting
    this.drumRollAudio = new Audio(drumRoll);
  }

  componentDidMount() {
    this.mounted = true;

    const { duration, effects } = this.props;

    this.drumRollAudio.play();
    const { track, effectStart, name: effectName } = effects.find((effect) => effect.useEffect()) || DEFAULT_EFFECT;

    this.effectAudio = new Audio(track);
    setTimeout(() => {
      this.effectAudio.play();
      this.drumRollAudio.pause();
    }, effectStart(duration));

    setTimeout(() => {
      // TODO: Make this more generic
      if (this.mounted && effectName === 'johnCena') {
        this.setState(oldState => ({ ...oldState, showCena: true }));
      }
    }, duration + 50);
  }

  fadeOutAudio(playingAudio) {
    let step = FADEOUT_DURATION;
    const fadeOut = setInterval(() => {
      step -= 1;
      playingAudio.forEach((audio) => { audio.volume = step / FADEOUT_DURATION; });

      if (step <= 0) {
        playingAudio.forEach((audio) => audio.pause());
        clearInterval(fadeOut);
      }
    }, 1);
  }


  componentWillUnmount() {
    this.mounted = false;
    this.fadeOutAudio([this.drumRollAudio, this.effectAudio]);
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
