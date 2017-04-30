import React from 'react';
import { shallow } from 'enzyme';

import ParameterForm from './ParameterForm';

describe('<ParameterForm />', () => {
  it('renders 2 number inputs and a submit button', () => {
    const form = shallow(<ParameterForm minimum={0} maximum={1000} onGenerateNumber={() => {}} />);
    expect(form.find('input[type="number"]').length).toBe(2);
    expect(form.find('button[type="submit"]').length).toBe(1);
  });

  it('changes state on user input', () => {
    const form = shallow(<ParameterForm minimum={0} maximum={1000} onGenerateNumber={() => {}} />);
    const name = 'minimum';
    const value = '200';
    form.find('#minimum-input').simulate('change', { target: { name, value } });
    expect(form.state(name)).toBe(value);
  });

  describe('on submit', () => {
    let minimum = 0;
    let maximum = 1000;
    function onGenerateNumber(min, max) {
      minimum = min;
      maximum = max;
    }

    let form;
    beforeEach(() => {
      minimum = 0;
      maximum = 1000;
      form = shallow(<ParameterForm minimum={minimum} maximum={maximum} onGenerateNumber={onGenerateNumber} />);
    });

    function triggerFormSubmit(min, max) {
      form.setState({ minimum: min.toString(), maximum: max.toString() });
      form.find('form').simulate('submit', { preventDefault() {} });
    }

    it('triggers number generation', () => {
      const min = 500;
      const max = 600;
      triggerFormSubmit(min, max);
      expect(minimum).toBe(min);
      expect(maximum).toBe(max);
    });

    it('adjusts limits and triggers number generation', () => {
      const min = 800;
      const max = 100;
      triggerFormSubmit(min, max);
      expect(minimum).toBe(min);
      expect(maximum).toBe(min);
    });

    it('prevents negative limits on number generation', () => {
      const min = -923;
      const max = -32131;
      triggerFormSubmit(min, max);
      expect(minimum).toBe(0);
      expect(maximum).toBe(1);
    });
  });
});
