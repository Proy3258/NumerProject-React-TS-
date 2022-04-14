import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';

import { Home } from './pages/Home'
import { RootOfEq } from './rootofequations/RootOfEq'
import  Bisection from './rootofequations/Bisection'
import FalsePosition from './rootofequations/FalsePosition';
 
function App() {
  return (
    <div className="App">
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rootofequations" element={<RootOfEq />} />
          <Route path="/bisection" element=
          {<Bisection 
            Epsilon={Math.pow(10,-6)}
            Equation={""}
            Error={0}
            Method={
              {
                RootEquations:{
                  Bisection:{xL:1.75,xR:2.00},
                  FalsePosition:{xL:0.02,xR:0.03}
                }
              }

            }

          />} />
          <Route path="/falseposition" element={<FalsePosition
            Epsilon={Math.pow(10,-6)}
            Equation={""}
            Error={0}
            Method={
              {
                RootEquations:{
                  Bisection:{xL:1.75,xR:2.00},
                  FalsePosition:{xL:0.02,xR:0.03}
                }
              }

            }

          />} />
        </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
