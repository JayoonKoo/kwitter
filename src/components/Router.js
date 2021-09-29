import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from 'components/Navigation';
import Profile from "routes/Profile";

const AppRouter = ({ isLoggedIn , auth }) => {
  return (
    <Router>
			{isLoggedIn ? <Navigation /> : null}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/profile">
              <Profile auth={auth}/>
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth auth={auth}/>
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
