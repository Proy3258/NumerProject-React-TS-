import logo from '../home-svgrepo-com.svg';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Button} from "react-bootstrap";

export const Home = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Numer Project ReactJS</p>
        <p>By 6204062620038 วนัชพร เชื้อวิวัฒน์</p>
        <form>
              <Card.Link href="/rootofequations">
                <Button variant="primary">ROOT OF EQUATIONS</Button>
              </Card.Link>
          </form>
      </header>
    </div>
  );
}
