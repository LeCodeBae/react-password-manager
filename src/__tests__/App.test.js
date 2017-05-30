import React from 'react';
import { shallow } from 'enzyme';

import App from '../App';

describe('<App/>', () => {
  it('renders without exploding', () => {
    expect(
      shallow(
        <App/>
      ).length
    ).toEqual(1)
  });
})


