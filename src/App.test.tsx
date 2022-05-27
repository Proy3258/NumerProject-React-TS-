import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter, MemoryRouter, renderMatches, Route, Routes } from 'react-router-dom';
import {createMemoryHistory} from 'history'
import Bisection from './rootofequations/Bisection';
import { PropsEquations } from './interfaces/service';
import { Home } from './pages/Home';
import FalsePosition from './rootofequations/FalsePosition';
import userEvent from '@testing-library/user-event';

let StateEquation:PropsEquations = {
  Epsilon: Math.pow(10, -6),
  Equation: "x^4-13",
  Error: 0.000001,
  Method: {
    RootEquations: {
      Bisection: { xL: 1.75, xR: 2.00 },
      FalsePosition: { xL: 0.02, xR: 0.03 },
      Onepoint:{x:0.1},
      Newton:{x:2.00},
      Secant:{x:2.00, xi:2.75 }
    }
  },
  Token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByb3kxMjNhYUBnbWFpbC5jb20iLCJpYXQiOjE2NTM1NTkxMjUsImV4cCI6MTY1MzU2MjcyNSwic3ViIjoiNiJ9.AeFfirLj4BL12OtINJ66wlO38A4mi-c2fHwzCEaS6vA',
  Url: 'http://localhost:7800/NumericalMethod',
  Problem: []
};
test('Test Home Page', () => {
  render(<App/>);
  const linkElement = screen.getByText(/ROOT OF EQUATION/i);
  expect(linkElement).toBeInTheDocument();
  fireEvent.click(screen.getByText(/ROOT OF EQUATION/i));
});
test('Test Home FirstPage',async ()=>{
  
  render(
  <MemoryRouter initialEntries={['/']}>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </MemoryRouter>,);
  fireEvent.click(screen.getByText(/ROOT OF EQUATION/i));
 
});
test('Test Bisection Page',async ()=>{
  
  await render(
  <MemoryRouter initialEntries={['/bisection']}>
    <Routes>
      <Route path="/bisection" element={<Bisection StateEquation={StateEquation} />} />
    </Routes>
  </MemoryRouter>,);
  expect(screen.getByText(/root of equations/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/equation/i)).not.toBeNull();
  expect(screen.getByLabelText(/xl/i)).not.toBeNull();
  expect(screen.getByLabelText(/xr/i)).not.toBeNull();
  expect(screen.getByLabelText(/epsilon/i)).not.toBeNull();
  screen.getByRole('button',{name: /submit/i });
  userEvent.click(screen.getByRole('button',{name: /submit/i }));
  // const AnswerField =  expect(screen.getByPlaceholderText(/answer/i));
  // expect(AnswerField).toHaveValue('1.898829');
});
test('Test FalsePosition Page',async ()=>{
  
  await render(
  <MemoryRouter initialEntries={['/falseposition']}>
    <Routes>
      <Route path="/falseposition" element={<FalsePosition StateEquation={StateEquation}/>} />
    </Routes>
  </MemoryRouter>,);
  expect(screen.getByText(/root of equations/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/equation/i)).not.toBeNull();
  expect(screen.getByLabelText(/xl/i)).not.toBeNull();
  expect(screen.getByLabelText(/xr/i)).not.toBeNull();
  expect(screen.getByLabelText(/epsilon/i)).not.toBeNull();
  screen.getByRole('button',{name: /submit/i });
  userEvent.click(screen.getByRole('button',{name: /submit/i }));
  
});