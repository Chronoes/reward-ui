import React from 'react';
import { shallow } from 'enzyme';

import App from './App';
import ParameterForm from './components/ParameterForm';
import SpecialEffectsContainer from './components/SpecialEffectsContainer';
import NumberDisplay from './components/NumberDisplay';

describe('<App />', () => {
  let shallowApp;
  beforeEach(() => {
    shallowApp = shallow(<App />);
  });

  it('generates a random number between min and max', () => {
    const minimum = 50;
    const maximum = 500;

    shallowApp.instance().generateNumber(minimum, maximum);
    const generatedNumber = shallowApp.state('number');
    expect(generatedNumber).toBeGreaterThanOrEqual(minimum);
    expect(generatedNumber).toBeLessThanOrEqual(maximum);
  });

  it('should reset generation on restart button click', () => {
    shallowApp.setState({ generating: true, number: 500 });
    expect(shallowApp.state('generating')).toBe(true);
    shallowApp.find('button').simulate('click');
    expect(shallowApp.state('generating')).toBe(false);
  });

  describe('without animations', () => {
    let shallowApp;
    beforeEach(() => {
      shallowApp = shallow(<App animated={false} />);
    });

    it('renders one <ParameterForm /> component', () => {
      expect(shallowApp.find(ParameterForm)).toHaveLength(1);
    });

    describe('on number generation', () => {
      it('renders a regular number', () => {
        const number = 500;
        shallowApp.setState({ generating: true, number });
        expect(shallowApp.find('.number-display').text()).toBe(number.toString());
      });
    });

  });

  describe('with animations', () => {
    let shallowApp;
    beforeEach(() => {
      shallowApp = shallow(<App animated={true} />);
    });

    it('renders one <ParameterForm /> component', () => {
      expect(shallowApp.find(ParameterForm)).toHaveLength(1);
    });

    describe('on number generation', () => {
      it('renders a special effects container and odometer number display', () => {
        const number = 500;
        shallowApp.setState({ generating: true, number });
        expect(shallowApp.find(SpecialEffectsContainer)).toHaveLength(1);
        expect(shallowApp.find(NumberDisplay)).toHaveLength(1);
      });
    });
  });
});
