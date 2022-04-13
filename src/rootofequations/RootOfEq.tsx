import { NavBar } from '../components/NavBar'
import './css/RootOfEq.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import {Card, Button } from 'react-bootstrap'

export const RootOfEq = () => {
  return (
      <div>
        <NavBar />
          <div className="header">
            <h1>ROOT OF EQUATIONS</h1>
          </div>
          <div className="equations">
            <p>"วิธีการหารากของสมการ" ค่าของ x ที่ทำให้ฟังก์ชัน f(x) มีค่าเท่ากับ 0 (Zeroes of equations)</p>
          </div>
          <div className="equations1">
            <p>y = f(x) = 0</p>
          </div>
          <div className="button">
            <Card.Link href="/bisection">
              <Button variant="success">GET STARTED</Button>
            </Card.Link>
          </div>
      </div>
  )
}