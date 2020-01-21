import React from 'react';
import { render } from '@testing-library/react';
import VirtualAgent from './virtual-agent';

test('renders learn react link', () => {
  const { getByText } = render(<VirtualAgent />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
