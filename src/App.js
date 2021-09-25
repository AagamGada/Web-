import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from './Components/Dashboard';
import PostPage from './Components/PostPage';
import "./App.css";
function App() {
  return (
    <Router>
      <Switch>
          <Route exact path="/" component={Dashboard}></Route>
          <Route exact path="/postpage" component={PostPage}></Route>
      </Switch>
    </Router>
  );
}

export default App;
