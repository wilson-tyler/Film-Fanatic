import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'whatwg-fetch';
import HomeContainer from '../src/containers/HomeContainer.jsx';

describe('Unit testing React components', () => {

  describe('Home container', () => {
    test('Renders a list of the top 20 popular movies', () => {
      const { container } = render(<HomeContainer/>);
      expect(container.getElementsByClassName('movieTable').length).toBe(1);
    })
  })
})