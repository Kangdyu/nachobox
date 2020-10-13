import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Search from "./pages/Search";
import TV from "./pages/TV";

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/movies" component={Movies} />
        <Route path="/movie/:id" component={Detail} />
        <Route exact path="/tv" component={TV} />
        <Route path="/tv/:id" component={Detail} />
        <Route path="/search" component={Search} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
