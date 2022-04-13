import { Navbar, Container, Nav} from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" sticky="top" expand="md">
      <Container>
          <Navbar.Brand href="/rootofequations">
            ROOT OF EQUATIONS
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
          <Navbar.Collapse>
              <Nav>
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to="/bisection">Bisection</Nav.Link>
                  <Nav.Link as={Link} to="/falseposition">False Position</Nav.Link>
                  <Nav.Link as={Link} to="/onepoint">One-Point</Nav.Link>
                  <Nav.Link as={Link} to="/newtonraphson">Newton Raphson</Nav.Link>
                  <Nav.Link as={Link} to="/secant">Secant</Nav.Link>
              </Nav>
          </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}