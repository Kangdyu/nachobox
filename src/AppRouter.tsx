import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Search from "./pages/Search";
import TV from "./pages/TV";

function AppRouter() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/movie/:id">
          <Detail />
        </Route>
        <Route exact path="/tv">
          <TV />
        </Route>
        <Route path="/tv/:id">
          <Detail />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;
