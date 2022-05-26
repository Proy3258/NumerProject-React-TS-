import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import  Bisection from './rootofequations/Bisection'



test('Test Home Page', () => {
  render(<App/>);
  const linkElement = screen.getByText(/Numer Project React TS/i);
  expect(linkElement).toBeInTheDocument();
  fireEvent.click(screen.getByText(/ROOT OF EQUATION/i));
});

// test('Test Bisection', ()=>{
//   render(<Bisection/>);
//   const linkElement = expect(component).toHaveTextContent(/BISECTION/i);
//   // fireEvent.click(screen.getByText(/GET STARTED/i));

// });
