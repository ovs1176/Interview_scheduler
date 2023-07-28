import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import InterviewState from './context/interviews/InterviewState';

function App(){
  return (
    <>
      <InterviewState>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </InterviewState>
    </>
  );
}

export default App;
