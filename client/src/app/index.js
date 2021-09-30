import Reviews from '../pages/Reviews';
import HomeTwo from '../pages/HomeTwo';
import React from "react";
import NavBar from '../components/NavBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Moderator from '../pages/Moderator';
import ModRevs from '../pages/ModRevs';
function App() {
  return (
    <div>

      <Router>
        <div className="App">
          {/* <Reviews/> */}
          <Route path="/" exact component={HomeTwo} />
          <Route path="/moderator" exact component={Moderator} />
          <Route path="/moderator/reviews" component={ModRevs} />
          <Route path="/moderator/questions" component={ModRevs} />
          <Route path="/questions" component={Reviews} />
          <Route path="/reviews" component={Reviews} />
        </div>

      </Router>
    </div>
  );
}

export default App;
