import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from './Components/Dashboard';
import PostPage from './Components/PostPage';
import LinkPage from './Components/LinkPage';
function App() {
  return (
    <Router>
      <Switch>
          <Route exact path="/" component={Dashboard}></Route>
          <Route exact path="/postpage" component={PostPage}></Route>
          <Route exact path="/linkpage" component={LinkPage}></Route>
      </Switch>
    </Router>
  );
}

export default App;
