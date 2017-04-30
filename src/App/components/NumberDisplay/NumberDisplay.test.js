import React from 'react';
import { shallow } from 'enzyme';

import NumberDisplay from './NumberDisplay';

describe.skip('<NumberDisplay />', () => {
  it('should do something', () => {
    const display = shallow(<NumberDisplay number={600} maximum={800} odometerOptions={{ duration: 500 }} />);
  });
});
