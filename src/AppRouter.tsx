import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "components/common/Footer";
import Header from "components/header/Header";
import PageNotFound from "pages/PageNotFound";
import Detail from "pages/Detail";
import Home from "pages/Home";
import Movies from "pages/Movies";
import Search from "pages/Search";
import TV from "pages/TV";

function AppRouter() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/movies">
          <Movies />
        </Route>
        <Route path="/movies/:id">
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
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default AppRouter;
