import React, { Component } from 'react';

import drumRoll from './drum-roll-loopable.ogg';
import cymbal from './cymbal.ogg';

const FADEOUT_DURATION = 350;

const DEFAULT_EFFECT = {
  name: 'cymbal',
  track: cymbal,
  effectStart(duration) {
    return duration - 10;
  },
};

class SpecialEffectsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customHtml: '',
    };
  }
  componentWillMount() {
    // Ensure audio is loaded before mounting
    this.drumRollAudio = new Audio(drumRoll);
  }

  componentDidMount() {
    this.mounted = true;

    const { duration, effect } = this.props;

    this.drumRollAudio.play();
    const { track, effectStart, crossFade, injectHtml, html } = effect || DEFAULT_EFFECT;

    this.effectAudio = new Audio(track);

    if (crossFade) {
      setTimeout(() => {
        this.crossFadeAudio(this.drumRollAudio, this.effectAudio, crossFade);
      }, effectStart(duration) - crossFade);
    } else {
      setTimeout(() => {
        this.drumRollAudio.pause();
        this.effectAudio.play();
      }, effectStart(duration));
    }

    if (injectHtml) {
      setTimeout(() => {
        this.setState({ customHtml: html });
      }, injectHtml(duration));
    }
  }

  fadeOutAudio(playingAudio, duration = FADEOUT_DURATION) {
    let step = duration;
    const fadeOut = setInterval(() => {
      step -= 1;
      playingAudio.forEach(audio => {
        audio.volume = step / duration;
      });

      if (step <= 0) {
        playingAudio.forEach(audio => audio.pause());
        clearInterval(fadeOut);
      }
    }, 1);
  }

  crossFadeAudio(stoppingAudio, startingAudio, duration) {
    startingAudio.volume = 0;
    startingAudio.play();

    let step = duration;
    const crossFade = setInterval(() => {
      step -= 1;
      stoppingAudio.volume = step / duration;
      startingAudio.volume = (duration - step) / duration;

      if (step <= 0) {
        stoppingAudio.pause();
        clearInterval(crossFade);
      }
    }, 1);
  }

  componentWillUnmount() {
    this.mounted = false;
    this.fadeOutAudio([this.drumRollAudio, this.effectAudio]);
  }

  render() {
    const { customHtml } = this.state;
    if (customHtml) {
      return <div dangerouslySetInnerHTML={{ __html: customHtml }} />;
    }
    return this.props.children;
  }
}

export default SpecialEffectsContainer;
