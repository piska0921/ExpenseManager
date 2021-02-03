import logo from './logo.svg';
import './App.css';
import Home from './containers/Home'
import Create from './containers/Create'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

function App() {

  return (
    <Router>
      <div className="App">
        <div className="container pb-5">
          <Route path="/" exact component={Home} />
          <Route path="/create" component={Create} />
          <Route path="/edit/:id" component={Create} />
        </div>
      </div>
    </Router>

  );
}

export default App;
