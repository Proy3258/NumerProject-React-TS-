import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('Test Home Page', () => {
  render(<App/>);
  const linkElement = screen.getByText(/ROOT OF EQUATION/i);
  expect(linkElement).toBeInTheDocument();
  fireEvent.click(screen.getByText(/ROOT OF EQUATION/i));
});

// test('Test Bisection', ()=>{
//   let component = /Bisection/i;
//   const linkElement = screen.getByText(/Numer Project React TS/i);
//   // fireEvent.click(screen.getByText(/GET STARTED/i));

// });
