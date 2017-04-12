import React, { Component } from 'react';
import Odometer from 'odometer';

import './NumberDisplay.css';

const RANDOM_SUCCESS_EMOJIS = ['👌', '👍', '😊', '😎', '✊', '✌️', '🤙', '🙏'];

function getRandomEmoji() {
  return RANDOM_SUCCESS_EMOJIS[Math.floor(Math.random() * RANDOM_SUCCESS_EMOJIS.length)];
}

class NumberDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successEmoji: null,
    };
  }

  componentDidMount() {
    this.mounted = true;
    const odometer = this.constructOdometer();
    odometer.update(this.props.number);

    setTimeout(() => {
      if (this.mounted) {
        this.setState(oldState => ({ ...oldState, successEmoji: getRandomEmoji() }));
        this.odometerNode.classList.toggle('number-display--finished');
      }
    }, this.props.odometerOptions.duration);
  }

  componentWillUnmount() {
    this.mounted = false;
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
      duration: this.props.odometerOptions.duration,
    });
  }

  saveReferenceToOdometerNode = (node) => {
    this.odometerNode = node;
  }

  render() {
    const { successEmoji } = this.state;

    return (
      <div className="row">
        <div className="col">
          <div ref={this.saveReferenceToOdometerNode} className="number-display odometer" />
        </div>
        <div className="col hidden-xs-down">
          {
            successEmoji && <span className="success-emoji">{successEmoji}</span>
          }
        </div>
      </div>
    );
  }
}

export default NumberDisplay;
