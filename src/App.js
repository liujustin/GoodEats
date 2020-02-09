import React from "react";
import logo from "./logo.svg";
import "./App.css";
import SearchPage from "./Components/SearchPage";
import Results from "./Components/Results";
import {
  HashRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    // <SearchPage />
    // <Results />
    <HashRouter basename="/">
      <div>
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/results">
            <Results />
          </Route>
          <Route path="/">
            <SearchPage />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
