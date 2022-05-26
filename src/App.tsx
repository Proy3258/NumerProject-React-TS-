import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';

import { Home } from './pages/Home'
import { RootOfEq } from './rootofequations/RootOfEq'
import { PropsEquations } from './interfaces/service';
import  Bisection from './rootofequations/Bisection'
import FalsePosition from './rootofequations/FalsePosition';
import Onepoint from './rootofequations/Onepoint';
import Newtonraphson from './rootofequations/Newtonraphson';
import Secant from './rootofequations/Secant';


function App() {
  let StateEquation:PropsEquations = {
    Epsilon: Math.pow(10, -6),
    Equation: " ",
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
  return (
    <div className="App">
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rootofequations" element={<RootOfEq />} />
          <Route path="/bisection" element= {<Bisection StateEquation={StateEquation}/>} />
          <Route path="/falseposition" element= {<FalsePosition StateEquation={StateEquation}/>} />
          <Route path="/onepoint" element= {<Onepoint StateEquation={StateEquation}/>} />
          <Route path="/newtonraphson" element= {<Newtonraphson StateEquation={StateEquation}/>} />
          <Route path="/secant" element= {<Secant StateEquation={StateEquation}/>} />
        </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
