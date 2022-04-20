import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';

import { Home } from './pages/Home'
import { RootOfEq } from './rootofequations/RootOfEq'
import  Bisection from './rootofequations/Bisection'
import FalsePosition from './rootofequations/FalsePosition';
import { Method } from './interfaces/service';
 
const epsilon:number = Math.pow(10,-6),
      equation:string = " ",
      error:number = 0.000001,
      method:Method={
        RootEquations:{
          Bisection:{ xL:1.75, xR:2.00 },
          FalsePosition:{ xL:0.02, xR:0.03 }
        }
          
      }

function App() {
  return (
    <div className="App">
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rootofequations" element={<RootOfEq />} />
          <Route path="/bisection" element=
          {<Bisection 
            Epsilon={epsilon}
            Equation={equation}
            Error={error}
            Method={method}/>} 
          />
          <Route path="/falseposition" element=
          {<FalsePosition
            Epsilon={epsilon}
            Equation={equation}
            Error={error}
            Method={method}/>} 
          />
        </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
